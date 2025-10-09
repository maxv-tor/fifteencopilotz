import "server-only";
import { createClient } from "@supabase/supabase-js";

export type SupabaseServerClient = ReturnType<typeof createServerClient>;

export function createServerClient(): SupabaseServerClient {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) is not set.");
  }

  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set. Add it to your .env file.");
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "X-Client-Info": "15copilotz-server",
      },
    },
  });
}
