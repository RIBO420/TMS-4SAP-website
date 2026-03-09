# TMS Website Expansion Plan

## Overview
Convert single-page Vite + vanilla JS site → multi-page Astro static site (~30 pages).

## Architecture: Astro 5.x
- **Why**: Zero client JS by default, file-based routing, content collections for blog/modules, component-based, MDX support
- **Integrations**: `@astrojs/mdx`, `@astrojs/sitemap`
- **Icons**: `lucide-astro` (tree-shaken)

## Design System (preserved from current)
```
Background: #09090B | Cards: #111113 | Border: #232329
Text: #FAFAFA / #A1A1AA / #71717A
Accent: #F59E0B (amber) | Hover: #EAB308
Fonts: Space Grotesk (headings) + DM Sans (body)
Radius: 8/12/16/24px
```

## Directory Structure
```
src/
├── components/
│   ├── global/     Nav, Footer, Breadcrumbs, SEOHead
│   ├── ui/         Button, SectionHeader, CTABanner, StatBar
│   ├── cards/      ModuleCard, IndustryCard, TestimonialCard, BlogPostCard, FeatureCard
│   └── sections/   Hero, HeroInner, ModulesPreview, IndustryGrid, LogoCarousel,
│                   ContactForm, FeatureGrid, TestimonialSlider
├── content/
│   ├── config.ts
│   ├── modules/    pps.mdx, aps.mdx, mes.mdx, pdc.mdx, qm.mdx, pdm.mdx, bi.mdx, vc.mdx
│   ├── industries/ kunststof.mdx, automotive.mdx, metaalbewerking.mdx, elektronica.mdx
│   ├── blog/       posts...
│   └── cases/      case studies...
├── data/           modules.ts, industries.ts, navigation.ts, testimonials.ts, clients.ts, stats.ts
├── layouts/        BaseLayout, ModuleLayout, IndustryLayout, BlogLayout, LegalLayout
├── pages/          (see routing below)
├── styles/         global.css, components.css, utilities.css
└── scripts/        animations.js, nav.js, form.js
```

## Routing Map
```
/                              Homepage
/modules                       Modules overview
/modules/[slug]                9 module detail pages (PPS, APS, MES, PDC, QM, PDM, BI, VC, DMS)
/industries                    Industries overview
/industries/[slug]             4 industry verticals
/about                         About Us
/contact                       Contact
/demo                          Book a Demo
/references                    Customer references & case studies
/partners                      Partner directory
/downloads                     Download center (brochures, datasheets)
/blog                          Blog listing
/blog/[...slug]                Blog posts
/support                       Service & Support hub
/product-tour                  Interactive product tour
/roi-calculator                ROI calculator tool
/comparison                    TMS vs alternatives
/implementation                Implementation methodology
/integrations                  Integration partners
/careers                       Careers
/legal/privacy                 Privacy Policy
/legal/terms                   Terms of Service
/legal/impressum               Impressum
```

## Conversion Architecture
Two persistent CTAs across the site:
1. **"Book Demo"** — free, 1 hour, expert-guided
2. **"Download Brochure"** — industry-specific

## Phase 1: Foundation & Core (agents 1-4)
- [x] Astro project setup, config, dependencies
- [x] BaseLayout + Nav (mega-menu) + Footer (sitemap)
- [x] Data files (modules, industries, nav, stats, testimonials)
- [x] Component library (UI + cards + sections)
- [ ] Homepage (hero, logo carousel, modules preview, industry grid, stats, CTA)
- [ ] Modules overview page
- [ ] 9 Module detail pages (dynamic [slug].astro)
- [ ] Contact page (two-column: info + form)
- [ ] About Us page
- [ ] Demo booking page

## Phase 2: Industry Verticals (agents 5-6)
- [ ] Industry overview page
- [ ] IndustryLayout template
- [ ] Kunststof/Plastics vertical
- [ ] Automotive vertical
- [ ] Metaalbewerking vertical
- [ ] Elektronica vertical

## Phase 3: Trust & Resources (agents 7-8)
- [ ] References/case studies page
- [ ] Partner directory (upgraded)
- [ ] Download center
- [ ] Blog hub + BlogLayout + 3 initial posts
- [ ] Service & Support hub

## Phase 4: Competitive Advantage (agent 9)
- [ ] Product tour (interactive)
- [ ] ROI calculator
- [ ] Comparison page (feature matrix)
- [ ] Implementation methodology
- [ ] Integrations page

## Phase 5: Legal & Misc (agent 10)
- [ ] Privacy Policy, Terms of Service, Impressum
- [ ] LegalLayout
- [ ] Careers page

## Agent Stream Assignments
| Agent | Scope | Files Owned |
|-------|-------|-------------|
| 1 | Homepage + About | `pages/index.astro`, `pages/about.astro` |
| 2 | Module pages | `pages/modules/*`, `layouts/ModuleLayout.astro`, `content/modules/*` |
| 3 | Contact + Demo | `pages/contact.astro`, `pages/demo.astro` |
| 4 | Industry pages | `pages/industries/*`, `layouts/IndustryLayout.astro`, `content/industries/*` |
| 5 | Blog system | `pages/blog/*`, `layouts/BlogLayout.astro`, `content/blog/*` |
| 6 | References + Partners | `pages/references.astro`, `pages/partners.astro` |
| 7 | Downloads + Support | `pages/downloads.astro`, `pages/support.astro` |
| 8 | Product tour + ROI | `pages/product-tour.astro`, `pages/roi-calculator.astro`, `components/interactive/*` |
| 9 | Comparison + Implementation + Integrations | `pages/comparison.astro`, `pages/implementation.astro`, `pages/integrations.astro` |
| 10 | Legal + Careers | `pages/legal/*`, `layouts/LegalLayout.astro`, `pages/careers.astro` |

## Rules for Agents
1. **Never modify** `src/styles/global.css` — use scoped `<style>` in .astro files
2. **Never modify** files owned by other agents
3. **Import** from `src/components/`, `src/data/`, `src/layouts/` — read only
4. **Use** existing CSS custom properties from global.css
5. **All pages** must use `BaseLayout` and include breadcrumbs (except homepage)
6. **All pages** must end with a `CTABanner` component
7. **Content** should be professional, B2B-focused, manufacturing-specific
8. **No placeholder text** — write real, useful content for each page
