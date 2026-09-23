# Plans UX release review

## September 23 marketing refresh update

The public production catalog now responds successfully and has been verified through the marketing UI. The marketing client reads `/api/plans`; this server route fetches the upstream public catalog without credentials and avoids browser cross-origin dependencies. Current published monthly plans are Starter (free), Growth (USD 99), and Scale (USD 299). Prices remain API-driven.

The nonfunctional newsletter, placeholder social/navigation links, and unsupported operational-status claim have been removed. Workspace URL parsing and the Dev Weekends login handoff have been checked. This does not verify authenticated invoice activation, workspace creation, or cross-tenant isolation. The original review below records the earlier rollout state; its endpoint deployment/CORS and placeholder-control notes are superseded by this update.

The latest design pass removes client attribution, adds green logo assets and light/dark themes, and includes admin, mentor, and mentee captures in a 32-second tour. The second design pass uses real demo screenshots, the product green palette, and a captioned visual tour. Plan cards now distinguish amount, currency, and workspace capacity; selecting a plan carries it into the team-assisted setup enquiry.

## Earlier review

UX implementation complete; production rollout remains pending.

Implemented public `/pricing`, linked from desktop/mobile navigation and the no-workspace sign-in prompt. Published monthly prices, currencies, limits and enabled features come only from `GET /api/organizations/plans`; there are no fallback prices or checkout controls. Loading, empty, malformed-response, timeout and retry states are included. Fetch sends no credentials.

Configure `NEXT_PUBLIC_API_URL` as the API base including `/api` (default `https://api.pathment.me/api`). The endpoint must allow unauthenticated requests and browser CORS from the marketing origin. Expected response: `{ data: { plans: [...] } }`, with id, name, description, monthlyPriceCents, currency, limits, features from the published plan projection. Published quotas are members, programs and clans; published features are certificates, AI evaluation and advanced analytics. Unimplemented SSO, custom domains, storage/AI quotas and custom branding are not advertised by this endpoint. This is a build-time public environment variable.

Settings now distinguish current and requested plans, disable repeat requests for the pending plan, explain replacement of a pending request, show currency and plan limits, and give non-admins an explanation. Manual invoicing is explicit: request → Pathment arranges invoice → operator confirmation/activation. Current limits remain in effect until activation.

Workspace creation requires overview.workspaceCreationEnabled === true. Missing or false disables the button and explains that creation is unavailable, without blocking existing workspace settings. The creation UI says that other member directories and data are not imported. This UI gate is not a security boundary: the API must independently enforce the gate.

The brand-color editor and its upgrade prompt have been removed. Stored brand colors do not currently theme the product UI; organization saves now submit only name and timezone, leaving existing stored colors untouched. Reintroduce branding controls only when the UI consumes the setting.

## Not live-ready

- The public plans endpoint exists in the backend source but has not been deployed. The earlier HTTP 404 observation was from the older deployed backend, not the current implementation. Deploy it and verify unauthenticated access, CORS, published prices and the shipped-capability projection in production.
- Multiworkspace remains blocked by legacy unscoped queries. Keep creation disabled by default until server isolation and authorization checks are complete. Existing devweekends remains available.
- Manual invoice/operator activation CLI and invoice-reference audit are being implemented separately. Verify request persistence, invoice handling, activation, requested-plan clearing, and refreshed entitlements end-to-end before launch. This work changes no server files.
- First-admin self-registration is unavailable: existing registration requires an invite or clan joining link. Pricing explains this instead of linking to a broken generic registration flow. Define the operator-assisted first-owner provisioning process.
- The existing enterprise@pathment.com contact is reused; verify that it is monitored and that the .com address is intended for the .me product.
- Existing marketing newsletter form, placeholder social links, and static operational-status claim were outside this change and remain launch-review items.
- No payment provider is needed for the agreed manual-invoice workflow.

## Validation

Marketing TypeScript, targeted ESLint, and production build passed; `/pricing` is generated. Product TypeScript and targeted ESLint passed. The older deployed endpoint was checked read-only; the new backend endpoint has not been verified in production. Authenticated invoice activation and cross-workspace isolation were not exercised; no production plan requests or workspace creation were performed.
