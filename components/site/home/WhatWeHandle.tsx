import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  FileText,
  Calculator,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { IllustrationFrame } from "@/components/brand/IllustrationFrame";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/Eyebrow";

const services: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Payroll processing",
    description:
      "Gross-to-net for every employee, approved by you before anyone is paid.",
    icon: Calculator,
  },
  {
    title: "Statutory compliance",
    description:
      "PAYE, NSSF, SHIF, Housing Levy and NITA filed before their due dates.",
    icon: FileCheck2,
  },
  {
    title: "Policies and contracts",
    description:
      "Handbooks, contracts and HR letters written for your business and Kenyan law.",
    icon: FileText,
  },
  {
    title: "Employee data protection",
    description: "Staff records handled in line with the Data Protection Act.",
    icon: ShieldCheck,
  },
];

function ServicePoint({
  title,
  description,
  icon: Icon,
}: (typeof services)[number]) {
  return (
    <article className="rounded-card border border-border bg-white p-5 shadow-sm sm:p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-inner bg-navy text-gold">
        <Icon aria-hidden="true" size={23} />
      </span>
      <h3 className="mt-4 font-heading text-card font-bold text-navy">
        {title}
      </h3>
      <p className="mt-2 text-body text-muted">{description}</p>
    </article>
  );
}

export function WhatWeHandle() {
  return (
    <section
      aria-labelledby="what-we-handle-title"
      className="bg-white py-section-mobile lg:py-section"
    >
      <div className="container">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>What we handle</Eyebrow>
            <h2
              className="mt-3 max-w-3xl text-section font-extrabold text-navy"
              id="what-we-handle-title"
            >
              Everything your people operations need.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/services">
              View all services
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-navy">
                <ArrowRight aria-hidden="true" size={15} />
              </span>
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.9fr_1fr] lg:items-stretch">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {services.slice(0, 2).map((service) => (
              <ServicePoint key={service.title} {...service} />
            ))}
          </div>

          <IllustrationFrame className="relative min-h-72 bg-navy-soft sm:col-span-2 lg:col-span-1 lg:min-h-full">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-navy-soft"
            >
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/20">
                <div className="h-32 w-32 rounded-full bg-gold/70" />
                <div className="absolute h-56 w-40 rounded-t-[50%] bg-white/15" />
              </div>
            </div>
            <figcaption className="absolute bottom-4 left-4 right-4 rounded-inner bg-navy/85 px-3 py-2 text-center text-sm text-on-navy">
              Office and client-work photos to be supplied
            </figcaption>
          </IllustrationFrame>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {services.slice(2).map((service) => (
              <ServicePoint key={service.title} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
