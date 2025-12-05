const request = require("supertest");
const express = require("express");

jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

const supabase = require("../src/database/supabaseClient");
const authRoutes = require("../src/routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

beforeEach(() => jest.clearAllMocks());

describe("POST /auth/register", () => {
  test("Deve registrar usuário", async () => {
    supabase.auth.signUp.mockResolvedValueOnce({
      data: { user: { id: "u1" } },
      error: null
    });

    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      error: null
    });

    const res = await request(app)
      .post("/auth/register")
      .send({
        nomeCompleto: "Aurea",
        email: "a@a.com",
        senha: "123456"
      });

    expect(res.status).toBe(201);
  });
});

describe("POST /auth/login", () => {
  test("Login válido", async () => {
    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: {
        user: { id: "u1" },
        session: { access_token: "TOKEN" }
      },
      error: null
    });

    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      data: { nomeCompleto: "Aurea" },
      error: null
    });

    const res = await request(app).post("/auth/login").send({
      email: "a@a.com",
      senha: "123"
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Falha no login", async () => {
    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: null,
      error: { message: "invalid" }
    });

    const res = await request(app).post("/auth/login").send({
      email: "x",
      senha: "y"
    });

    expect(res.status).toBe(401);
  });
});
