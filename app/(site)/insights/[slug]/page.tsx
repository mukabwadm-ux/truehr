import Link from "next/link";

import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export default function InsightDetailPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Article" },
        ]}
        description="Article content will appear here when an approved insight is published."
        eyebrow="Insights"
        title="Article not available"
      />
      <section className="bg-white py-section-mobile lg:py-section">
        <div className="container max-w-3xl">
          <p className="rounded-card border border-dashed border-border bg-mist p-6 text-body text-muted sm:p-8">
            This article is not available yet. Browse the insights list for
            published guidance.
          </p>
          <Button asChild className="mt-7" variant="navy">
            <Link href="/insights">View all insights</Link>
          </Button>
        </div>
      </section>
      <CTABand />
    </>
  );
}
