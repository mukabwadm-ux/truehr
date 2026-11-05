import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

const photos = {
  hero: "/images/Man_in_suit_celebrating_victory_1bf755b5.jpg",
  employee: "/images/Employee_smiling_at_salary_notif…_79f1462d.jpg",
  founder: "/images/Founder_reviewing_documents_at_desk_db1882ce.jpg",
};

export function Hero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="overflow-hidden bg-mist"
    >
      <div className="container grid items-center gap-8 py-12 sm:py-16 lg:min-h-[32rem] lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-14">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-sm">
            <span className="rounded-full bg-gold px-2 py-0.5 font-bold text-navy">
              9th
            </span>
            Every remittance filed on time
          </p>
          <h1
            className="mt-5 max-w-lg text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-navy sm:text-6xl"
            id="home-hero-title"
          >
            Your people, paid right and protected.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            HR consulting and payroll for growing Kenyan businesses. We run your
            payroll, file every statutory return and put the policies in place
            that keep your workplace fair.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="sm" variant="navy">
              <Link href="/contact#book">Book a compliance health check</Link>
            </Button>
            <a
              className="inline-flex min-h-11 items-center rounded-full border border-navy/20 bg-white px-5 font-heading text-sm font-bold text-navy transition-colors hover:border-navy"
              href="tel:+254797500747"
            >
              Call +254 797 500747
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[38rem] pb-10 pr-2 sm:pb-12 sm:pr-4">
          <div className="relative mr-[12%] aspect-[1.3/1] overflow-hidden rounded-[1.25rem] border-[5px] border-navy bg-white shadow-soft sm:rounded-[1.6rem]">
            <Image
              alt="Business owner celebrating success above Nairobi"
              className="object-cover object-[center_45%]"
              fill
              unoptimized
              priority
              sizes="(max-width: 1023px) 78vw, 48vw"
              src={photos.hero}
            />
          </div>

          <div className="absolute right-0 top-[12%] z-10 aspect-square w-[31%] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-soft sm:rounded-[1.25rem]">
            <Image
              alt="Employee smiling after receiving a salary notification"
              className="object-cover"
              fill
              unoptimized
              sizes="(max-width: 639px) 30vw, 12vw"
              src={photos.employee}
            />
          </div>

          <div className="absolute bottom-8 right-[3%] z-10 aspect-[1.25/1] w-[39%] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-soft sm:bottom-10 sm:rounded-[1.25rem]">
            <Image
              alt="Founder reviewing documents at work"
              className="object-cover"
              fill
              unoptimized
              sizes="(max-width: 639px) 38vw, 16vw"
              src={photos.founder}
            />
          </div>

          <div className="absolute bottom-0 left-0 z-20 flex max-w-[17rem] items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 text-navy shadow-soft sm:px-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
              <ShieldCheck aria-hidden="true" size={19} />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1 font-heading text-xs font-bold">
                <Check
                  aria-hidden="true"
                  className="text-gold-text"
                  size={14}
                />
                Statutory returns filed
              </span>
              <span className="mt-0.5 block text-[10px] leading-snug text-muted sm:text-xs">
                PAYE, NSSF, SHIF, Housing Levy, NITA
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
