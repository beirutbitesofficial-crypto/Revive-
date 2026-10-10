# The Revive Club — website

Cinematic one-page site for **The Revive Club** (Beirut Waterfront — gym, basketball, movement, recovery).
Next.js (App Router) · React · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger. Same stack and style as BASST CUT / Sushi Bento / 24i.

All copy, links, hours, photos and the hero film come from the current site, thereviveclub.me.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/  → upload anywhere (Hostinger public_html, Netlify, Vercel…)
```

## Before going live — check `lib/site.ts`

| Field | What |
| --- | --- |
| `whatsapp` | Receives the Register form (pre-filled WhatsApp message). Currently +961 78 745 566. |
| `email`, `instagram`, `app` | Contact links and the booking app link (`wngyy.app.link`). |
| `hours` | Mon–Fri 06:00–23:00 · Sat–Sun 08:00–23:00 |
| `preview` | `true` = hidden from Google (noindex). Set to `false` when the client approves. |

## Structure

| File | What it does |
| --- | --- |
| `components/Hero.tsx` | Full-bleed club film (9:16 cut on phones), REVIVE wordmark drops in letter by letter, the V's violet lines strike last; on scroll the film shrinks into a framed card |
| `components/Marquee.tsx` | Crossed ticker tapes that lean with scroll speed |
| `components/Place.tsx` | 01 — scrubbed word reveal, counters (1 club · 3 rooms · 2 courts), partners |
| `components/Pulse.tsx` | **Signature scene.** Pinned, scroll-scrubbed heart-rate line through one visit: walk in 62 → lift 128 → play 164 → burn 182 → ice 58 → revived 60 BPM. Room colour, BPM and words all follow the pen tip. |
| `components/Inside.tsx` | 02 — desktop: pinned horizontal track of the six spaces. Mobile: swipe carousel |
| `components/Gym.tsx` | 03 — scale-in photo, hollow "Strength · Conditioning" drift, sled-track ruler |
| `components/Court.tsx` | 04 — court lines draw themselves, a basketball arcs across on scroll, Wael Arakji |
| `components/Wellness.tsx` | 05 — thermometer drops 90°C → 3°C as you scroll (sauna → ice bath), URBN V treatments |
| `components/Studio.tsx` | 06 — HIIT & Cycling, neon frames flicker on |
| `components/Movement.tsx` | 07 — Rise / Align / Burn stacked sticky cards (Sarvam) |
| `components/Register.tsx` | 08 — form → WhatsApp message to the club |
| `components/Visit.tsx` | 09 — address, hours, contacts, map |
| `lib/site.ts` | **All brand content & links.** Edit here. |

Media in `public/media/` were re-encoded from the original: hero film 32 MB → 2.7 MB (1.4 MB phone cut), photos to WebP.
Everything respects `prefers-reduced-motion` (pinned scenes become still layouts).
