# Pathment Marketing Site

This app powers the public marketing experience for Pathment on the apex domain.

## Goal

- `pathment.me` and `www.pathment.me` -> this app
- `app.pathment.me/w/devweekends` (and other workspace paths) -> product app (`client-interface`)
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
2. `https://app.pathment.me/w/devweekends` opens the tenant app.
3. `https://devweekends.pathment.me` redirects to the canonical workspace path.
4. `https://api.pathment.me/api/health` returns a healthy response.
5. No host resolves to the default Nginx welcome page.

## Public pricing and workspace access

The homepage and `/pricing` load published plans from `/api/plans`. This server route reads the public product endpoint `/api/organizations/plans`, forwards no cookies or authorization, and projects only public display fields. Browser clients no longer depend on product API CORS. `NEXT_PUBLIC_API_URL` can override the upstream API base (including `/api`); the default is `https://api.pathment.me/api`. A Next.js server runtime is required for this route.

Pricing uses published monthly amounts and currencies; there are no hardcoded fallback prices. Billing remains manual, and new workspace setup is assisted by the team. The contact link opens an email client; it does not submit a request on this site.

Workspace sign-in accepts a slug, a legacy Pathment subdomain, or an `app.pathment.me/w/<slug>` URL. It always navigates to the canonical product login route. It does not authenticate users or enforce tenant isolation; those remain responsibilities of the product backend.

## Validation

```bash
npx tsc --noEmit
npx eslint .
node scripts/check-workspace-routing.cjs
npm run build
```

The current visual review is in `artifacts/ui-review-v3/`. The earlier `ui-review/` captures are superseded. Colors follow the product public appearance stylesheet: primary green `#008b7d`, action green `#00766c`, dark green `#073d3b`, and canvas `#f5f8f7`. The recognizable P mark now uses the product green tile and a pale mint accent. The inverse wordmark provides a light label for dark surfaces; the on-page brand follows the selected theme.

## Product media

`public/product/` contains real screenshots captured from the local Pathment demo workspace on September 23, 2026: the admin overview, mentor dashboard, mentee dashboard, and mentee learning tasks. They use documented demo accounts and sample activity, not production member data. The gallery supports keyboard tabs and a native enlargement dialog.

The 32-second silent, captioned video is a visual tour assembled from those captures, not a recording of live interactions. Rebuild it with `python3 scripts/generate-product-tour.py` (requires ffmpeg and the local fonts referenced by the script). WebP assets are already compressed and served directly to preserve interface text.

Plan selection carries the published plan name to the setup section and email subject. It does not create a workspace, change entitlements, or send email automatically.

## Appearance and motion

The header theme switch follows the system preference initially and persists explicit light/dark selection in local storage. Semantic color tokens cover both pages, menus, pricing, dialogs, and footer. Motion is restrained and disabled for reduced-motion preferences. Pricing reserves loading space.

The September 23 role captures use a neutral Pathment Demo workspace label and the new green logo in a temporary local preview. The demo mentee received a temporary initials avatar to complete its photo prerequisite. These local presentation changes were restored after capture; no production data or product source changes were retained. Dev Weekends attribution and customer story have been removed from the marketing content.
