# Ốc Đêm Chú Đỉnh — Website

Marketing website cho chuỗi nhà hàng ốc & hải sản đêm tại Sài Gòn. v1 là clone portfolio; **v2 là sản phẩm vận hành thật** — marketing cập nhật nội dung qua admin, không qua Git.

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
Yêu cầu đặt tiệc theo sự kiện (sinh nhật, thôi nôi, tất niên, liên hoan). Khác với Table Reservation về quy mô và dịch vụ kèm theo (decor, âm thanh, VAT). v2.1: lưu database và gửi email.
_Avoid_: Party booking, đặt tiệc (dùng trong UI tiếng Việt)

**Article**:
Bài viết tin tức hoặc mẹo ẩm thực, không gắn trực tiếp với giá món ăn. Có trạng thái xuất bản (Publication Status).
_Avoid_: Post, blog post

**Article Body**:
Nội dung chính của Article (đoạn văn, heading, danh sách, ảnh, liên kết). Soạn qua Content Editor, lưu dạng HTML, hiển thị công khai qua cùng một bộ style typography.
_Avoid_: Content, post body

**Content Category**:
Danh mục phân loại Article trên trang tin tức (Khuyến Mãi & Ưu Đãi, Tin Tức Nhà Hàng, Bí Quyết Ẩm Thực). Dùng cho filter và badge hiển thị.
_Avoid_: Tag, topic

**Promotion**:
Chương trình ưu đãi có thời hạn, có thể kèm mã giảm giá (`promo_code`) hiển thị cho khách. Hết hạn thì tự ẩn khỏi site public.
_Avoid_: Deal, offer

**Publication Status**:
Trạng thái xuất bản của Article hoặc Promotion: `draft` (nháp, chỉ nội bộ) hoặc `published` (hiển thị công khai khi đủ điều kiện thời gian).
_Avoid_: Visibility, state

**Content Editor**:
Người dùng nội bộ đăng nhập admin để tạo và sửa Article, Promotion. Role `editor` hoặc `admin`.
_Avoid_: Author, CMS user

**Job Application**:
Đơn ứng tuyển gửi qua form trang Tuyển dụng; chỉ gửi email thông báo, không lưu database (v2.2).
_Avoid_: CV upload, applicant

**Production Deployment**:
Bản build live cho khách — deploy từ nhánh `main` lên Vercel Production (`https://oc-dem-chu-dinh.vercel.app`).
_Avoid_: Prod, live site

**Staging Deployment**:
Bản QA nội bộ cho dev — deploy từ nhánh `develop` qua Vercel branch domain (URL cố định). Không gửi chủ quán.
_Avoid_: UAT, pre-prod

**Preview Deployment**:
Bản tạm mỗi Pull Request (`feature/*`) — URL riêng trên Vercel, không thay staging.
_Avoid_: PR preview

**Footer Slogan**:
Một trong bốn khẩu hiệu ngắn hiển thị trên thanh đỏ phía trên footer (ốc tươi, phục vụ đêm, không gian tiệc, hotline).
_Avoid_: Tagline, USP bar
