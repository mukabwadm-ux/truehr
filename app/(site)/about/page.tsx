import { Check } from "lucide-react";

import { AboutPreview } from "@/components/site/home/AboutPreview";
import { CTABand } from "@/components/site/CTABand";
import { TeamSection } from "@/components/site/home/TeamSection";
import { ContentStatusNotice } from "@/components/site/ContentStatusNotice";
import { PageHeader } from "@/components/site/PageHeader";
import { getPublishedTeamMembers } from "@/lib/site-data";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

const waysOfWorking = [
  {
    title: "Health check",
    description:
      "We review your contracts, policies, payroll and statutory remittances, then show you exactly where the risks are.",
  },
  {
    title: "Fix and document",
    description:
      "We close the gaps: updated contracts, a proper handbook, corrected payroll and any arrears sorted out.",
  },
  {
    title: "Run it every month",
    description:
      "We process payroll, file every return and stay on call for HR questions, so nothing slips.",
  },
];

const reasons = [
  {
    title: "Compliance first",
    description:
      "We treat HR as a compliance discipline, with accurate records and fair workplace processes at the centre.",
  },
  {
    title: "Registered HR professionals",
    description:
      "[IHRM REGISTRATION DETAILS - client confirmation required before publication.]",
  },
  {
    title: "Your data, protected",
    description:
      "We handle employee information for the agreed work and will publish the client-approved privacy notice before launch.",
  },
  {
    title: "One accountable team",
    description:
      "Your agreed scope and point of contact are confirmed before work begins.",
  },
];

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const contentConnected = hasSupabasePublicEnv();
  const teamMembers = contentConnected ? await getPublishedTeamMembers() : [];

  return (
    <>
      {!contentConnected ? (
        <ContentStatusNotice content="team profiles" />
      ) : null}
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        description="Compliance-first HR and payroll support for growing businesses in Kenya."
        eyebrow="About TruewardHR"
        title="HR and payroll partners who get the details right."
      />

      <AboutPreview />

      <section
        aria-labelledby="how-we-work-title"
        className="bg-mist py-section-mobile lg:py-section"
      >
        <div className="container">
          <p className="font-heading text-sm font-bold text-gold-text">
            How we work
          </p>
          <h2
            className="mt-3 max-w-3xl text-section font-extrabold text-navy"
            id="how-we-work-title"
          >
            Clear steps, from the first review to ongoing support.
          </h2>
          <ol className="mt-9 grid gap-5 lg:grid-cols-3">
            {waysOfWorking.map((step, index) => (
              <li
                className="rounded-card bg-white p-6 shadow-sm sm:p-8"
                key={step.title}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-heading font-bold text-gold">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-heading text-card font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-body text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {teamMembers.length > 0 ? (
        <TeamSection
          memberLimit={teamMembers.length}
          members={teamMembers.map((member) => ({
            name: member.name,
            role: member.role,
            phone: member.phone,
            photoUrl: member.photo_url,
            bio: member.bio,
          }))}
          minimumMembers={1}
          showBio
        />
      ) : (
        <section
          aria-labelledby="about-team-title"
          className="bg-white py-section-mobile lg:py-section"
        >
          <div className="container">
            <h2
              className="text-section font-extrabold text-navy"
              id="about-team-title"
            >
              Meet the people behind your payroll
            </h2>
            <div className="mt-8 rounded-card border border-dashed border-border bg-mist p-6 text-body text-muted sm:p-8">
              Approved team profiles will appear here when names, roles, phone
              numbers, biographies and headshots are supplied.
            </div>
          </div>
        </section>
      )}

      <section
        aria-labelledby="why-trueward-title"
        className="bg-mist py-section-mobile lg:py-section"
      >
        <div className="container">
          <p className="font-heading text-sm font-bold text-gold-text">
            Why employers choose Trueward
          </p>
          <h2
            className="mt-3 max-w-3xl text-section font-extrabold text-navy"
            id="why-trueward-title"
          >
            Practical support with compliance at its core.
          </h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {reasons.map((reason) => (
              <article
                className="rounded-card bg-white p-6 shadow-sm sm:p-7"
                key={reason.title}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold-text">
                  <Check aria-hidden="true" size={18} />
                </span>
                <h3 className="mt-4 font-heading text-card font-bold text-navy">
                  {reason.title}
                </h3>
                <p className="mt-2 text-body text-muted">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
