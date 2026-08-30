import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const SUPABASE_URL = "https://ianpabkxuzjnksrgsvtr.supabase.co";

describe("buildMenuImageUrls", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_USE_SUPABASE_ASSETS", "true");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses jpg for mon-an dishes without migrated webp thumbs", async () => {
    const { buildMenuImageUrls } = await import("@/lib/menu/types");
    const urls = buildMenuImageUrls("storage/mon-an/a (12).jpg");

    expect(urls.image).toBe(
      `${SUPABASE_URL}/storage/v1/object/public/site-assets/storage/mon-an/a%20(12).jpg`,
    );
    expect(urls.fullImage).toBe(urls.image);
  });

  it("uses webp thumb for featured CN3 dishes that have migrated variants", async () => {
    const { buildMenuImageUrls } = await import("@/lib/menu/types");
    const urls = buildMenuImageUrls("storage/anh-video/CN3 - Thủ Đức - Món ăn1.jpg");

    expect(urls.image).toBe(
      `${SUPABASE_URL}/storage/v1/object/public/site-assets/storage/anh-video/cn3-thu-uc-mon-an1_400-400.webp`,
    );
    expect(urls.fullImage).toBe(
      `${SUPABASE_URL}/storage/v1/object/public/site-assets/storage/anh-video/cn3-thu-uc-mon-an1.jpg`,
    );
  });
});
