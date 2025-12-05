const request = require("supertest");
const express = require("express");

jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

const supabase = require("../src/database/supabaseClient");
const comentariosRoutes = require("../src/routes/comentariosRoutes");

const app = express();
app.use(express.json());
app.use("/comentarios", comentariosRoutes);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /comentarios", () => {
  test("Deve adicionar comentário com sucesso", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [{ id: 1, mensagem: "Ótimo destino!" }],
      error: null
    });

    const res = await request(app)
      .post("/comentarios")
      .send({ userID: "u1", cidadeID: 10, mensagem: "Ótimo destino!" });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(supabase.from).toHaveBeenCalledWith("Comentarios");
  });

  test("Deve retornar 400 quando faltar dados obrigatórios", async () => {
    const res = await request(app).post("/comentarios").send({
      mensagem: "Faltou IDs"
    });

    expect(res.status).toBe(400);
  });
});

describe("GET /comentarios/:cidadeID", () => {
  test("Deve listar comentários com usuário", async () => {
    // 1ª chamada – Lista de comentários
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [{ id: 1, userID: "u1", mensagem: "Excelente!" }],
      error: null
    });

    // 2ª chamada – Dados do usuário
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [{ id: "u1", nomeCompleto: "Maria" }],
      error: null
    });

    const res = await request(app).get("/comentarios/10");

    expect(res.status).toBe(200);
    expect(res.body[0].usuario.nome).toBe("Maria");
  });

  test("Deve retornar usuario=null se der erro no Users", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [{ id: 1, userID: "u99", mensagem: "Teste" }],
      error: null
    });

    // Erro no Users
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: { message: "Erro Users" }
    });

    const res = await request(app).get("/comentarios/10");

    expect(res.status).toBe(200);
    expect(res.body[0].usuario).toBe(null);
  });
});

describe("PUT /comentarios/:id", () => {
  test("Deve editar comentário", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [{ id: 1, mensagem: "Atualizado!" }],
      error: null
    });

    const res = await request(app)
      .put("/comentarios/1")
      .send({ mensagem: "Atualizado!" });

    expect(res.status).toBe(200);
    expect(res.body.mensagem).toBe("Atualizado!");
  });
});

describe("DELETE /comentarios/:id", () => {
  test("Deve deletar comentário", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      error: null
    });

    const res = await request(app).delete("/comentarios/1");

    expect(res.status).toBe(200);

    // Ajustado para o texto REAL do controller
    expect(res.body.message).toBe("Comentário removido com sucesso.");
  });
});
