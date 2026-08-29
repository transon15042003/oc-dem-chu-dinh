import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { publicEnv } from "@/lib/env";

let browserClient: SupabaseClient | undefined;

/** Singleton — tránh tạo client mới mỗi lần click đăng xuất / đăng nhập. */
export function createClient() {
  if (!browserClient) {
    browserClient = createBrowserClient(
      publicEnv.supabaseUrl,
      publicEnv.supabaseAnonKey,
    );
  }

  return browserClient;
}
