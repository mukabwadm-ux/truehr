import type { Metadata } from "next";
import Link from "next/link";

import { unsubscribeNewsletter } from "@/app/actions";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface UnsubscribePageProps {
  searchParams?: { token?: string; status?: string };
}

export default function UnsubscribePage({
  searchParams,
}: UnsubscribePageProps) {
  const token = searchParams?.token ?? "";
  const status = searchParams?.status;
  const validToken = /^[a-f0-9]{64}$/.test(token);

  let message = "";
  if (status === "complete") {
    message = "You have been unsubscribed from the monthly employer update.";
  } else if (status === "invalid") {
    message =
      "This unsubscribe link is invalid. Please use the link in your email.";
  } else if (status === "error") {
    message =
      "We couldn't process your request right now. Please try again later.";
  } else if (!validToken) {
    message =
      "To unsubscribe, please use the link included in your employer update email.";
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Unsubscribe" }]}
        description="Manage your TruewardHR monthly employer update subscription."
        eyebrow="Email preferences"
        title="Unsubscribe"
      />
      <section className="bg-white py-section-mobile lg:py-section">
        <div className="container max-w-2xl">
          {message ? (
            <p className="rounded-card border border-border bg-mist p-6 text-body text-muted">
              {message}
            </p>
          ) : (
            <div className="rounded-card border border-border bg-mist p-6">
              <p className="text-body text-ink">
                Confirm that you want to stop receiving the monthly employer
                update.
              </p>
              <form action={unsubscribeNewsletter} className="mt-6">
                <input name="token" type="hidden" value={token} />
                <Button type="submit" variant="navy">
                  Unsubscribe
                </Button>
              </form>
            </div>
          )}
          <Link
            className="mt-6 inline-flex min-h-11 items-center font-heading font-bold text-navy underline underline-offset-4"
            href="/"
          >
            Return to TruewardHR
          </Link>
        </div>
      </section>
    </>
  );
}
