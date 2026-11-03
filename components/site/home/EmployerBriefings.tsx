import Link from "next/link";
import { ArrowRight, CalendarDays, Mail } from "lucide-react";

import { IllustrationFrame } from "@/components/brand/IllustrationFrame";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";

export function EmployerBriefings() {
  return (
    <section
      aria-labelledby="briefings-title"
      className="bg-mist py-section-mobile lg:py-section"
      id="briefings"
    >
      <div className="container">
        <SectionHeading
          description="Short, practical sessions for business owners, finance managers and HR leads."
          eyebrow="Free employer briefings"
          id="briefings-title"
          title="Stay ahead of Kenya's changing employment rules"
        />

        <article className="relative mt-10 grid items-center gap-6 rounded-card bg-white p-5 shadow-soft sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:gap-10">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 font-heading text-sm font-bold text-gold-text">
              <CalendarDays aria-hidden="true" size={18} />
              Free employer briefings
            </p>
            <h3 className="mt-4 font-heading text-card font-bold text-navy">
              No upcoming briefings are scheduled yet.
            </h3>
            <p className="mt-3 max-w-xl text-body text-muted">
              Join the monthly employer update and we&apos;ll let you know when
              the next practical session is announced.
            </p>
            <Link
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-heading font-bold text-navy hover:text-gold-text"
              href="#newsletter"
            >
              Join the newsletter
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <IllustrationFrame className="aspect-[16/9] bg-navy-soft shadow-none">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-navy-soft"
            >
              <Mail aria-hidden="true" className="text-gold/70" size={72} />
            </div>
            <figcaption className="absolute bottom-3 left-3 right-3 rounded-inner bg-navy/90 px-3 py-2 text-center text-xs text-on-navy">
              Briefing artwork to be supplied
            </figcaption>
          </IllustrationFrame>
        </article>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="navy">
            <Link href="/briefings">See all briefings</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
