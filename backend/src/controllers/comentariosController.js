const supabase = require("../database/supabaseClient");

// Adicionar comentário
exports.adicionar = async (req, res) => {
  try {
    const { userId, cidadeId, mensagem } = req.body;

    const { data, error } = await supabase
      .from("Comentarios")
      .insert([
        {
          userId: userId,
          cidadeId: cidadeId,
          mensagem,
        },
      ])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    return res.json(data[0]);
  } catch (err) {
    console.error("Erro ao adicionar comentário:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

// Listar comentários por cidade
exports.listarPorCidade = async (req, res) => {
  try {
    const { cidadeId } = req.params;

    const { data, error } = await supabase
      .from("Comentarios")
      .select("*")
      .eq("cidadeId", cidadeId)
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    console.error("Erro ao listar comentários:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

// EDITAR comentário
exports.editar = async (req, res) => {
  try {
    const { id } = req.params;
    const { mensagem } = req.body;

    const { data, error } = await supabase
      .from("Comentarios")
      .update({ mensagem })
      .eq("id", id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0)
      return res.status(404).json({ error: "Comentário não encontrado." });

    return res.json(data[0]);
  } catch (err) {
    console.error("Erro ao editar comentário:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

// DELETAR comentário
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("Comentarios")
      .delete()
      .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: "Comentário removido com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar comentário:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
