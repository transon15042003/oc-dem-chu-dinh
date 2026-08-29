import { createClient } from "@supabase/supabase-js";

import { getSupabaseServiceConfig } from "@/lib/env-server";

export function createAdminClient() {
  const config = getSupabaseServiceConfig();

  if (!config) {
    throw new Error("Supabase service role is not configured");
  }

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
