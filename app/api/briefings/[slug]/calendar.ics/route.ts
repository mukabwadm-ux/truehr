import { getPublishedBriefing } from "@/lib/site-data";
import { buildCalendarFile } from "@/lib/server/ical";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

interface CalendarRouteProps {
  params: { slug: string };
}

export async function GET(_request: Request, { params }: CalendarRouteProps) {
  if (!hasSupabasePublicEnv()) {
    return new Response("Calendar downloads are not configured.", {
      status: 503,
    });
  }

  const briefing = await getPublishedBriefing(params.slug);
  if (!briefing) {
    return new Response("Briefing not found.", { status: 404 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error(
      "Set NEXT_PUBLIC_SITE_URL before generating calendar files.",
    );
  }

  const calendar = buildCalendarFile({
    uid: `${briefing.slug}-${briefing.starts_at}@truewardhr.com`,
    title: briefing.title,
    description: briefing.summary,
    startsAt: briefing.starts_at,
    endsAt: briefing.ends_at,
    location:
      briefing.format === "online"
        ? "Link sent on registration"
        : (briefing.venue ?? ""),
    url: `${new URL(siteUrl).origin}/briefings/${briefing.slug}`,
  });

  return new Response(calendar, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": `attachment; filename="${briefing.slug}.ics"`,
      "Content-Type": "text/calendar; charset=utf-8",
    },
  });
}
