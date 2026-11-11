import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";

export const dynamic = "force-static";

const SITE = "https://ej-pro.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    ...cases.map((c) => ({ url: `${SITE}/projects/${c.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
