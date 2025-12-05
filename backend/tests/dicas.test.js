const request = require("supertest");
const express = require("express");

jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

const supabase = require("../src/database/supabaseClient");
const dicasRoutes = require("../src/routes/dicasRoutes");

const app = express();
app.use(express.json());
app.use("/dicas", dicasRoutes);

beforeEach(() => jest.clearAllMocks());

describe("GET /dicas/:cidadeId", () => {

  test("Deve retornar lista de dicas da cidade", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [
        { id: 1, cidadeID: 10, texto: "Visite o centro histórico" }
      ],
      error: null
    });

    const res = await request(app).get("/dicas/10");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].texto).toBe("Visite o centro histórico");
    expect(supabase.from).toHaveBeenCalledWith("Dicas");
  });

  test("Deve retornar erro 400 quando Supabase retornar erro", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: { message: "Erro ao buscar dicas" }
    });

    const res = await request(app).get("/dicas/99");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Erro ao buscar dicas");
  });

  test("Deve retornar 500 em erro inesperado", async () => {
    supabase.__mockQueryBuilder.then.mockRejectedValueOnce(
      new Error("Falha inesperada")
    );

    const res = await request(app).get("/dicas/5");

    expect(res.status).toBe(500);
  });

});
