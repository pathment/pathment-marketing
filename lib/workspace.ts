const ROOT_DOMAIN = "pathment.me";
const RESERVED = new Set(["app", "api", "www", "admin", "mail"]);

/** Accept a workspace slug, a legacy subdomain, or the current /w/slug URL. */
export function workspaceSlug(value: string): string {
  const input = value.trim().toLowerCase();
  if (!input) return "";
  let slug = input;
  if (input.includes(".") || input.includes("/") || input.includes(":")) {
    try {
      const url = new URL(input.includes("://") ? input : `https://${input}`);
      if (url.protocol !== "https:" && url.protocol !== "http:") return "";
      if (url.username || url.password || url.port) return "";
      if (
        url.hostname === `app.${ROOT_DOMAIN}` ||
        url.hostname === ROOT_DOMAIN
      ) {
        slug = /^\/w\/([a-z0-9-]+)(?:\/|$)/.exec(url.pathname)?.[1] || "";
      } else if (url.hostname.endsWith(`.${ROOT_DOMAIN}`)) {
        slug = url.hostname.slice(0, -(ROOT_DOMAIN.length + 1));
      } else return "";
    } catch {
      return "";
    }
  }
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(slug) &&
    !RESERVED.has(slug)
    ? slug
    : "";
}
export function workspaceLoginUrl(value: string): string | null {
  const slug = workspaceSlug(value);
  return slug ? `https://app.pathment.me/w/${slug}/login` : null;
}
