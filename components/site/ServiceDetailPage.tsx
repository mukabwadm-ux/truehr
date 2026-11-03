import { Check, ChevronDown } from "lucide-react";

import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";
import type { ServiceDetail } from "@/lib/service-content";

interface ServiceDetailPageProps {
  service: ServiceDetail;
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }).replace(/</g, "\\u003c");

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        description={service.description}
        eyebrow={service.eyebrow}
        title={service.title}
      />

      <section
        aria-labelledby="included-title"
        className="bg-white py-section-mobile lg:py-section"
      >
        <div className="container grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <h2
              className="text-section font-extrabold text-navy"
              id="included-title"
            >
              What&apos;s included
            </h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {service.included.map((item) => (
                <li
                  className="flex items-start gap-3 rounded-inner border border-line bg-white p-4 text-body text-ink"
                  key={item}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-text">
                    <Check aria-hidden="true" size={16} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-card bg-mist p-6 sm:p-8">
            <h2 className="font-heading text-card font-bold text-navy">
              Who it&apos;s for
            </h2>
            <p className="mt-4 text-body text-muted">{service.audience}</p>
            <p className="mt-6 border-t border-border pt-5 text-sm text-muted">
              We confirm the scope and information needed with you before work
              begins.
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="process-title"
        className="bg-mist py-section-mobile lg:py-section"
      >
        <div className="container">
          <h2
            className="text-section font-extrabold text-navy"
            id="process-title"
          >
            How it works
          </h2>
          <ol className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, index) => (
              <li
                className="rounded-card bg-white p-5 shadow-sm sm:p-6"
                key={step.title}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-heading font-bold text-gold">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-heading text-card font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-body text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="faq-title"
        className="bg-white py-section-mobile lg:py-section"
      >
        <div className="container max-w-4xl">
          <h2 className="text-section font-extrabold text-navy" id="faq-title">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {service.faqs.map((faq) => (
              <details className="group py-5" key={faq.question}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-heading font-bold text-navy marker:hidden">
                  {faq.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="shrink-0 transition-transform group-open:rotate-180"
                    size={20}
                  />
                </summary>
                <p className="max-w-3xl pb-2 pr-8 pt-3 text-body text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
      <script
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        type="application/ld+json"
      />
    </>
  );
}
