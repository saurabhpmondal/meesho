window.MAP = window.MAP || {};

window.MAP.supabase = supabase.createClient(
    window.MAP.config.supabaseUrl,
    window.MAP.config.supabaseAnonKey
);

console.log("Supabase Initialized");
