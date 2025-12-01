const supabase = require("../database/supabaseClient.js");

// GET /usuarios/:id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: user, error } = await supabase
      .from("Users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      // Se o usuário não for encontrado, o Supabase retorna um erro. Queremos enviar um 404.
      if (error.code === 'PGRST116') {
          return res.status(404).json({ error: "Usuário não encontrado." });
      }
      return res.status(400).json({ error: error.message });
    }

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

// POST /usuarios
exports.createUser = async (req, res) => {
  try {
    const { id, nome, email } = req.body;

    if (!id || !nome || !email) {
      return res.status(400).json({ error: "ID, nome e email são obrigatórios." });
    }

    const { data, error } = await supabase
      .from("Users")
      .insert([{ id, nome, email, role: "user" }])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};