import { MetadataRoute } from "next";
import { getAllDocs } from "@/lib/docs";
import { SITE_CONFIG } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = getAllDocs();

  const docUrls = docs.map((doc) => ({
    url: `${SITE_CONFIG.url}/docs/${doc.slug}`,
    lastModified: new Date().toISOString(), // In a real app, you might read file stat mtime
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...docUrls,
  ];
}
