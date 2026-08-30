/**
 * Migrate static assets from the original CDN into Supabase Storage (`site-assets`).
 *
 * Usage:
 *   node scripts/migrate-site-images.mjs
 */

import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadAssetKeyMap, slugifyStoragePath } from "./asset-key-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const manifestPath = join(__dirname, "site-asset-manifest.txt");
const SOURCE_CDN = "https://ocdemchudinh.hgdigital.vn";
const BUCKET = "site-assets";

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    env[trimmed.slice(0, index).trim()] = trimmed.slice(index + 1).trim();
  }
  return env;
}

const env = { ...loadEnvFile(join(root, ".env.local")), ...process.env };
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = { url: supabaseUrl, key: serviceRoleKey };

async function uploadAsset(storageKey, buffer, contentType) {
  const encodedKey = storageKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  const response = await fetch(`${supabase.url}/storage/v1/object/${BUCKET}/${encodedKey}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${supabase.key}`,
      "Content-Type": contentType,
      "x-upsert": "true",
    },
    body: buffer,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Upload failed for ${storageKey}: ${response.status} ${message}`);
  }
}

const mapPath = join(__dirname, "asset-key-map.json");
const assetKeyMap = loadAssetKeyMap();

const paths = readFileSync(manifestPath, "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

function guessContentType(path) {
  if (path.endsWith(".webp")) return "image/webp";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".mp4")) return "video/mp4";
  return "application/octet-stream";
}

async function migratePath(relativePath) {
  const sourceUrl = `${SOURCE_CDN}/${relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
  const response = await fetch(sourceUrl);

  if (!response.ok) {
    throw new Error(`Download failed ${response.status}: ${sourceUrl}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  let storageKey = relativePath;

  try {
    await uploadAsset(storageKey, buffer, guessContentType(relativePath));
  } catch (error) {
    const slugKey = slugifyStoragePath(relativePath);
    if (slugKey === storageKey) {
      throw error;
    }
    await uploadAsset(slugKey, buffer, guessContentType(relativePath));
    assetKeyMap[relativePath] = slugKey;
    storageKey = slugKey;
  }

  if (!assetKeyMap[relativePath]) {
    assetKeyMap[relativePath] = storageKey;
  }
}

let success = 0;
let failed = 0;

for (const path of paths) {
  try {
    process.stdout.write(`Migrating ${path}... `);
    await migratePath(path);
    success += 1;
    console.log("ok");
  } catch (error) {
    failed += 1;
    console.log("failed");
    console.error(`  ${error instanceof Error ? error.message : error}`);
  }
}

console.log(`\nDone. Success: ${success}, Failed: ${failed}, Total: ${paths.length}`);
writeFileSync(mapPath, `${JSON.stringify(assetKeyMap, null, 2)}\n`, "utf8");
console.log(`Saved asset key map: ${mapPath}`);
if (failed > 0) {
  process.exit(1);
}

console.log("\nNext step: set NEXT_PUBLIC_USE_SUPABASE_ASSETS=true in Vercel + .env.local");
