import type { MetadataRoute } from "next";

import { getPublishedArticles } from "@/lib/articles/queries";
import { siteConfig, siteRoutes } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const articles = await getPublishedArticles();

  const staticEntries = siteRoutes.map((route) => ({
    url: `${base}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articleEntries = articles.map((article) => ({
    url: `${base}/tin-tuc/${article.slug}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
