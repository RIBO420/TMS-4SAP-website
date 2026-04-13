# TMS 4SAP Homepage Redesign — Plan

_Owner: Frontend / Design_  ·  _Status: Plan locked — Phase 1 ready to start_  ·  _Target: replace `src/pages/index.astro` + `src/pages/nl/index.astro` + `src/pages/de/index.astro`, legacy moves to `/legacy/`_

## User Decisions (Locked)

| # | Question | Answer | Impact |
|---|---|---|---|
| 1 | Fictional `clients.ts` / `testimonials.ts` — real ones coming? | **Swap later** | Ship with visible "Composite scenario" micro-label. Re-swap is a post-launch task. |
| 2 | "30-min sandbox on your own data" offer real? | **No — not doable** | All "your own routings / your own data" promises stripped from hero + §9. Replaced with "technical walkthrough" language. |
| 3 | Case-study PDF exists for §9 button? | **Yes** | Primary CTA stays: gated PDF download. |
| 4 | Who owns SAP-B1 + TMS screenshots for §3? | **No owner yet** | **§3 CUT from Phase 2.** Section stays specced for future but ships 8-section homepage. |
| 5 | Sales OK with "ISA-95 L3+4" and "IATF 16949 ready" claims in EN/NL/DE? | **Yes** | §2 credentials locked, no sign-off needed. |
| 6 | Budget for NL/DE native copywriter in Phase 4? | **No — ship seed copy** | Phase 4 loses the translation-pass line. Seed EN/NL/DE from this plan ships as-is. |
| 7 | `stats.ts` "25+ years / 500+ implementations / 30+ countries" verifiable? | **Yes, verifiable** | §2 upgrades in place — real numbers replace R5's placeholder metrics. |
| 8 | Delete legacy homepage on cutover? | **Keep under `/legacy/`** | New pages live at `src/pages/index.astro`; old ones move to `src/pages/legacy/index.astro` + `nl/legacy/` + `de/legacy/`. |

**Unblocked status:** Phase 1 (foundations) can start immediately. Phase 2 ships 8 sections (§3 deferred). Phase 3 critical path = §4 scheduler. Total effort revised to **17–20 dev days** (down from 18–22, minus §3).

## Executive Summary

The current homepage is a standard SAP-partner template: hero, logo carousel, feature grid, testimonial slider, CTA banner. It reads as generic B2B SaaS and hides the one thing TMS genuinely owns — a native manufacturing suite that sits _inside_ SAP Business One rather than next to it. The redesign replaces that template with a 7-act scroll narrative, 8 differently-shaped sections, one hero-grade interactive (a Gantt scheduler), and a motion system engineered around `framer-motion` primitives we already ship. Signature moves: (1) the draggable Production Scheduler at mid-page, (2) a side-by-side "Native vs Next-to" architecture comparison, (3) a sticky-pin shop-floor beat scene. Estimated effort: **17–20 dev days**, of which ~6 are the scheduler widget. All content blockers resolved — fictional customer data ships with "Composite scenario" labels until real references are swapped in.

## Design Direction

**Voice.** First-person operator, not vendor. Short sentences. No marketing verbs — banned list: _transform, revolutionize, unlock, empower, next-level, seamless, turnkey, best-in-class, synergy_. Earned references only: ISA-95 levels 3 and 4, IATF 16949, GoBD, OEE / Nakajima world-class 85%.

**Aesthetic.** Industrial precision. Flat, mechanical, competent — the feeling of a well-made shop drawing, not an illustrated explainer. Amber (`#F59E0B`-family, existing token) is the only accent. Type stack keeps the existing sans for body and adds a mono face (JetBrains Mono or IBM Plex Mono, self-hosted) strictly for data readouts (timestamps, cycle counts, order IDs) — never for headlines. Grid is 12-col at 1280px max-width, with 2 full-bleed exceptions (§4 scheduler, §6 module track).

**References we steal from.** Linear (chaptered sticky-split narrative), Attio (tab-scrubbed hero cross-fade), Stripe (metric-anchored proof strip with real counters).

**References we reject and why.**
- Retool illustrated dreamscape / Stripe mesh gradients — reads consumer SaaS, wrong for operations directors.
- Framer physics scroll / Raycast hover whimsy — feels unserious to an auditor buying IATF compliance.
- Vercel WebGL globe — disallowed by stack (no `three`, no `@react-three/*`) and a cliché.
- Isometric illustration (R5 original §8) — AI-generation cliché unless executed with real craftsmanship. Cut outright in favour of 2D orthographic panels.
- Glassmorphism, gradient text, purple gradients, auto-carousels, WebGL anything, neon glows, hover tilt-3D.

## Critic Pass — What We Changed From R1–R5

1. **Shop-floor ticker (R1).** _Kept, but demoted and contained._ A mono ticker above the hero reads like a dev-tool affectation. Instead: ticker lives _inside_ the hero visual panel as a stream under the scheduler cross-fade, `aria-hidden="true"`, 4 lines visible, fade-top/fade-bottom. Factory-floor credibility without fighting the headline.
2. **Isometric ecosystem (R5 §8).** _Cut and replaced._ Replaced with R2's Act VI "Native vs Next-to" side-by-side 2D orthographic SVG comparison. No illustration commission.
3. **Hero copy conflict.** R5 proposed _"Your shop floor runs in Excel. SAP doesn't know that."_ R2 proposed _"Your Monday schedule is wrong by Tuesday lunch."_ Winner: **R2** — specific, temporal, ops-director first-person. R5's line villainizes SAP on an SAP-certified product.
4. **Scheduler placement.** R2 puts it in Act IV, R3 calls it the hero, R5 nests it in §5 sticky-pin. Winner: **own §4 section**, full-bleed, above sticky-pin. Hero placement = LCP risk. §5 nesting = wasted interaction.
5. **Stat strip metrics.** R5 invented "27 manufacturers / €3.2M saved". **Replaced** with real `stats.ts` numbers (Q7 answer: verifiable) — _25+ years · 500+ implementations · 30+ countries · 9 modules_. Credentials row "ISA-95 L3+4 · IATF 16949 ready" sits underneath.
6. **Newsletter finale (R5 §9).** TMS has no newsletter. Cut. Replaced with **"Get the case-study pack"** (PDF download, confirmed exists per Q3) + secondary "Book a technical walkthrough."
7. **§3 before/after slider.** **CUT from Phase 2** (Q4 answer: no screenshot owner). Spec preserved for Phase 5 if Design capacity appears. Homepage ships 8 sections; rhythm re-audited below.
8. **R2/R3 said "eight modules."** Wrong — there are **9** (PPS, APS, MES, PDC, QM, PDM, BI, VC, DMS). All copy, ring diagrams, module-track section count locked to 9.
9. **"Your own data / 30-min sandbox" offer.** **CUT from all CTAs** (Q2 answer: not doable). Hero CTAs and §9 both rewritten to "technical walkthrough" — no promises about customer-specific data.
10. **Testimonials.** `testimonials.ts` is fictional (Q1). Ships with visible "Composite scenario" micro-label in §7 until real quotes replace them. Post-launch swap planned.

## The 7-Act Narrative — Locked Copy

Seed EN/NL/DE. Current copy ships as-is (Q6 answer: no copywriter budget).

**Act I — The Obsolete Plan**
- EN: "Your Monday schedule is wrong by Tuesday lunch."
- NL: "Je planning van maandag klopt niet meer na dinsdagmiddag."
- DE: "Ihr Montagsplan stimmt schon Dienstagmittag nicht mehr."
- Sub (EN): "Every shop floor runs on two schedules: the one in SAP, and the real one on the whiteboard."

**Act II — The Spreadsheet Factory**
- EN: "Phones, whiteboards, and a planner who never goes on holiday."
- Sub: "Average OEE in SMB discrete manufacturing sits near 58%. Nakajima called 85% world-class forty years ago."

**Act III — The Reframe**
- EN: "Nine modules. One SAP Business One data layer."
- Sub: "Not connectors. Not a sidecar. Inside the same database your finance team already closes books on."

**Act IV — Ninety Seconds on the Floor**
- EN: "Drag one job. Watch the rest of the week re-plan."
- Sub: "This is the real PPS scheduler running on a dummy routing. Try it."

**Act V — Who Already Runs This** _(composite scenarios until real refs swap in)_
- EN: "Plastics. Metal. Automotive tier-2. Electronics."
- Sub: "Four verticals. One codebase. Segment-specific compliance built in."

**Act VI — Native, Not Next To**
- EN: "Inside SAP Business One. Not next to it."
- Sub: "No nightly sync. No mapping layer. ISA-95 levels 3 and 4 in the same client your controllers already use."

**Act VII — Talk to the engineer who would deploy it**
- EN: "A solution engineer. A live scheduler. Thirty minutes."
- NL: "Een solution engineer. Een live planner. Dertig minuten."
- DE: "Ein Solution Engineer. Ein Live-Planer. Dreißig Minuten."
- Sub (EN): "Not a sales deck. A working product walkthrough from the engineer who would run your implementation."

## Wireframe — 8 Sections (§3 deferred to post-launch)

Rhythm (top-to-bottom vertical padding, px): 140 / 88 / 160-focus / 300vh-pinned / 120 / 200 / 140 / 140. Alternating alignments; 5 asymmetric, 2 full-bleed, 1 editorial. Archetype sequence: A → I → full-bleed-focus → B → E → D → G → J → N (9 unique archetypes across 8 sections — §4's single-focus is distinct from §1's 60/40 split).

### §1 Hero — Archetype A (full-bleed asymmetric, 60/40 split)
```
┌──────────────────────────────────────────────────────┐
│ 01 · PLAN                              [amber rule]  │
│                                                      │
│ Your Monday schedule is                ┌──────────┐  │
│ wrong by Tuesday lunch.                │ static   │  │
│                                        │ Gantt    │  │
│ [sub copy two lines]                   │ snapshot │  │
│                                        │ + ticker │  │
│ [See the scheduler]  [Walkthrough]     │ overlay  │  │
│ SAP-certified · ISA-95 · IATF ready    └──────────┘  │
└──────────────────────────────────────────────────────┘
```
- Grid: 7 col headline / 5 col visual, gap 64px, max-w 1280.
- Mobile: stack, visual first at 240px height.
- **CTA change:** primary "See the scheduler" (scrolls to §4), secondary "Book walkthrough" (links to `/demo/`). Trust row replaces the previous "NDA / No BOM" line — that offer is gone.
- Motion: hero choreography from §Motion System. Visual is static SVG + the mono ticker (4 lines, fade). **No scheduler interaction on hero** — that's §4.
- Narrative: Act I.
- Astro component: new `src/components/sections/home/HeroAct1.astro`.

### §2 Stat strip — Archetype I (mega numbers, no cards)
```
25+ YEARS   500+ IMPLEMENTATIONS   30+ COUNTRIES   9 MODULES
────────────────────────────────────────────────────────────
ISA-95 levels 3 + 4  ·  IATF 16949 ready  ·  SAP-certified
```
- 88px vertical padding; type is 72px mono-weighted condensed with 14px small-caps label below.
- **Verified numbers from `src/data/stats.ts`** (Q7 unblocked) + credentials row (Q5 unblocked).
- Motion: `AnimatedCounter.tsx` (existing). Stagger 80ms per cell.
- Narrative: Act I bridge → II.

### §3 Before / After — **DEFERRED to post-launch** (Q4: no screenshot owner)
- Spec retained below for when Design capacity appears.
- Ship decision: homepage compresses to 8 sections; no placeholder slot.
- When unblocked: draggable divider between SAP B1 standard production screen and TMS PPS scheduler view of the same order. 16:9 full-width. Mobile toggle pill.
- Narrative: Act II bridge to IV (currently served by §2 → §4 transition).

### §4 Interactive Scheduler — Archetype Full-bleed Single-Focus
```
┌──────────────────────────────────────────────────────┐
│ 04 · PRODUCE                                         │
│ Drag one job. Watch the rest of the week re-plan.    │
│                                                      │
│  Mon    Tue    Wed    Thu    Fri                     │
│  ────── ────── ────── ────── ──────                  │
│  │M1│ ██████░░░░                                     │
│  │M2│    ██████░░░░░░                                │
│  │M3│ ░░░░██████░░                                   │
│  │M4│       ██████░░                                 │
│                                                      │
│  Utilisation 72% → 88%   Late badge: ON-TIME         │
└──────────────────────────────────────────────────────┘
```
- Full-bleed, dark panel, 640px minimum visual height.
- Widget spec below.
- Narrative: Act IV.

### §5 Sticky-pin shop-floor beats — Archetype B (300vh pinned scroll story)
Three beats scroll-linked to a single sticky-inner visual (single SVG, stages via `useTransform`):
1. Operator scans NOK at station 12.
2. SAP B1 document auto-adjusts (mono ticker lights up the line).
3. OEE dial re-calculates live; line supervisor's phone buzzes.
- Mobile: 3 stacked static panels; no pin.
- Reuses OEE dial SVG from §5 supporting widget.
- Narrative: Act II bridge → Act III.

### §6 9-Module horizontal track — Archetype E (full-bleed horizontal scroll)
- 9 cards (PPS APS MES PDC QM PDM BI VC DMS) in a native horizontal scroller with snap-points. Progress rail at bottom. Keyboard arrows + drag.
- No framer carousel; native `overflow-x: auto; scroll-snap-type: x mandatory`.
- Narrative: Act III.
- Data: `src/data/modules.ts` directly.

### §7 Editorial quote break — Archetype G
- Single 48px quote, 200px vertical padding, no portrait, no card, no logo.
- Copy from `src/data/testimonials.ts` **with visible `Composite scenario` micro-label** (Q1: swap later).
- Narrative: Act V.

### §8 Native vs Next-To — Architecture comparison
```
  TYPICAL                           TMS 4SAP
  ┌────────────┐                    ┌────────────┐
  │  MES tool  │                    │            │
  └─────┬──────┘                    │ SAP B1 +   │
        │ nightly sync              │ TMS (one   │
  ┌─────▼──────┐                    │   db)      │
  │  SAP B1    │                    │            │
  └────────────┘                    └────────────┘
```
- Two clean 2D orthographic SVG panels side by side, labelled edges, connector lines dashed for "sync" vs solid for "native." No isometric. No illustration commission.
- Caption below each panel in mono. 6 hotspots total (3 per panel).
- Narrative: Act VI.

### §9 Quiet finale — Archetype N (640px centered)
- H3: "A solution engineer. A live scheduler. Thirty minutes."
- Sub: "Not a sales deck. A working product walkthrough from the engineer who would run your implementation."
- Primary button: **"Get the case-study pack (PDF)"** → gated download (Q3 unblocked).
- Secondary: **"Book a technical walkthrough"** → `/demo/`.
- Below: 3 most recent blog links + the client wordmark line (10 names from `clients.ts` dimmed, with a `Representative clients` micro-label until Q1 swap).
- Narrative: Act VII.
- **Note:** no "30-min sandbox" / "your own data" / "upload your routings" language anywhere (Q2).

## Interactive Widget Specs

### Hero-grade: Production Scheduler (§4)
- **Tech.** Inline SVG grid, 4 machines × 5 days × 24 half-day slots. React + `framer-motion`. `motion.g` with `layoutId` per job block. Drag constraints to slot grid, `onDragEnd` snaps and triggers downstream FLIP re-layout. State in local `useReducer`. Six seeded jobs.
- **Counters.** Utilisation 72 → 88, late-delivery badge flips green → amber on collision. Both use existing `src/components/motion/AnimatedCounter.tsx`.
- **Fallbacks.** `useReducedMotion()` → instant snap, no FLIP. JS-off → static before/after SVG pair. Mobile <768 → 3 rows × 6 hours, tap a block then arrow-key nudge. Keyboard a11y required: Tab selects a block, arrow keys nudge, Enter commits.
- **Budget.** ~35 KB gz net new. Effort: L (~6 dev days including a11y + tests).
- **Acceptance.** Can drag a job on desktop Chrome/Firefox/Safari, keyboard path works end-to-end, reduced-motion user sees no animation, screen reader announces "Job J3 moved from Wednesday to Thursday," Lighthouse perf ≥ 90 on the route.

### Supporting A: OEE dial cluster (§5 sticky-pin)
- **Tech.** 4 SVG dials (Availability 87, Performance 94, Quality 99.2, OEE 81.1). Scroll-linked via `useScroll` + `useTransform` stroke-dashoffset. World-class 85 benchmark as a static tick mark.
- **Fallbacks.** Reduced motion → final state static. JS-off → SVG at final state.
- **Budget.** ~12 KB gz. Effort: S (~1.5 days). Reuses existing `AnimatedCounter`.
- **Acceptance.** Dials fill between 25% and 75% of viewport scroll progress; final values readable in DOM as text.

### Supporting B: Industry morph selector (§5 sidebar or §6 overlay)
- **Tech.** 4 chips (Plastics / Automotive / Metal / Electronics). `AnimatePresence mode="wait"` cross-fades a small stats block + screenshot slot + quote line. Content from `src/data/industries.ts`.
- **Fallbacks.** No-JS → 4 static stacked panels. Reduced motion → instant swap, no fade.
- **Budget.** ~8 KB gz. Effort: S (~1 day).
- **Acceptance.** Chip is a real `<button>` with `aria-pressed`; keyboard tab/enter works; layout never shifts.

Total new JS: **~55 KB gz**. Well under the +150 KB motion+widget budget.

## Motion System

Lives at `src/lib/motion.ts` (new file). Single source of truth:

```ts
export const EASE = {
  outQuart: [0.25, 1, 0.5, 1],
  outQuint: [0.22, 1, 0.36, 1],
  outExpo:  [0.16, 1, 0.3, 1],
} as const;

export const MOTION = {
  feedback: { duration: 0.15, ease: EASE.outQuart },
  state:    { duration: 0.22, ease: EASE.outQuart },
  enter:    { duration: 0.60, ease: EASE.outQuart },
  hero:     { duration: 0.80, ease: EASE.outExpo },
  stagger:      0.08,
  heroStagger:  0.09,
} as const;
```

**Hero choreography offsets (ms):** eyebrow 0 · H1 90 · sub 260 · primary CTA 400 · secondary CTA 470 · trust 560 · hero visual 180 (slow).

**Components to add/keep.**
- New `src/components/motion/ScrollReveal.tsx` — `useInView` with margin `-80px`, `useReducedMotion()` short-circuit, direction prop (up/left/right/scale), consumes `MOTION.enter`.
- New `src/components/motion/StaggerContext.tsx` — parent stagger controller used by §2 stat strip and §6 module track.
- Keep and reuse: `AnimatedCounter.tsx`, `AnimatedText.tsx`, `MotionHero.tsx`, `FadeInView.tsx`, `AnimatedCard.tsx`, `AnimatedStatBar.tsx`, `StaggerChildren.tsx`.

**Scroll-linked section rule (§5 only).** Native 300vh outer + sticky inner + `useScroll` + `useTransform`. Never `scrollTo`. Never `overflow: hidden` on `<body>`. 0.3× bg parallax, progress indicator on left edge, stages 0/1/2 via `useTransform` on opacity.

**Micro-interactions.**
- Buttons: scale 1.02 on hover, 0.98 on active, 150ms.
- Cards: elevation via `box-shadow` only (transform-scale breaks the 12-col grid).
- Underline: `scale-x` from left-origin.
- Focus: 2px amber outline, 150ms.

**Anti-patterns (banned).** Spring/bounce/damping physics. Gradient-text animation. Auto-carousels (the `LogoCarousel.astro` wordmark becomes a static line). Parallax on H1/sub. Animated `letter-spacing` or `font-weight`. Scroll-jacking. `will-change` on anything except the hero visual.

**Perf rules.** Only `transform` and `opacity` animate. `content-visibility: auto` on all sections below the fold. Motion net budget ≤ 40 KB gz (separate from widget JS).

## Content & Assets Required

### BLOCKING — NONE
All Phase 2 content blockers resolved by user decisions.

### NICE-TO-HAVE — ship degraded without them
- Real customer logos at §9 wordmark line (post-launch swap, Q1).
- Real testimonial quotes to replace composite scenarios (post-launch swap, Q1).
- Real SAP-B1 + TMS screenshots to unblock §3 (post-launch when Design capacity appears, Q4).
- Verified customer metrics (avg OEE lift, typical payback) to expand §2 beyond the current 4-number strip.
- Custom illustration for §1 hero visual (current plan uses tight static SVG — no commission needed).
- Self-hosted mono font file (fallback: system `ui-monospace`).

## Implementation Phases

### Phase 1 — Foundations (3 dev days)
- Create `src/lib/motion.ts` with tokens.
- Add `ScrollReveal.tsx` and `StaggerContext.tsx` under `src/components/motion/`.
- Set up `src/components/sections/home/` folder + empty Astro shells for §1, §2, §4, §5, §6, §7, §8, §9.
- **Move legacy homepage** (Q8): `src/pages/index.astro` → `src/pages/legacy/index.astro`, same for `nl/` + `de/`. Wire redirect-free routing so `/legacy/` stays accessible.
- Wire new homepage skeleton at `src/pages/index.astro`.
- Mono font self-hosting under `public/fonts/`.
- Decide whether to keep `MotionHero.tsx` or supersede with `HeroAct1.astro` + `ScrollReveal` (recommended: supersede, delete after §1 ships).

### Phase 2 — Static sections (5 dev days)
- §1 Hero (1 day — content first, no widget).
- §2 Stat strip (0.5 day).
- §6 Module horizontal track (1 day, reuses `modules.ts`).
- §7 Editorial quote (0.25 day).
- §8 Native vs Next-To SVG panels (1.5 days — two clean SVGs + hotspot tooltips).
- §9 Finale (0.75 day).
- _§3 before/after: deferred to post-launch (Q4)._

### Phase 3 — Interactive widgets (8 dev days)
- §4 Scheduler (6 days — critical path).
- §5 Sticky-pin + OEE dials (1.5 days).
- §5 Industry morph selector (0.5 day).

### Phase 4 — Polish, motion, a11y, perf (1.5 dev days)
- Hero choreography timing pass.
- Keyboard audit end-to-end (scheduler is the hard one).
- `prefers-reduced-motion` audit on every animated component.
- Lighthouse performance run on `/`, `/nl/`, `/de/`; must clear 90 perf / 100 a11y.
- _NL/DE copywriter pass: dropped (Q6 — seed copy ships)._

**Critical path:** Scheduler widget (§4). If it slips, the rest of the page ships without it and §4 falls back to a static two-panel before/after of the scheduler — same layout, no drag. Total: **17–20 dev days.**

## Risk & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Scheduler widget exceeds 6 days | M | H | Fall back to static before/after SVG pair in §4; ship without drag. |
| Motion budget blown on `framer-motion` footprint | L | M | Lazy-import `motion` only on sections that need it; §2/§6/§9 use CSS-only. |
| LCP regresses from hero visual | L | H | Hero visual is static SVG inlined in HTML, no image decode, no JS for first paint. |
| `prefers-reduced-motion` paths untested | M | M | Dedicated Phase 4 audit; playwright test for each motion component with the media query forced. |
| Seed NL/DE copy reads rough | M | L | Acceptable trade-off per Q6. Polish later if customer feedback complains. |
| Legal complains about composite testimonials | L | L | Micro-label "Composite scenario" is explicit enough; escalate only if requested. |

## What We're NOT Doing

Explicit non-goals. Do not let scope creep back in.

- **No WebGL, no `three.js`, no 3D globe.** Disallowed.
- **No isometric illustration.** Cut in favour of 2D orthographic SVG (§8).
- **No tab-scrubbed hero visual.** Removed to protect LCP and Phase 3 budget.
- **No newsletter.** TMS has no newsletter. Do not ship an email input.
- **No "your own data" / "your own routings" / "30-min sandbox" promises in CTAs.** (Q2)
- **No logo carousel.** `LogoCarousel.astro` stays in the codebase but no longer used on the homepage; becomes a static wordmark line in §9.
- **No 2-testimonial grid.** Replaced by the single editorial §7.
- **No generic CTA banner.** `CTABanner.astro` not used on homepage; replaced by §9.
- **No gradient text, no glassmorphism, no purple-gradient anything.**
- **No hover tilt-3D cards, no cursor-following glow, no magnetic buttons.**
- **No scroll-jacking on §5.** Native sticky only.
- **No animation on H1 letter-spacing or font-weight.**
- **No §3 in first launch.** Deferred to post-launch (Q4). Re-evaluate once screenshots exist.
- **No native copywriter pass in Phase 4.** Seed copy ships (Q6).
- **No fictional numbers.** Only `stats.ts` verified values + credentials in §2.

## Post-Launch Backlog

Track separately as Phase 5 once the 8-section homepage ships:

1. Swap fictional `clients.ts` / `testimonials.ts` for real references (Q1).
2. Rebuild §3 before/after slider once SAP B1 + TMS screenshots are captured (Q4).
3. Native NL + DE manufacturing copywriter pass on all seven acts (Q6 reversal if budget appears).
4. Expand §2 stat strip with verified customer metrics (avg OEE lift, typical payback months) when Sales delivers them.
5. Consider reinstating the "technical walkthrough on your own routings" offer if Operations stands up a real sandbox flow (Q2 reversal).
