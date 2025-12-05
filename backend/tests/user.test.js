const request = require("supertest");
const express = require("express");

// Mocka o supabaseClient.js (que contém o __mockQueryBuilder)
jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

// Silencia os console.error que ocorrem intencionalmente nos testes de erro 500/400.
// (Assumindo que você tem console.error no catch do controller, embora não tenha sido fornecido.)
jest.spyOn(console, 'error').mockImplementation(() => {});

const supabase = require("../src/database/supabaseClient");
const userRoutes = require("../src/routes/userRoutes");

const app = express();
app.use(express.json());
// Assumindo que a rota seja montada em '/usuarios' ou '/users'
// Usaremos '/usuarios' com base nos seus outros arquivos em Português
app.use("/usuarios", userRoutes); 

beforeEach(() => jest.clearAllMocks());

describe("GET /usuarios/:id", () => {
  const MOCK_USER_ID = "u100-abc";
  const MOCK_USER_DATA = { id: MOCK_USER_ID, nome: "Test User", email: "test@user.com" };

  test("Deve retornar dados do usuário com status 200", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: MOCK_USER_DATA,
      error: null
    });

    const res = await request(app).get(`/usuarios/${MOCK_USER_ID}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(MOCK_USER_ID);
    expect(res.body.nome).toBe("Test User");
    expect(supabase.from).toHaveBeenCalledWith("Users");
    expect(supabase.__mockQueryBuilder.eq).toHaveBeenCalledWith("id", MOCK_USER_ID);
    expect(supabase.__mockQueryBuilder.single).toHaveBeenCalled();
  });

  test("Deve retornar 404 se o usuário não for encontrado (Supabase error code PGRST116)", async () => {
    const NOT_FOUND_ID = "u999-not-found";
    
    // Simula o erro do Supabase para 'não encontrado'
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: { code: 'PGRST116', message: "User not found" }
    });

    const res = await request(app).get(`/usuarios/${NOT_FOUND_ID}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Usuário não encontrado.");
  });

  test("Deve retornar 404 se o Supabase retornar data:null (fallback)", async () => {
    const NOT_FOUND_ID = "u888-data-null";
    
    // Simula o Supabase retornando data:null (caso o error.code não seja acionado)
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: null
    });

    const res = await request(app).get(`/usuarios/${NOT_FOUND_ID}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Usuário não encontrado.");
  });

  test("Deve retornar 400 em caso de erro genérico do Supabase", async () => {
    const GENERIC_ERROR_ID = "u777-error";
    const SUPABASE_ERROR = { code: '42P01', message: "Tabela inexistente" };

    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: SUPABASE_ERROR
    });

    const res = await request(app).get(`/usuarios/${GENERIC_ERROR_ID}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(SUPABASE_ERROR.message);
  });

  test("Deve retornar 500 em erro interno inesperado", async () => {
    supabase.__mockQueryBuilder.then.mockRejectedValueOnce(
      new Error("Falha total na conexão")
    );

    const res = await request(app).get("/usuarios/1");

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Erro interno no servidor.");
  });
});

describe("POST /usuarios", () => {
  const NEW_USER_ID = "u200-new-user";
  const PAYLOAD = {
    id: NEW_USER_ID,
    nome: "Novo Usuário",
    email: "novo@user.com"
  };
  const RETURN_DATA = [{ id: NEW_USER_ID, nome: "Novo Usuário" }];

  test("Deve criar usuário com sucesso e retornar 201", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: RETURN_DATA,
      error: null
    });

    const res = await request(app).post("/usuarios").send(PAYLOAD);

    expect(res.status).toBe(201);
    expect(res.body[0].id).toBe(NEW_USER_ID);
    expect(supabase.from).toHaveBeenCalledWith("Users");
    expect(supabase.__mockQueryBuilder.insert).toHaveBeenCalledWith([
      { ...PAYLOAD, role: "user" }
    ]);
  });

  test("Deve retornar 400 se o ID estiver faltando", async () => {
    const res = await request(app).post("/usuarios").send({ ...PAYLOAD, id: undefined });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ID, nome e email são obrigatórios.");
  });
  
  test("Deve retornar 400 se o Nome estiver faltando", async () => {
    const res = await request(app).post("/usuarios").send({ ...PAYLOAD, nome: undefined });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ID, nome e email são obrigatórios.");
  });

  test("Deve retornar 400 se o Email estiver faltando", async () => {
    const res = await request(app).post("/usuarios").send({ ...PAYLOAD, email: undefined });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ID, nome e email são obrigatórios.");
  });

  test("Deve retornar 400 em caso de erro de inserção (ex: email duplicado)", async () => {
    const SUPABASE_ERROR = { message: "Duplicate key value violates unique constraint" };

    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: SUPABASE_ERROR
    });

    const res = await request(app).post("/usuarios").send(PAYLOAD);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(SUPABASE_ERROR.message);
  });
});