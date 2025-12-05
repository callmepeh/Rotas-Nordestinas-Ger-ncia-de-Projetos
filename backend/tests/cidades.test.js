const request = require("supertest");
const express = require("express");

jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

const supabase = require("../src/database/supabaseClient");
const cidadesRoutes = require("../src/routes/cidadesRoutes");

const app = express();
app.use(express.json());
app.use("/cidades", cidadesRoutes);

beforeEach(() => jest.clearAllMocks());

describe("GET /cidades", () => {
  test("Deve retornar lista de cidades", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: [{ id: 1, nome: "Recife" }],
      error: null
    });

    const res = await request(app).get("/cidades");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("Deve retornar erro interno", async () => {
    supabase.__mockQueryBuilder.then.mockRejectedValueOnce(
      new Error("Erro!")
    );

    const res = await request(app).get("/cidades");

    expect(res.status).toBe(500);
  });
});
