import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { IllustrationFrame } from "@/components/brand/IllustrationFrame";
import { TriangleMark } from "@/components/brand/TriangleMark";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";

const services: {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    title: "HR Consulting",
    description:
      "Policies, contracts, disciplinary support and performance systems that keep your workplace fair and your business protected.",
    href: "/services/hr-consulting",
    image: "/services/hr-consulting.jpg",
    imageAlt: "HR consulting team discussing workplace talent and hiring",
  },
  {
    title: "Payroll Services",
    description:
      "Accurate monthly payroll, secure payslips and every statutory deduction calculated, filed and remitted on time.",
    href: "/services/payroll",
    image: "/services/payroll-services.jpg",
    imageAlt: "Digital payroll dashboard with payslips, payments and reports",
  },
  {
    title: "Compliance Audits",
    description:
      "A full health check of your contracts, files and remittances against Kenyan law, with a clear plan to fix any gaps.",
    href: "/services/compliance-audits",
    image: "/services/compliance-audits.jpg",
    imageAlt: "HR professional reviewing a compliance checklist and records",
  },
];

export function ServiceCards() {
  return (
    <section
      aria-labelledby="service-cards-title"
      className="bg-white pb-section-mobile lg:pb-section"
      id="services"
    >
      <div className="container">
        <SectionHeading
          title="HR consulting, payroll and compliance audits."
          eyebrow="Our services"
          description="Practical HR support that keeps your records accurate and your business protected."
          id="service-cards-title"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const featured = index === 1;

            return (
              <article
                className={`rounded-card bg-white p-4 transition-shadow sm:p-6 ${
                  featured
                    ? "border-2 border-navy shadow-soft"
                    : "border border-border shadow-sm hover:shadow-soft"
                }`}
                key={service.title}
              >
                <div className="relative">
                  <IllustrationFrame className="aspect-[16/10] bg-mist shadow-none">
                    <Image
                      alt={service.imageAlt}
                      className="object-cover"
                      fill
                      sizes="(max-width: 1023px) 90vw, 30vw"
                      src={service.image}
                    />
                  </IllustrationFrame>
                  <span className="absolute -bottom-4 left-6 flex h-12 w-12 rotate-45 items-center justify-center rounded-inner bg-navy text-gold shadow-soft">
                    <TriangleMark className="-rotate-45 text-gold" />
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 pt-8">
                  <div>
                    <h3 className="font-heading text-card font-bold text-navy">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-body text-muted">
                      {service.description}
                    </p>
                  </div>
                  <Button asChild size="icon" variant="icon">
                    <Link
                      aria-label={`Learn more about ${service.title}`}
                      href={service.href}
                    >
                      <ArrowRight aria-hidden="true" size={18} />
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
