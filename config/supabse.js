import { createClient } from "@supabase/supabase-js";

export const supbase=createClient(
    process.env.SUPABSE_URL,
    process.env.SUPABASE_KEY
)