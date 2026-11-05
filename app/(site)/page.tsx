import { ContentStatusNotice } from "@/components/site/ContentStatusNotice";
import { Hero } from "@/components/site/home/Hero";
import { NewsletterSection } from "@/components/site/home/NewsletterSection";
import { PartnerSection } from "@/components/site/home/PartnerSection";
import { ProcessSteps } from "@/components/site/home/ProcessSteps";
import { RegulatoryTicker } from "@/components/site/home/RegulatoryTicker";
import { ServiceCards } from "@/components/site/home/ServiceCards";
import { TestimonialsSection } from "@/components/site/home/TestimonialsSection";
import { getHomepageData } from "@/lib/site-data";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function Home() {
  const contentConnected = hasSupabasePublicEnv();
  const data = contentConnected ? await getHomepageData() : null;

  return (
    <main id="main-content">
      {!contentConnected ? (
        <ContentStatusNotice content="approved client testimonials" />
      ) : null}
      <Hero />
      <RegulatoryTicker />
      <ServiceCards />
      <ProcessSteps />
      <TestimonialsSection
        testimonials={
          data?.map((testimonial) => ({
            quote: testimonial.quote,
            clientName: testimonial.client_name,
            clientRole: testimonial.client_role,
            company: testimonial.company,
          })) ?? []
        }
      />
      <PartnerSection />
      <NewsletterSection />
    </main>
  );
}
