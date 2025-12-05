const request = require("supertest");
const express = require("express");

// Mocka o supabaseClient.js (que contém o __mockQueryBuilder)
jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

// Silencia os console.error que ocorrem intencionalmente nos testes de erro 500/400.
jest.spyOn(console, 'error').mockImplementation(() => {});

const supabase = require("../src/database/supabaseClient");
const pontosTuristicosRoutes = require("../src/routes/pontosTuristicosRoutes");

const app = express();
app.use(express.json());
app.use("/pontos-turisticos", pontosTuristicosRoutes);

beforeEach(() => jest.clearAllMocks());

describe("GET /pontos-turisticos/:cidadeId", () => {
  const CIDADE_ID = 5;
  
  test("Deve retornar lista de pontos turísticos da cidade", async () => {
    const mockData = [
      { id: 1, nome: "Ponto A", cidadeID: CIDADE_ID },
      { id: 2, nome: "Ponto B", cidadeID: CIDADE_ID }
    ];

    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: mockData,
      error: null
    });

    const res = await request(app).get(`/pontos-turisticos/${CIDADE_ID}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0].nome).toBe("Ponto A");
    expect(supabase.from).toHaveBeenCalledWith("Pontos_Turisticos");
expect(supabase.__mockQueryBuilder.eq).toHaveBeenCalledWith("cidadeID", "5");  });

  test("Deve retornar array vazio (200) se não houver pontos", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [],
      error: null
    });

    const res = await request(app).get(`/pontos-turisticos/${CIDADE_ID}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  test("Deve retornar erro 400 quando Supabase retornar erro", async () => {
    const supabaseError = { message: "Erro ao buscar dados do banco" };
    
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: supabaseError
    });

    const res = await request(app).get("/pontos-turisticos/99");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(supabaseError.message);
  });

  test("Deve retornar 500 em erro inesperado", async () => {
    supabase.__mockQueryBuilder.then.mockRejectedValueOnce(
      new Error("Falha de conexão inesperada")
    );

    const res = await request(app).get(`/pontos-turisticos/${CIDADE_ID}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Erro interno no servidor.");
  });

});