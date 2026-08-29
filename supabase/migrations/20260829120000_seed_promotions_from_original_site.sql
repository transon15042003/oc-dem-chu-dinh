-- Seed 4 chương trình khuyến mãi từ site gốc ocdemchudinh.hgdigital.vn/khuyen-mai
-- Idempotent: bỏ qua nếu slug đã tồn tại

INSERT INTO public.promotions (
  title,
  slug,
  excerpt,
  body,
  cover_image_url,
  status,
  published_at,
  starts_at,
  ends_at,
  discount_label,
  promo_code,
  author_id
)
SELECT
  v.title,
  v.slug,
  v.excerpt,
  v.body,
  v.cover_image_url,
  'published'::public.publication_status,
  v.published_at,
  v.starts_at,
  v.ends_at,
  v.discount_label,
  NULL,
  (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1)
FROM (
  VALUES
  (
    'GIẢM 20% TỔNG HÓA ĐƠN ĐẶT TIỆC KHAI TRƯƠNG',
    'giam-20-tong-hoa-don-dat-tiec-khai-truong',
    'Áp dụng cho tất cả bàn ăn tại chi nhánh 3 Man Thiện Thủ Đức. Giảm trực tiếp 20% trên tổng bill thức ăn cho bàn đặt trước qua hotline hoặc website.',
    $body1$
<p>Áp dụng cho tất cả bàn ăn tại <strong>chi nhánh 3 Man Thiện, Thủ Đức</strong>. Giảm trực tiếp 20% trên tổng bill thức ăn cho bàn đặt trước qua hotline hoặc website.</p>
<h2>Chi tiết ưu đãi</h2>
<ul>
<li>Giảm trực tiếp <strong>20%</strong> trên tổng hóa đơn thức ăn.</li>
<li>Áp dụng tại chi nhánh 3 Man Thiện Thủ Đức từ 15h00 - 03h00 sáng.</li>
<li>Áp dụng tự động cho bàn đặt trước qua website hoặc hotline.</li>
</ul>
<p>Thời hạn áp dụng đến <strong>30/09/2026</strong>. Liên hệ hotline <strong>0938.186.391</strong> để đặt bàn ngay.</p>
$body1$,
    'https://ocdemchudinh.hgdigital.vn/storage/mon-an/a%20(18).jpg',
    '2026-08-20T03:00:00+00'::timestamptz,
    '2026-08-01T08:00:00+00'::timestamptz,
    '2026-09-30T16:59:59+00'::timestamptz,
    'Giảm 20%'
  ),
  (
    'TẶNG GÓI TRANG TRÍ TIỆC SINH NHẬT BONG BÓNG 1.500.000Đ (0Đ)',
    'tang-goi-trang-tri-tiec-sinh-nhat-bong-bong-0d',
    'Miễn phí hoàn toàn gói trang trí bong bóng nghệ thuật tiệc sinh nhật + Tặng 01 bánh sinh nhật cao cấp cho bàn tiệc từ 8 khách trở lên.',
    $body2$
<p>Miễn phí hoàn toàn gói trang trí bong bóng nghệ thuật tiệc sinh nhật + tặng 01 bánh sinh nhật cao cấp cho bàn tiệc từ 8 khách trở lên.</p>
<h2>Chi tiết ưu đãi sinh nhật</h2>
<ul>
<li>Miễn phí 100% trang trí bong bóng theo tone màu yêu cầu.</li>
<li>Tặng bánh sinh nhật nến lung linh cho bàn tiệc từ 8 người.</li>
<li>Cần đặt bàn trước tối thiểu 6 tiếng để chuẩn bị không gian chu đáo.</li>
</ul>
<p>Chương trình áp dụng liên tục tại toàn hệ thống Ốc Đêm Chú Đỉnh. Đặt bàn qua hotline <strong>0938.186.391</strong>.</p>
$body2$,
    'https://ocdemchudinh.hgdigital.vn/storage/mon-an/a%20(20).jpg',
    '2026-08-20T03:00:00+00'::timestamptz,
    '2026-01-01T00:00:00+00'::timestamptz,
    '2027-12-31T16:59:59+00'::timestamptz,
    'Tặng trang trí 0đ'
  ),
  (
    'TẶNG 01 THÁP BIA TƯƠI ƯỚP LẠNH CHO ĐOÀN TỪ 6 KHÁCH',
    'tang-01-thap-bia-tuoi-uop-lanh-cho-doan-tu-6-khach',
    'Uống thỏa thích cùng nhóm bạn đêm tiệc! Tặng ngay 01 tháp bia tươi ướp lạnh siêu to khổng lồ khi gọi từ 4 món ốc nướng sốt trứng muối bất kỳ.',
    $body3$
<p>Uống thỏa thích cùng nhóm bạn đêm tiệc! Tặng ngay 01 tháp bia tươi ướp lạnh siêu to khổng lồ khi gọi từ 4 món ốc nướng sốt trứng muối bất kỳ.</p>
<h2>Chi tiết chương trình</h2>
<ul>
<li>Áp dụng cho nhóm khách từ 6 người trở lên.</li>
<li>Tặng 01 tháp bia tươi 3 lít mát lạnh.</li>
<li>Không áp dụng đồng thời cùng chương trình giảm % hóa đơn khác.</li>
</ul>
<p>Thời hạn áp dụng đến <strong>30/09/2026</strong>. Đặt bàn ngay qua hotline <strong>0938.186.391</strong>.</p>
$body3$,
    'https://ocdemchudinh.hgdigital.vn/storage/mon-an/a%20(5).jpg',
    '2026-08-20T03:00:00+00'::timestamptz,
    '2026-08-01T08:00:00+00'::timestamptz,
    '2026-09-30T16:59:59+00'::timestamptz,
    'Tặng tháp bia'
  ),
  (
    'TIẾT KIỆM 25% KHI ĐẶT SET COMBO HẢI SẢN & LẨU ĐÊM',
    'tiet-kiem-25-khi-dat-set-combo-hai-san-lau-dem',
    'Thưởng thức trọn bộ các món ốc hương nướng sốt trứng muối, hàu né phô mai & lẩu hải sản nêm nếm đậm đà với giá ưu đãi tiết kiệm tới 25%.',
    $body4$
<p>Thưởng thức trọn bộ các món ốc hương nướng sốt trứng muối, hàu né phô mai &amp; lẩu hải sản nêm nếm đậm đà với giá ưu đãi tiết kiệm tới 25%.</p>
<h2>Chi tiết combo tiết kiệm</h2>
<ul>
<li>Áp dụng khi chọn các set combo tiệc Ốc Đêm Chú Đỉnh.</li>
<li>Đã bao gồm suất lẩu lớn + 3 món ốc nướng ăn kèm.</li>
<li>Phục vụ tại cả 3 chi nhánh Gò Vấp, Tân Bình &amp; Thủ Đức.</li>
</ul>
<p>Chương trình áp dụng liên tục. Liên hệ hotline <strong>0938.186.391</strong> để đặt combo.</p>
$body4$,
    'https://ocdemchudinh.hgdigital.vn/storage/mon-an/a%20(1).jpg',
    '2026-08-20T03:00:00+00'::timestamptz,
    '2026-01-01T00:00:00+00'::timestamptz,
    '2027-12-31T16:59:59+00'::timestamptz,
    'Giảm 25%'
  )
) AS v(title, slug, excerpt, body, cover_image_url, published_at, starts_at, ends_at, discount_label)
WHERE NOT EXISTS (
  SELECT 1 FROM public.promotions p WHERE p.slug = v.slug
);
