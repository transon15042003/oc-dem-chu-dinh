import { createClient } from "@supabase/supabase-js";

import { publicEnv } from "@/lib/env";

/** Cookie-less client for cached public reads (articles, promotions). */
export function createPublicClient() {
  return createClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey);
}
