// Truy cập tĩnh từng NEXT_PUBLIC_* — Next.js chỉ inline env vào client bundle
// khi dùng process.env.NEXT_PUBLIC_XXX trực tiếp (không process.env[key]).
function trim(value: string | undefined): string {
  return value?.trim() ?? "";
}

export const publicEnv = {
  hotline: trim(process.env.NEXT_PUBLIC_HOTLINE),
  email: trim(process.env.NEXT_PUBLIC_EMAIL),
  zaloUrl: trim(process.env.NEXT_PUBLIC_ZALO_URL),
  messengerUrl: trim(process.env.NEXT_PUBLIC_MESSENGER_URL),
  facebookUrl: trim(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  tiktokUrl: trim(process.env.NEXT_PUBLIC_TIKTOK_URL),
  mapUrls: {
    cn1: trim(process.env.NEXT_PUBLIC_MAP_CN1_URL),
    cn2: trim(process.env.NEXT_PUBLIC_MAP_CN2_URL),
    cn3: trim(process.env.NEXT_PUBLIC_MAP_CN3_URL),
    cn4: trim(process.env.NEXT_PUBLIC_MAP_CN4_URL),
    cn5: trim(process.env.NEXT_PUBLIC_MAP_CN5_URL),
  },
  mapEmbeds: {
    cn1: trim(process.env.NEXT_PUBLIC_MAP_EMBED_CN1),
    cn2: trim(process.env.NEXT_PUBLIC_MAP_EMBED_CN2),
    cn3: trim(process.env.NEXT_PUBLIC_MAP_EMBED_CN3),
    cn4: trim(process.env.NEXT_PUBLIC_MAP_EMBED_CN4),
    cn5: trim(process.env.NEXT_PUBLIC_MAP_EMBED_CN5),
  },
  supabaseUrl: trim(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: trim(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
} as const;

export function formatHotline(hotline: string): string {
  const digits = hotline.replace(/\D/g, "");

  if (digits.length === 10) {
    return `${digits.slice(0, 4)}.${digits.slice(4, 7)}.${digits.slice(7)}`;
  }

  return hotline;
}

export function hotlineHref(hotline: string): string {
  const digits = hotline.replace(/\D/g, "");
  return digits ? `tel:${digits}` : "#";
}
