import { Check } from "lucide-react";

import { IllustrationFrame } from "@/components/brand/IllustrationFrame";
import { Eyebrow } from "@/components/site/Eyebrow";

const commitments = [
  "Payroll that's right every month",
  "Policies and contracts that hold up",
  "Employee data handled lawfully",
];

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-preview-title"
      className="bg-white py-section-mobile lg:py-section"
      id="about"
    >
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto min-h-[28rem] w-full max-w-xl sm:min-h-[32rem]">
          <IllustrationFrame className="absolute left-0 top-0 aspect-[4/3] w-[70%] rounded-card bg-mist shadow-soft">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-end justify-center bg-navy-soft/90 p-8"
            >
              <div className="h-3/4 w-2/3 rounded-t-[45%] bg-gold/70" />
            </div>
            <figcaption className="absolute bottom-3 left-3 right-3 rounded-inner bg-navy/90 px-3 py-2 text-center text-xs text-white">
              Team meeting photo to be supplied
            </figcaption>
          </IllustrationFrame>

          <IllustrationFrame className="absolute right-0 top-20 aspect-[4/3] w-[70%] border-8 border-white bg-mist shadow-soft sm:top-24">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-mist p-8"
            >
              <div className="h-2/3 w-4/5 rounded-card border-2 border-navy-soft/30 bg-white p-5">
                <div className="h-2 w-2/3 rounded-full bg-navy/20" />
                <div className="mt-3 h-2 w-full rounded-full bg-navy/10" />
                <div className="mt-2 h-2 w-5/6 rounded-full bg-navy/10" />
                <div className="mt-2 h-2 w-3/4 rounded-full bg-gold/50" />
              </div>
            </div>
            <figcaption className="absolute bottom-3 left-3 right-3 rounded-inner bg-navy/90 px-3 py-2 text-center text-xs text-white">
              Client meeting photo to be supplied
            </figcaption>
          </IllustrationFrame>

          <ul className="absolute bottom-0 left-0 z-20 w-[94%] space-y-3 rounded-card bg-white p-5 shadow-soft sm:p-6">
            {commitments.map((commitment) => (
              <li
                className="flex items-center gap-3 font-heading text-sm font-semibold text-navy sm:text-base"
                key={commitment}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-text">
                  <Check aria-hidden="true" size={16} />
                </span>
                {commitment}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Eyebrow>About TruewardHR</Eyebrow>
          <h2
            className="mt-4 text-section font-extrabold text-navy"
            id="about-preview-title"
          >
            HR and payroll partners who get the details right.
          </h2>
          <p className="mt-6 text-body text-muted">
            Most growing businesses in Kenya have staff long before they have an
            HR department. That gap is where payroll errors, late remittances
            and unfair dismissal claims start.
          </p>
          <p className="mt-4 text-body text-muted">
            TruewardHR fills it. We treat HR as a compliance discipline, so
            every engagement leaves you with records that stand up to a labour
            officer, an auditor or a court.
          </p>

          <div className="mt-8 border-t border-line pt-6">
            <p className="font-heading text-lg font-bold text-navy">
              [FOUNDER NAME]
            </p>
            <p className="mt-1 text-muted">Managing Director, TruewardHR</p>
            <p className="mt-4 inline-flex min-h-11 items-center border-b border-dashed border-border px-2 font-heading text-sm italic text-gold-text">
              [SIGNATURE FILE]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
