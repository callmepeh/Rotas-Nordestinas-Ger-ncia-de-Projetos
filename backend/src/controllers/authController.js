// controllers/authController.js
const { supabase } = require("../database/supabaseClient.js");

// POST /auth/register
exports.register = async (req, res) => {
  try {
    const { email, senha, nomeCompleto, profissao, telefone, cpf, nomeCidade, siglaEstado } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    const userId = authData.user.id;

    // 2. Criar registro na tabela Usuários com o mesmo ID
    const { error: insertError } = await supabase
      .from("Users")
      .insert([
        {
          id: userId,
          email,
          nomeCompleto,
          telefone,
          profissao,
          cpf: cpf,
          nomeCidade,
          siglaEstado
        }
      ]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!"
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

// POST /auth/login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    });

    if (loginError) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const userId = loginData.user.id;

    // Buscar informações completas
    const { data: userProfile, error: profileError } = await supabase
      .from("Users")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    return res.json({
      message: "Login realizado com sucesso.",
      token: loginData.session.access_token,
      user: {
        ...userProfile
      }
    });

  } catch (err) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

// GET /auth/me
exports.me = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await authService.getUserProfile(userId);

    return res.json({
      message: "Dados do usuário logado.",
      user: profile
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar informações do usuário." });
  }
};