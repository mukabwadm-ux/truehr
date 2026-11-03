import Link from "next/link";

import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export default function BriefingDetailPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Briefings", href: "/briefings" },
          { label: "Briefing details" },
        ]}
        description="Session details and registration will be available when a briefing is published."
        eyebrow="Employer briefing"
        title="Briefing details"
      />
      <section className="bg-white py-section-mobile lg:py-section">
        <div className="container max-w-3xl">
          <p className="rounded-card border border-dashed border-border bg-mist p-6 text-body text-muted sm:p-8">
            This briefing is not available yet. Check the briefing list for
            upcoming sessions or contact TruewardHR with a question.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Button asChild variant="navy">
              <Link href="/briefings">View all briefings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
