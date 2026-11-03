import Link from "next/link";

import { BriefingCard } from "@/components/site/BriefingCard";
import { CTABand } from "@/components/site/CTABand";
import { ContentStatusNotice } from "@/components/site/ContentStatusNotice";
import { PageHeader } from "@/components/site/PageHeader";
import { getBriefings } from "@/lib/site-data";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function BriefingsPage() {
  const contentConnected = hasSupabasePublicEnv();
  const briefings = contentConnected ? await getBriefings() : null;

  return (
    <>
      {!contentConnected ? (
        <ContentStatusNotice content="published employer briefings" />
      ) : null}
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Briefings" }]}
        description="Short, practical sessions for business owners, finance managers and HR leads."
        eyebrow="Free employer briefings"
        title="Stay ahead of Kenya's changing employment rules"
      />
      <section
        aria-labelledby="upcoming-briefings-title"
        className="bg-white py-section-mobile lg:py-section"
      >
        <div className="container">
          <h2
            className="text-section font-extrabold text-navy"
            id="upcoming-briefings-title"
          >
            Upcoming briefings
          </h2>
          {briefings?.upcoming.length ? (
            <div className="mt-8 space-y-8">
              {briefings.upcoming.map((briefing, index) => (
                <BriefingCard
                  briefing={briefing}
                  index={index}
                  key={briefing.id}
                />
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-card border border-dashed border-border bg-mist p-6 text-body text-muted sm:p-8">
              No upcoming briefings are scheduled yet. Join the{" "}
              <Link
                className="font-semibold text-navy underline"
                href="/#newsletter"
              >
                monthly employer update
              </Link>{" "}
              to hear when the next session is announced.
            </div>
          )}
          <h2 className="mt-14 text-section font-extrabold text-navy">
            Past briefings
          </h2>
          {briefings?.past.length ? (
            <div className="mt-8 space-y-8">
              {briefings.past.map((briefing, index) => (
                <BriefingCard
                  briefing={briefing}
                  index={index}
                  isPast
                  key={briefing.id}
                />
              ))}
            </div>
          ) : (
            <p className="mt-5 text-body text-muted">
              Past session details will appear here when published.
            </p>
          )}
        </div>
      </section>
      <CTABand />
    </>
  );
}
