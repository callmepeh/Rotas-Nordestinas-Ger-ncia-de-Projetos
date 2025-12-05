// tests/mocks/supabaseClient.js

// Criamos um objeto de Query Builder que aceita encadeamento
const mockQueryBuilder = {
  insert: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis(),

  // o .then precisa ser mockado como função, mas também compatível com mockResolvedValueOnce
  then: jest.fn()
};

// Agora convertemos o .then em mockResolvedValueOnce e mockRejectedValueOnce
// igual ao comportamento nativo de uma Promise mockada
mockQueryBuilder.then.mockResolvedValueOnce = (value) => {
  mockQueryBuilder.then.mockImplementationOnce((resolve) =>
    resolve(value)
  );
};

mockQueryBuilder.then.mockRejectedValueOnce = (err) => {
  mockQueryBuilder.then.mockImplementationOnce((_, reject) =>
    reject(err)
  );
};

const supabase = {
  auth: {
    signUp: jest.fn(),
    signInWithPassword: jest.fn()
  },

  from: jest.fn(() => mockQueryBuilder),

  // Exposto para os testes manipularem
  __mockQueryBuilder: mockQueryBuilder
};

module.exports = supabase;
