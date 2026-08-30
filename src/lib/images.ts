import assetKeyMapJson from "../../scripts/asset-key-map.json";
import { publicEnv } from "@/lib/env";

export const imageCdn = "https://ocdemchudinh.hgdigital.vn";

export const SITE_ASSETS_BUCKET = "site-assets" as const;

export const siteLogo = {
  src: "/images/logo.png",
  alt: "Ốc Đêm Chú Đỉnh",
  width: 160,
  height: 55,
} as const;

const assetKeyMap = assetKeyMapJson as Record<string, string>;

const useSupabaseAssets = process.env.NEXT_PUBLIC_USE_SUPABASE_ASSETS === "true";

function toEncodedPath(relativePath: string): string {
  return relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function decodeAssetPath(path: string): string {
  const normalized = path.replace(/^\//, "");

  try {
    // Data files may pass percent-encoded paths (e.g. CN1%20-%20gò%20vấp).
    // Decode once so asset-key-map lookups match and we avoid double-encoding.
    return decodeURIComponent(normalized);
  } catch {
    return normalized;
  }
}

function resolveStoragePath(path: string): string {
  const decoded = decodeAssetPath(path);
  return assetKeyMap[decoded] ?? decoded;
}

function supabasePublicAssetUrl(path: string): string | null {
  const base = publicEnv.supabaseUrl;
  if (!base) {
    return null;
  }

  const storagePath = resolveStoragePath(path);
  return `${base}/storage/v1/object/public/${SITE_ASSETS_BUCKET}/${toEncodedPath(storagePath)}`;
}

export function cdnImage(path: string): string {
  const normalized = path.replace(/^\//, "");

  if (useSupabaseAssets) {
    const supabaseUrl = supabasePublicAssetUrl(normalized);
    if (supabaseUrl) {
      return supabaseUrl;
    }
  }

  return `${imageCdn}/${normalized}`;
}

export function assetImage(path: string): string {
  const normalized = path.replace(/^\//, "");
  return supabasePublicAssetUrl(normalized) ?? `/${normalized}`;
}
