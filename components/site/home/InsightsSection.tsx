import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";

export interface InsightPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  coverUrl: string | null;
}

interface InsightsSectionProps {
  posts: readonly InsightPost[];
}

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export function InsightsSection({ posts }: InsightsSectionProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section
      aria-labelledby="insights-title"
      className="bg-mist py-section-mobile lg:py-section"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Insights"
          id="insights-title"
          title="Practical HR and payroll guidance"
        />

        {latestPosts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <article
                className="overflow-hidden rounded-card bg-white shadow-sm"
                key={post.slug}
              >
                <Link
                  aria-label={`Read ${post.title}`}
                  className="block"
                  href={`/insights/${post.slug}`}
                >
                  {post.coverUrl ? (
                    <div className="relative aspect-[16/10] bg-navy-soft">
                      <Image
                        alt=""
                        className="object-cover"
                        fill
                        sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 30vw"
                        src={post.coverUrl}
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
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <time
                        className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white"
                        dateTime={post.publishedAt}
                      >
                        {formatPublishedDate(post.publishedAt)}
                      </time>
                      <span className="text-sm text-muted">
                        By {post.author}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-card border border-border bg-white p-6 text-body text-muted">
            Practical articles will appear here when approved content is
            available.
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button asChild variant="navy">
            <Link href="/insights">Read all insights</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
