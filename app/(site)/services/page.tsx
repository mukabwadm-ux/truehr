import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TriangleMark } from "@/components/brand/TriangleMark";
import { CTABand } from "@/components/site/CTABand";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const hrServices = [
  "HR compliance audits",
  "Policies and employee handbooks",
  "Contracts and HR documents",
  "Disciplinary and termination support",
  "Performance and job design",
  "Employee data protection",
  "Recruitment and onboarding",
  "Training for managers",
];

const payrollServices = [
  "Monthly payroll processing",
  "Statutory filing and remittance",
  "Payslips and salary payments (bank and M-Pesa files)",
  "Payroll setup and clean-up",
  "Final dues and terminal benefits",
  "Year-end returns and reporting (P9 forms)",
  "Payroll audits",
  "Expatriate payroll",
];

const payrollSteps = [
  {
    title: "You send changes",
    description: "Share employee and payroll changes for the period.",
  },
  {
    title: "We calculate, you approve",
    description: "Review the prepared payroll before it is finalised.",
  },
  {
    title: "Staff get paid",
    description: "Approved payment outputs are prepared for your process.",
  },
  {
    title: "Returns filed on time",
    description: "We prepare the agreed statutory filings and remittances.",
  },
];

function ServiceList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li className="flex items-start gap-3 text-body text-ink" key={item}>
          <TriangleMark className="mt-1 h-4 w-4 shrink-0 text-gold-text" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ServicePanel({
  items,
  title,
}: {
  items: readonly string[];
  title: string;
}) {
  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
      <div>
        <h3 className="sr-only">{title} services</h3>
        <ServiceList items={items} />
      </div>
      <div>
        <div
          aria-label={`${title} image placeholder`}
          className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-card bg-navy-soft"
          role="img"
        >
          <div
            aria-hidden="true"
            className="absolute h-52 w-52 rounded-full border border-white/20"
          />
          <div
            aria-hidden="true"
            className="absolute h-36 w-36 rounded-full bg-gold/70"
          />
          <p className="absolute bottom-3 left-3 right-3 rounded-inner bg-navy/90 px-3 py-2 text-center text-xs text-on-navy">
            {title} photography to be supplied
          </p>
        </div>
        <div className="relative mx-4 -mt-7 rounded-card bg-navy p-5 text-white shadow-soft sm:p-6">
          <p className="font-heading text-lg font-bold">
            Need help choosing the right support?
          </p>
          <p className="mt-2 text-sm text-on-navy">
            Tell us what your business needs and we&apos;ll discuss a suitable
            scope.
          </p>
          <Button asChild className="mt-5" variant="gold">
            <Link href="/contact#book">
              Book a free health check
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        description="Practical HR and payroll support to help you keep your people operations in order."
        eyebrow="Our services"
        title="Support for every stage of your people operations"
      />

      <section
        aria-labelledby="service-options-title"
        className="bg-white py-section-mobile lg:py-section"
      >
        <div className="container">
          <h2 className="sr-only" id="service-options-title">
            Explore our services
          </h2>
          <Tabs className="w-full" defaultValue="hr-consulting">
            <TabsList
              aria-label="Service category"
              className="mb-9 flex w-full max-w-xl"
            >
              <TabsTrigger className="flex-1" value="hr-consulting">
                HR Consulting
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="payroll">
                Payroll Services
              </TabsTrigger>
            </TabsList>
            <TabsContent value="hr-consulting">
              <ServicePanel items={hrServices} title="HR consulting" />
            </TabsContent>
            <TabsContent value="payroll">
              <ServicePanel items={payrollServices} title="Payroll services" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section
        aria-labelledby="payroll-month-title"
        className="bg-navy py-section-mobile text-white lg:py-section"
      >
        <div className="container">
          <p className="font-heading text-sm font-bold text-gold">
            Our payroll process
          </p>
          <h2
            className="mt-3 max-w-3xl text-section font-extrabold text-white"
            id="payroll-month-title"
          >
            A payroll month with Trueward
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {payrollSteps.map((step, index) => (
              <li
                className="rounded-card border border-white/15 bg-white/5 p-5 sm:p-6"
                key={step.title}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-heading font-bold text-navy">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-heading text-card font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-body text-on-navy">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTABand />
    </>
  );
}
