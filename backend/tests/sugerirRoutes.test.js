const request = require("supertest");
const express = require("express");

// Mock para o Supabase (Simula ../config/supabaseClient.js)
jest.mock("../src/database/supabaseClient.js", () =>
  require("./mocks/supabaseClient")
);

// Mock para o Supabase Client (usado para acessar o mockQueryBuilder)
const supabase = require("./mocks/supabaseClient"); 

// --- Configuração para Mock do Middleware ---
const MOCK_USER_ID = "u123-sugestor";

// Mock para o authMiddleware: ele apenas adiciona req.user.id
jest.mock("../src/middlewares/authMiddleware.js", () => (req, res, next) => {
  req.user = { id: MOCK_USER_ID };
  next();
});

// Importação das rotas
const sugerirRoutes = require("../src/routes/sugerirRoutes.js");

const app = express();
app.use(express.json());
app.use("/sugerir", sugerirRoutes);

// Silencia console.error para erros esperados
jest.spyOn(console, 'error').mockImplementation(() => {});
beforeEach(() => jest.clearAllMocks());

const basePayload = {
  estado: "PE",
  nomeCidade: "Porto de Galinhas",
  latitude: "-8.4900",
  longitude: "-35.0040",
  imagemCapa: "url_capa.jpg",
  descricaoCidade: "Praia incrível",
  comoChegar: [{ tipo: "carro", obs: "BR-101" }],
  pontosTuristicos: [{ nome: "Piscinas Naturais" }],
  atividades: ["Mergulho"],
  dicas: ["Melhor visitar na maré baixa"],
};

describe("POST /sugerir", () => {
  test("Deve aceitar uma sugestão completa e retornar 201", async () => {
    // 1. Simular sucesso na inserção
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      error: null,
    });

    const res = await request(app)
      .post("/sugerir")
      .send(basePayload); // Middleware injetará o token

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Sugestão enviada com sucesso!");
    expect(supabase.from).toHaveBeenCalledWith("Sugestoes_de_Rota");
    
    const insertCall = supabase.__mockQueryBuilder.insert.mock.calls[0][0][0];

    // 2. Verificar o payload inserido
    expect(insertCall.userID).toBe(MOCK_USER_ID);
    expect(insertCall.estado).toBe(basePayload.estado);
    expect(insertCall.latitude).toBeCloseTo(parseFloat(basePayload.latitude));
    expect(insertCall.longitude).toBeCloseTo(parseFloat(basePayload.longitude));
    expect(insertCall.status).toBe("pendente");
    
    // 3. Verificar se os arrays foram transformados em strings JSON
    expect(insertCall.comoChegar).toBe(JSON.stringify(basePayload.comoChegar));
  });

  test("Deve aceitar dados mínimos (sem arrays/imagem) e retornar 201", async () => {
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      error: null,
    });

    const minimumPayload = {
      estado: "RN",
      nomeCidade: "Natal",
      latitude: 5.78, // Usando number aqui para testar o parse
      longitude: -35.20,
    };

    const res = await request(app).post("/sugerir").send(minimumPayload);

    expect(res.status).toBe(201);
    const insertCall = supabase.__mockQueryBuilder.insert.mock.calls[0][0][0];
    
    // 4. Verificar se os campos opcionais são convertidos para JSON string de array vazio
    expect(insertCall.comoChegar).toBe("[]");
    expect(insertCall.atividades).toBe("[]");
    expect(insertCall.imagemCapa).toBe(null);
  });

  test("Deve retornar 400 se Estado estiver faltando", async () => {
    const res = await request(app)
      .post("/sugerir")
      .send({ ...basePayload, estado: undefined });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Estado e cidade são obrigatórios.");
    expect(supabase.from).not.toHaveBeenCalled();
  });

  test("Deve retornar 400 se Latitude estiver faltando", async () => {
    const res = await request(app)
      .post("/sugerir")
      .send({ ...basePayload, latitude: undefined });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Latitude e longitude são obrigatórias.");
    expect(supabase.from).not.toHaveBeenCalled();
  });

  test("Deve retornar 400 se Supabase retornar erro de inserção", async () => {
    const supabaseError = { message: "Violacao de chave" };
    
    supabase.__mockQueryBuilder.then.mockResolvedValueOnce({
      error: supabaseError,
    });

    const res = await request(app).post("/sugerir").send(basePayload);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Erro ao enviar sugestão");
  });

  test("Deve retornar 500 em erro interno inesperado", async () => {
    // Simula um erro na execução do código (ex: JSON.stringify falha)
    supabase.__mockQueryBuilder.insert.mockImplementation(() => {
      throw new Error("Falha total do sistema de inserção");
    });

    const res = await request(app).post("/sugerir").send(basePayload);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Erro interno no servidor");
  });
});