# Ốc Đêm Chú Đỉnh — Website

Marketing website cho chuỗi nhà hàng ốc & hải sản đêm tại Sài Gòn. Dự án clone portfolio (v1), có thể nâng cấp thành sản phẩm đầy đủ (v2).

## Language

**Branch**:
Một địa điểm vật lý của chuỗi nhà hàng, có địa chỉ, giờ mở cửa và bản đồ riêng.
_Avoid_: Store, location, cửa hàng

**Menu Item**:
Một món ăn trong thực đơn, có tên, mô tả, giá và ảnh.
_Avoid_: Product, dish (trong code có thể dùng `Dish` nhưng domain term là Menu Item)

**Table Reservation**:
Yêu cầu đặt bàn ăn tối — khách chọn chi nhánh, ngày, giờ và số lượng người.
_Avoid_: Booking (quá chung), đặt chỗ

**Event Booking**:
Yêu cầu đặt tiệc theo sự kiện (sinh nhật, thôi nôi, tất niên, liên hoan). Khác với Table Reservation về quy mô và dịch vụ kèm theo (decor, âm thanh, VAT).
_Avoid_: Party booking, đặt tiệc (dùng trong UI tiếng Việt)

**Promotion**:
Chương trình ưu đãi có thời hạn (giảm giá, combo, khuyến mãi theo sự kiện).
_Avoid_: Deal, offer

**Article**:
Bài viết tin tức hoặc mẹo ẩm thực, không gắn trực tiếp với giá món ăn.
_Avoid_: Post, blog post

**Footer Slogan**:
Một trong bốn khẩu hiệu ngắn hiển thị trên thanh đỏ phía trên footer (ốc tươi, phục vụ đêm, không gian tiệc, hotline).
_Avoid_: Tagline, USP bar
