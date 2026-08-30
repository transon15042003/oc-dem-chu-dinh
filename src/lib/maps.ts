import type { BranchMapKey } from "@/data/branches";
import { publicEnv } from "@/lib/env";

const branchMapQueries: Record<BranchMapKey, string> = {
  cn1: "Ốc Đêm Chú Đỉnh, 202 Đường Số 8, P.11, Gò Vấp, TP.HCM",
  cn2: "Ốc Đêm Chú Đỉnh 2, 48 Phan Huy Ích, P.15, Tân Bình, TP.HCM",
  cn3: "Ốc Đêm Chú Đỉnh, 158 Man Thiện, Tăng Nhơn Phú, Thủ Đức, TP.HCM",
  cn4: "Ốc Đêm Chú Đỉnh",
  cn5: "Ốc Đêm Chú Đỉnh, 583 Lê Văn Lương, Tân Hưng, Quận 7, TP.HCM",
};

export function getBranchMapQuery(mapKey: BranchMapKey, address?: string): string {
  return branchMapQueries[mapKey] || address || "";
}

export function buildMapDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function buildMapEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=vi&z=16&output=embed`;
}

export function resolveMapDirectionsUrl(
  mapKey: BranchMapKey,
  address?: string,
): string {
  const configured = publicEnv.mapUrls[mapKey];
  if (configured) {
    return configured;
  }

  const query = getBranchMapQuery(mapKey, address);
  return query ? buildMapDirectionsUrl(query) : "";
}

export function resolveMapEmbedUrl(mapKey: BranchMapKey, address?: string): string {
  const configured = publicEnv.mapEmbeds[mapKey];
  if (configured) {
    return configured;
  }

  const query = getBranchMapQuery(mapKey, address);
  return query ? buildMapEmbedUrl(query) : "";
}
