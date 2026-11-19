/**
 * The public plan catalogue, fetched from the product API. Shared by the
 * /api/plans route (client refreshes) and the homepage server render, so the
 * prices are in the HTML for crawlers and no-JS readers.
 */
export interface PublishedPlan {
  id: string;
  name: string;
  description: string | null;
  currency: string;
  monthlyPriceCents: number;
  limits: Record<string, number>;
  features: Record<string, boolean>;
}

const apiBase = () =>
  (process.env.NEXT_PUBLIC_API_URL || "https://api.pathment.me/api").replace(/\/$/, "");

/** Keep internal identifiers and operational metadata out of the response. */
function toPublic(plan: Record<string, unknown>): PublishedPlan {
  return {
    id: plan.id as string,
    name: plan.name as string,
    description: (plan.description as string | null) ?? null,
    currency: plan.currency as string,
    monthlyPriceCents: plan.monthlyPriceCents as number,
    limits: plan.limits as Record<string, number>,
    features: plan.features as Record<string, boolean>,
  };
}

/**
 * Throws when the catalogue is unavailable. `revalidate` caches the result
 * for server renders; pass `0` to always hit the API.
 */
export async function fetchPublishedPlans(revalidate = 0): Promise<PublishedPlan[]> {
  const response = await fetch(`${apiBase()}/organizations/plans`, {
    ...(revalidate > 0 ? { next: { revalidate } } : { cache: "no-store" as const }),
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Public catalog unavailable");
  const body = await response.json();
  if (!Array.isArray(body?.data?.plans)) throw new Error("Invalid public catalog");
  return body.data.plans.map(toPublic);
}

/** For server renders: never throws, so a slow API cannot break the page. */
export async function getPublishedPlansOrNull(): Promise<PublishedPlan[] | null> {
  try {
    return await fetchPublishedPlans(300);
  } catch {
    return null;
  }
}
