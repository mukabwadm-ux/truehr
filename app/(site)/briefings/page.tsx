import Link from "next/link";

import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";

export default function BriefingsPage() {
  return (
    <>
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
          <h2 className="mt-14 text-section font-extrabold text-navy">
            Past briefings
          </h2>
          <p className="mt-5 text-body text-muted">
            Past session details will appear here when published.
          </p>
        </div>
      </section>
      <CTABand />
    </>
  );
}
