# CROX OIL & GAS — Website

Next.js 16 (App Router, TypeScript, Tailwind v4) rebuild of the [croxoilandgas.com](https://croxoilandgas.com) marketing site, replacing the previous WordPress install.

Content, images, and the colour theme (`#085471` teal / `#eac362` gold) were sourced directly from the live site to match it exactly; leftover demo content from the old "Makaffo" WordPress theme was removed.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** if this repo is checked out under a path containing a space, pass `--webpack` (already the default in `package.json`'s `dev`/`build` scripts) — Turbopack currently fails to resolve paths with spaces.

## Contact form

`src/app/api/contact/route.ts` handles submissions from `/contacts`. Set `RESEND_API_KEY` (see `.env.example`) to send enquiries via [Resend](https://resend.com); without it, submissions are logged server-side instead.

## Structure

- `src/lib/site.ts` — company info, nav, product, and blog post data
- `src/components/` — `Header`, `Footer`, `PageHero`, `ContactForm`, `BlogPostLayout`
- `src/app/` — one route per real page from the live site (products, infrastructure, quality, blog posts, contact)
- `public/images/` — real assets pulled from the site's own media library

## Deploy

Deploys to [Vercel](https://vercel.com) via GitHub integration.
