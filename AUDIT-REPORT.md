# TMS 4SAP — Comprehensive UI/UX + Code Audit

**Auditor:** 8-agent review team (a11y · performance · i18n · SEO · visual · UX · responsive/theming · code quality)
**Methodology:** Playwright screenshots (22 routes × 3 viewports = 66 captures) + DOM/console/network instrumentation + full codebase read
**Rulesets applied:** `impeccable:audit`, `ui-ux-pro-max`, WCAG 2.2 AA
**Artifacts:**
- Screenshots: `/tmp/tms-audit/screenshots/` — 66 PNGs
- Raw audit data: `/tmp/tms-audit/data/audit.json`
- Dev server tested: `http://localhost:4321/TMS-4SAP-website/`

---

## Executive Summary

**Total findings:** 63 (13 Critical · 22 High · 20 Medium · 8 Low)

The site is technically well-built for a static Astro marketing presence — correct `hreflang`, unique meta descriptions, clean prerendering, a coherent amber-on-black token system, and no Lighthouse red alerts on initial load. However it has **three structural problems** that hold it back:

1. **Content architecture is schizophrenic.** Content collections are defined but empty; real content lives in `src/data/*.ts` and triplicated inline arrays in `src/pages/{en,nl,de}/blog/*.astro`. One blog post requires 6 file edits to ship in 3 locales.
2. **Keyboard accessibility is broken globally.** `outline: none` at `global.css:859` with zero `:focus-visible` replacements, no skip-link, and 7 React motion components that ignore `prefers-reduced-motion`. A keyboard or reduced-motion user cannot navigate the site.
3. **The conversion story is ambiguous.** Nav CTA says "Book Demo", hero says "Explore Modules", bottom banner says "Contact Sales", and `navigation.ts` says "Get Started" — four different primary actions, and the demo page is just another form with no calendar embed.

**Top-3 critical issues (fix first):**
1. Skip-link + `:focus-visible` restoration — WCAG 2.4.1 + 2.4.7 — `src/styles/global.css:859`, `src/layouts/BaseLayout.astro:70-75`
2. Homepage H1 renders as `"Thenewstandardfor"` to screen readers — `src/components/motion/AnimatedText.tsx:29-44`
3. Hero JPEG fallback is **2.4 MB** — `public/images/hero-dashboard.jpeg`

---

## Anti-Patterns Verdict — Does it look AI-generated?

**Partial pass.** The token system avoids the worst AI tells (no indigo→purple gradient palette, no Inter-for-everything, single amber accent, restrained gradient usage). But the *execution* has several dead giveaways:

- **Empty-void sections** on home, modules, industries, demo — section headers float alone with 600–1000px of black beneath them where product imagery should live. Reads as "stylesheet loaded, content didn't."
- **Context-free metric strip** under the hero: "1 / SAP / 24/7 / Global" — no units, no story.
- **Gradient-word-in-headline overuse** — every H1 uses `black text + AMBER WORD`. By page 4 it's a tic, not emphasis.
- **Card-grid monoculture** — homepage stacks 5 identical card grids (features, modules, industries, testimonials) with no editorial break (no pull quote, no product screenshot, no comparison, no video).
- **Comparison table** uses checkmark glyphs only with no row striping and no highlighted TMS column, despite TMS being the entire point.
- **Fictional client logos and testimonials** — `src/data/clients.ts` header literally declares them invented. Legal/reputational risk; also blunts trust signal.

---

## Critical Cross-Cutting Issues

| # | Issue | WCAG / Standard | File |
|---|-------|-----------------|------|
| C1 | `outline: none` globally with zero `:focus-visible` replacement — no keyboard focus anywhere | 2.4.7 | `src/styles/global.css:859` |
| C2 | No skip-to-main-content link in `<body>` | 2.4.1 | `src/layouts/BaseLayout.astro:70-75` |
| C3 | Homepage H1 spaces stripped by motion spans → screen readers hear `"Thenewstandardfor"` | 1.3.1 | `src/components/motion/AnimatedText.tsx:29-44` |
| C4 | 7 React motion components ignore `prefers-reduced-motion` | 2.3.3 | `src/components/motion/*.tsx` |
| C5 | Heading hierarchy skip on `/modules` (H1 → H3 × 9 → H2) with empty H3 innerText | 1.3.1 | `src/pages/modules/index.astro:35-43` + `ModuleCard.astro:39` |
| C6 | Hero JPEG fallback **2.4 MB** — worst-case LCP | Core Web Vitals | `public/images/hero-dashboard.jpeg` |
| C7 | Empty product-image placeholders on 4+ pages (hero, modules, industries, demo) — "broken" appearance | Design quality | Multiple pages |
| C8 | No `404.astro` — all broken URLs fall through to GitHub's default | UX | *absent* |
| C9 | Contact + Demo forms are visual-only (no `action`, no handler, no spam protection, no GDPR consent checkbox) | GDPR | `src/pages/contact.astro:140-235`, `demo.astro:110-270` |
| C10 | Demo page has **no calendar embed** — just another contact form | Conversion | `src/pages/demo.astro` |
| C11 | Fictional clients and testimonials shipped as trust signals | Legal/reputational | `src/data/clients.ts`, `src/data/testimonials.ts` |
| C12 | `astro check` fails: 5 `mod.name` type errors across `industries/[slug].astro` in all 3 locales | Build correctness | `src/pages/{,nl/,de/}industries/[slug].astro` |
| C13 | OG/Twitter image URLs are relative — social crawlers reject them | Open Graph spec | `src/layouts/BaseLayout.astro:18,52,60` |

---

## 1. Accessibility & Semantics

### Critical
- **[Critical] Homepage H1 concatenated for screen readers.** `motion.span` elements have `marginRight: 0.3em` but no space char between them. → fix: `{word}{" "}` in `src/components/motion/AnimatedText.tsx:29-44`.
- **[Critical] No skip link.** Keyboard users must tab through the whole Nav (mega menu + language switcher + CTA) on every page. Add `<a href="#main-content" class="skip-link">` as the first child of `<body>` in `BaseLayout.astro`.
- **[Critical] `outline: none` with no `:focus-visible` replacement.** `global.css:859` strips outlines; grep returns zero `:focus-visible` rules. Replace with scoped `:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }`.

### High
- **[High] Broken heading hierarchy on `/modules`.** 9 H3 module cards between H1 and the next H2. Either add a visually-hidden `<h2>All Modules</h2>` or demote ModuleCard `<h3>` to `<h2>`.
- **[High] Empty H3 innerText on `/modules`.** `ModuleCard.astro:34-40` orders children as `<abbr>` → `<h3>` → `<p>` inside an `<a>`, creating a long link accessible name. Restructure + add `aria-label={module.name}` on the anchor.
- **[High] ContactForm has no error handling, no aria-live, no required indicators, `novalidate` with no handler.** `src/components/sections/ContactForm.astro:110+`. Add `role="status" aria-live="polite"`, `aria-required`, `aria-invalid`, visible `*`, and real submit logic.
- **[High] Motion components ignore `prefers-reduced-motion`.** All 7 `.tsx` files. Wrap with `useReducedMotion()` from `motion/react`.

### Medium
- **[Medium] ROI sliders missing `aria-valuetext`** — screen reader users hear "50" instead of "50 employees". `src/pages/roi-calculator.astro:41-51, 64-74, 114-124, 137-147`.
- **[Medium] ROI live region re-announces on every keystroke** — move `aria-live` off the savings amount or debounce to `change` event.
- **[Medium] `<div role="form">`** on `roi-calculator.astro:33` — prefer semantic `<form>`.

### Low
- Mobile toggle `aria-label="Toggle menu"` not localized (`Nav.astro:111`).
- Language switcher lacks `aria-current="true"` on active locale.
- Mega-menu `aria-expanded` toggling needs JS verification.

---

## 2. Performance & Bundle

### Critical
- **Hero JPEG fallback 2.4 MB.** `public/images/hero-dashboard.jpeg` — the webp (118 KB @ 1920w) is fine, but the JPEG fallback ships to any crawler/preview bot and inflates the HTML payload. Re-export at ≤300 KB or drop entirely (webp is universally supported now).
- **Zero `<Image />` usage.** `astro:assets` is not imported anywhere. All images are static `<img>` in `public/`. Move to `src/assets/` + `<Image />` for AVIF + responsive pipeline.

### High
- **Motion bundle ships ~85 KB gz on EN homepage only.** `src/pages/index.astro` hydrates 8 islands (MotionHero + AnimatedStatBar + 6 × FadeInView). React + React-DOM + motion runtime. **NL and DE homepages ship zero React** — accidental A/B test. Either unify motion across locales or drop motion from EN.
- **Google Fonts at runtime** — `BaseLayout.astro:63-66` loads DM Sans + Plus Jakarta Sans from `fonts.googleapis.com`. FOUT guaranteed. Switch to `astro:fonts` (Astro 5) or `@fontsource/*` for self-hosting.

### Medium
- **CSS duplication.** `src/style.css` (929 lines) is legacy, lives outside `src/styles/`, and is imported only by dead `src/main.js`. Delete. Plus `global.css` (1041) + `utilities.css` (715) have duplicate selectors: `.prose` × 27, `.modules-grid` × 18, `.form-group` × 12.
- **`transition: all` anti-pattern** at `global.css:116, 176, 257, 540` (animates layout properties). `gap` transition at :617. Replace with explicit property lists.

### Low
- No `content-visibility: auto` on any below-the-fold section — free FCP win.
- Hero `<img>` correctly uses `loading="eager" decoding="async"` + `width/height` — keep.

---

## 3. Internationalisation & Content Parity

### Critical
- **Blog locale triplication.** Each post exists in 6 files (3 locales × index + slug). `src/pages/{,nl/,de/}blog/index.astro` re-declares a `const posts = [...]` array with the same slugs but translated strings. `[...slug].astro` duplicates full post body. One blog update = 6 file edits.
- **Orphaned content collections.** `src/content/config.ts` defines 4 schemas; `src/content/{blog,cases,industries,modules}/` are empty. Astro emits warnings every dev start. Pick one: migrate `src/data/*.ts` + inline blog arrays into `.md/.mdx` with a `lang` field, OR delete the schemas.

### High
- **Non-localized `<title>` on homepage.** `src/pages/{nl,de}/index.astro:29` both hardcode `"The Manufacturing Suite | 4SAP"` — the same English tagline. Every OTHER NL/DE route translates its title correctly. 3 other offenders: `impressum`, `downloads`, `blog/index` share identical titles across locales.
- **Hero heading implementation drift.** EN homepage uses React `<AnimatedText>` with stagger; NL + DE use plain `<h1>`. NL/DE lose the animation, and EN has the whitespace bug.

### Medium
- **Language switcher missing from Footer.** `LanguageSwitcher.astro` is only rendered in `Nav.astro:106`, not in `Footer.astro`.
- **Hardcoded English strings in shared sections.** `about.astro:114-117` passes literal English to value-card components; NL/DE pages re-declare the same prop arrays. Move to `t(lang, ...)` keys in `src/i18n/utils.ts`.

### Low
- German compound words wrap to 3 lines on the DE homepage hero ("Der neue Standard für die Fertigung") — throws off the metric strip vertical rhythm.
- `hreflang` alternates work correctly on inner pages.

---

## 4. SEO & Metadata

### High
- **Non-localized homepage titles** (see i18n §3).
- **Relative OG image URL.** `BaseLayout.astro:18,52,60` emits `og:image=/TMS-4SAP-website/og-default.png`. Facebook/LinkedIn/X/Slack reject relative URLs. Wrap with `new URL(ogImage, Astro.site).href`.
- **No `public/robots.txt`.** GitHub Pages won't generate one. Add with `Sitemap: https://ribo420.github.io/TMS-4SAP-website/sitemap-index.xml`.
- **Zero structured data.** Missing site-wide: `Organization`. Missing per type: `SoftwareApplication` on module detail, `BreadcrumbList` everywhere, `FAQPage` on support, `Article` on blog posts.

### Medium
- **Blog article metadata not emitted.** `src/pages/{,nl/,de/}blog/[...slug].astro:256` only forwards description; `author`, `publishDate`, `category`, hero image never reach `<head>`. Add `og:type="article"`, `article:published_time`, `article:author`, and `Article` JSON-LD.
- **Footer heading-level skip** — `<h4 class="footer-heading">` (Footer.astro:59,68,77,86) skips H3. Change to `<h2>` or use `role="heading" aria-level="2"`.

### Low
- Canonicals and `hreflang` build correctly on inner pages.
- Meta descriptions are unique across all 22 audited routes.
- Pin `trailingSlash: 'always'` in `astro.config.mjs` for determinism.

---

## 5. Visual Design Critique

### Positives (concrete)
1. **Brand restraint** — single amber accent (`#F59E0B`) on near-black (`#09090B`). No indigo→purple gradient mess.
2. **Typography choice** — Plus Jakarta Sans + DM Sans, not default Inter. Weight contrast in hero headline works.
3. **Consistent footer** — 4-column sitemap holds up in all 3 locales including German.
4. **ROI calculator** is the strongest screen — two-column split, real sliders, live €373.000 output. This is the only page that looks designed, not templated.
5. **Ghost + primary CTA hierarchy** is applied consistently; no button soup.

### Negatives (concrete, with fix command)
1. **Massive vertical voids** on home/modules/industries/demo — section headers float alone with 600–1000px of black beneath. Product imagery placeholders render as empty black rectangles. → manual fix: add product screenshots or illustrative assets.
2. **Hero metric strip has no units or context** — "1 / SAP / 24/7 / Global". → `/clarify` + `/distill`.
3. **Gradient-word-in-headline tic** — every H1 has an amber word. → `/quieter` on all but 1–2 hero moments.
4. **No section variety** — every section is `<center-title><center-sub><void>`. → `/bolder` + `/normalize` for asymmetric/bento/split variants.
5. **Mobile CTA spacing** — "Explore Modules" and "Contact Sales" buttons sit against the dashboard image with ~40 px tap height (under the 44 px floor). → `/polish`.
6. **German hero headline wraps to 3 lines** while EN wraps to 2 — pushes the metric strip down. → `/harden`.
7. **Modules card grid is 2×3 clones** with identical amber-icon-top-left. → `/bolder` to break symmetry or `/distill` to list.
8. **Blog cards are clones** — same image-less header, same "Read more" chevron. → `/colorize` per category.
9. **Comparison table lacks row striping and winning-column highlight.** The TMS column isn't visually emphasized despite being the point. → `/bolder`.

---

## 6. UX & Interaction Patterns

### Critical
- **No 404 page.** `src/pages/404.astro` is missing.
- **No spam protection on any form.** Contact + Demo both `preventDefault()` and toggle `form-success` — submissions go nowhere. No honeypot, no captcha, no rate limit.
- **Demo page has no calendar embed** — just another contact form with "we'll schedule within 2 business days". Kills the self-service loop that every "Book Demo" CTA promises.
- **Fictional clients + testimonials.** `src/data/clients.ts` header literally declares them invented.

### High
- **Nav CTA mismatch vs data source.** `navigation.ts` defines `navCta = { label: 'Get Started', href: '/contact' }`; `Nav.astro` hardcodes `Book Demo → /demo`. Dead code in `navigation.ts`.
- **Three competing primary CTAs.** Nav → Book Demo; Hero → Explore Modules; Bottom banner → Book Demo + Contact Sales. No single conversion target.
- **Mobile menu lacks focus trap + Escape + backdrop click.** `Nav.astro:236-274`.
- **Two parallel nav taxonomies.** `navigation.ts` groups modules by Planning/Execution/Quality/Intelligence; `Nav.astro` renders flat. Grouping logic abandoned.
- **No Astro `<ViewTransitions />` / `<ClientRouter />`.** Every nav click is a full reload; scroll not restored.

### Medium
- **Two breadcrumb implementations** — `HeroInner.astro` vs `global/Breadcrumbs.astro`.
- **ROI result has no persistence** — no PDF download, no email gate, no link to save.
- **Wall-of-cards fatigue** on homepage — 5 consecutive card grids with identical rhythm.
- **GDPR contact form** uses implicit consent text rather than an explicit checkbox.

### Low
- Logo carousel is text, not real logos.
- Scroll-spy code in `Nav.astro:278-308` targets anchors the nav doesn't use.
- Resources mega-panel lacks a "view all" link while Modules/Industries have one.

---

## 7. Responsive & Theming

### High
- **Breakpoint chaos** — 10 different max-widths in use (400/480/600/640/680/720/768/900/960/1024). `global.css` mixes 480/600/640/768/900; `utilities.css` adds 600/640/480/900; `Nav.astro:752` uses 960. Zero standard desktop breakpoints (1024/1280/1536). Pick one scale.
- **61 hardcoded hex colors** bypass tokens. Worst: `#09090B` × 24 (already is `--bg`), `#4ade80` × 15 (undefined success), `#3b82f6` × 12 (undefined info), `#ef4444` × 6 (undefined error).
- **Missing semantic token set** — `:root` has no `--success`/`--danger`/`--info`, no spacing scale, no shadow scale, no `--z-*` scale. Drives the hex duplication.

### Medium
- **Container inconsistency** — `.container` is the only defined one (`min(1200px, 92%)`), but pages declare 20+ ad-hoc `max-width` values.
- **Tablet comparison table** compresses so headers are barely legible — `comparison-en-tablet.png`. Add horizontal scroll wrapper or mobile card transformation.
- **Nav breakpoint 960 vs content 900** creates a 60px dead zone where nav is collapsed but content is still desktop-wide.
- **German mobile stats row** clips "Enterprise Support" / "Partner Network" on 375px.

### Low
- No `html { color-scheme: dark }` — form controls render in light UA default on some browsers despite `--bg: #09090B`.
- `.btn` base lacks `min-height: 44px` (only `.btn-sm` sets it). Some ghost pills fall under the touch target floor.
- Mobile screenshots otherwise render cleanly at 375px with no horizontal scroll.

### Token health (positive)
`var(--amber)` × 366, `var(--border)` × 288, `var(--text-muted)` × 243 — tokens are heavily adopted where they exist. The problem is the token set is too small, not drift.

---

## 8. Astro Code Quality & Architecture

### Critical
- **`astro check` fails: 5 type errors + 15 hints.** `ModuleData` has no `name` property but is referenced in `src/pages/{,nl/,de/}industries/[slug].astro`. Build passes because no `check` script exists in `package.json`.

### High
- **`withBase` coverage gap.** Used in 8 layouts/pages; NOT used in `Nav.astro`, `Footer.astro`, `BaseLayout.astro` — those still use raw `${import.meta.env.BASE_URL}...`. Three patterns coexist.
- **Content collections are dead code.** `config.ts` defines 4 schemas; folders empty; zero `getCollection()` calls project-wide. Delete or migrate.
- **Blog locale triplication** (see i18n §3).

### Medium
- **No ESLint, no Prettier, no typecheck script.** `@astrojs/check` is installed but not wired.
- **`src/style.css` (929) + `src/main.js` are orphaned legacy.** Imported only by each other; Astro never touches `main.js`. Delete both.
- **Dead data exports** — `src/data/features.ts` (147 lines) and `src/data/navigation.ts` (203 lines) have zero importers.
- **Mixed import paths.** Aliases (`@components` × 28) vs relative (`../components` × 50). Relative wins 2:1. Locale legal pages mix both. Pick one.
- **15 unused-import hints** from `astro check` — `SectionHeader` unused in `nl/integrations`, `nl/references`, `de/integrations`, `de/references`, +11 more.

### Low
- Hydration is mostly fine — 7 motion `.tsx` components, 16 × `client:visible`, 1 × `client:load` (`HeroInner.astro:57`). Could downgrade to `client:idle`.
- Only 3 raw `<img>` tags in components — but `BlogLayout.astro:57` uses one for `heroImage` where `<Image>` would shine.

---

## Prioritized Roadmap

### Immediate (ship-blockers, 1 day)
1. Add skip link + restore `:focus-visible` globally. *(C1, C2)*
2. Fix homepage H1 whitespace bug in `AnimatedText.tsx`. *(C3)*
3. Re-compress or drop `hero-dashboard.jpeg` (2.4 MB → ≤300 KB). *(C6)*
4. Remove fictional client names and testimonials, or mark visibly as "example customers". *(C11)*
5. Fix 5 `mod.name` type errors + add `"check": "astro check"` to package.json. *(C12)*
6. Wrap OG image URL with `new URL(ogImage, Astro.site).href`. *(C13)*
7. Localize the 4 shared titles (homepage × 3, impressum, downloads, blog index).
8. Create `src/pages/404.astro`. *(C8)*

### Short-term (this week)
9. Add `useReducedMotion()` to all 7 motion components. *(C4)*
10. Add real form handlers, honeypot, and explicit GDPR consent checkbox to contact + demo forms. *(C9)*
11. Decide motion parity: either add motion to NL/DE or drop from EN.
12. Add `robots.txt` with sitemap reference.
13. Add `Organization` JSON-LD to BaseLayout + `Article` JSON-LD to blog posts.
14. Fix heading hierarchy on `/modules` (promote H3 to H2 or add hidden H2). *(C5)*
15. Replace blog demo page with a real calendar embed (Calendly/cal.com) OR rebrand it as "request demo".
16. Add `min-height: 44px` to `.btn` base.

### Medium-term (next sprint)
17. Migrate `src/data/modules.ts`, `industries.ts`, and the inline blog arrays into Astro content collections with a `lang` field. Delete triplication.
18. Move images to `src/assets/` + adopt `<Image />` / `<Picture />`.
19. Self-host fonts via `astro:fonts` or `@fontsource/*`.
20. Define semantic color tokens (`--success`, `--danger`, `--info`), spacing scale, shadow scale, `--z-*` scale. Purge the 61 hardcoded hex values.
21. Pick one breakpoint scale (640/768/1024/1280) and mass-replace.
22. Delete `src/style.css`, `src/main.js`, `src/data/features.ts`, `src/data/navigation.ts`.
23. Consolidate two breadcrumb components into one.
24. Fix mobile menu: focus trap, Escape key, backdrop click.

### Long-term (design iteration)
25. Replace empty product-image placeholders with real product screenshots.
26. Break up homepage card-grid monoculture with editorial variety (pull quote, screenshot, comparison, video).
27. Add `<ViewTransitions />` for soft nav transitions.
28. Add hero metric context (units, short labels).
29. Reduce amber-word-in-headline to 1–2 moments per page.
30. Redesign comparison table with row striping and highlighted TMS column.

---

## Suggested Skill / Command Mapping

| Issue cluster | Fix command |
|---|---|
| Breakpoint + token chaos, hex drift | `impeccable:normalize` |
| Motion perf, image weight, bundle size, fonts | `impeccable:optimize` |
| Form handling, edge cases, i18n overflow, 404 | `impeccable:harden` |
| Empty voids, card monoculture, no section variety | `impeccable:bolder` + manual design |
| Overused gradient-word headlines, metric strip noise | `impeccable:quieter` + `impeccable:clarify` |
| ROI persistence, delight moments | `impeccable:delight` |
| Missing content collection migration | Manual refactor |
| Focus states, alignment, 44px targets | `impeccable:polish` |
| Accessibility sweep | `impeccable:audit` (this report) + manual |

---

## Positive Findings (worth preserving)

- Single amber accent — restraint is rare in AI-generated ERP sites.
- Plus Jakarta Sans + DM Sans — not default Inter.
- Coherent token adoption where tokens exist (`var(--amber)` × 366).
- Unique meta descriptions across all audited routes.
- `hreflang` + canonical URLs build correctly on inner pages.
- No Lighthouse red alerts on initial load.
- ROI calculator is genuinely well-designed.
- All pages prerender (no accidental SSR opt-in).
- `astro:page-load` handlers are in place (just missing the `<ViewTransitions />` that would activate them).
- 15 out of 22 audited routes passed with zero console errors, zero network failures, zero broken images, proper single-H1 semantics.

---

**Report generated from live Playwright audit + 8 parallel agent passes over the full codebase. No code was modified during this audit.**
