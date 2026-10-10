# Pathment marketing conversion redesign

## Architecture audited

- Next.js 16 App Router with React 19 and Tailwind CSS 4.
- Shared teal/green semantic color tokens in `app/globals.css`, with light/dark appearance and reduced-motion handling.
- Public routes were `/`, `/pricing`, and `/privacy`; `/api/plans` proxies a public product-plan endpoint.
- Product evidence consisted of real UI screenshots and a short captioned tour video in `public/product/`.
- The repository had no CRM, lead persistence, analytics SDK, database client, or test runner configured.

## Journey issues found

- Global sign-in requested a workspace slug and could route people into a tenant-specific path rather than global login.
- Public organization creation was incorrectly described as invitation-only even though `/register` exists.
- “Request access” and pricing actions ended in `mailto:` links, with no validation, recoverable lead, delivery state, duplicate handling, or rate limiting.
- The footer contained placeholder `#` links and inconsistent terminology.
- The product tour was a screenshot/video gallery, not a task-oriented experience visitors could try.
- Generic/AI-heavy copy did not clearly identify organizational buyers or distinguish Admin, Mentor, and Mentee value.
- No meaningful conversion analytics existed.
- There was no sitemap, robots route, structured product data, or focused automated test coverage.

## Implemented

- Rebuilt the homepage around buyer outcomes, role previews, operating workflow, product evidence, trust details, and conversion.
- Rebuilt `/demo` as a full-screen “Experience Pathment” workspace modeled on the current Pathment application source and Dev Weekends seed structure. It uses the real Pathment mark, a dedicated Dev Weekends workspace mark, fictional professional portraits, flat role navigation, the product’s horizontal workspace tabs, selectors, search, notifications, profile panels, four-step guidance, and clearly simulated decisions/reviews.
- Replaced the generic Admin and Mentor placeholders with route-specific product workflows derived from the application source: assessments, invitation inventory, people tables, program and roadmap tooling, recognition decisions, community operations, review records, scoped access, complete settings, the action-first mentor cockpit, sequential clan review, approvals, clan team, curriculum kits, recognition, insights, community, schedule, and mentor settings.
- Populated every visible Admin, Mentor, and Mentee destination with local fictional data. The complete route map covers 31 Admin pages, 23 Mentor pages, and 14 Mentee pages. Every exposed workspace tab resolves to a populated page; Admin and Mentor no longer share a generic fallback screen.
- Added professional fictional profile imagery throughout people and review surfaces, plus clan artwork in the selector, clan team, and program views. The profile row now opens the role’s real settings surface, and the “What’s new” drawer follows the product changelog pattern.
- Replaced decorative or dead controls with navigation, filters, detail drawers, safe simulated workflows, or explicit preview explanations. Data rows support keyboard activation, the mobile drawer is fully usable, and the role can be switched without restarting the preview.
- Added `/contact` and an embedded homepage form with shared client/server validation and explicit loading, success, duplicate, validation, rate-limit, and delivery-error states.
- Added `POST /api/buyer-interest`, with webhook or Resend delivery, a honeypot, minimum fill time, baseline rate limiting, and duplicate handling.
- Centralized canonical app destinations: global sign-in and public organization registration.
- Corrected pricing, navigation, footer, and legacy component CTAs.
- Added conversion event hooks without form PII.
- Added metadata updates, JSON-LD, `sitemap.xml`, and `robots.txt`.
- Added focused critical-journey tests and npm scripts for lint/typecheck/test.

## Verification

- `npm run lint` — passed.
- `npm run typecheck` — passed.
- `npm test` — passed.
- `npm run build` — passed; all routes generated.
- Browser verified all 31 Admin destinations and all 23 Mentor destinations, with zero missing route surfaces and zero console errors. Also verified desktop and 390×844 layouts, assessment creation, invitation generation, complete Admin settings, the clan-artwork selector, sequential Clan Review with attendance/notes/completion, the evidence-based mentor approval flow, role switching, global search, notification/changelog drawers, Mentee Roadmap, client validation, and truthful `503` form behavior when delivery is not configured.
- The supplied staging demo credentials were rejected by the current hosted login. No alternative credentials were guessed. The current application components, navigation configuration, workspace-tab configuration, screenshots, and demo seeder in the sibling product repository were used as the authoritative implementation reference.

## Screenshot index

Before captures are preserved in `artifacts/ui-review-v3/`.

- Before homepage desktop: `artifacts/ui-review-v3/light-desktop.png`
- Before homepage mobile: `artifacts/ui-review-v3/light-mobile.png`
- After homepage desktop: `artifacts/conversion-redesign/homepage-after.png`
- After homepage mobile: `artifacts/conversion-redesign/homepage-mobile-after.png`
- Before interactive demo rebuild: `artifacts/conversion-redesign/demo-after.png`
- After Admin Messages: `artifacts/conversion-redesign/demo-admin-messages-exact.png`
- After Mentor Clan Review: `artifacts/conversion-redesign/demo-mentor-clan-review-exact.png`
- After Mentee Roadmap: `artifacts/conversion-redesign/demo-mentee-roadmap-exact.png`
- After interactive demo mobile: `artifacts/conversion-redesign/demo-admin-mobile-exact.png`
- After buyer form: `artifacts/conversion-redesign/lead-form-after.png`
- After Admin assessment builder: `artifacts/conversion-redesign/after-admin-assessment.jpg`
- After Admin settings: `artifacts/conversion-redesign/after-admin-settings.jpg`
- After Mentor cockpit: `artifacts/conversion-redesign/after-mentor-cockpit.jpg`
- After Mentor clan selector: `artifacts/conversion-redesign/after-mentor-clan-menu.jpg`
- After Mentor clan review: `artifacts/conversion-redesign/after-mentor-clan-review.jpg`
- After Mentor approval result: `artifacts/conversion-redesign/after-mentor-approval-success.jpg`
- After Mentor mobile review: `artifacts/conversion-redesign/after-mentor-mobile.jpg`
- After product changelog drawer: `artifacts/conversion-redesign/after-whats-new.jpg`

## Production configuration still required

Configure either `LEADS_WEBHOOK_URL` (and optional `LEADS_WEBHOOK_TOKEN`) or the three Resend variables documented in `.env.example`. Until then, lead submission deliberately returns `503` and the UI says the request was not delivered. The in-memory abuse guard is per server instance; a durable webhook destination should enforce cross-region deduplication and rate limits.
