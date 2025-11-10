// services/authService.js
const { supabase } = require("../database/supabaseClient.js");

exports.getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
