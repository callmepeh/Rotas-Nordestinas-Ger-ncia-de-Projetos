const supabase = require("./supabaseClient");

// Apenas retorna o mesmo mock já existente
module.exports = jest.fn(() => supabase);
