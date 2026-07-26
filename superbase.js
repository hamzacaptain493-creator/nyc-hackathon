const SUPABASE_URL = "https://llciaqgktbghojlpjatp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsY2lhcWdrdGJnaG9qbHBqYXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNDEzMzQsImV4cCI6MjEwMDYxNzMzNH0.Iw_wNogSOFylDSFmUAiKAEkNJR4pW2zwc_nsiEgxRZg";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

console.log("Connected to Supabase");