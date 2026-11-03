import Image from "next/image";
import Link from "next/link";

import { CTABand } from "@/components/site/CTABand";
import { ContentStatusNotice } from "@/components/site/ContentStatusNotice";
import { PageHeader } from "@/components/site/PageHeader";
import { getPublishedPosts, type PostCategory } from "@/lib/site-data";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

const categories: {
  slug: string;
  label: PostCategory;
  value: PostCategory;
}[] = [
  { slug: "payroll", label: "Payroll", value: "Payroll" },
  { slug: "employment-law", label: "Employment law", value: "Employment law" },
  {
    slug: "data-protection",
    label: "Data protection",
    value: "Data protection",
  },
  { slug: "hr-practice", label: "HR practice", value: "HR practice" },
];

interface InsightsPageProps {
  searchParams?: { category?: string | string[] };
}

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "long",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export const dynamic = "force-dynamic";

export default async function InsightsPage({
  searchParams,
}: InsightsPageProps) {
  const requestedCategory =
    typeof searchParams?.category === "string" ? searchParams.category : "";
  const selectedCategory = categories.find(
    (category) => category.slug === requestedCategory,
  );
  const contentConnected = hasSupabasePublicEnv();
  const posts = contentConnected
    ? await getPublishedPosts(selectedCategory?.value)
    : null;

  return (
    <>
      {!contentConnected ? (
        <ContentStatusNotice content="published insights" />
      ) : null}
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
                const isSelected = selectedCategory?.slug === category.slug;
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
          {posts?.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                if (!post.published_at) {
                  console.error(
                    "A published insight has no publication date.",
                    post.id,
                  );
                  throw new Error(
                    "A published insight is missing its publication date.",
                  );
                }

                return (
                  <article
                    className="overflow-hidden rounded-card bg-white shadow-sm"
                    key={post.id}
                  >
                    <Link
                      aria-label={`Read ${post.title}`}
                      className="block h-full"
                      href={`/insights/${post.slug}`}
                    >
                      {post.cover_url ? (
                        <div className="relative aspect-[16/10] bg-navy-soft">
                          <Image
                            alt=""
                            className="object-cover"
                            fill
                            sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 30vw"
                            src={post.cover_url}
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[16/10] items-center justify-center bg-navy-soft px-4 text-center text-sm text-on-navy">
                          Article cover image to be supplied
                        </div>
                      )}
                      <div className="p-5">
                        <p className="font-heading text-sm font-bold text-gold-text">
                          {post.category}
                        </p>
                        <h3 className="mt-2 font-heading text-card font-bold text-navy">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-body text-muted">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <time
                            className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white"
                            dateTime={post.published_at}
                          >
                            {formatPublishedDate(post.published_at)}
                          </time>
                          <span className="text-sm text-muted">
                            By {post.author_name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="mt-8 rounded-card border border-dashed border-border bg-white p-6 text-body text-muted">
              {contentConnected
                ? "No published articles are available in this category yet. Approved articles will appear here."
                : "Published articles will appear here once Supabase is configured."}
            </p>
          )}
        </div>
      </section>
      <CTABand />
    </>
  );
}
