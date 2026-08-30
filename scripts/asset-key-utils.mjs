import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mapPath = join(__dirname, "asset-key-map.json");

export function loadAssetKeyMap() {
  if (!existsSync(mapPath)) {
    return {};
  }

  return JSON.parse(readFileSync(mapPath, "utf8"));
}

export function saveAssetKeyMap(map) {
  writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`, "utf8");
}

export function slugifyStoragePath(relativePath) {
  return relativePath
    .split("/")
    .map((segment) =>
      segment
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase(),
    )
    .join("/");
}
