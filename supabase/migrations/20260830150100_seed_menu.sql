-- seed menu from src/data/menu.ts (v1 static data)

INSERT INTO public.menu_categories (slug, name, description, sort_order, status, show_in_filter) VALUES
  ('featured', '⭐ KHUYÊN DÙNG', 'Các món đặc sản ốc sốt trứng muối, nướng tiêu xanh & lẩu hải sản bán chạy nhất Chú Đỉnh', 0, 'published', true),
  ('oc-nuong-sot', 'Ốc Nướng Sốt Hoàng Kim', 'Các món ốc tươi nướng sốt trứng muối, bơ tỏi, tiêu xanh béo ngậy đậm đà.', 1, 'published', true),
  ('so-ngheu-dem', 'Sò & Nghêu Nướng Mỡ Hành', 'Sò điệp phô mai, sò huyết nướng mỡ hành & nghêu hấp sả Thái nóng hổi.', 2, 'published', true),
  ('hai-san-nuong-sot-thai', 'Hải Sản Sốt Thái & Nướng', 'Hải sản sốt Thái chua cay, tôm tái chanh & mực nướng sa tế giòn ngọt.', 3, 'published', true),
  ('lau-hai-san-dem', 'Lẩu Hải Sản Đêm', 'Lẩu Thái hải sản chua cay đậm vị ăn kèm tôm, mực & ốc tươi trong ngày.', 4, 'published', true),
  ('combo-tiec-an-kem', 'Combo Tiệc & Món Ăn Kèm', 'Gói combo tiệc tiết kiệm, sườn Thái Lan khổng lồ & bánh mì chấm sốt.', 5, 'published', true),
  ('do-uong-bia', 'Đồ Uống & Bia Tươi', 'Bia tươi mát lạnh, tháp bia Tiger, nước ngọt & các loại trà trái cây giải nhiệt.', 6, 'published', true);

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'rang-muc', 'RĂNG MỰC SỐT TRỨNG MUỐI', id, 'storage/anh-video/CN3 - Thủ Đức - Món ăn1.jpg', true, 'răng mực sốt trứng muối', 0, 'published' FROM public.menu_categories WHERE slug = 'featured';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'tom-su-rang', 'TÔM SU RANG MUỐI HONGKONG', id, 'storage/anh-video/CN3 - Thủ Đức - Món ăn2.jpg', true, 'tôm su rang muối hongkong', 1, 'published' FROM public.menu_categories WHERE slug = 'featured';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'hau-nuong-phomai', 'HÀU NƯỚNG PHOMAI', id, 'storage/anh-video/CN3 - Thủ Đức - Món ăn3.jpg', true, 'hàu nướng phomai', 2, 'published' FROM public.menu_categories WHERE slug = 'featured';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'oc-huong-trung-muoi', 'ỐC HƯƠNG SỐT TRỨNG MUỐI', id, 'storage/anh-video/CN3 - Thủ Đức - Món ăn4.jpg', true, 'ốc hương sốt trứng muối', 3, 'published' FROM public.menu_categories WHERE slug = 'featured';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'suon-thai-lai', 'SƯỜN THÁI LAI', id, 'storage/anh-video/CN3 - Thủ Đức - Món ăn5.jpg', true, 'sườn thái lai', 4, 'published' FROM public.menu_categories WHERE slug = 'featured';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'lau-ga-la-giang', 'LẨU GÀ LÁ GIANG', id, 'storage/anh-video/CN3 - Thủ Đức - Món ăn10.jpg', true, 'lẩu gà lá giang', 5, 'published' FROM public.menu_categories WHERE slug = 'featured';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'oc-huong-hoang-kim', 'Ốc Hương Sốt Trứng Muối Hoàng Kim', id, 'storage/mon-an/a (12).jpg', false, 'ốc hương sốt trứng muối hoàng kim', 6, 'published' FROM public.menu_categories WHERE slug = 'oc-nuong-sot';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'oc-buou-tieu-xanh', 'Ốc Bươu Nướng Tiêu Xanh Tây Bắc', id, 'storage/mon-an/a (7).jpg', false, 'ốc bươu nướng tiêu xanh tây bắc', 7, 'published' FROM public.menu_categories WHERE slug = 'oc-nuong-sot';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'oc-mo-bo-toi', 'Ốc Mỡ Sốt Bơ Tỏi Béo Ngậy', id, 'storage/mon-an/a (1).jpg', false, 'ốc mỡ sốt bơ tỏi béo ngậy', 8, 'published' FROM public.menu_categories WHERE slug = 'oc-nuong-sot';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'oc-ca-na-mam-nhi', 'Ốc Cà Na Nướng Mắm Nhĩ', id, 'storage/mon-an/a (2).jpg', false, 'ốc cà na nướng mắm nhĩ', 9, 'published' FROM public.menu_categories WHERE slug = 'oc-nuong-sot';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'oc-toi-bo-toi', 'Ốc Tỏi Nướng Bơ Tỏi Ớt', id, 'storage/mon-an/a (16).jpg', false, 'ốc tỏi nướng bơ tỏi ớt', 10, 'published' FROM public.menu_categories WHERE slug = 'oc-nuong-sot';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'so-diep-phomai', 'Sò Điệp Phô Mai Nướng Bít Tết', id, 'storage/mon-an/a (18).jpg', false, 'sò điệp phô mai nướng bít tết', 11, 'published' FROM public.menu_categories WHERE slug = 'so-ngheu-dem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'so-huyet-mo-hanh', 'Sò Huyết Nướng Mỡ Hành Làng Chài', id, 'storage/mon-an/a (3).jpg', false, 'sò huyết nướng mỡ hành làng chài', 12, 'published' FROM public.menu_categories WHERE slug = 'so-ngheu-dem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'ngheu-hap-sa', 'Nghêu Hấp Sả Thái Cay Nồng', id, 'storage/mon-an/a (4).jpg', false, 'nghêu hấp sả thái cay nồng', 13, 'published' FROM public.menu_categories WHERE slug = 'so-ngheu-dem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'hau-phomai-keo-soi', 'Hàu Nướng Phô Mai Kéo Sợi', id, 'storage/mon-an/a (5).jpg', false, 'hàu nướng phô mai kéo sợi', 14, 'published' FROM public.menu_categories WHERE slug = 'so-ngheu-dem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'hai-san-sot-thai', 'Hải Sản Sốt Thái Chua Cay Siêu Tốc', id, 'storage/mon-an/a (13).jpg', false, 'hải sản sốt thái chua cay siêu tốc', 15, 'published' FROM public.menu_categories WHERE slug = 'hai-san-nuong-sot-thai';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'tom-tai-chanh', 'Tôm Tái Chanh Sốt Thái Cay Tê', id, 'storage/mon-an/a (6).jpg', false, 'tôm tái chanh sốt thái cay tê', 16, 'published' FROM public.menu_categories WHERE slug = 'hai-san-nuong-sot-thai';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'muc-mot-nang', 'Mực Một Nắng Nướng Sa Tế', id, 'storage/mon-an/a (9).jpg', false, 'mực một nắng nướng sa tế', 17, 'published' FROM public.menu_categories WHERE slug = 'hai-san-nuong-sot-thai';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'bach-tuoc-sa-te', 'Bạch Tuộc Nướng Sa Tế Đêm', id, 'storage/mon-an/a (19).jpg', false, 'bạch tuộc nướng sa tế đêm', 18, 'published' FROM public.menu_categories WHERE slug = 'hai-san-nuong-sot-thai';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'lau-thai-hai-san', 'Lẩu Thái Hải Sản Đêm Đậm Vị', id, 'storage/mon-an/a (11).jpg', false, 'lẩu thái hải sản đêm đậm vị', 19, 'published' FROM public.menu_categories WHERE slug = 'lau-hai-san-dem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'lau-thap-cam', 'Lẩu Thập Cẩm Chú Đỉnh Đặc Biệt', id, 'storage/mon-an/a (14).jpg', false, 'lẩu thập cẩm chú đỉnh đặc biệt', 20, 'published' FROM public.menu_categories WHERE slug = 'lau-hai-san-dem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'suon-thai-lan', 'Sườn Thái Lan Khổng Lồ Hầm Mềm', id, 'storage/mon-an/a (8).jpg', false, 'sườn thái lan khổng lồ hầm mềm', 21, 'published' FROM public.menu_categories WHERE slug = 'combo-tiec-an-kem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'combo-4-nguoi', 'Combo Tiệc Ốc Đêm 4 Người', id, 'storage/mon-an/a (10).jpg', false, 'combo tiệc ốc đêm 4 người', 22, 'published' FROM public.menu_categories WHERE slug = 'combo-tiec-an-kem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'combo-10-nguoi', 'Combo Tiệc Bàn 10 Người Siêu Tiết Kiệm', id, 'storage/mon-an/a (23).jpg', false, 'combo tiệc bàn 10 người siêu tiết kiệm', 23, 'published' FROM public.menu_categories WHERE slug = 'combo-tiec-an-kem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'banh-mi-bo-toi', 'Bánh Mì Nóng Chấm Sốt Bơ Tỏi', id, 'storage/mon-an/a (24).jpg', false, 'bánh mì nóng chấm sốt bơ tỏi', 24, 'published' FROM public.menu_categories WHERE slug = 'combo-tiec-an-kem';

INSERT INTO public.menu_items (slug, name, category_id, image_path, is_hot, search_terms, sort_order, status)
SELECT 'thap-bia-tiger', 'Tháp Bia Tươi Tiger 3 Lít Mát Lạnh', id, 'storage/mon-an/a (25).jpg', false, 'tháp bia tươi tiger 3 lít mát lạnh', 25, 'published' FROM public.menu_categories WHERE slug = 'do-uong-bia';
