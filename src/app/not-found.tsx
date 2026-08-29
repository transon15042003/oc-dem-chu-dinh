import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
        404
      </p>
      <h1 className="text-2xl font-black uppercase text-foreground sm:text-3xl">
        Không tìm thấy trang
      </h1>
      <p className="max-w-md text-sm text-brand-cream-muted">
        Trang bạn truy cập không tồn tại hoặc đã được di chuyển. Quay về trang
        chủ {siteConfig.name} để tiếp tục khám phá thực đơn và đặt bàn.
      </p>
      <Button
        render={<Link href="/" />}
        variant="brand"
        className="h-11 px-8 font-bold uppercase"
      >
        Về trang chủ
      </Button>
    </section>
  );
}
