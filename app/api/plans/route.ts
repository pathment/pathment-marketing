import { fetchPublishedPlans } from "../../../lib/plans";

// Public catalog only. Never forward cookies or authorization to the product API.
export async function GET() {
  try {
    const plans = await fetchPublishedPlans();
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
