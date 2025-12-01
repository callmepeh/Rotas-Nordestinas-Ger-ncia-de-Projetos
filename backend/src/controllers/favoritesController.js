const supabase = require("../database/supabaseClient.js");

exports.adicionarFavorito = async (req, res) => {
  try {
    const { userID, cidadeID } = req.body;
    console.log("ADICIONAR FAVORITO: Recebido", { userID, cidadeID });

    if (!userID || !cidadeID) {
      console.error("ADICIONAR FAVORITO: Erro - userID ou cidadeID ausente.");
      return res.status(400).json({ error: "userID e cidadeID são obrigatórios." });
    }

    console.log("ADICIONAR FAVORITO: Tentando inserir no banco de dados...");
    const { data, error } = await supabase
      .from("Favoritos")
      .insert([{ userID, cidadeID }])
      .select();

    if (error) {
      console.error("ADICIONAR FAVORITO: Erro retornado pelo Supabase:", error);
      return res.status(400).json({ 
        message: "Erro do Supabase ao inserir", 
        error: error.message, 
        details: error.details,
        code: error.code
      });
    }

    console.log("ADICIONAR FAVORITO: Inserido com sucesso:", data);
    return res.json({ message: "Favorito adicionado", data });

  } catch (err) {
    console.error("ADICIONAR FAVORITO: Erro de catch no servidor:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

exports.removerFavorito = async (req, res) => {
  try {
    const { userID, cidadeID } = req.body;

    if (!userID || !cidadeID) {
      return res.status(400).json({ error: "userID e cidadeID são obrigatórios." });
    }

    const { error } = await supabase
      .from("Favoritos")
      .delete()
      .eq("userID", userID)
      .eq("cidadeID", cidadeID);

    if (error) {
      console.error("Erro Supabase ao remover:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: "Favorito removido" });
  } catch (err) {
    console.error("Erro interno ao remover favorito:", err);
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