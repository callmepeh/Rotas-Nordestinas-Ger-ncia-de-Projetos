// backend/src/services/authService.js
const { supabase } = require("../database/supabaseClient.js");

// Função auxiliar para facilitar o erro
const throwError = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

// 1. REGISTRO (Backend)
exports.registerUser = async ({ email, senha, nomeCompleto }) => {
  // A. Cria o login no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: senha
  });

  if (authError) throwError(authError.message);

  const userId = authData.user.id;

  // B. Insere na tabela Users (com função 'usuario' padrão)
  const { error: insertError } = await supabase
    .from("Users") // Certifique-se que o nome da tabela no Supabase é "Users" mesmo
    .insert([
      {
        id: userId,
        email,
        nomeCompleto,
        função: 'usuario', 
        created_at: new Date()
      }
    ]);

  if (insertError) throwError(insertError.message);

  return { userId, message: "Usuário cadastrado com sucesso!" };
};

// 2. LOGIN (Backend)
exports.loginUser = async ({ email, senha }) => {
  // A. Verifica senha no Supabase
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if (loginError) throwError("Credenciais inválidas.", 401);

  const userId = loginData.user.id;

  // B. Busca dados do usuário na tabela
  const { data: userProfile, error: profileError } = await supabase
    .from("Users")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) throwError("Perfil não encontrado.");

  // Retorna Token + Dados do Usuário
  return {
    token: loginData.session.access_token,
    user: userProfile
  };
};

// 3. VIRAR COLABORADOR (Backend)
exports.updateUserProfile = async (userId, updates) => {
  // Atualiza os dados e força a mudança de cargo
  const { data, error } = await supabase
    .from("Users")
    .update({
      ...updates,           // cpf, telefone, profissao, etc.
      função: 'colaborador' // REGRA DE NEGÓCIO: Virou colaborador!
    })
    .eq("id", userId)
    .select();

  if (error) throwError(error.message);

  return { user: data };
};

// 4. BUSCAR PERFIL (Backend)
exports.getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throwError("Erro ao buscar perfil.");

  return data;
};