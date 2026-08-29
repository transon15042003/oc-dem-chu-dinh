-- Seed 6 bài tin tức từ site gốc ocdemchudinh.hgdigital.vn/tin-tuc
-- Idempotent: bỏ qua nếu slug đã tồn tại

INSERT INTO public.articles (
  title,
  slug,
  excerpt,
  body,
  cover_image_url,
  status,
  published_at,
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
  (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1)
FROM (
  VALUES
  (
    'Bùng Nổ Tiệc Sinh Nhật Đêm – Giảm Ngay 20% Cho Bàn Từ 6 Người Tại Ốc Đêm Chú Đỉnh',
    'bung-no-tiec-sinh-nhat-dem-giam-20-phan-tram',
    'Nhân dịp tri ân thực khách, Ốc Đêm Chú Đỉnh dành tặng ưu đãi giảm 20% tổng hóa đơn thức ăn & hỗ trợ gói trang trí tiệc sinh nhật hoàn toàn miễn phí cho thực khách đặt bàn trước.',
    $body1$
<p>Nhân dịp tri ân thực khách, <strong>Ốc Đêm Chú Đỉnh</strong> dành tặng ưu đãi giảm 20% tổng hóa đơn thức ăn &amp; hỗ trợ gói trang trí tiệc sinh nhật hoàn toàn miễn phí cho thực khách đặt bàn trước.</p>
<p>Bạn đang tìm kiếm không gian đặt tiệc sinh nhật xuyên đêm thoáng mát, vừa nhấm nháp ốc nướng nóng hổi vừa cụng ly cùng bè bạn?</p>
<h2>Chương trình ưu đãi sinh nhật áp dụng tại toàn hệ thống</h2>
<ul>
<li>Giảm ngay <strong>20%</strong> trên tổng hóa đơn món ăn cho bàn tiệc từ 6 thực khách trở lên.</li>
<li>Miễn phí gói trang trí sinh nhật bong bóng &amp; banner chúc mừng sang trọng.</li>
<li>Tặng 01 tháp bia tươi Tiger 3L hoặc 01 dĩa ốc hương sốt trứng muối đặc biệt cho nhóm từ 10 người.</li>
</ul>
<p>Hệ thống Ốc Đêm Chú Đỉnh với sức chứa lớn tại 3 chi nhánh Gò Vấp, Tân Bình &amp; Thủ Đức sẵn sàng phục vụ thực khách đến 03h00 sáng mỗi ngày.</p>
<p>Liên hệ hotline <strong>0938.186.391</strong> hoặc đặt bàn trực tuyến để chọn trước vị trí ngồi đẹp nhất.</p>
$body1$,
    'https://ocdemchudinh.hgdigital.vn/storage/khong-gian/b%20(1).jpg',
    '2026-08-20T03:00:00+00'::timestamptz
  ),
  (
    'Khám Phá Sức Hút Của Ốc Hương Sốt Trứng Muối Hoàng Kim Độc Quyền Tại Chú Đỉnh',
    'kham-pha-suc-hut-oc-huong-sot-trung-muoi-hoang-kim',
    'Vị béo ngậy quánh mịn của trứng muối tươi kết hợp cùng ốc hương giòn ngọt tạo nên món ăn trứ danh gây thương nhớ cho hàng nghìn thực khách Sài Gòn mỗi đêm.',
    $body2$
<p>Vị béo ngậy quánh mịn của trứng muối tươi kết hợp cùng ốc hương giòn ngọt tạo nên món ăn trứ danh gây thương nhớ cho hàng nghìn thực khách Sài Gòn mỗi đêm.</p>
<p>Ốc hương sốt trứng muối hoàng kim từ lâu đã trở thành món ăn quốc dân không thể thiếu trên bàn tiệc của các tín đồ nghiện ốc tại Sài Gòn.</p>
<h2>Bí quyết tạo nên vị ngon khó cưỡng tại Ốc Đêm Chú Đỉnh</h2>
<ol>
<li><strong>Ốc hương tươi sống trong ngày:</strong> Được tuyển chọn từng con mập mạp, thịt giòn ngọt tự nhiên.</li>
<li><strong>Nước sốt trứng muối độc quyền:</strong> Sử dụng trứng muối tươi hấp bơ lạt, dầm mịn quánh đặc sánh không dùng phẩm màu.</li>
<li><strong>Chấm bánh mì giòn rụm:</strong> Nước sốt béo thơm vị bơ tỏi hòa quyện trứng muối làm nức lòng thực khách.</li>
</ol>
<p>Đặt bàn ngay để thưởng thức món signature này tại hệ thống Ốc Đêm Chú Đỉnh — hotline <strong>0938.186.391</strong>.</p>
$body2$,
    'https://ocdemchudinh.hgdigital.vn/storage/khong-gian/b%20(2).jpg',
    '2026-08-20T03:00:00+00'::timestamptz
  ),
  (
    'Khai Trương Chi Nhánh 3 Thủ Đức - Phục Vụ Xuyên Đêm Tới 03h00 Sáng',
    'khai-truong-chi-nhanh-3-thu-duc-phuc-vu-xuyen-dem',
    'Hệ thống Ốc Đêm Chú Đỉnh chính thức đưa vào hoạt động chi nhánh thứ 3 tại 158 Man Thiện, P. Tăng Nhơn Phú, Thủ Đức với không gian sân vườn cực kỳ thoáng mát.',
    $body3$
<p>Hệ thống Ốc Đêm Chú Đỉnh chính thức đưa vào hoạt động chi nhánh thứ 3 tại <strong>158 Man Thiện, P. Tăng Nhơn Phú, Thủ Đức</strong> với không gian sân vườn cực kỳ thoáng mát.</p>
<p>Đáp lại sự tin yêu của quý thực khách khu vực Thủ Đức, Ốc Đêm Chú Đỉnh hân hoan khai trương Chi nhánh 3.</p>
<h2>Điểm nổi bật tại Chi nhánh 3 Man Thiện</h2>
<ul>
<li>Sức chứa hơn 300 khách cùng lúc với không gian sân vườn lộng gió.</li>
<li>Bãi đỗ xe ô tô &amp; xe máy rộng rãi, an ninh có bảo vệ trông coi 24/24.</li>
<li>Phục vụ liên tục từ 15h00 chiều đến 03h00 sáng hôm sau.</li>
</ul>
<p>Đặt bàn trước qua hotline <strong>0938.186.391</strong> để giữ chỗ tốt nhất.</p>
$body3$,
    'https://ocdemchudinh.hgdigital.vn/storage/khong-gian/b%20(3).jpg',
    '2026-08-20T03:00:00+00'::timestamptz
  ),
  (
    'Top 5 Món Hải Sản Sốt Thái Chua Cay Siêu Đã Phải Thử Một Lần Trong Đời',
    'top-5-mon-hai-san-sot-thai-chua-cay-phai-thu',
    'Tôm tái chanh, mực ống sốt Thái, bạch tuộc nướng sa tế... Điểm danh những món nhắm cay tê lưỡi ăn kèm bia tươi giải khát cực cuốn tại Ốc Đêm Chú Đỉnh.',
    $body4$
<p>Tôm tái chanh, mực ống sốt Thái, bạch tuộc nướng sa tế... Điểm danh những món nhắm cay tê lưỡi ăn kèm bia tươi giải khát cực cuốn tại Ốc Đêm Chú Đỉnh.</p>
<p>Nước sốt Thái chua cay đậm đà luôn có ma lực hấp dẫn khó cưỡng đối với dân nhậu đêm Sài Thành.</p>
<h2>Danh sách 5 món sốt Thái cháy hàng nhất</h2>
<ul>
<li><strong>Tôm tái chanh sốt Thái:</strong> Tôm sú tươi ướp đá tái chanh giòn ngọt.</li>
<li><strong>Hải sản sốt Thái thập cẩm:</strong> Quy tụ tôm, mực, nghêu &amp; bạch tuộc thấm đẫm sốt cay.</li>
<li><strong>Mực ống sốt Thái:</strong> Mực giòn sần sật rưới sốt ớt đỏ tươi.</li>
<li><strong>Sườn Thái Lan khổng lồ:</strong> Sườn heo hầm mềm rưới ớt hiểm cay nồng.</li>
<li><strong>Bạch tuộc nướng sa tế:</strong> Nướng than hồng chấm muối ớt xanh.</li>
</ul>
<p>Gọi món và đặt bàn tại Ốc Đêm Chú Đỉnh — hotline <strong>0938.186.391</strong>.</p>
$body4$,
    'https://ocdemchudinh.hgdigital.vn/storage/khong-gian/b%20(4).jpg',
    '2026-08-20T03:00:00+00'::timestamptz
  ),
  (
    'Chương Trình Đêm Đặt Tháp Bia Tiger - Tặng Ngay Dĩa Ốc Mỡ Cháy Bơ Tỏi',
    'chuong-trinh-dem-dat-thap-bia-tiger-tang-oc-mo',
    'Thỏa sức cụng ly cùng hội bạn thân! Với mỗi tháp bia Tiger 3L mát lạnh, thực khách được tặng ngay 01 dĩa ốc mỡ cháy bơ tỏi thơm lừng nhắm cùng.',
    $body5$
<p>Thỏa sức cụng ly cùng hội bạn thân! Với mỗi tháp bia Tiger 3L mát lạnh, thực khách được tặng ngay 01 dĩa ốc mỡ cháy bơ tỏi thơm lừng nhắm cùng.</p>
<p>Đêm muộn cụng ly bia mát lạnh cùng hội bạn thân thì còn gì tuyệt vời hơn!</p>
<p>Áp dụng từ thứ 2 đến thứ 5 hàng tuần tại 3 chi nhánh Ốc Đêm Chú Đỉnh: Khi gọi <strong>01 Tháp Bia Tiger 3L</strong>, bàn của quý khách sẽ được tặng kèm <strong>01 Dĩa Ốc Mỡ Cháy Bơ Tỏi</strong> (trị giá 69.000đ) hoàn toàn miễn phí!</p>
<p>Đặt bàn ngay — hotline <strong>0938.186.391</strong>.</p>
$body5$,
    'https://ocdemchudinh.hgdigital.vn/storage/khong-gian/b%20(5).jpg',
    '2026-08-20T03:00:00+00'::timestamptz
  ),
  (
    'Quy Trình Tuyển Chọn Hải Sản Tươi Sống Trong Ngày Tại Ốc Đêm Chú Đỉnh',
    'quy-trinh-tuyen-chon-hai-san-tuoi-song-trong-ngay',
    'Đảm bảo chất lượng an toàn vệ sinh thực phẩm: Ốc tươi, sò huyết & tôm sú được nhập trực tiếp từ bãi chài mỗi sáng sớm và chế biến nóng hổi ngay khi khách gọi món.',
    $body6$
<p>Đảm bảo chất lượng an toàn vệ sinh thực phẩm: Ốc tươi, sò huyết &amp; tôm sú được nhập trực tiếp từ bãi chài mỗi sáng sớm và chế biến nóng hổi ngay khi khách gọi món.</p>
<p>Để giữ vững uy tín và niềm tin của thực khách suốt nhiều năm qua, Ốc Đêm Chú Đỉnh luôn tuân thủ nghiêm ngặt quy trình kiểm định hải sản đầu vào.</p>
<p>Mỗi sáng từ 04h00, đội ngũ thu mua của Chú Đỉnh trực tiếp chọn lọc hải sản tươi ngon nhất tại bãi chài Vũng Tàu, Phan Thiết và chuyển về chi nhánh trong ngày. Tất cả nguyên liệu được ngâm làm sạch tự nhiên và chỉ chế biến khi thực khách bắt đầu gọi món.</p>
<p>Đặt bàn trải nghiệm hải sản tươi sống — hotline <strong>0938.186.391</strong>.</p>
$body6$,
    'https://ocdemchudinh.hgdigital.vn/storage/khong-gian/b%20(6).jpg',
    '2026-08-20T03:00:00+00'::timestamptz
  )
) AS v(title, slug, excerpt, body, cover_image_url, published_at)
WHERE NOT EXISTS (
  SELECT 1 FROM public.articles a WHERE a.slug = v.slug
);
