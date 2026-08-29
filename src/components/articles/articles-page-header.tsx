import Link from "next/link";
import { ChevronRight } from "lucide-react";

type ArticlesPageHeaderProps = {
  title?: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
};

export function ArticlesPageHeader({
  title = "Tin tức & Sự kiện Ốc Đêm Chú Đỉnh",
  description = "Cập nhật những chương trình ưu đãi khuyến mãi mới nhất, các sự kiện hấp dẫn và kinh nghiệm thưởng thức ẩm thực ốc đêm Sài Gòn.",
  breadcrumbs,
}: ArticlesPageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-amber-100 bg-background py-12">
      <div className="relative z-10 mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground">
          {breadcrumbs ? (
            breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <ChevronRight className="size-3 text-muted-foreground/70" aria-hidden /> : null}
                {item.href ? (
                  <Link href={item.href} className="transition-colors hover:text-brand-red">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-black text-brand-red">{item.label}</span>
                )}
              </span>
            ))
          ) : (
            <>
              <Link href="/" className="transition-colors hover:text-brand-red">
                Trang chủ
              </Link>
              <ChevronRight className="size-3 text-muted-foreground/70" aria-hidden />
              <span className="font-black text-brand-red">Tin tức &amp; Sự kiện</span>
            </>
          )}
        </div>

        <h1 className="font-heading text-3xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>

        {description ? (
          <p className="mx-auto max-w-2xl text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
