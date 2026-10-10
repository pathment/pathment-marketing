# Pathment Marketing Site

This app powers the public marketing experience for Pathment on the apex domain.

## Goal

- `pathment.me` and `www.pathment.me` -> this app
- `app.pathment.me/w/<workspace>` -> product app (`client-interface`)
- `api.pathment.me` -> the shared backend

## Local development

1. Install dependencies:

```bash
cd pathment-marketing
npm install
```

2. Run development server:

```bash
npm run dev
```

Copy `.env.example` to `.env.local` and add server-only lead-delivery values, or use `vercel env pull .env.local` after linking the project. Never commit `.env.local`.

3. Open `http://localhost:3000`.

## Vercel setup

Create a dedicated Vercel project for this folder:

- Project root directory: `pathment-marketing`
- Framework preset: Next.js
- Build command: `next build`
- Output directory: `.next` (default)

Add domains to this project:

- `pathment.me`
- `www.pathment.me`

Add `app.pathment.me` to the separate product Vercel project.

## DNS mapping strategy

Use this split so marketing and product remain independent:

- Apex and `www` records -> Vercel marketing project
- `app.pathment.me` -> product Vercel project
- `api.pathment.me` -> DigitalOcean droplet / Nginx
- Existing tenant subdomains -> product project during the redirect transition

## Deployment sanity checks

1. `https://pathment.me` shows the landing page from this folder.
2. `https://app.pathment.me/login` opens global product sign-in.
3. `https://app.pathment.me/register` opens public organization registration.
4. `https://api.pathment.me/api/health` returns a healthy response.
5. No host resolves to the default Nginx welcome page.

## Public pricing, signup, and workspace access

The homepage and `/pricing` load published plans from `/api/plans`. This server route reads the public product endpoint `/api/organizations/plans`, forwards no cookies or authorization, and projects only public display fields. Browser clients no longer depend on product API CORS. `NEXT_PUBLIC_API_URL` can override the upstream API base (including `/api`); the default is `https://api.pathment.me/api`. A Next.js server runtime is required for this route.

Pricing uses published monthly amounts and currencies; there are no hardcoded fallback prices. Public organization creation goes to `https://app.pathment.me/register`; existing members use invitation links. Global sign-in always goes to `https://app.pathment.me/login` and never to a customer-specific workspace.

## Buyer-interest delivery

`POST /api/buyer-interest` validates leads on the server, uses a honeypot and minimum-fill-time check, applies a per-instance rate limit, and reports duplicate, validation, rate-limit, and delivery failures explicitly. A request is only shown as successful after one of these server-only delivery options accepts it:

- `LEADS_WEBHOOK_URL` and optional `LEADS_WEBHOOK_TOKEN` for a CRM or durable lead service (preferred).
- `RESEND_API_KEY`, `LEAD_NOTIFICATION_TO`, and `LEAD_NOTIFICATION_FROM` for recoverable email delivery.

Private recipients and tokens must never use a `NEXT_PUBLIC_` prefix. Configure at least one delivery option before production; without one, the endpoint returns `503` and the form accurately says the lead was not delivered. The in-memory duplicate and rate-limit guard is a baseline for serverless instances; connect the webhook to a durable store for cross-region deduplication and abuse controls.

## Validation

```bash
npx tsc --noEmit
npx eslint .
npm test
npm run build
```

The current visual review is in `artifacts/ui-review-v3/`. The earlier `ui-review/` captures are superseded. Colors follow the product public appearance stylesheet: primary green `#008b7d`, action green `#00766c`, dark green `#073d3b`, and canvas `#f5f8f7`. The recognizable P mark now uses the product green tile and a pale mint accent. The inverse wordmark provides a light label for dark surfaces; the on-page brand follows the selected theme.

## Product media

`public/product/` contains real screenshots captured from the local Pathment demo workspace on September 23, 2026: the admin overview, mentor dashboard, mentee dashboard, and mentee learning tasks. They use documented demo accounts and sample activity, not production member data. The gallery supports keyboard tabs and a native enlargement dialog.

The 32-second silent, captioned video is a visual tour assembled from those captures, not a recording of live interactions. Rebuild it with `python3 scripts/generate-product-tour.py` (requires ffmpeg and the local fonts referenced by the script). WebP assets are already compressed and served directly to preserve interface text.

Plan selection carries the published plan name to the setup section and email subject. It does not create a workspace, change entitlements, or send email automatically.

## Appearance and motion

The header theme switch follows the system preference initially and persists explicit light/dark selection in local storage. Semantic color tokens cover both pages, menus, pricing, dialogs, and footer. Motion is restrained and disabled for reduced-motion preferences. Pricing reserves loading space.

The September 23 role captures use a neutral Pathment Demo workspace label and the new green logo in a temporary local preview. The demo mentee received a temporary initials avatar to complete its photo prerequisite. These local presentation changes were restored after capture; no production data or product source changes were retained.

The interactive `/demo` route intentionally uses the fictional Dev Weekends seed scenario to mirror the current product source, role navigation, workspace tabs, and sample workflows. Visitors first choose Web or Mobile and then choose Admin, Mentor, or Mentee. The Web preview contains 31 Admin, 23 Mentor, and 14 Mentee destinations with route-specific product screens. The Mobile preview follows the native role navigation and includes the complete screen directory for each role, filled sample data, and safe simulated inputs. Neither preview authenticates, uses cookies, calls the application API, or writes to a workspace.

## Android product experience

The homepage keeps the device choice concise and links directly to the complete Web and Android explorers. The full preview at `/demo?device=mobile` follows the native Admin, Mentor, and Mentee tab structures, uses representative fictional data, and supports role switching, screen navigation, and clearly simulated actions.

The Google Play destination is centralized in `lib/links.ts`. The current URL is `https://play.google.com/apps/testing/me.pathment.app` and can be replaced in one place when the public listing URL is available. Customer-facing copy intentionally calls it the Android app without discussing release-stage details.
