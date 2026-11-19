import { docsNav } from "./nav";

export interface SearchEntry {
  /** Where the result goes, including the #heading for section hits. */
  href: string;
  title: string;
  /** The page a section belongs to, or the group a page belongs to. */
  context: string;
  excerpt: string;
  kind: "page" | "section";
  /** Lower-cased text the query is matched against. */
  haystack: string;
}

/**
 * A small client-side index: one entry per page and one per heading. It is
 * built from the nav data at import time, so it never drifts from the pages.
 */
export const searchIndex: SearchEntry[] = docsNav.flatMap((group) =>
  group.pages.flatMap((page) => {
    const keywords = (page.keywords ?? []).join(" ");
    const pageEntry: SearchEntry = {
      href: page.href,
      title: page.title,
      context: group.title,
      excerpt: page.description,
      kind: "page",
      haystack: `${page.title} ${page.navTitle ?? ""} ${page.description} ${keywords}`.toLowerCase(),
    };
    const sections: SearchEntry[] = page.toc.map((item) => ({
      href: `${page.href}#${item.id}`,
      title: item.title.replace(/^\d+\.\s*/, ""),
      context: page.title,
      excerpt: page.description,
      kind: "section",
      haystack: `${item.title} ${page.title}`.toLowerCase(),
    }));
    return [pageEntry, ...sections];
  }),
);

function score(entry: SearchEntry, terms: string[], query: string): number {
  const title = entry.title.toLowerCase();
  let total = 0;
  for (const term of terms) {
    if (!entry.haystack.includes(term)) return 0;
    if (title.startsWith(term)) total += 6;
    else if (title.includes(term)) total += 4;
    else total += 1;
  }
  if (title === query) total += 10;
  if (entry.kind === "page") total += 1.5;
  return total;
}

export function searchDocs(query: string, limit = 12): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return searchIndex
    .map((entry) => ({ entry, s: score(entry, terms, q) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.entry);
}

export const suggestedSearches: string[] = [
  "/docs/quickstart",
  "/docs/guides/syncing-users",
  "/docs/guides/field-mapping",
  "/docs/api/applicants",
  "/docs/errors",
];
