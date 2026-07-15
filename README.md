# Atelier Forma

> *We draw in light.* — An architecture studio website. Space as emotion; architecture that breathes. Rigorous, poetic, silent. Every pixel deliberate.

An editorial, light-themed site for a fictional architecture studio. The thesis is **measure**: a visible grid, drawn first in blueprint lines, then inhabited by light and one warm metal.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens in `tailwind.config.ts`
- **GSAP + ScrollTrigger** — manifesto scroll-scale, process diagram self-draw, blueprint grid
- **Framer Motion** — `layout` reflow for the project filter, the case-study plan-slide, reveals
- Raw **SVG line animation** (stroke-dashoffset) — `lib/svg-draw.ts`
- Custom **crosshair cursor** with lerp lag (0.08)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint (semantic HTML / a11y)
npm run typecheck
```

## Design tokens

| Token | Hex | Role |
|---|---|---|
| `concrete` | `#F5F4F0` | base, the poured floor (~80% of any view) |
| `concrete-2` | `#ECEAE4` | raised panels, alternating bands |
| `line` | `#D8D6D0` | hairlines, the visible grid, blueprint rules |
| `graphite` | `#1A1A1A` | primary text, dark sections |
| `slate` | `#6B6862` | secondary text, captions (AA on concrete) |
| `copper` | `#B87333` | **sole accent**, rationed to ~one element per view |
| `copper-deep` | `#8E5826` | copper for small text where AA matters |

Type: **Space Grotesk** (display/body, ≥8vw section heads, all-caps tracked labels) + **Space Mono** (coordinates, specs, roles, count-up numbers — `tabular-nums`), both self-hosted via `next/font`. Copper is large/decorative only (≈3:1 on concrete); body text uses graphite/slate (AA).

## Sections

1. **Hero** — a self-drawing SVG blueprint grid (stroke-dashoffset on mount), the building behind it, the name last (`components/sections/Hero.tsx`).
2. **Manifesto** — one sentence per screen, scaling small→full as its sticky track scrolls (GSAP scrub).
3. **Projects** — filterable grid (Residential/Commercial/Cultural) with Framer `layout` reflow; case study opens via a horizontal plan-slide with count-up numbers.
4. **Process** — four phases on a vertical copper line; each diagram self-draws on scroll.
5. **Studio** — B&W portraits, name+role in mono, count-up facts.
6. **Contact** — giant `LET'S BUILD`, minimal form, office as architectural coordinates.

Persistent: a fixed **title block** (wordmark, live section label via scroll-spy, coordinate, MENU), a focus-trapped **full-screen overlay nav** (plan-slide), and the **crosshair cursor**.

## /cv route

A print-first studio résumé (`app/cv/page.tsx`): pure white, single column, a projects table. All motion is disabled via `prefers-reduced-motion` **and** an `@media print` net (`app/globals.css`); the crosshair and title block are guarded off the route (`usePathname`).

## Imagery

Photography lives in `public/images/` and is rendered through `components/SiteImage.tsx`,
which lazy-loads each shot (studio portraits in greyscale) and falls back to a quiet concrete
panel if a file is missing. Image paths and alt text are defined alongside the copy in
`lib/content.ts`.

## Accessibility & motion

`prefers-reduced-motion` is honored everywhere: the blueprint grid renders fully drawn, the manifesto scale and process draws become fades, count-ups jump to value, the crosshair disables (native cursor restored), and a global CSS net zeroes remaining animation. The crosshair only runs on fine pointers (`pointer: fine`) — on touch it never mounts and native tap feedback applies. The project filter is semantic `<button aria-pressed>`; the case study and overlay nav are focus-trapped dialogs; focus rings are copper.

## Architecture notes

- `lib/svg-draw.ts` — `drawStrokes()`, the shared stroke-dashoffset utility (hero grid + process diagrams).
- `hooks/useGsapContext.ts` — reduced-motion gate + scoped `gsap.context` lifecycle.
- `lib/motion.ts` — eases (`FORMA_EASE`/`DRAFT_EASE`) + variants (`fadeUp`, `stagger`, `planSlide`).
- `ProjectCard` uses `forwardRef` so Framer `popLayout` can measure it; the grid's `AnimatePresence` uses `initial={false}` (cards present on load, animate only on filter).
- `components/Crosshair.tsx` — the rAF loop sleeps when settled (no perpetual repaint).
