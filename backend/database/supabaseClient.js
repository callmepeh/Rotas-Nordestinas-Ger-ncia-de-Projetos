const supabaseJs = require("@supabase/supabase-js");

const supabase = supabaseJs.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;
