import Link from "next/link";

import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

const confirmations: Record<string, { title: string; description: string }> = {
  booking: {
    title: "Thank you. Your health check request has been received.",
    description:
      "The TruewardHR team will follow up about your request using the contact details you provided.",
  },
  briefing: {
    title: "Your briefing registration is confirmed.",
    description:
      "We'll share the session details using the contact information provided with your registration.",
  },
  newsletter: {
    title: "Thanks for subscribing to the monthly employer update.",
    description:
      "You can expect practical HR guidance, payroll reminders and statutory updates in your inbox.",
  },
};

interface ThankYouPageProps {
  searchParams?: { type?: string | string[] };
}

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const requestedType = searchParams?.type;
  const confirmation =
    typeof requestedType === "string" &&
    (requestedType === "booking" ||
      requestedType === "briefing" ||
      requestedType === "newsletter")
      ? confirmations[requestedType]
      : {
          title: "Thanks for getting in touch.",
          description:
            "Explore practical HR and payroll guidance while you wait to hear from us.",
        };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Thank you" }]}
        description={confirmation.description}
        eyebrow="Thank you"
        title={confirmation.title}
      />
      <section className="bg-white py-section-mobile lg:py-section">
        <div className="container flex flex-col items-start gap-5 sm:flex-row">
          <Button asChild variant="navy">
            <Link href="/insights">Explore insights</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </section>
      <CTABand />
    </>
  );
}
