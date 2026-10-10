export type MarketingEvent =
  | "demo_started"
  | "demo_role_selected"
  | "demo_step_completed"
  | "demo_completed"
  | "organization_signup_clicked"
  | "login_clicked"
  | "buyer_form_started"
  | "buyer_form_submitted";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: MarketingEvent, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...properties };
  window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("pathment:analytics", { detail: payload }));
}

