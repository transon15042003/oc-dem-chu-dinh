import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const SUPABASE_URL = "https://ianpabkxuzjnksrgsvtr.supabase.co";

describe("cdnImage", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_USE_SUPABASE_ASSETS", "true");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("maps percent-encoded branch paths to slugified Supabase keys", async () => {
    const { cdnImage } = await import("@/lib/images");

    expect(cdnImage("storage/anh-video/CN1%20-%20gò%20vấp1_600-600.webp")).toBe(
      `${SUPABASE_URL}/storage/v1/object/public/site-assets/storage/anh-video/cn1-go-vap1_600-600.webp`,
    );
  });

  it("encodes spaces once for unmapped dish photos", async () => {
    const { cdnImage } = await import("@/lib/images");

    expect(cdnImage("storage/mon-an/a (13).jpg")).toBe(
      `${SUPABASE_URL}/storage/v1/object/public/site-assets/storage/mon-an/a%20(13).jpg`,
    );
  });

  it("decodes pre-encoded dish paths before building the Supabase URL", async () => {
    const { cdnImage } = await import("@/lib/images");

    expect(cdnImage("storage/mon-an/a%20(19).jpg")).toBe(
      `${SUPABASE_URL}/storage/v1/object/public/site-assets/storage/mon-an/a%20(19).jpg`,
    );
  });
});
