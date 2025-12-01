// middlewares/authMiddleware.js
const supabase = require("../database/supabaseClient");

module.exports = async function (req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }

  req.user = user;

  next();
};
