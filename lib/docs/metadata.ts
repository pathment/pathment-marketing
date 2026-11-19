import type { Metadata } from "next";
import { getDocPage } from "./nav";

/** Title, description, canonical URL and Open Graph for a docs page, from the nav data. */
export function docsMetadata(href: string): Metadata {
  const page = getDocPage(href);
  const title = href === "/docs" ? "Pathment API documentation" : page.title;
  return {
    title: href === "/docs" ? { absolute: "Pathment Docs | API and integration guides" } : title,
    description: page.description,
    alternates: { canonical: href },
    openGraph: {
      title: `${title} | Pathment Docs`,
      description: page.description,
      url: `https://pathment.me${href}`,
      siteName: "Pathment",
      type: "article",
    },
  };
}
