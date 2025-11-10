const express = require('express');
const supabase = require('../database/supabaseClient.js');

const router = express.Router();

router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("Cidades")              // nome da tabela
        .select("*")
        .order("nomeCidade", { ascending: true });  // coluna certa

    if (error) {
        console.error("ERRO SUPABASE:", error);
        return res.status(500).json({ error: "Erro ao buscar cidades" });
    }

    return res.status(200).json(data);
});



module.exports = router;
