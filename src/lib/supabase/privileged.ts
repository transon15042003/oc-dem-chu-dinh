import { createAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServiceConfig } from "@/lib/env-server";
import { createClient } from "@/lib/supabase/server";

/**
 * Server-side client for admin reads/writes after auth checks.
 * Prefers service role (bypasses RLS); falls back to the user session client.
 */
export async function createPrivilegedClient() {
  if (getSupabaseServiceConfig()) {
    return createAdminClient();
  }

  return createClient();
}
