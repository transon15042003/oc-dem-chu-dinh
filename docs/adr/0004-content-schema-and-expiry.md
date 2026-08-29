# Schema Article/Promotion và hành vi hết hạn khuyến mãi

**Article** có `status`: `draft` (chỉ admin/editor thấy) hoặc `published` (public + sitemap). `published_at` set khi publish; draft không index (`noindex`).

**Promotion** thêm `starts_at`, `ends_at`, `discount_label`, `promo_code` (mã hiển thị cho khách — không validate thanh toán online v2). Promotion **hết hạn** (`ends_at < now()`) **auto-hide** khỏi list và detail public; bản ghi vẫn trong DB để admin xem lịch sử. Query public: `status = published` AND `starts_at <= now()` AND `ends_at > now()`.

**Considered options:** (1) Archive page "đã hết hạn" — từ chối v2.0 để tránh UX rối. (2) Hard delete khi hết hạn — từ chối vì mất lịch sử marketing. (3) Promotion không có `promo_code` — từ chối; chủ quán cần mã in trên web/ảnh.

**Ngày chốt:** 2026-08-29 (phiên `/grill-with-docs`)
