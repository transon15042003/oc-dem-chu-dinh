import { cdnImage } from "@/lib/images";

export const aboutHero = {
  title: "GIỚI THIỆU NHÀ HÀNG ỐC ĐÊM CHÚ ĐỈNH",
  lead:
    "Hệ thống ốc nướng sốt trứng muối & lẩu hải sản đêm quy mô lớn với 4 chi nhánh sầm uất tại Gò Vấp, Tân Bình, Thủ Đức và Quận 7. Phục vụ thực khách xuyên đêm từ 15h00 đến 03h00 sáng mỗi ngày!",
  description:
    "Với phương châm phục vụ tận tâm, món ăn nêm nếm đậm đà vừa vị và mở cửa xuyên đêm phục vụ tới 03h00 sáng mỗi ngày, Chú Đỉnh luôn là điểm đến hàng đầu của các tín đồ mê ốc tại TP.HCM.",
  image: cdnImage("storage/anh-video/CN1%20-%20gò%20vấp1_600-600.webp"),
  imageAlt: "Hình ảnh nhà hàng Ốc Đêm Chú Đỉnh",
};

export const aboutSpaceGallery = [
  cdnImage("storage/anh-video/CN1%20-%20gò%20vấp2_600-600.webp"),
  cdnImage("storage/anh-video/CN1%20-%20gò%20vấp10_600-600.webp"),
  cdnImage("storage/anh-video/CN1%20-%20gò%20vấp11_600-600.webp"),
  cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn1_400-400.webp"),
  cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn3_400-400.webp"),
  cdnImage("storage/anh-video/CN3%20-%20Thủ%20Đức%20-%20Món%20ăn5_400-400.webp"),
];

export const aboutQuote = {
  eyebrow: "THƯƠNG HIỆU ỐC ĐÊM SẦM UẤT SÀI GÒN",
  title: "HÀNH TRÌNH TẠO NÊN THƯƠNG HIỆU ỐC ĐÊM CHÚ ĐỈNH",
  quote:
    "Ốc Đêm Chú Đỉnh không chỉ là nơi thưởng thức món ăn, mà còn là điểm hẹn kết nối niềm vui, nơi những câu chuyện đêm Sài Gòn được khởi nguồn bên đĩa ốc nướng sốt nóng hổi và tháp bia tươi mát lạnh.",
};

export type AboutSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const aboutSections: AboutSection[] = [
  {
    id: "origin",
    title: "I. Khởi Nguồn & Triết Lý Ẩm Thực Chú Đỉnh",
    paragraphs: [
      "Xuất thân từ niềm đam mê văn hóa ẩm thực đường phố Sài Gòn, Ốc Đêm Chú Đỉnh được thành lập với mong muốn mang đến cho thực khách những món ốc nướng, lẩu hải sản đêm không chỉ tươi ngon mà còn đậm đà vị truyền thống kết hợp cùng các loại sốt độc quyền.",
      "Từ một địa điểm quen thuộc của dân sành ăn, Chú Đỉnh đã phát triển thành hệ thống 4 chi nhánh quy mô tại các quận trung tâm TP.HCM (Gò Vấp, Tân Bình, Thủ Đức, Quận 7), phục vụ hàng nghìn lượt khách mỗi tuần.",
    ],
  },
  {
    id: "sauce",
    title: "II. Nước Sốt Độc Quyền – Linh Hồn Của Món Ăn",
    paragraphs: [
      "Điều làm nên dấu ấn khó quên của Ốc Đêm Chú Đỉnh chính là các công thức sốt chế biến độc bản do chính đầu bếp giàu kinh nghiệm dày công nghiên cứu:",
    ],
    bullets: [
      "Sốt Trứng Muối Hoàng Kim: Trứng muối tươi hấp bơ lạt, dầm mịn quánh sánh béo bùi, chấm bánh mì giòn ngon ngất ngây.",
      "Sốt Tiêu Xanh Tây Bắc: Tiêu xanh tươi giã dập kết hợp gia vị cay tê thơm nồng cho món ốc bươu nướng.",
      "Sốt Thái Chua Cay Siêu Tốc: Vị chua thanh của tắc tươi, cay xé lưỡi của ớt hiểm quyện cùng tôm sú tái chanh giòn ngọt.",
      "Sốt Bơ Tỏi Cháy Tỏi: Bơ thơm lừng chiên tỏi tép vàng ruộm bám chặt từng con ốc mỡ béo tròn.",
    ],
  },
  {
    id: "fresh",
    title: "III. Cam Kết Hải Sản Tươi Sống 100% Trong Ngày",
    paragraphs: [
      "Nhà hàng cam kết nhập hải sản tươi mới mỗi ngày từ các bãi chài uy tín. Tôm, mực, nghêu, hàu sữa & các loại ốc luôn được bảo quản trong bể chứa chuẩn nhiệt độ, tuyệt đối không dùng hàng đông lạnh lâu ngày hay hóa chất tẩy rửa.",
      "Mỗi đĩa ốc bốc khói nghi ngút khi mang ra bàn đều được chế biến nóng hổi ngay sau khi thực khách chọn món, đảm bảo giữ trọn vẹn vị ngọt tự nhiên của biển cả.",
    ],
  },
  {
    id: "branches",
    title: "IV. Hệ Thống Không Gian 4 Chi Nhánh – Phục Vụ Xuyên Đêm 03h00 Sáng",
    paragraphs: [
      "Với 4 chi nhánh phủ sóng rộng khắp TP.HCM, Chú Đỉnh mang đến không gian ẩm thực đa dạng phù hợp cho mọi nhu cầu đặt tiệc:",
    ],
    bullets: [
      "Chi Nhánh Gò Vấp — 202 Đường số 8, P.11, Gò Vấp. Không gian sân vườn & khu tiệc DJ sôi động.",
      "Chi Nhánh Tân Bình — 48 Phan Huy Ích, P.15, Tân Bình. Bàn tiệc thoáng mát, có phòng riêng VIP.",
      "Chi Nhánh Thủ Đức — 158 Man Thiện, P. Tăng Nhơn Phú. Sân khấu lớn, màn LED tổ chức tiệc sinh nhật.",
      "Chi Nhánh Quận 7 — 583 Lê Văn Lương, P. Tân Phong. Không gian sân vườn rộng rãi, tiệc ngoài trời.",
    ],
  },
];

export const aboutCta = {
  title: "ĐẶT BÀN TRẢI NGHIỆM ẨM THỰC ỐC ĐÊM CHÚ ĐỈNH",
  description:
    "Phục vụ xuyên đêm tới 03h00 sáng! Liên hệ hotline hoặc điền thông tin đặt bàn ngay bên dưới để được giữ trước chỗ ngồi đẹp nhất.",
};
