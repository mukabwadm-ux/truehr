import Image from "next/image";
import Link from "next/link";
import { Check, Play, ShieldCheck } from "lucide-react";

import { IllustrationFrame } from "@/components/brand/IllustrationFrame";
import { TriangleMark } from "@/components/brand/TriangleMark";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/Eyebrow";

export function Hero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate overflow-hidden bg-navy text-white"
    >
      <TriangleMark className="absolute -right-20 top-12 -z-10 h-80 w-80 text-white/5" />
      <div className="container grid items-center gap-16 py-section-mobile lg:min-h-[42rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-section">
        <div className="animate-fade-rise max-w-2xl">
          <Eyebrow className="text-gold">
            HR consulting and payroll, Nairobi
          </Eyebrow>
          <h1
            className="mt-5 text-display font-extrabold text-white"
            id="home-hero-title"
          >
            Expert HR support for growing businesses.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-on-navy">
            We run your payroll, file every statutory return and put HR policies
            in place that protect your business and treat your people fairly.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button asChild variant="gold">
              <Link href="/contact#book">Get in touch</Link>
            </Button>
            <a
              className="inline-flex min-h-12 items-center gap-3 font-heading font-bold text-white hover:text-gold"
              href="#services"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-on-navy/50 text-gold">
                <Play aria-hidden="true" fill="currentColor" size={16} />
              </span>
              See how we work
            </a>
          </div>
        </div>

        <div className="animate-fade-rise animation-delay-100 relative mx-auto w-full max-w-[32rem]">
          <div
            aria-hidden="true"
            className="absolute -bottom-5 right-2 aspect-square w-[74%] rounded-full bg-gold"
          />
          <div
            aria-hidden="true"
            className="dot-grid absolute -right-2 top-12 z-10 h-28 w-28 opacity-70"
          />
          <IllustrationFrame className="relative mx-auto aspect-[4/5] w-[86%] overflow-hidden rounded-t-[44%] bg-navy-soft shadow-soft">
            <Image
              alt="Smiling professional wearing a navy suit"
              className="object-contain"
              fill
              priority
              sizes="(max-width: 1023px) 80vw, 40vw"
              src="/brand/hero-consultant.png"
            />
          </IllustrationFrame>

          <div className="animate-fade-rise animation-delay-200 absolute -bottom-8 left-0 z-20 flex max-w-[19rem] items-center gap-4 rounded-card bg-white p-4 text-ink shadow-soft sm:-left-4 sm:p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-inner bg-navy text-gold">
              <ShieldCheck aria-hidden="true" size={24} />
            </span>
            <span>
              <span className="flex items-center gap-2 font-heading text-sm font-bold text-navy">
                <Check
                  aria-hidden="true"
                  className="text-gold-text"
                  size={16}
                />
                Statutory returns filed
              </span>
              <span className="mt-1 block text-sm text-muted">
                PAYE, NSSF, SHIF, Housing Levy
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
