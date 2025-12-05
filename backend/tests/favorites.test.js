// favorites.test.js

const request = require("supertest");
const express = require("express");

// Silencia os console.error que ocorrem intencionalmente nos testes de erro 500/400.
// Adicionamos esta linha nos outros arquivos de teste para limpeza.
jest.spyOn(console, 'error').mockImplementation(() => {});

// Mocka o supabaseClient.js (que contém o __mockQueryBuilder)
jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

// CORREÇÃO ESSENCIAL: Mockamos o CAMINHO REAL que o Controller usaria.
// Em vez de usar require(), que causava o loop, importamos o mock uma vez,
// e o Jest o usará para substituir o módulo real.
// Para que esta solução funcione no Jest, é preciso garantir que o arquivo real
// "../src/database/supabaseWithAuth.js" *exista* (mesmo que vazio).
// No entanto, para fins de teste, tentaremos importar o mock primeiro.
const mockSupabaseWithAuth = require("./mocks/supabaseWithAuth");

jest.mock("../src/database/supabaseWithAuth.js", () => mockSupabaseWithAuth);

const supabase = require("../src/database/supabaseClient");
const favoritesRoutes = require("../src/routes/favoritesRoutes");

// Não precisamos mais desta linha, pois o mock foi feito acima:
// const supabaseWithAuth = require("./mocks/supabaseWithAuth"); 
const supabaseWithAuth = mockSupabaseWithAuth;

const app = express();
app.use(express.json());
app.use("/favoritos", favoritesRoutes);

// Token simulado necessário para as chamadas que usam supabaseWithAuth
const MOCK_TOKEN = "MOCK_AUTH_TOKEN";
const MOCK_USER_ID = "u101";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /favoritos/add", () => {
  const payload = { userID: MOCK_USER_ID, cidadeID: 5 };
  const headers = { Authorization: `Bearer ${MOCK_TOKEN}` };

  test("Deve adicionar um favorito com sucesso", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [{ id: 1, ...payload }],
      error: null
    });

    const res = await request(app)
      .post("/favoritos/add")
      .set(headers)
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Favorito adicionado");
    expect(res.body.data[0].id).toBe(1);
    expect(supabaseWithAuth).toHaveBeenCalledWith(MOCK_TOKEN);
    expect(supabase.from).toHaveBeenCalledWith("Favoritos");
    expect(supabase.__mockQueryBuilder.insert).toHaveBeenCalledWith([payload]);
  });

  test("Deve retornar 400 em caso de erro no Supabase", async () => {
    const supabaseError = { message: "Já existe" };

    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: supabaseError
    });

    const res = await request(app)
      .post("/favoritos/add")
      .set(headers)
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(supabaseError.message);
  });

  test("Deve retornar 500 em erro interno inesperado", async () => {
    supabase.__mockQueryBuilder.then.mockRejectedValueOnce(
      new Error("Falha de conexão")
    );

    const res = await request(app)
      .post("/favoritos/add")
      .set(headers)
      .send(payload);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Erro interno no servidor");
  });
});

describe("DELETE /favoritos/remove", () => {
  const payload = { userID: MOCK_USER_ID, cidadeID: 5 };
  const headers = { Authorization: `Bearer ${MOCK_TOKEN}` };

  test("Deve remover um favorito com sucesso", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      error: null // DELETE não retorna 'data'
    });

    const res = await request(app)
      .delete("/favoritos/remove")
      .set(headers)
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Favorito removido");
    expect(supabase.from).toHaveBeenCalledWith("Favoritos");
    expect(supabase.__mockQueryBuilder.delete).toHaveBeenCalled();
    expect(supabase.__mockQueryBuilder.eq).toHaveBeenCalledWith("userID", MOCK_USER_ID);
    expect(supabase.__mockQueryBuilder.eq).toHaveBeenCalledWith("cidadeID", 5);
  });

  test("Deve retornar 400 em caso de erro no Supabase", async () => {
    const supabaseError = { message: "Registro não encontrado" };

    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      error: supabaseError
    });

    const res = await request(app)
      .delete("/favoritos/remove")
      .set(headers)
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(supabaseError.message);
  });
});

describe("GET /favoritos/:userID", () => {
  const headers = { Authorization: `Bearer ${MOCK_TOKEN}` };

  test("Deve listar e formatar favoritos com sucesso", async () => {
    const mockData = [
      {
        id: 1,
        cidadeID: 10,
        Cidades: {
          nome: "Rota A",
          cidade: "Cidade X",
          urlImagem: "url_x.jpg"
        }
      },
      {
        id: 2,
        cidadeID: 20,
        Cidades: {
          nome: "Rota B",
          cidade: "Cidade Y",
          urlImagem: "url_y.jpg"
        }
      }
    ];

    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: mockData,
      error: null
    });

    const res = await request(app)
      .get(`/favoritos/${MOCK_USER_ID}`)
      .set(headers);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);

    expect(res.body[0]).toEqual({
      id: 1,
      rotaID: 10,
      nome_rota: "Rota A",
      cidade: "Cidade X",
      urlImagem: "url_x.jpg"
    });

    expect(supabase.from).toHaveBeenCalledWith("Favoritos");
    expect(supabase.__mockQueryBuilder.select).toHaveBeenCalled();
    expect(supabase.__mockQueryBuilder.eq).toHaveBeenCalledWith("userID", MOCK_USER_ID);
  });

  test("Deve retornar array vazio quando não houver favoritos", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [],
      error: null
    });

    const res = await request(app)
      .get(`/favoritos/${MOCK_USER_ID}`)
      .set(headers);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  test("Deve retornar 400 em caso de erro no Supabase", async () => {
    const supabaseError = { message: "Erro de busca" };

    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: supabaseError
    });

    const res = await request(app)
      .get(`/favoritos/${MOCK_USER_ID}`)
      .set(headers);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(supabaseError.message);
  });
});