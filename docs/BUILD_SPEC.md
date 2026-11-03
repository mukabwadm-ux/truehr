# TruewardHR Website — Claude Code Build Prompt

Nov 2, 2026 · @Derrick

## How to use this prompt

This document is a complete build brief for Claude Code: it takes the approved Version 3 homepage design and turns it into a production website for TruewardHR.

1. Export this doc as Markdown and save it in the new repo as `docs/BUILD_SPEC.md`.
2. Save full-page screenshots of the approved design (Version 3 on the [design canvas](https://claude.ai/artifact/SgsLFs9jrYopCQZg4ENpGe)) into `docs/design-reference/`. Claude Code cannot open that link itself.
3. Put the logo files (full colour and white versions, ideally SVG) into `public/brand/`.
4. Open Claude Code in the empty repo and send: *Read docs/BUILD\_SPEC.md and docs/design-reference/. Build the TruewardHR site phase by phase as specified in the section "Build phases and acceptance criteria". Stop after each phase, show me what you built, and wait for my go-ahead.*

Everything below this section is written to Claude Code directly.

## Role, project context and goals

You are a senior full-stack engineer and UI developer. Build the public website and a small admin area for **TruewardHR**, a Nairobi-based HR consulting and payroll services company serving employers across Kenya.

**Business facts (use exactly):**

| Field | Value |
| --- | --- |
| Company | TruewardHR |
| Domain | truewardhr.com |
| Phone | +254 797 500747 |
| Email | john@truewardhr.com |
| Location | Nairobi, Kenya (full office address to be supplied) |
| Services | HR consulting, payroll services, HR compliance audits |

**Positioning:** compliance-first HR. Every message reinforces that TruewardHR gets payroll right every month, files statutory returns (PAYE, NSSF, SHIF, Housing Levy, NITA) on time, and builds HR policies that stand up to a labour officer, an auditor or a court.

**Primary goals, in priority order:**

1. Generate leads through the free HR health check booking form.
2. Collect registrations for free employer briefings.
3. Grow a newsletter list for the monthly employer update.
4. Build credibility through real testimonials, team profiles and practical insight articles.

**Non-negotiable content rules:**

- Never invent statistics, client counts, years of experience, awards, prices or testimonials. Where a fact is missing, render a clearly visible placeholder and list it in the launch checklist.
- Only real, consented testimonials and client logos may be published. They are managed through the admin, not hard-coded.
- Do not state statutory rates or deadlines in site copy. Name the deductions only; rates change and must not go stale.

## Tech stack and project setup

Use this stack and do not substitute alternatives without asking.

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14, App Router, TypeScript in strict mode |
| Styling | Tailwind CSS with the design tokens in the next section |
| Components | shadcn/ui (Button, Input, Select, Textarea, Checkbox, Accordion, Dialog, Sheet, Toast, Table, Tabs) |
| Fonts | `next/font/google`: Sora (500, 600, 700, 800) and Source Sans 3 (400, 500, 600, 700) |
| Database and auth | Supabase: Postgres with Row Level Security, Supabase Auth for the admin |
| Forms | React Hook Form with Zod schemas, submitted through Next.js server actions |
| Email notifications | Resend, sending to john@truewardhr.com |
| Icons | lucide-react |
| Hosting | Vercel, production domain truewardhr.com |
| Analytics | Vercel Analytics (cookieless) |

**Folder structure:**

```
app/
  (site)/            public pages: layout.tsx, page.tsx, about/, services/, briefings/, insights/, contact/, privacy/, terms/
  admin/             protected admin area
  api/               only if a route handler is unavoidable
components/
  site/              Header, TopBar, Footer, section components
  ui/                shadcn/ui primitives
  brand/             Logo, TriangleMark, IllustrationFrame
lib/
  supabase/          server and browser clients
  validations/       Zod schemas
  actions/           server actions for each form
  content/           static copy for services and solutions
supabase/
  migrations/        SQL migrations
  seed.sql           seed data (only real content)
public/brand/        logo files, favicon, OG image
docs/                BUILD_SPEC.md, design-reference/
```

**Environment variables** (create `.env.example` listing all of them, never commit real values):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NOTIFY_EMAIL=john@truewardhr.com
NEXT_PUBLIC_SITE_URL=https://truewardhr.com
ADMIN_EMAILS=john@truewardhr.com
```

Code standards: server components by default, client components only where interaction needs them; ESLint and Prettier configured; no `any`; every form has server-side validation in addition to client validation.

## Brand system

The palette is taken from the TruewardHR logo: deep navy for trust, warm gold for the upward arrow. Define every colour once as a Tailwind token and never hard-code hex values in components.

| Token | Hex | Use |
| --- | --- | --- |
| `navy` | #0B2645 | Primary brand, hero and dark section backgrounds, primary buttons on light |
| `navy-deep` | #071A31 | Top bar, footer |
| `navy-soft` | #1B3B63 | Image frames and tiles on navy |
| `gold` | #C99B2A | Accent fills, primary CTA on navy, icons on navy, badges |
| `gold-text` | #8A6614 | Gold-coloured text on white (eyebrow labels, roles) |
| `ink` | #1C2533 | Body text |
| `muted` | #4A5568 | Secondary text on light backgrounds |
| `on-navy` | #D6DEEA | Secondary text on navy |
| `mist` | #F3F5F9 | Alternate section background |
| `line` | #E3E7EE | Dividers |
| `border` | #DCE2EA | Card and input borders |

**Contrast rule:** never place `gold` text on white; it fails WCAG AA. Use `gold-text` for gold-tinted text on light backgrounds. Buttons in `gold` always carry `navy` text.

**Typography:**

| Role | Font | Weight | Size |
| --- | --- | --- | --- |
| H1 (hero) | Sora | 800 | clamp(2.5rem, 5vw, 4.25rem), line-height 1.05, letter-spacing -0.025em |
| H2 (section) | Sora | 800 | clamp(2rem, 3.6vw, 3rem), line-height 1.1, letter-spacing -0.02em |
| H3 (card) | Sora | 700 | 1.25 to 1.625rem |
| Body | Source Sans 3 | 400 | 1.0625rem, line-height 1.6 |
| Lead paragraph | Source Sans 3 | 400 | 1.125 to 1.25rem |
| Labels, buttons | Sora | 700 | 0.9375 to 1rem |

**Shape and spacing:**

- Buttons and badges are pill-shaped (`rounded-full`), minimum height 48px.
- Cards and image frames use a 14px radius; small inner frames 10px.
- Section vertical padding is 112px on desktop, 72px on mobile. Content max-width is 1240px with 24px side padding.
- Shadows are soft and navy-tinted, for example `0 22px 50px rgba(11, 38, 69, 0.16)`.

**Signature motif:** the gold upward triangle from the logo. Build a reusable `TriangleMark` component and use it for section eyebrow labels, list bullets, and large faint background shapes (white at 5 to 8 percent opacity) on navy sections. Do not overuse it beyond those three roles.

**Eyebrow labels** are sentence case, never all caps: a small gold triangle followed by a short label in `gold-text`, weight 700.

**Motion:** one staggered fade-and-rise on the hero load (headline, portrait, floating card). Respect `prefers-reduced-motion` by disabling all animation. No scroll-jacking or parallax.

**Logo:** use the supplied logo files. Full colour on light backgrounds, white version on navy. Request an SVG version from the designer if only raster files exist.

## Site map

The site has 14 public routes and a protected admin. All public pages share the TopBar, Header and Footer.

| Route | Page | Content source |
| --- | --- | --- |
| `/` | Homepage | Static copy + Supabase (briefings, team, testimonials, posts, client logos) |
| `/about` | About TruewardHR | Static copy + team members |
| `/services` | Services overview | Static copy |
| `/services/hr-consulting` | HR Consulting | Static copy |
| `/services/payroll` | Payroll Services | Static copy |
| `/services/compliance-audits` | HR Compliance Audits | Static copy |
| `/briefings` | Briefings list (upcoming first, then past) | Supabase `briefings` |
| `/briefings/[slug]` | Briefing detail and registration form | Supabase `briefings` |
| `/insights` | Articles list with category filter | Supabase `posts` |
| `/insights/[slug]` | Article detail | Supabase `posts` |
| `/contact` | Contact details and health check booking form | Static + form |
| `/privacy` | Privacy notice (Kenya Data Protection Act) | Static copy, supplied by the client |
| `/terms` | Website terms | Static copy, supplied by the client |
| `/thank-you` | Confirmation after any form submission | Static copy |
| `/admin` | Admin dashboard (protected) | Supabase |

**Header navigation:** Home, About, Services (dropdown: HR Consulting, Payroll Services, Compliance Audits), Briefings, Insights, Contact. Header CTA: "Book a health check" linking to `/contact#book`.

Also generate `not-found.tsx` (branded 404 with links to Home and Contact), `sitemap.ts`, `robots.ts` and an `opengraph-image`.

## Homepage, section by section

Build the homepage to match the Version 3 design reference, in this order. Each section is its own component in `components/site/home/`. Copy in quotes is final; text in \[BRACKETS\] is a placeholder.

1. **TopBar** (`navy-deep`, sits inside the navy hero block). Left: mail icon + john@truewardhr.com (mailto link); pin icon + "\[OFFICE ADDRESS\], Nairobi". Right: tel link +254 797 500747, then round outlined icon links for LinkedIn, X and Facebook (\[SOCIAL URLS\]). Hide the address below 640px.
2. **Header** (transparent over the navy hero). White logo left; nav centre; gold pill CTA "Book a health check" right. On mobile, collapse nav into a shadcn `Sheet` opened by a 44px menu button. Header becomes sticky with a solid `navy` background after 80px of scroll.
3. **Hero** (`navy`, faint white triangle in the background).
   - Eyebrow: "HR consulting and payroll, Nairobi".
   - H1: "Expert HR support for growing businesses."
   - Lead: "We run your payroll, file every statutory return and put HR policies in place that protect your business and treat your people fairly."
   - Buttons: gold pill "Get in touch" (to `/contact#book`); a play-style circular button with label "See how we work" (scrolls to Services).
   - Right: arched portrait frame (large top radius) over a gold circle with a dotted grid accent. Floating white card bottom-left: navy square with gold check, "Statutory returns filed" / "PAYE, NSSF, SHIF, Housing Levy".
   - Use `next/image` with `priority` for the portrait. Until a real photo exists, render the illustrated placeholder from the design.
4. **About** (white).
   - Left: two overlapping image frames (team meeting; consultant reviewing documents with a client) and a white checklist card with gold check circles: "Payroll that's right every month", "Policies and contracts that hold up", "Employee data handled lawfully".
   - Right: eyebrow "About TruewardHR"; H2 "HR and payroll partners who get the details right."; paragraph 1 "Most growing businesses in Kenya have staff long before they have an HR department. That gap is where payroll errors, late remittances and unfair dismissal claims start."; paragraph 2 "TruewardHR fills it. We treat HR as a compliance discipline, so every engagement leaves you with records that stand up to a labour officer, an auditor or a court."
   - Divider, then "\[FOUNDER NAME\]" / "Managing Director, TruewardHR" and a signature image (\[SIGNATURE FILE\]).
5. **Service cards** (three cards, white). Each card: image frame, a rotated navy diamond badge with a gold mark overlapping the image, H3, description, round arrow link. The middle card has a 2px navy border and stronger shadow.
   - "HR Consulting": "Policies, contracts, disciplinary support and performance systems that keep your workplace fair and your business protected." Links to `/services/hr-consulting`.
   - "Payroll Services": "Accurate monthly payroll, secure payslips and every statutory deduction calculated, filed and remitted on time." Links to `/services/payroll`.
   - "Compliance Audits": "A full health check of your contracts, files and remittances against Kenyan law, with a clear plan to fix any gaps." Links to `/services/compliance-audits`.
6. **Employer briefings** (`mist`). Eyebrow "Free employer briefings"; H2 "Stay ahead of Kenya's changing employment rules"; lead "Short, practical sessions for business owners, finance managers and HR leads." Show the next two upcoming briefings from Supabase as alternating rows: a white card overlapping an image frame (image right on row 1, left on row 2). Each card: format line (for example "Online briefing, payroll"), title, summary, navy date circle with a gold day number and month-year, speaker pill (initials avatar or photo, name, role), "Reserve a seat" link to the briefing page. Below: navy pill "See all briefings". If no upcoming briefings exist, show one card inviting visitors to join the newsletter to hear about the next session.
7. **What we handle** (white). Eyebrow "What we handle"; H2 "Everything your people operations need."; right-aligned outlined pill "View all services" with a gold arrow circle. Three-column layout: two cards left, a tall rounded central image, two cards right (stack on mobile). Each card: navy rounded-square icon in gold line style, H3, one line.
   - "Payroll processing": "Gross-to-net for every employee, approved by you before anyone is paid."
   - "Statutory compliance": "PAYE, NSSF, SHIF, Housing Levy and NITA filed before their due dates."
   - "Policies and contracts": "Handbooks, contracts and HR letters written for your business and Kenyan law."
   - "Employee data protection": "Staff records handled in line with the Data Protection Act."
8. **Team** (`mist`). Eyebrow "Our team"; H2 "Meet the people behind your payroll". Four cards from Supabase `team_members` (ordered by `sort_order`): organic blob-shaped headshot, name, role in `gold-text`, phone with icon, 6px accent bar alternating gold and navy. Hide the section entirely if fewer than two published members exist.
9. **Testimonials** (white). Left: eyebrow "Client stories"; H2 "What employers say about working with us"; previous and next round buttons plus a live "1 of N" counter (`aria-live="polite"`). Right: an organic navy blob containing a gold quote mark, the quote, client name, role and company in gold, ringed by four small circular avatars. Data comes from published rows in `testimonials`. Seed only the Hera Collections testimonial (see Content placeholders). Hide the arrows when there is one testimonial.
10. **Insights** (`mist`). Eyebrow "Insights"; H2 "Practical HR and payroll guidance". Latest three published posts: image, category in `gold-text`, title, navy date pill and "By \[author\]". Below: navy pill "Read all insights".
11. **Client logos** (white, bordered bottom). Up to six published logos from `client_logos`, greyscale at 75 percent opacity, full colour on hover. Hide the strip if none are published.
12. **Newsletter** (`navy`, faint triangle). Envelope icon in a translucent circle; H2 "Get the monthly employer update"; lead "Statutory changes, payroll reminders and practical HR tips, once a month. Unsubscribe any time." A white pill form: email input with a visually hidden label, gold pill "Subscribe", and an unticked consent checkbox beneath (see Compliance).
13. **Footer** (`navy-deep`). Column 1 "Contact us": phone in large gold Sora, address, email. Column 2 "Useful links" in two columns: About us, HR consulting, Payroll services, Briefings, Insights, Contact, Privacy notice, Terms. Column 3 "From our work": 3 × 2 image grid. Bottom bar: white logo left, "© {current year} TruewardHR. All rights reserved." right.

## Inner pages

Every inner page opens with a compact navy page header (eyebrow, H1, one-line lead, breadcrumb) and closes with the shared CTA band: "Not sure where your HR gaps are?" with a gold pill "Book a free health check".

**About (`/about`).** Sections: the About block from the homepage; "How we work" as three numbered steps (Health check; Fix and document; Run it every month, with the copy below); the Team grid; a "Why employers choose Trueward" grid of four points (Compliance first; Registered HR professionals \[IHRM REGISTRATION DETAILS\]; Your data, protected; One accountable team).

- Health check: "We review your contracts, policies, payroll and statutory remittances, then show you exactly where the risks are."
- Fix and document: "We close the gaps: updated contracts, a proper handbook, corrected payroll and any arrears sorted out."
- Run it every month: "We process payroll, file every return and stay on call for HR questions, so nothing slips."

**Services overview (`/services`).** A tabbed switcher (shadcn `Tabs`) between HR Consulting and Payroll Services, each listing eight services with a gold triangle bullet, title and one line, beside an image with a navy CTA card. Use this content:

| HR Consulting | Payroll Services |
| --- | --- |
| HR compliance audits | Monthly payroll processing |
| Policies and employee handbooks | Statutory filing and remittance |
| Contracts and HR documents | Payslips and salary payments (bank and M-Pesa files) |
| Disciplinary and termination support | Payroll setup and clean-up |
| Performance and job design | Final dues and terminal benefits |
| Employee data protection | Year-end returns and reporting (P9 forms) |
| Recruitment and onboarding | Payroll audits |
| Training for managers | Expatriate payroll |

Below the tabs, add the four-step "A payroll month with Trueward" timeline on navy: You send changes; We calculate, you approve; Staff get paid; Returns filed on time.

**Service detail pages (`/services/*`).** Same template for all three: page header; "What's included" list; "Who it's for" short paragraph; "How it works" steps; a five-question FAQ accordion specific to the service; CTA band. Add `FAQPage` JSON-LD from the FAQ content. Draft the copy in the same plain, specific voice as the homepage, and mark any claim that needs the client's confirmation with \[CONFIRM\].

**Briefings (`/briefings`, `/briefings/[slug]`).** List upcoming briefings first, then a "Past briefings" section. Detail page: title, format (online or in person), date and time with an "Add to calendar" .ics download, venue or "Link sent on registration", speaker, agenda as a short list, and the registration form. Close registration automatically when `capacity` is reached or the date has passed.

**Insights (`/insights`, `/insights/[slug]`).** Grid of post cards with category filter chips (Payroll, Employment law, Data protection, HR practice). Article page: title, category, author, date, cover image, body rendered from Markdown with good typography (`@tailwindcss/typography` styled to the brand), and a related-posts row. Add `Article` JSON-LD.

**Contact (`/contact`).** Left: phone, email, address with icons and an embedded Google Map of the office (\[MAP LOCATION\]). Right, anchored at `#book`: the health check booking form (see next section).

**Thank you (`/thank-you`).** Reads a `type` query parameter (booking, briefing, newsletter) and shows the matching confirmation message plus links back to Insights and Home.

## Data model, forms and admin

All dynamic content and every form submission live in Supabase. Anonymous visitors may only insert into the three submission tables and read published content; everything else requires an admin session.

**Tables** (write as SQL migrations in `supabase/migrations/`; every table has `id uuid primary key default gen_random_uuid()` and `created_at timestamptz default now()`):

| Table | Key columns |
| --- | --- |
| `health_check_requests` | full\_name, company, email, phone, employee\_band (1-10, 11-50, 51-150, 150+), need (payroll, hr\_consulting, both, not\_sure), message, consent\_contact bool, status (new, contacted, booked, won, lost), source\_page, notes |
| `briefing_registrations` | briefing\_id (fk), full\_name, company, role, email, phone, consent\_contact bool, attended bool |
| `newsletter_subscribers` | email unique, consent bool, consent\_text, consented\_at, unsubscribed\_at, unsubscribe\_token |
| `briefings` | slug unique, title, summary, format (online, in\_person), topic, starts\_at, ends\_at, venue, speaker\_name, speaker\_role, speaker\_photo\_url, agenda text\[\], capacity int, image\_url, published bool |
| `posts` | slug unique, title, excerpt, body\_md, category, author\_name, cover\_url, published\_at, published bool, seo\_title, seo\_description |
| `team_members` | name, role, phone, photo\_url, bio, sort\_order, published bool |
| `testimonials` | quote, client\_name, client\_role, company, photo\_url, consent\_confirmed bool, sort\_order, published bool |
| `client_logos` | company, logo\_url, website\_url, consent\_confirmed bool, sort\_order, published bool |

**Row Level Security:**

- Enable RLS on every table.
- `anon`: `insert` only on the three submission tables; `select` only on content tables where `published = true`.
- A `testimonials` or `client_logos` row can only be published when `consent_confirmed = true` (enforce with a check constraint).
- Admin access: an `is_admin()` SQL function that checks the signed-in user's email against an `admins` table seeded from `ADMIN_EMAILS`. Admin policies grant full access when `is_admin()` is true.
- Store images in a Supabase Storage bucket `public-media` (public read, admin write).

**Forms:**

- **Health check booking:** full name, company, work email, phone, number of employees (select), "I need help with" (select), optional message, and a required consent checkbox: "I agree to TruewardHR contacting me about this request." On success: insert the row, send a notification email to `NOTIFY_EMAIL` with all fields, send the visitor an acknowledgement email, redirect to `/thank-you?type=booking`.
- **Briefing registration:** name, company, role, email, phone, consent checkbox. Block duplicates by email per briefing. Confirmation email includes the date, time and the .ics file.
- **Newsletter:** email plus an unticked checkbox: "Send me the monthly employer update. I can unsubscribe at any time." Store the exact consent text and timestamp. Every email carries a one-click unsubscribe link using `unsubscribe_token`.
- **Spam protection on all forms:** a hidden honeypot field, a minimum fill time of 3 seconds, and a per-IP rate limit (5 submissions per 10 minutes) in the server action.
- **Validation messages** are specific and in plain English, shown below the field, announced to screen readers.

**Admin (`/admin`):**

- Sign in with Supabase Auth magic link; only emails in `admins` get in. Middleware protects every `/admin` route.
- Dashboard cards: new health check requests this week, upcoming briefing registrations, total active subscribers.
- **Leads:** a table of health check requests with status dropdown, notes and CSV export.
- **Briefings:** create, edit, publish; view and export registrations per briefing.
- **Content:** CRUD for posts (Markdown editor with preview), team members, testimonials and client logos, each with image upload and drag-to-reorder `sort_order`.
- **Subscribers:** list with CSV export; unsubscribed rows are shown but excluded from export.

**Seed data:** seed the one real testimonial below and nothing else. Do not seed fictional team members, posts, logos or testimonials; the design reference uses dummy content only to show layout.

## Compliance, accessibility, SEO and performance

TruewardHR sells compliance, so the website itself must be visibly compliant with the Kenya Data Protection Act 2019.

**Data protection:**

- Every form links to `/privacy` beside the submit button: "We use your details only to respond to this request. Read our privacy notice."
- Consent checkboxes are never pre-ticked. Marketing consent (newsletter) is always separate from consent to be contacted about a request.
- Collect only the fields listed in the forms spec; no date of birth, ID numbers or salary data.
- No third-party tracking cookies. Use cookieless Vercel Analytics, so no cookie banner is needed. If the client later adds a tracking tool, add a consent banner that blocks it until opt-in.
- Retention: add a scheduled Supabase function that deletes `health_check_requests` with status `lost` after \[RETENTION PERIOD, CONFIRM WITH CLIENT\] and anonymises unsubscribed newsletter rows after 30 days.
- The privacy notice text is supplied by the client. Build the page template and leave a clear \[PRIVACY NOTICE TEXT\] placeholder.

**Accessibility (WCAG 2.1 AA):**

- Semantic landmarks, one H1 per page, logical heading order.
- Visible focus ring on every interactive element: 3px `gold` outline with 2px offset.
- Touch targets at least 44 × 44px; body text never below 16px.
- All images need meaningful `alt` text or `alt=""` if decorative; decorative SVGs get `aria-hidden`.
- The testimonial slider and accordions are keyboard operable and announce changes.
- Check every text and background pair against AA contrast; the `gold` on white restriction in the brand system is mandatory.

**SEO:**

- Unique `title` and `description` per page through the Next.js Metadata API, with a default template "%s | TruewardHR".
- JSON-LD: `ProfessionalService` (name, url, telephone, email, address, areaServed "Kenya") on every page; `Article` on posts; `Event` on briefings; `FAQPage` on service pages.
- `sitemap.ts` including published posts and briefings; `robots.ts` that disallows `/admin`.
- Open Graph and Twitter images: navy background, white logo, gold triangle, page title in Sora.
- Target phrases to use naturally in headings and copy: "HR consulting Nairobi", "payroll services Kenya", "HR compliance audit Kenya", "outsourced HR Kenya".

**Performance:**

- Lighthouse scores of 90 or higher for Performance, Accessibility, Best Practices and SEO on mobile.
- `next/image` for every raster image with explicit sizes; AVIF and WebP output; only the hero image uses `priority`.
- Fonts via `next/font` with `display: swap`; no layout shift from fonts or images.
- Static generation for marketing pages; incremental revalidation (60 seconds) for pages that read Supabase content.

## Build phases and acceptance criteria

Work in these eight phases, in order. At the end of each phase, run `npm run lint` and `npm run build`, summarise what you built, list anything you could not complete, and wait for approval before starting the next phase.

1. **Setup.** Create the Next.js 14 app, Tailwind, shadcn/ui, ESLint, Prettier, folder structure, `.env.example`, Supabase clients. *Done when:* the app builds and a blank page renders with both fonts loaded.
2. **Design system.** Tailwind tokens, typography, `Button` variants (gold pill, navy pill, outline pill, round icon), `TriangleMark`, `Eyebrow`, `SectionHeading`, `IllustrationFrame`, focus styles. Build a hidden `/styleguide` page showing every token and component. *Done when:* the style guide matches the brand system and every colour pair passes AA.
3. **Layout shell.** TopBar, Header with dropdown and mobile Sheet, sticky behaviour, Footer, CTA band, `not-found`. *Done when:* navigation works by keyboard and on a 360px-wide screen.
4. **Homepage.** All 13 sections against the design reference, using static fallback content until Supabase is connected. *Done when:* the page matches the reference at 1440px, 1024px, 768px and 375px, with no horizontal scroll.
5. **Inner pages.** About, Services overview with tabs, three service detail pages, Contact, Thank you, Privacy and Terms templates. *Done when:* every route in the site map renders and every internal link resolves.
6. **Supabase and forms.** Migrations, RLS policies, storage bucket, seed, the three forms with server actions, emails via Resend, spam protection; wire homepage, briefings and insights to live data. *Done when:* a test submission of each form lands in Supabase, triggers both emails, and an anonymous client cannot read any submission table.
7. **Admin.** Magic-link login, middleware, dashboard, leads, briefings, content and subscribers screens. *Done when:* John can publish a briefing, a post and a testimonial end to end and see them on the live site within 60 seconds.
8. **Quality and launch.** SEO metadata, JSON-LD, sitemap, robots, OG images, accessibility audit with axe, Lighthouse on mobile, retention job, README with setup and deployment steps. Deploy to Vercel, connect truewardhr.com and www redirect, verify the Resend sending domain (SPF, DKIM, DMARC). *Done when:* all Lighthouse scores are 90 or above and the launch checklist below has no open items except those owned by the client.

**Throughout:** never invent content to fill a gap. If something in this spec is unclear or conflicts with the design reference, stop and ask rather than guess.

## Content placeholders and launch checklist

One testimonial is real and consented; seed it exactly as written. Everything else in the list below must come from TruewardHR before launch.

**Seed testimonial** (`consent_confirmed = true`, `published = true`, `sort_order = 1`):

> "Working with TruewardHR was a great experience! The consultation was insightful, professional, and incredibly helpful in guiding our hiring process at Hera Collections. I highly recommend his services to any business looking for practical and reliable HR support."
>
> Nicole Kunta, CEO & Co-Founder, Hera Collections

**Supplied by TruewardHR before launch:**

- [ ] Logo files as SVG (full colour and white)
- [ ] Office address and map location
- [ ] Social media profile URLs (LinkedIn, X, Facebook)
- [ ] Founder name, title, photo and signature file
- [ ] Team members: names, roles, phone numbers, headshots, short bios
- [ ] IHRM registration details for the practitioners named on the site
- [ ] Real photography: hero portrait, team, office and client-meeting shots
- [ ] Hera Collections logo and Nicole Kunta's photo, if she has agreed to their use
- [ ] Further client testimonials and logos, each with written consent
- [ ] First two briefing topics, dates, venues and speakers
- [ ] At least three launch articles for Insights
- [ ] Privacy notice and website terms text
- [ ] Data retention period for lost leads
- [ ] Resend account and DNS access for truewardhr.com
- [ ] Confirmed response time to promise on forms (for example "within one working day")

**Copy decisions to confirm:**

- [ ] Nicole's quote says "his services". Keep it verbatim, or change it to "their services" only if she agrees to that edit.
- [ ] Every line marked \[CONFIRM\] in the service detail pages.
