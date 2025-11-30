const supabase = require("../database/supabaseClient.js");

exports.adicionarFavorito = async (req, res) => {
  try {
    const { userID, cidadeId } = req.body;

    const { data, error } = await supabase
      .from("Favoritos")
      .insert([{ userID, cidadeId }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: "Favorito adicionado", data });
  } catch (err) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

exports.removerFavorito = async (req, res) => {
  try {
    const { userID, cidadeId } = req.body;

    const { error } = await supabase
      .from("Favoritos")
      .delete()
      .eq("userID", userID)
      .eq("cidadeId", cidadeId);

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: "Favorito removido" });
  } catch (err) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

exports.listarFavoritos = async (req, res) => {
  try {
    const { userID } = req.params;

    const { data, error } = await supabase
      .from("Favoritos")
      .select("cidadeID")
      .eq("userID", userID);

    if (error) return res.status(400).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
