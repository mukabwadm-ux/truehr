import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

const payrollService = {
  title: "Payroll services",
  description:
    "Accurate monthly payroll, secure payslips and every statutory deduction calculated, filed and remitted on time. Gross-to-net is approved by you before anyone is paid.",
  href: "/services/payroll",
  image: "/images/Finance_manager_signing_payroll_…_ec09cafd.jpg",
  imageAlt: "Finance manager reviewing and signing payroll documents",
};

const hrConsultingService = {
  title: "HR consulting",
  description:
    "Policies, contracts, disciplinary support and performance systems that keep your workplace fair.",
  href: "/services/hr-consulting",
  photo: "Photo: one-on-one HR consultation",
};

const complianceAuditService = {
  title: "Compliance audits",
  description:
    "A full health check of contracts, files and remittances against Kenyan law, with a clear plan to fix any gaps.",
  href: "/services/compliance-audits",
  photo: "Photo: personnel files being reviewed",
};

export function ServiceCards() {
  return (
    <section
      aria-labelledby="service-cards-title"
      className="bg-white py-16 sm:py-20 lg:py-24"
      id="services"
    >
      <div className="container">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2
            className="max-w-md text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-navy sm:text-4xl"
            id="service-cards-title"
          >
            Everything your people operations need.
          </h2>
          <p className="max-w-md pb-1 text-sm leading-relaxed text-muted">
            Most growing businesses have staff long before they have an HR
            department. We fill that gap, properly.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-12">
          <article className="overflow-hidden rounded-2xl bg-navy text-white md:col-span-7 md:grid md:grid-cols-2">
            <div className="flex flex-col items-start p-6 sm:p-7">
              <h3 className="text-xl font-bold">{payrollService.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-navy">
                {payrollService.description}
              </p>
              <Link
                className="mt-5 inline-flex min-h-10 items-center rounded-full bg-gold px-4 font-heading text-xs font-bold text-navy transition-colors hover:bg-white"
                href={payrollService.href}
              >
                Talk to us about payroll
                <ArrowUpRight aria-hidden="true" className="ml-1.5" size={15} />
              </Link>
            </div>
            <div className="relative min-h-56 bg-navy-soft md:min-h-full">
              <Image
                alt={payrollService.imageAlt}
                className="object-cover"
                fill
                unoptimized
                sizes="(max-width: 767px) 90vw, 32vw"
                src={payrollService.image}
              />
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl bg-[#f5e8bd] md:col-span-5">
            <div
              aria-label={hrConsultingService.photo}
              className="flex aspect-[2/1] items-end bg-[#e6d090] p-4"
              role="img"
            >
              <span className="text-[10px] font-medium text-navy/70">
                {hrConsultingService.photo}
              </span>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="text-xl font-bold text-navy">
                {hrConsultingService.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {hrConsultingService.description}
              </p>
              <Link
                className="mt-4 inline-flex min-h-8 items-center gap-1 border-b border-navy text-sm font-bold text-navy hover:border-gold-text hover:text-gold-text"
                href={hrConsultingService.href}
              >
                Talk to us about HR
                <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl bg-[#edf2f8] md:col-span-4">
            <div
              aria-label={complianceAuditService.photo}
              className="flex aspect-[2/1] items-end bg-[#cbd6e7] p-4"
              role="img"
            >
              <span className="text-[10px] font-medium text-navy/70">
                {complianceAuditService.photo}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-navy">
                {complianceAuditService.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {complianceAuditService.description}
              </p>
              <Link
                className="mt-3 inline-flex min-h-8 items-center gap-1 border-b border-navy text-sm font-bold text-navy hover:border-gold-text hover:text-gold-text"
                href={complianceAuditService.href}
              >
                Book a health check
                <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </article>

          <article className="flex items-center gap-4 rounded-2xl border border-navy/35 p-6 sm:p-8 md:col-span-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
              <ShieldCheck aria-hidden="true" size={22} />
            </span>
            <div>
              <h3 className="font-bold text-navy">
                Employee data, handled lawfully
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Staff records are kept in line with the Data Protection Act,
                2019, from the payslip to the personnel file.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
