const supabase = require("../database/supabaseClient.js");

exports.buscarPorNome = async (req, res) => {
  try {
    const nome = req.query.nome;

    const { data, error } = await supabase
      .from("Cidades")
      .select("*")
      .ilike("nomeCidade", `%${nome}%`);

    if (error) return res.status(400).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    console.error("Erro ao buscar por nome:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

exports.listarPorEstado = async (req, res) => {
  try {
    const { estadoID } = req.params;

    const { data, error } = await supabase
      .from("Cidades")
      .select("*")
      .eq("estadoID", estadoID);

    if (error) return res.status(500).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    console.error("Erro ao listar por estado:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Cidades")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: "Cidade não encontrada." });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao buscar cidade por ID:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
