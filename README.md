# Pathment Marketing Site

This app powers the public marketing experience for Pathment on the apex domain.

## Goal

- `pathment.me` and `www.pathment.me` -> this app
- `app.pathment.me/w/devweekends` (and other workspace paths) -> product app (`client-interface`)
- `api.pathment.me` -> the shared backend

## Local development

1. Install dependencies:

```bash
cd marketing-site
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Vercel setup

Create a dedicated Vercel project for this folder:

- Project root directory: `marketing-site`
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
