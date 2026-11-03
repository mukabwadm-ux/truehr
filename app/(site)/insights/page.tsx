import Link from "next/link";

import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";

const categories = [
  { slug: "payroll", label: "Payroll" },
  { slug: "employment-law", label: "Employment law" },
  { slug: "data-protection", label: "Data protection" },
  { slug: "hr-practice", label: "HR practice" },
];

interface InsightsPageProps {
  searchParams?: { category?: string | string[] };
}

export default function InsightsPage({ searchParams }: InsightsPageProps) {
  const requestedCategory =
    typeof searchParams?.category === "string" ? searchParams.category : "";
  const selectedCategory = categories.find(
    (category) => category.slug === requestedCategory,
  )?.slug;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        description="Practical guidance for employers managing HR, payroll and compliance."
        eyebrow="Insights"
        title="Practical HR and payroll guidance"
      />
      <section
        aria-labelledby="insights-list-title"
        className="bg-mist py-section-mobile lg:py-section"
      >
        <div className="container">
          <h2
            className="text-section font-extrabold text-navy"
            id="insights-list-title"
          >
            Browse insights
          </h2>
          <nav aria-label="Filter insights by category" className="mt-6">
            <ul className="flex flex-wrap gap-3">
              <li>
                <Link
                  aria-current={selectedCategory ? undefined : "page"}
                  className={`inline-flex min-h-11 items-center rounded-full px-5 font-heading text-sm font-bold ${
                    selectedCategory
                      ? "border border-navy text-navy hover:bg-white"
                      : "bg-navy text-white"
                  }`}
                  href="/insights"
                >
                  All
                </Link>
              </li>
              {categories.map((category) => {
                const isSelected = selectedCategory === category.slug;
                return (
                  <li key={category.slug}>
                    <Link
                      aria-current={isSelected ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center rounded-full px-5 font-heading text-sm font-bold ${
                        isSelected
                          ? "bg-navy text-white"
                          : "border border-navy text-navy hover:bg-white"
                      }`}
                      href={`/insights?category=${category.slug}`}
                    >
                      {category.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <p className="mt-8 rounded-card border border-dashed border-border bg-white p-6 text-body text-muted">
            No published articles are available yet. Approved articles will
            appear here.
          </p>
        </div>
      </section>
      <CTABand />
    </>
  );
}
