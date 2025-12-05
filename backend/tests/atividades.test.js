const request = require("supertest");
const express = require("express");

jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

const supabase = require("../src/database/supabaseClient");
const atividadesRoutes = require("../src/routes/atividadesRoutes");

const app = express();
app.use(express.json());
app.use("/atividades", atividadesRoutes);

beforeEach(() => jest.clearAllMocks());

describe("GET /atividades/:cidadeID", () => {
  test("Deve retornar lista de atividades", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [{ id: 1, titulo: "Trilha" }],
      error: null
    });

    const res = await request(app).get("/atividades/5");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Deve retornar erro 400 quando Supabase retornar erro", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: { message: "Erro" }
    });

    const res = await request(app).get("/atividades/99");

    expect(res.status).toBe(400);
  });

  test("Deve retornar 500 em erro inesperado", async () => {
    supabase.__mockQueryBuilder.then.mockRejectedValueOnce(
      new Error("Falhou geral!")
    );

    const res = await request(app).get("/atividades/1");

    expect(res.status).toBe(500);
  });
});
