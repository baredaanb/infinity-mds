# Product Requirements Document
## Infinity Solution — Corporate & Client Platform Website

| | |
|---|---|
| **Document Owner** | Product Management |
| **Status** | Draft v1.0 — Ready for Stakeholder Review |
| **Business** | Infinity Solution (B2B Digital Transformation, Technology & Marketing Agency) |
| **HQ Address** | 2, Bank Colony, Nahar Sayyed Road, Mandsaur, M.P., India |
| **Last Updated** | July 2026 |

---

## Table of Contents
1. Executive Summary & Business Goals
2. User Personas & User Journeys
3. Detailed Functional Specifications
4. Information Architecture & Sitemap
5. UI/UX Design Direction
6. Technical Specification & Security Protocols
7. SEO & Performance Implementation Plan
8. Phased Release & MVP Timeline

---

## 1. Executive Summary & Business Goals

### 1.1 Product Vision
Infinity Solution's website will serve as the company's primary digital storefront and operational client portal — a single platform that converts cold traffic into qualified B2B leads, closes service retainers, and then retains those clients through a self-service dashboard for the lifetime of the engagement. The platform must communicate the credibility of an enterprise-grade technology partner while remaining fast, minimal, and unmistakably premium, expressed through a Nordic design language.

Unlike a typical marketing brochure site, this platform has three simultaneous jobs:
- **Acquisition** — rank organically, convert visitors, and qualify leads across seven distinct service lines.
- **Transaction** — accept payments for retainers, subscriptions, and milestones directly on-platform.
- **Retention** — give existing clients a transparent, always-on view of their project status, reports, and billing.

### 1.2 Business Objectives (Year 1)

| Objective | Metric | Target |
|---|---|---|
| Organic visibility | Ranking keywords (service + "Mandsaur"/"India" + national terms) | Top 10 for 25+ priority keywords within 9 months |
| Lead generation | Qualified leads/month via forms + chatbot | 150+ by Month 6 |
| Conversion rate | Visitor → lead conversion | ≥ 3.5% site-wide |
| Client self-service adoption | % of active clients logging into dashboard monthly | ≥ 70% |
| Payment friction | Checkout abandonment rate | ≤ 20% |
| Site performance | Lighthouse (Performance/SEO/Best Practices/Accessibility) | 95–100 across all four |
| Trust signal | Bounce rate on service landing pages | ≤ 45% |

### 1.3 Target Market
Mid-market and enterprise B2B buyers (marketing directors, founders, CTOs, operations heads) in India and internationally who need one or more of: digital marketing, custom software/app development, SEO, data/BI, AI integration, or immersive virtual tour content for real estate, hospitality, and retail clients.

### 1.4 Competitive Positioning
Infinity Solution differentiates on **breadth with depth** — most competitors specialize in one or two of the seven pillars. The website's IA and content strategy must reinforce "one accountable partner, seven disciplines" rather than reading as seven unrelated micro-agencies bolted together. Cross-service bundling (e.g., "Website + SEO + AI Chatbot" packages) should be a recurring UX and content pattern.

### 1.5 Out of Scope (v1)
- Native mobile apps for clients (dashboard is responsive web only in MVP).
- Multi-language/i18n localization (English only at launch; architecture must not block future localization).
- Marketplace/freelancer bidding functionality.
- Public API for third-party integrations.

---

## 2. User Personas & User Journeys

### 2.1 Persona A — "Aditi," The Evaluating Visitor
Marketing Director at a mid-size retail chain, mandated to find a partner for a website relaunch + SEO overhaul. Time-poor, comparing 3–5 agencies, skeptical of generic agency copy, wants proof (case studies, process clarity, transparent-feeling pricing signals) within the first 60 seconds on-site.

**Journey:**
Landing (organic search or LinkedIn ad) → Service landing page (Website Development or SEO) → Scans proof points (portfolio, process, testimonials) → Explores a second related service (cross-sell) → Fills a low-friction lead form or opens the AI chatbot with a specific question → Receives instant qualifying response → Books a discovery call.

### 2.2 Persona B — "Rohan," The Authenticated Client
Already under a signed retainer for App Development. Needs to check sprint status, download the latest invoice, view analytics on a live campaign, and message the assigned project lead — without emailing the account manager for routine updates.

**Journey:**
Magic-link or Google login → Client Dashboard home (project status cards) → Drills into a specific project → Views milestone timeline & deliverables → Downloads invoice PDF → Views linked BI/analytics report (for Data Analytics or Digital Marketing clients) → Optionally initiates a milestone payment.

### 2.3 Persona C — "Internal Admin/Account Manager"
Infinity Solution staff member managing client relationships, content, and billing operations.

**Journey:**
Admin login (elevated role) → CMS: publish/update case study or service page → CRM: view and triage new leads from forms/chatbot → Client Ops: update a client's project milestone status (triggers client-facing notification) → Billing: generate/send a milestone invoice or reconcile a subscription payment → Reporting: view site-wide conversion and lead-source analytics.

### 2.4 Cross-Persona Journey — Lead to Retained Client (End-to-End)
Visitor discovers service page → submits lead form → CRM auto-creates lead record and notifies sales → Admin qualifies and converts to opportunity → Contract/proposal handled off-platform or via a shared client-facing document → Client is issued dashboard credentials → Client completes first payment (retainer or milestone 1) → Client becomes an "Authenticated Client" persona going forward.

---

## 3. Detailed Functional Specifications

Requirements are grouped into Epics. Each functional requirement (FR) is tagged **P0** (MVP-blocking), **P1** (fast-follow), or **P2** (future).

### Epic A — Authentication & Identity

| ID | Requirement | Priority |
|---|---|---|
| A1 | Users can register/log in via email + password | P0 |
| A2 | Passwordless "Magic Link" login via email | P0 |
| A3 | OAuth2 social login: Google | P0 |
| A4 | OAuth2 social login: LinkedIn | P1 |
| A5 | Session managed via short-lived JWT + HTTP-only, Secure, SameSite=Strict refresh cookie | P0 |
| A6 | Role-based access control: Visitor (public), Client, Account Manager, Admin, Super Admin | P0 |
| A7 | Email verification required before dashboard access | P0 |
| A8 | Self-service password reset with rate-limited, expiring tokens | P0 |
| A9 | Optional 2FA (TOTP) for Client and all internal roles | P1 |
| A10 | Admin-initiated client account provisioning (invite flow post-contract signing) | P0 |
| A11 | Audit log of all authentication events (login, failed login, password reset) | P1 |

**Acceptance criteria (sample — A2 Magic Link):** Given a registered email, when the user requests a magic link, a single-use, 15-minute-expiry token is emailed; clicking it authenticates the session and immediately invalidates the token; expired/used tokens show a clear re-request prompt rather than a generic error.

### Epic B — Service Showcase & Content

| ID | Requirement | Priority |
|---|---|---|
| B1 | Seven dedicated, template-driven landing pages, one per service pillar | P0 |
| B2 | Each service page includes: hero + value prop, process/methodology, capability grid, relevant case studies, pricing/engagement model signals, FAQ, cross-sell to adjacent services, lead form | P0 |
| B3 | Case study / portfolio CMS content type, filterable by service, industry, and outcome metric | P0 |
| B4 | 360° Virtual Tour service page embeds a lightweight interactive WebGL/iframe viewer with sample tours | P0 |
| B5 | Blog / insights section for SEO content marketing, categorized by service pillar | P1 |
| B6 | Testimonials/logos content type, reusable across homepage and service pages | P0 |
| B7 | Dynamic "Bundle Builder" component suggesting service combinations (e.g., Website + SEO + AI) | P2 |

### Epic C — Payments & Billing

| ID | Requirement | Priority |
|---|---|---|
| C1 | One-time retainer/service fee checkout | P0 |
| C2 | Recurring subscription billing (monthly retainers) | P0 |
| C3 | Milestone-based invoicing: admin creates milestone, client is notified and pays on approval | P0 |
| C4 | Stripe integration for international cards/wallets | P0 |
| C5 | Razorpay integration for Indian domestic rails (UPI, netbanking, cards) | P0 |
| C6 | PayPal as a secondary international option | P1 |
| C7 | Automatic currency/gateway routing based on client billing country | P1 |
| C8 | Downloadable, GST-compliant PDF invoices in client dashboard | P0 |
| C9 | Payment failure handling with retry flow and dunning email sequence for subscriptions | P1 |
| C10 | Webhook-driven reconciliation (Stripe/Razorpay events sync to internal billing ledger) | P0 |
| C11 | No raw card data ever touches Infinity Solution servers (hosted fields / tokenization only) | P0 (Security-critical) |

### Epic D — Client Dashboard

| ID | Requirement | Priority |
|---|---|---|
| D1 | Dashboard home: summary cards per active project (status, next milestone, health) | P0 |
| D2 | Project detail view: milestone timeline, deliverables list, file downloads | P0 |
| D3 | Analytics/report viewer (embedded BI dashboard or PDF report library) for applicable services | P1 |
| D4 | Invoice history + payment method management | P0 |
| D5 | Secure messaging/comment thread with assigned account manager | P1 |
| D6 | Notification center (email + in-app) for milestone updates, invoices, replies | P1 |
| D7 | Account/profile settings (contact info, notification preferences, security settings) | P0 |

### Epic E — Lead Capture & CRM Integration

| ID | Requirement | Priority |
|---|---|---|
| E1 | Contextual lead forms on every service page (short form: name, email, company, need) | P0 |
| E2 | Global "Book a Discovery Call" CTA with calendar scheduling integration | P0 |
| E3 | AI chatbot widget for instant qualification and FAQ handling, escalates to human/form | P1 |
| E4 | Every lead submission triggers a CRM record creation via webhook/API with source attribution (page, campaign, UTM) | P0 |
| E5 | Spam/bot protection (invisible CAPTCHA or equivalent) on all public forms | P0 |
| E6 | Lead scoring signal passed to CRM based on service interest + engagement depth | P2 |

### Epic F — Admin Panel & CMS

| ID | Requirement | Priority |
|---|---|---|
| F1 | Headless/structured CMS for all service pages, case studies, blog, testimonials | P0 |
| F2 | Draft/preview/publish workflow with role-gated publishing rights | P0 |
| F3 | Client & project management console (create client, assign projects, update milestone status) | P0 |
| F4 | Billing console: create milestones/invoices, view payment status, issue refunds | P0 |
| F5 | Lead inbox with status pipeline (New → Contacted → Qualified → Converted/Lost) | P0 |
| F6 | Site-wide analytics dashboard (traffic, conversion, lead source, revenue) | P1 |
| F7 | Media library with automatic image optimization on upload | P1 |

### Epic G — Location & Contact Integration

| ID | Requirement | Priority |
|---|---|---|
| G1 | Custom-styled (Nordic theme) Google Map embed pinned to HQ address, in footer and Contact page | P0 |
| G2 | NAP (Name, Address, Phone) consistency enforced across footer, Contact page, and JSON-LD schema | P0 |
| G3 | Click-to-call and "Get Directions" actions on mobile | P0 |
| G4 | Contact page includes a general inquiry form distinct from service-specific lead forms | P0 |

---

## 4. Information Architecture & Sitemap

### 4.1 Primary Navigation (Header)
Home · Services (mega-menu) · Work/Case Studies · About · Insights (Blog) · Contact · [Client Login] · [Book a Call — primary CTA button]

### 4.2 Full Sitemap

```
/
├── /services
│   ├── /services/virtual-tour-360
│   ├── /services/digital-marketing
│   ├── /services/app-development
│   ├── /services/website-development
│   ├── /services/seo
│   ├── /services/data-analytics
│   └── /services/ai-development
├── /work                      (case study index, filterable)
│   └── /work/[case-study-slug]
├── /about
│   ├── /about/team
│   └── /about/process
├── /insights                  (blog index)
│   └── /insights/[post-slug]
├── /pricing                   (packages/engagement models — optional public-facing)
├── /contact
├── /auth
│   ├── /auth/login
│   ├── /auth/register
│   ├── /auth/magic-link
│   └── /auth/reset-password
├── /dashboard                 (authenticated — client role)
│   ├── /dashboard/projects
│   │   └── /dashboard/projects/[id]
│   ├── /dashboard/invoices
│   ├── /dashboard/reports
│   ├── /dashboard/messages
│   └── /dashboard/settings
├── /admin                     (authenticated — internal roles only)
│   ├── /admin/cms
│   ├── /admin/clients
│   ├── /admin/billing
│   ├── /admin/leads
│   └── /admin/analytics
├── /legal
│   ├── /legal/privacy-policy
│   ├── /legal/terms-of-service
│   └── /legal/refund-policy
└── /sitemap.xml, /robots.txt
```

### 4.3 URL & Routing Conventions
- All public URLs are lowercase, hyphen-separated, and keyword-descriptive for SEO (e.g., `/services/ai-development`, not `/services/svc7`).
- `/dashboard/*` and `/admin/*` are excluded from the XML sitemap and disallowed in `robots.txt`, with server-side auth middleware enforcing role checks (never client-side-only gating).
- Case study and blog slugs are permanent once published; redirects (301) are required if a slug must change.

### 4.4 Footer Structure
Column 1: Logo + short mission statement + social links.
Column 2: Services (all 7, linked).
Column 3: Company (About, Work, Insights, Contact, Careers).
Column 4: Contact block — HQ address (2, Bank Colony, Nahar Sayyed Road, Mandsaur, M.P., India), phone, email, embedded interactive map.
Bottom bar: Copyright, Privacy Policy, Terms of Service, Refund Policy.

---

## 5. UI/UX Design Direction

### 5.1 Design Philosophy
The Nordic/Nord-inspired aesthetic should communicate calm competence: generous whitespace, restrained color, and precision over decoration. Every screen should feel like it was designed by people who don't need to shout to be taken seriously — the opposite of a cluttered "stock agency template" feel.

### 5.2 Color Palette

| Token | Usage | Example Hex |
|---|---|---|
| `--surface-base` | Primary background | `#ECEFF4` (Nord Snow Storm) |
| `--surface-elevated` | Cards, panels (with frosted-glass blur) | `rgba(236, 239, 244, 0.65)` + backdrop-blur |
| `--surface-dark` | Dark-mode / hero backgrounds | `#2E3440` (Nord Polar Night) |
| `--text-primary` | Headlines, body | `#2E3440` on light / `#ECEFF4` on dark |
| `--text-secondary` | Supporting copy | `#4C566A` |
| `--accent-primary` | Primary CTAs, links | `#5E81AC` (frost blue) |
| `--accent-vibrant` | Sparing highlight/success accents | `#88C0D0` |
| `--accent-warm` | Rare emphasis (alerts, key stat callouts) | `#D08770` |
| `--border-subtle` | Dividers, card borders | `#D8DEE9` |

Accent colors are used sparingly — no more than one vibrant accent per viewport — to preserve the premium, uncluttered feel.

### 5.3 Typography
- **Display/Headings:** A geometric or humanist sans-serif with tight letter-spacing (e.g., Inter, General Sans, or Satoshi) at confident weight (600–700) for hero statements.
- **Body:** Same family at 400–450 weight, generous line-height (1.6+) for readability.
- **Numerals/Data (dashboards, stats):** Tabular-figure variant for aligned metrics in the Client Dashboard and Admin analytics.

### 5.4 Signature Visual Elements
- **Frosted-glass panels** (`backdrop-filter: blur()`) for navigation bars, service capability cards, and modal dialogs — the primary "Nordic premium" signature.
- **Thin 1px hairline borders** instead of heavy drop shadows; shadows, where used, are large-radius and very low-opacity ("soft light" not "hard drama").
- **Micro-interactions via Framer Motion:** subtle fade/slide-up on scroll reveal (staggered by 60–80ms per element), smooth page-transition crossfades, and a gentle scale/opacity response on hover — never bouncy or playful; motion should feel like it has weight and intention.
- **Iconography:** single-weight line icons, consistent stroke width, no filled/skeuomorphic icons.

### 5.5 Layout & Responsiveness
- 12-column fluid grid, max content width ~1280–1440px with generous outer gutters at desktop.
- Breakpoints: mobile (< 640px), tablet (640–1024px), desktop (1024–1440px), wide (> 1440px).
- Service landing pages follow a consistent modular block system so new services or bundles can be composed from the CMS without custom dev work.
- Dashboard and Admin surfaces use a persistent left sidebar (collapsible on tablet, drawer on mobile) with the same frosted-glass and hairline-border language as the marketing site, so the product never feels visually disconnected from the brand.

### 5.6 Accessibility
WCAG 2.1 AA minimum: color contrast ratios verified against the Nord palette (some Nord accent-on-light combinations require darkening for AA compliance — enforced via design tokens, not ad hoc), full keyboard navigability, visible focus states, semantic landmarks, and form labels/errors exposed to screen readers.

---

## 6. Technical Specification & Security Protocols

### 6.1 Recommended Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend Framework | **Next.js (React, App Router)** | Native SSR/SSG/ISR for SEO-critical pages; hybrid rendering lets marketing pages be statically generated while dashboard/admin remain dynamic |
| Styling & Motion | **Tailwind CSS + Framer Motion** | Utility-driven design-token consistency; production-grade animation primitives |
| Backend / API | **Node.js (NestJS)** for core business logic; **Supabase** (Postgres + Auth) can accelerate MVP auth/DB if timeline is tight | NestJS gives modular, testable architecture for payments/CRM logic; Supabase reduces initial auth/infra build time |
| Database | **PostgreSQL** | Relational integrity for clients, projects, invoices, milestones |
| Auth | **JWT (short-lived access token) + HTTP-only refresh cookie**, OAuth2 via Google/LinkedIn, magic links via signed, single-use tokens | Balances statelessness with XSS/CSRF resistance |
| Payments | **Stripe API** (international) + **Razorpay SDK** (India) | Combined coverage of the required payment geographies |
| CRM Integration | Webhook/REST bridge to CRM (e.g., HubSpot/Zoho) | Keeps lead management outside the core app for sales-team familiarity |
| Maps | **Google Maps JavaScript API** with a custom Nord-themed Map Style JSON | Matches design language rather than default Google styling |
| Hosting/CDN | **Vercel** (primary) or **AWS CloudFront + S3/ECS** for higher control | Edge rendering for global low-latency SSR |
| Media | Image optimization via Next/Image + CDN transform pipeline | Required for Lighthouse performance targets |
| Observability | Structured logging + error tracking (e.g., Sentry) + uptime monitoring | Required for a revenue-bearing platform |

### 6.2 High-Level Architecture

```
[Browser] 
   │  HTTPS (TLS 1.3)
   ▼
[Vercel/CDN Edge — SSR/SSG marketing pages, static assets]
   │
   ▼
[Next.js App Router — Server Components + API Routes]
   │            │                         │
   ▼            ▼                         ▼
[NestJS API]  [Auth Service]        [Payment Webhooks]
   │            │                         │
   ▼            ▼                         ▼
[PostgreSQL]  [Session/Token Store]  [Stripe / Razorpay]
   │
   ▼
[CRM Webhook Bridge]   [CMS (headless)]   [Google Maps API]
```

### 6.3 Data Model (Core Entities, Simplified)
- **User** (id, email, role, auth_provider, mfa_enabled, created_at)
- **Client** (id, user_id, company_name, billing_country, billing_currency)
- **Project** (id, client_id, service_type, status, start_date)
- **Milestone** (id, project_id, title, due_date, status, invoice_id)
- **Invoice** (id, client_id, milestone_id\|nullable, amount, currency, gateway, status, pdf_url)
- **Subscription** (id, client_id, plan, gateway_subscription_id, status, renewal_date)
- **Lead** (id, name, email, company, service_interest, source, utm_params, status)
- **CMS Content** (case studies, blog posts, testimonials — headless content types)

### 6.4 Security Protocols
- **Transport:** TLS 1.3 enforced end-to-end; HSTS enabled; all HTTP traffic 301-redirected to HTTPS.
- **Session Management:** Short-lived (≤15 min) JWT access tokens; refresh tokens stored in `HttpOnly`, `Secure`, `SameSite=Strict` cookies; refresh rotation on every use with reuse detection.
- **OWASP Top 10 Coverage:**
  - *Injection/SQLi:* parameterized queries / ORM (Prisma or TypeORM) exclusively — no raw string-concatenated SQL.
  - *XSS:* React's default escaping + strict Content-Security-Policy headers; CMS-authored rich text sanitized server-side before render.
  - *CSRF:* SameSite cookies + double-submit CSRF tokens on all state-changing admin/dashboard requests.
  - *Broken Access Control:* server-side role checks on every API route (never trust client-side route guards alone); principle of least privilege for Admin vs. Account Manager vs. Super Admin.
  - *Security Misconfiguration:* automated dependency scanning, no default credentials, environment-based secrets management (never committed to repo).
  - *Vulnerable Components:* automated CVE scanning in CI (e.g., Dependabot/Snyk) on every merge.
  - *Logging & Monitoring:* centralized audit logs for auth events, payment events, and admin actions, with alerting on anomalies (e.g., repeated failed logins).
- **Payments/PCI-DSS:** Card data never transits or is stored on Infinity Solution's own servers — all card entry uses Stripe/Razorpay hosted fields or client-side tokenization (SAQ-A scope). Webhook signatures verified on every inbound payment event.
- **Rate Limiting:** Applied to auth endpoints (login, magic-link request, password reset) and public lead forms to prevent credential stuffing and spam.
- **Data Protection:** Encryption at rest for the database; PII fields (billing details) access-scoped to roles that require them; documented data retention policy aligned to Indian data protection requirements (DPDP Act) and, where relevant, GDPR for international clients.

---

## 7. SEO & Performance Implementation Plan

### 7.1 Technical SEO Foundations
- Strict SSR/SSG (via Next.js) for every public-facing route — no client-side-only rendering for indexable content.
- Auto-generated, incrementally updated **XML sitemap** (`/sitemap.xml`) covering all service, case study, and blog URLs; excludes `/dashboard` and `/admin`.
- Clean `robots.txt` with explicit disallow rules for authenticated routes and API endpoints.
- Semantic HTML5 throughout (`<main>`, `<article>`, `<nav>`, single `<h1>` per page, logical heading hierarchy).
- Canonical tags on every page; pagination handled with `rel="next"/"prev"` equivalents where applicable.
- Unique, keyword-optimized `<title>` and meta description per page, editable per-page from the CMS (no hardcoded duplicates across the 7 service pages).

### 7.2 Structured Data (JSON-LD)
- **LocalBusiness / ProfessionalService** schema on the homepage and Contact page, populated with the Mandsaur HQ address, phone, and geo-coordinates.
- **Service** schema on each of the 7 service pages, linked back to the parent Organization entity.
- **BreadcrumbList** schema site-wide for clear SERP breadcrumb display.
- **Article** schema on blog posts; **Review/AggregateRating** schema where testimonials include structured ratings.
- **FAQPage** schema on service pages that include an FAQ block, to target featured-snippet real estate.

### 7.3 Content & On-Page Strategy
- Each service pillar gets a content cluster: one pillar page (`/services/[service]`) + supporting blog posts targeting long-tail and "programmatic SEO" opportunities (e.g., city + service combinations relevant to virtual tours and local digital marketing).
- Internal linking strategy explicitly cross-links related services (e.g., Website Development ↔ SEO ↔ AI Development) to distribute link equity and reinforce the "one partner, seven disciplines" narrative.
- Case studies double as SEO assets — structured with outcome-driven headings and quantified results.

### 7.4 Performance Budget & Core Web Vitals Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 (target 100 on static marketing pages) |
| Largest Contentful Paint (LCP) | < 2.0s |
| Interaction to Next Paint (INP) | < 200ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total JS payload (marketing pages, first load) | < 170KB gzipped |
| Image delivery | Next-gen formats (AVIF/WebP), responsive `srcset`, lazy-loaded below the fold |

### 7.5 Performance Implementation Tactics
- Static Generation (SSG) with Incremental Static Regeneration for service/case-study/blog pages so content updates from the CMS don't require a full redeploy.
- Font loading via `font-display: swap` with self-hosted, subsetted font files to avoid layout shift and third-party request overhead.
- The 360° Virtual Tour viewer (WebGL/iframe) is lazy-loaded and code-split so it never blocks initial page load on non-tour pages.
- Google Maps embed is lazy-loaded (loads on scroll-into-view or user interaction) to protect homepage/footer LCP.
- Edge caching via CDN for all static and SSG assets; dashboard/admin routes use targeted, short-TTL caching only where safe (never for financial data).

---

## 8. Phased Release & MVP Timeline

### Phase 0 — Discovery & Design (Weeks 1–3)
Brand/design system finalization (Nord palette tokens, typography, component library in Figma), IA sign-off, content requirements gathering for all 7 service pages, technical architecture finalization.

### Phase 1 — MVP Launch (Weeks 4–12)
**Goal: a fully indexable, lead-generating, transaction-capable public site plus a functional client dashboard.**
- Epic A (Auth: email/password, magic link, Google OAuth) — P0 items
- Epic B (all 7 service pages, case study CMS, homepage) — P0 items
- Epic C (Stripe + Razorpay one-time and milestone payments; PDF invoices) — P0 items
- Epic D (Dashboard home, project detail, invoice history) — P0 items
- Epic E (lead forms + CRM webhook, spam protection) — P0 items
- Epic F (CMS publish workflow, client/project console, billing console, lead inbox) — P0 items
- Epic G (Google Map, NAP consistency, contact form) — all items
- Full SEO foundation (Section 7.1–7.2) and performance budget (7.4) implemented from day one, not retrofitted.

**Launch Exit Criteria:** Lighthouse ≥ 95 across all four categories on marketing pages; end-to-end payment flow tested in both Stripe and Razorpay sandbox and live modes; security review (OWASP checklist) passed; all 7 service pages published with real content, not placeholder copy.

### Phase 2 — Fast Follow (Weeks 13–20)
- LinkedIn OAuth, 2FA, subscription dunning flows (A9, C6, C7, C9)
- Blog/Insights section live with initial content cluster (B5)
- Secure messaging + notification center in dashboard (D5, D6)
- Analytics/report viewer embedded in dashboard for applicable services (D3)
- Site-wide admin analytics dashboard (F6)
- AI chatbot widget for lead qualification (E3)

### Phase 3 — Growth & Optimization (Weeks 21–30+)
- Dynamic Bundle Builder for cross-service packages (B7)
- Lead scoring integration (E6)
- Programmatic SEO expansion (city/industry landing page templates)
- Continuous CRO experimentation program (A/B testing on hero messaging, CTA placement, form length) on the highest-traffic service pages
- Evaluation of native client mobile app based on Phase 1–2 dashboard engagement data

### Milestone Summary

| Milestone | Target Week | Key Deliverable |
|---|---|---|
| Design System Freeze | Week 3 | Figma component library + tokens approved |
| Auth + Payments Sandbox Complete | Week 7 | Login, magic link, Stripe/Razorpay test transactions working |
| All 7 Service Pages Content-Complete | Week 9 | Real copy, case studies, and CMS entries live in staging |
| Security & Performance Audit | Week 11 | OWASP + Lighthouse pass |
| **MVP Public Launch** | **Week 12** | Site live, indexable, transacting |
| Dashboard v1.1 (messaging, notifications) | Week 18 | Fast-follow features live |
| Chatbot + Blog Live | Week 20 | Content marketing engine operational |

---

*End of Document. This PRD is intended as a living document — functional requirements should be re-prioritized each phase based on real conversion and client-usage data captured post-launch.*
