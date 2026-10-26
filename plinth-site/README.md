# Plinth marketing site

Next.js 15 (App Router) · TypeScript · Tailwind 3 · React Three Fiber · GSAP · Rive · dotLottie

## Run

    npm install
    npm run dev          # http://localhost:3000
    npm run build && npm start

Add `?still=1` to the URL for deterministic screenshots (no intro animation, buses frozen).

## Where things live

| What | File |
|---|---|
| Hero (headline, nav, CTAs, WebGL/static fallback chain) | `components/Hero.tsx` |
| Procedural Lekki-style bridge, camera, fog, lamps | `components/BridgeScene.tsx` |
| Danfo buses (GLB, two instances) | `components/Danfo.tsx` |
| Painted road lettering (canvas texture) | `components/RoadLogos.tsx` |
| Pinned 500vh act: problems -> bronzes -> subscriptions | `components/sections/Subscriptions.tsx` |
| Bronze scene + hover/drag + editor (Shift+E) | `components/sections/BronzeCanvas.tsx` |
| Bronze positions, scales, timeline | `lib/bronzes.ts` |
| Self-hosted Rive / dotLottie WASM | `lib/wasm.ts`, `public/wasm/` |
| Rive cursor | `components/RiveCursor.tsx` |

## Tuning the bronzes

Press **Shift+E** in the pinned act. Scroll freezes. Pick a piece, drag the sliders, press **Log all**, then paste the JSON values into `lib/bronzes.ts`.

## Placeholders to replace before launch

- `components/VideoModal.tsx`: `VIDEO_ID` is a placeholder.
- `components/sections/Pricing.tsx`: no prices are invented ("Talk to us").
- `components/sections/Testimonials.tsx`: placeholders only.
- `lib/site.ts`: set `NEXT_PUBLIC_SITE_URL`.
- Footer legal links and `mailto:` addresses.
- `next.config.mjs` ships the CSP as **Report-Only**. Review reports, then switch to enforcing.
