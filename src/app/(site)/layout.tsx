import { SiteLayout } from "@/components/layout/site-layout";
import { RestaurantJsonLd } from "@/components/seo/restaurant-json-ld";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-col pb-20 sm:pb-0">
      <RestaurantJsonLd />
      <SiteLayout>{children}</SiteLayout>
    </div>
  );
}
