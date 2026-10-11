import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/demo", "/pricing", "/contact", "/privacy", "/account-deletion"].map((path) => ({ url: `https://pathment.me${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : path === "/demo" ? 0.9 : 0.7 }));
}
