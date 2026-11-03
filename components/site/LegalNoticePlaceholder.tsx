import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";

interface LegalNoticePlaceholderProps {
  title: string;
  description: string;
  placeholder: string;
}

export function LegalNoticePlaceholder({
  title,
  description,
  placeholder,
}: LegalNoticePlaceholderProps) {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
        description={description}
        eyebrow="Website information"
        title={title}
      />
      <section className="bg-white py-section-mobile lg:py-section">
        <div className="container max-w-4xl">
          <div
            className="rounded-card border border-dashed border-border bg-mist p-6 text-body text-muted sm:p-8"
            role="note"
          >
            <h2 className="font-heading text-card font-bold text-navy">
              Client-approved copy required before launch
            </h2>
            <p className="mt-4">{placeholder}</p>
            <p className="mt-4">
              This page is a visible placeholder, not a substitute for the final
              legal text supplied and approved by TruewardHR.
            </p>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
