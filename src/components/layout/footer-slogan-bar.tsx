import { footerSlogans } from "@/data/footer";
import { formatHotline, hotlineHref, publicEnv } from "@/lib/env";

export function FooterSloganBar() {
  const hotline = publicEnv.hotline;
  const formattedHotline = hotline ? formatHotline(hotline) : "Chưa cấu hình";

  return (
    <div className="border-b border-brand-gold/30 bg-slogan-bar py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {footerSlogans.map((item) => {
          const Icon = item.icon;
          const isHotline = item.id === "hotline";

          return (
            <div
              key={item.id}
              className="flex items-center gap-3.5 rounded-2xl border border-brand-gold/20 bg-black/20 p-3.5 backdrop-blur-sm"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-footer-accent text-footer-bg shadow">
                <Icon className="size-5" aria-hidden />
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wide text-white">
                  {item.title}
                </h4>
                {isHotline && hotline ? (
                  <a
                    href={hotlineHref(hotline)}
                    className="text-[11px] font-bold text-on-red hover:underline"
                  >
                    {formattedHotline}
                  </a>
                ) : (
                  <p className="text-[11px] font-medium text-white/90">
                    {isHotline ? formattedHotline : item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
