import { Suspense } from "react";

import { BookingFormSection } from "@/components/home/booking-form-section";
import { EventBookingFormSection } from "@/components/home/event-booking-form-section";
import { EventServicesSection } from "@/components/home/event-services-section";
import { FeaturedDishesSection } from "@/components/home/featured-dishes-section";
import { ExperienceSection, GallerySection } from "@/components/home/gallery-section";
import { HeroSection } from "@/components/home/hero-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { SpaceHighlightSection } from "@/components/home/space-highlight-section";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDishesSection />
      <EventServicesSection />
      <Suspense fallback={null}>
        <EventBookingFormSection />
      </Suspense>
      <ExperienceSection />
      <GallerySection />
      <SpaceHighlightSection />
      <ReviewsSection />
      <BookingFormSection />
    </>
  );
}
