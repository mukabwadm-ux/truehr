# TruewardHR

The TruewardHR public website and admin area, built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add the project credentials.
3. Start the development server with `npm run dev`.

## Supabase and forms

- Link the Supabase CLI to the project and apply `supabase/migrations/` with `supabase db push`.
- Run `supabase/seed.sql` in the Supabase SQL Editor to add the approved Hera Collections testimonial.
- Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NOTIFY_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_EMAILS`, and `RATE_LIMIT_SECRET` in `.env.local`.
- Run `npm run db:seed-admins` to add the comma-separated emails in `ADMIN_EMAILS` to the protected `admins` table.
- Never expose or commit `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, or `RATE_LIMIT_SECRET`.
- Public browser clients can read only published content. Submission tables deny anonymous database writes; all public submissions go through server actions for validation, spam protection, rate limiting, email delivery, and (for briefings) capacity enforcement.
- Briefing calendar downloads are served from `/api/briefings/[slug]/calendar.ics`. Newsletter confirmations include a confirmation-page link and an RFC 8058 one-click unsubscribe endpoint at `/api/unsubscribe`.

The complete build brief is in [`docs/BUILD_SPEC.md`](./docs/BUILD_SPEC.md). Supplied brand assets and approved design screenshots will be added to `public/brand/` and `docs/design-reference/` when available.
