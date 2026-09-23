// Public catalog only. Never forward cookies or authorization to the product API.
export async function GET() {
  const base = (
    process.env.NEXT_PUBLIC_API_URL || "https://api.pathment.me/api"
  ).replace(/\/$/, "");
  try {
    const response = await fetch(`${base}/organizations/plans`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Public catalog unavailable");
    const body = await response.json();
    if (!Array.isArray(body?.data?.plans))
      throw new Error("Invalid public catalog");
    // Keep internal identifiers and operational metadata out of the marketing response.
    const plans = body.data.plans.map((plan: Record<string, unknown>) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      currency: plan.currency,
      monthlyPriceCents: plan.monthlyPriceCents,
      limits: plan.limits,
      features: plan.features,
    }));
    return Response.json(
      { data: { plans } },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Published plans are temporarily unavailable." },
      { status: 503 },
    );
  }
}
