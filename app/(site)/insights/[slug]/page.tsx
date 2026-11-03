import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CTABand } from "@/components/site/CTABand";
import { ContentStatusNotice } from "@/components/site/ContentStatusNotice";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { getPublishedPost, getRelatedPosts } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/server/site-url";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

interface InsightDetailPageProps {
  params: { slug: string };
}

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "long",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export async function generateMetadata({
  params,
}: InsightDetailPageProps): Promise<Metadata> {
  if (!hasSupabasePublicEnv()) {
    return { title: "Insight" };
  }

  const post = await getPublishedPost(params.slug);
  if (!post) {
    return { title: "Insight not found" };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      type: "article",
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      publishedTime: post.published_at ?? undefined,
      images: post.cover_url ? [post.cover_url] : undefined,
    },
  };
}

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps) {
  if (!hasSupabasePublicEnv()) {
    return (
      <>
        <ContentStatusNotice content="published insight articles" />
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: "Article" },
          ]}
          description="Published article content will appear here once Supabase is configured."
          eyebrow="Insights"
          title="Article not available"
        />
        <section className="bg-white py-section-mobile lg:py-section">
          <div className="container max-w-3xl">
            <p className="rounded-card border border-dashed border-border bg-mist p-6 text-body text-muted sm:p-8">
              This article cannot be loaded until published content is
              configured.
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

  const post = await getPublishedPost(params.slug);
  if (!post) {
    notFound();
  }
  if (!post.published_at) {
    console.error("A published insight has no publication date.", post.id);
    throw new Error("A published insight is missing its publication date.");
  }

  const relatedPosts = await getRelatedPosts(post.category, post.slug);
  const articleUrl = `${getSiteUrl()}/insights/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo_description || post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: "TruewardHR",
      url: getSiteUrl(),
    },
    mainEntityOfPage: articleUrl,
    ...(post.cover_url ? { image: [post.cover_url] } : {}),
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title },
        ]}
        description={post.excerpt}
        eyebrow={post.category}
        title={post.title}
      />
      <article className="bg-white py-section-mobile lg:py-section">
        <div className="container max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5 text-sm text-muted">
            <span>By {post.author_name}</span>
            <time dateTime={post.published_at}>
              {formatPublishedDate(post.published_at)}
            </time>
          </div>
          {post.cover_url ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-card bg-mist">
              <Image
                alt=""
                className="object-cover"
                fill
                priority
                sizes="(max-width: 767px) 90vw, 768px"
                src={post.cover_url}
              />
            </div>
          ) : null}
          <div className="prose prose-lg mt-8 max-w-none prose-headings:font-heading prose-headings:text-navy prose-a:text-navy prose-a:underline prose-strong:text-ink">
            <ReactMarkdown>{post.body_md}</ReactMarkdown>
          </div>
        </div>
      </article>
      {relatedPosts.length ? (
        <section
          aria-labelledby="related-insights-title"
          className="bg-mist py-section-mobile lg:py-section"
        >
          <div className="container">
            <h2
              className="text-section font-extrabold text-navy"
              id="related-insights-title"
            >
              Related insights
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <article
                  className="rounded-card bg-white p-6 shadow-sm"
                  key={related.id}
                >
                  <p className="font-heading text-sm font-bold text-gold-text">
                    {related.category}
                  </p>
                  <h3 className="mt-2 font-heading text-card font-bold text-navy">
                    {related.title}
                  </h3>
                  <p className="mt-2 text-body text-muted">{related.excerpt}</p>
                  <Link
                    className="mt-5 inline-flex min-h-11 items-center font-heading font-bold text-navy underline underline-offset-4"
                    href={`/insights/${related.slug}`}
                  >
                    Read article
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <CTABand />
    </>
  );
}
