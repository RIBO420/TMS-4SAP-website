# TMS 4SAP Homepage Redesign — Phase Report

## Status: Built and verified
Date: 2026-04-11
Phases completed: 1, 2, 3, 4
Phases remaining: Post-launch (see `HOMEPAGE-REDESIGN.md` backlog)

## What shipped

### Phase 1 — Foundations
- `src/lib/motion.ts` — motion tokens (duration, easing, distances) consumed by every motion component.
- `src/components/motion/ScrollReveal.tsx` — reusable reveal, honours `prefers-reduced-motion`.
- `src/components/motion/StaggerContext.tsx` — `StaggerGroup` + `StaggerItem` orchestrator.
- Legacy homepages moved to `/legacy/`, `/legacy/nl/`, `/legacy/de/` (preserved, not touched).
- `public/fonts/jetbrains-mono-{regular,bold}.woff2` self-hosted + preloaded in `BaseLayout.astro`.
- `--font-mono` token + `.mono` utility in `src/styles/global.css` with `@font-face` declarations.

### Phase 2 — Static sections (6)
- §1 `HeroAct1.astro` — "Your Monday schedule is wrong by Tuesday lunch." Zero-JS CSS-only choreography, 4×5 Gantt snapshot with amber live pulse + ticker, full EN/NL/DE, visual `role="img"` + `aria-label`.
- §2 `StatStrip.astro` — 4-up mono stat strip with `ScrollReveal` entry.
- §6 `ModuleTrack.astro` — Full-bleed native horizontal scroller, 9 cards, progress rail, keyboard arrow nudges, scroll-snap, `role="list"`, `tabindex="0"` scroller, `role="progressbar"` rail.
- §7 `EditorialQuote.astro` — Centred pull-quote, amber marks, mono attribution.
- §8 `NativeVsNextTo.astro` — Native vs bolted-on SVG diagrams, `sap-pulse` animation guarded by `prefers-reduced-motion`.
- §9 `QuietFinale.astro` — Lowercase closing line, CTA pair, mono footnote.

### Phase 3 — Interactive widgets
- §4 `ProductionScheduler.tsx` + `SchedulerAct4.astro` — Drag weekly Gantt (motion/react `drag="x"`), FLIP re-positioning, 6 focusable `role="button"` job blocks with `aria-label`, `aria-live="polite"` SR region, SR-only `<table>` fallback.
- §5 `ShopFloorBeats.astro` — 300vh sticky-pin story, 3 beats via CSS `animation-timeline: scroll(self)`, mobile + reduced-motion fallback to stacked non-pinned layout (`@media (prefers-reduced-motion: reduce) { .beats__pin-outer { display: none !important } }`).
- `OEEDials.tsx` — Radial OEE gauges with scroll-linked fill and a static variant for reduced-motion.
- `IndustryMorph.tsx` — 4-chip industry selector with `AnimatePresence`, focusable `<button>` chips.

### Phase 4 — Polish & verify
- Playwright: 4 routes × 2 viewports = 8 full-page screenshots + 1 reduced-motion shot.
- Reduced-motion verified on EN/NL/DE — pin hidden, stacked rendered, 3 beats present.
- Keyboard audit on `/`: 31 tab stops captured, skip link + scheduler + module track reachable.
- Mobile 375×812 verified: no horizontal overflow, hero unclipped, beats unpinned, module track scrolls natively.
- Fix applied: dev HMR stale-cache reload (no source changes needed, see below).

## Verification results

### Route coverage table
| Route     | Viewport | Status | H1 | H2 | Sections | Broken imgs | Console err | Net fail |
|-----------|----------|--------|----|----|----------|-------------|-------------|----------|
| /         | desktop  | 200    | 1  | 11 | 8        | 0           | 0           | 0        |
| /         | mobile   | 200    | 1  | 11 | 8        | 0           | 0           | 0        |
| /nl/      | desktop  | 200    | 1  | 11 | 8        | 0           | 0           | 0        |
| /nl/      | mobile   | 200    | 1  | 11 | 8        | 0           | 0           | 0        |
| /de/      | desktop  | 200    | 1  | 11 | 8        | 0           | 0           | 0        |
| /de/      | mobile   | 200    | 1  | 11 | 8        | 0           | 0           | 0        |
| /legacy/  | desktop  | 200    | 1  |  9 | 7        | 0           | 0           | 0        |
| /legacy/  | mobile   | 200    | 1  |  9 | 7        | 0           | 0           | 0        |

H2=11 because `NativeVsNextTo` has 2 panel headings and the scheduler has an internal title — single-H1 outline preserved.

### Performance approximation (dev server)
| Route (desktop) | DCL ms | loadEnd ms | LCP approx                      |
|-----------------|--------|-----------|----------------------------------|
| /               | 200    | 286       | §1 hero section (SVG + H1)      |
| /nl/            | 156    | 248       | §1 hero section (SVG + H1)      |
| /de/            | 146    | 253       | §1 hero section (SVG + H1)      |
| /legacy/        | 199    | 278       | §1 legacy hero section          |

### Accessibility findings (all PASS)
- Skip link: first Tab focuses `.skip-link`; Enter jumps to `#main-content`.
- Heading hierarchy: one H1 per locale, coherent H2 sequence.
- Tab order: skip → logo → nav → NL/DE → Book Demo → hero CTAs → 6 scheduler jobs → IndustryMorph chips → module cards.
- Reduced-motion: `.beats__pin-outer` `display:none`, `.beats__stacked` `display:block`, 3 items, `sap-pulse` disabled.
- Scheduler: 6 `role="button"` jobs with `aria-label`, `aria-live="polite"` region, SR-only `<table>` fallback.
- Module track: `tabindex="0"` scroller, `role="list"`, 9 cards, scrollWidth 3280 > clientWidth 1440, `role="progressbar"` rail.
- Mobile touch targets: hero primary 54×201, secondary 54×163. The three 0×0 `.nav-link-trigger` entries are `display:none` behind the hamburger — not focusable.
- Mobile horizontal scroll: `body.scrollWidth === innerWidth === 375`.

## Fixes applied in Phase 4

1. **Stale Astro dev HMR cache** — Initial run showed `ShopFloorBeats.astro` and `HeroAct1.astro` scoped stylesheets serving an old placeholder ruleset, not the current `.beats__pin-outer` / `.hero__cta` rules. Hero CTAs computed `display: inline` with zero padding; sticky-pin outer was `block` at 375 px. HMR had picked up new markup + new `data-astro-cid-*` but kept the old scoped CSS. **Fix**: `touch` all 8 home-section `.astro` files to force rebuild of each scoped stylesheet. Re-run confirmed correct computed styles (pin=none / stacked=block on mobile, hero CTA 54×201 with padding applied). No source changes needed.
2. **Verify script: Selectors-L4 `i` flag** on `[aria-label*="scheduler" i]` returned no match in Chromium querySelector. Replaced with `.scheduler-widget` class + regex. Widget hydrates correctly on scroll.
3. **Verify script: skip-link test contaminated by earlier Tab trail** — previous 30-Tab walk had moved focus, so `Tab+Enter` activated a nav link and navigated the page. Added `page.goto` resets before the skip-link assertion and before the scheduler audit. All assertions now run on a clean page state.

## Known issues / backlog
Not broken, to address later:
- Lighthouse / PSI and Axe not run — need real tooling against a production build.
- Native copywriter pass deferred (Q6). NL/DE are translations of EN; mother-tongue pass pending.
- §3 before/after slider deferred (Q4). `StatStrip` occupies §2 slot.
- Real screenshots + fictional data swap deferred (Q1). Stats, job IDs, station numbers, ticker lines are placeholders.
- `ModuleTrack` arrow-key affordance: add a mono hint shown on `:focus-visible`.
- `OEEDials` scroll-linked variant may resolve empty at very short pages or >175% zoom.
- Collapsed mobile nav triggers stay in the DOM as `display:none` buttons; conditional render on hydrate would be cleaner.
- Legacy cut-over: `src/pages/legacy/` still mirrors old routes — remove after sign-off.

## Git status
57 modified + 5 deleted (`src/main.js`, `src/style.css`, `src/content/config.ts`, `src/data/{features,navigation}.ts`, `public/images/hero-dashboard.jpeg`). Untracked: `public/fonts/`, motion reveal/stagger components, `src/components/sections/home/` (8), `src/components/widgets/` (3), `src/lib/`, `src/pages/legacy/` (3), new 404 pages.

`git diff --stat`: 57 files, +2294 / −4113. Net negative — replaced 929-line `src/style.css`, removed orphan `src/main.js`, `src/pages/index.astro` shrank 726 → 25 lines.

## Next steps
- **Cut-over**: remove `/legacy/` route after preview-deploy QA; keep files in git history.
- **Real Lighthouse + Axe**: run against `npm run build && npm run preview`. Expect LCP-light (SVG hero).
- **Swap fictional data**: walk hero ticker, stat strip, scheduler jobs, OEE values, quote attribution, module descriptions with the TMS team.
- **CI**: drop `/tmp/tms-audit/verify_phase4.py` into `scripts/verify.py` and wire into a headless `astro dev` job.
- **Commit strategy**: split into 4 commits — (1) legacy move, (2) foundations + fonts + tokens, (3) Phase 2 sections, (4) Phase 3 widgets.
