import Link from "next/link";

import { TriangleMark } from "@/components/brand/TriangleMark";
import { Button } from "@/components/ui/button";

export function CTABand() {
  return (
    <section
      aria-labelledby="health-check-cta"
      className="relative isolate overflow-hidden bg-navy"
    >
      <TriangleMark className="absolute -right-8 -top-8 -z-10 h-48 w-48 text-white/5" />
      <div className="container flex flex-col items-start justify-between gap-8 py-12 sm:flex-row sm:items-center lg:py-16">
        <div className="max-w-2xl">
          <p className="font-heading text-sm font-bold text-on-navy">
            HR consulting and payroll, Nairobi
          </p>
          <h2
            className="mt-3 text-section font-extrabold text-white"
            id="health-check-cta"
          >
            Not sure where your HR gaps are?
          </h2>
        </div>
        <Button asChild variant="gold">
          <Link href="/contact#book">Book a free health check</Link>
        </Button>
      </div>
    </section>
  );
}
