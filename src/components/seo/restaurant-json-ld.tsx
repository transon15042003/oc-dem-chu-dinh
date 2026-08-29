import { siteConfig } from "@/config/site";
import { branches } from "@/data/branches";
import { publicEnv } from "@/lib/env";

export function RestaurantJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    servesCuisine: ["Hải sản", "Ốc nướng", "Lẩu"],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "16:00",
        closes: "04:00",
      },
    ],
    ...(publicEnv.hotline
      ? {
          telephone: `+84${publicEnv.hotline.replace(/\D/g, "").replace(/^0/, "")}`,
        }
      : {}),
    ...(publicEnv.email ? { email: publicEnv.email } : {}),
    location: branches
      .filter((branch) => !branch.comingSoon)
      .map((branch) => ({
        "@type": "Place",
        name: branch.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: branch.address,
          addressLocality: "TP.HCM",
          addressCountry: "VN",
        },
      })),
    sameAs: [
      publicEnv.facebookUrl,
      publicEnv.zaloUrl,
      publicEnv.tiktokUrl,
      publicEnv.messengerUrl,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
