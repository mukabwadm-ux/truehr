import { AboutPreview } from "@/components/site/home/AboutPreview";
import { ClientLogos } from "@/components/site/home/ClientLogos";
import { ContentStatusNotice } from "@/components/site/ContentStatusNotice";
import { EmployerBriefings } from "@/components/site/home/EmployerBriefings";
import { Hero } from "@/components/site/home/Hero";
import { InsightsSection } from "@/components/site/home/InsightsSection";
import { NewsletterSection } from "@/components/site/home/NewsletterSection";
import { ServiceCards } from "@/components/site/home/ServiceCards";
import { TeamSection } from "@/components/site/home/TeamSection";
import { TestimonialsSection } from "@/components/site/home/TestimonialsSection";
import { WhatWeHandle } from "@/components/site/home/WhatWeHandle";
import { getHomepageData } from "@/lib/site-data";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function Home() {
  const contentConnected = hasSupabasePublicEnv();
  const data = contentConnected ? await getHomepageData() : null;

  return (
    <main id="main-content">
      {!contentConnected ? (
        <ContentStatusNotice content="briefings, team profiles, testimonials, insights and client logos" />
      ) : null}
      <Hero />
      <AboutPreview />
      <ServiceCards />
      <EmployerBriefings briefings={data?.briefings ?? []} />
      <WhatWeHandle />
      <TeamSection
        members={
          data?.teamMembers.map((member) => ({
            name: member.name,
            role: member.role,
            phone: member.phone,
            photoUrl: member.photo_url,
          })) ?? []
        }
      />
      <TestimonialsSection
        testimonials={
          data?.testimonials.map((testimonial) => ({
            quote: testimonial.quote,
            clientName: testimonial.client_name,
            clientRole: testimonial.client_role,
            company: testimonial.company,
          })) ?? []
        }
      />
      <InsightsSection
        posts={
          data?.posts.map((post) => ({
            slug: post.slug,
            title: post.title,
            category: post.category,
            author: post.author_name,
            publishedAt: post.published_at,
            coverUrl: post.cover_url,
          })) ?? []
        }
      />
      <ClientLogos
        logos={
          data?.logos.map((logo) => ({
            company: logo.company,
            logoUrl: logo.logo_url,
            websiteUrl: logo.website_url,
          })) ?? []
        }
      />
      <NewsletterSection />
    </main>
  );
}
