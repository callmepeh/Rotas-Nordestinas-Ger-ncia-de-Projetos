fetch("https://xvackostttzckrxsulgv.supabase.co/auth/v1/health")
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
