

const supabase = window.supabase.createClient(


  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

console.log("Connected to Supabase");