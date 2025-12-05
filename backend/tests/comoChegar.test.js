const request = require("supertest");
const express = require("express");

jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

const supabase = require("../src/database/supabaseClient");
const comoChegarRoutes = require("../src/routes/comoChegarRoutes");

const app = express();
app.use(express.json());
app.use("/como-chegar", comoChegarRoutes);

beforeEach(() => jest.clearAllMocks());

describe("GET /como-chegar/:cidadeId", () => {

  test("Deve retornar lista de rotas de como chegar", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [
        { id: 1, cidadeID: 10, descricao: "Vá pela BR-343" }
      ],
      error: null
    });

    const res = await request(app).get("/como-chegar/10");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].descricao).toBe("Vá pela BR-343");
    expect(supabase.from).toHaveBeenCalledWith("Como_Chegar");
  });

  test("Deve retornar erro 400 quando Supabase retornar erro", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: null,
      error: { message: "Erro ao buscar dados" }
    });

    const res = await request(app).get("/como-chegar/99");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Erro ao buscar dados");
  });

  test("Deve retornar 500 em erro inesperado", async () => {
    supabase.__mockQueryBuilder.then.mockRejectedValueOnce(
      new Error("Falha inesperada")
    );

    const res = await request(app).get("/como-chegar/5");

    expect(res.status).toBe(500);
  });

});
