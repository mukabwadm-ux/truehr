import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { IllustrationFrame } from "@/components/brand/IllustrationFrame";
import { TriangleMark } from "@/components/brand/TriangleMark";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/Eyebrow";
import { SectionHeading } from "@/components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: {
    index: false,
    follow: false,
  },
};

const colorTokens = [
  { name: "navy", className: "bg-navy text-white", example: "White on navy" },
  {
    name: "navy-deep",
    className: "bg-navy-deep text-white",
    example: "White on deep navy",
  },
  {
    name: "navy-soft",
    className: "bg-navy-soft text-white",
    example: "White on soft navy",
  },
  { name: "gold", className: "bg-gold text-navy", example: "Navy on gold" },
  {
    name: "gold-text",
    className: "bg-white text-gold-text",
    example: "Gold-text on white",
  },
  { name: "ink", className: "bg-white text-ink", example: "Ink on white" },
  {
    name: "muted",
    className: "bg-white text-muted",
    example: "Muted on white",
  },
  {
    name: "on-navy",
    className: "bg-navy text-on-navy",
    example: "On-navy on navy",
  },
  { name: "mist", className: "bg-mist text-ink", example: "Ink on mist" },
  { name: "line", className: "bg-line text-ink", example: "Ink on line" },
  {
    name: "border",
    className: "border border-border bg-white text-ink",
    example: "Ink with border",
  },
];

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container py-section-mobile lg:py-section">
        <header className="mb-16 border-b border-line pb-10">
          <Eyebrow>Design system</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-display font-extrabold text-navy">
            TruewardHR styleguide
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-muted">
            Brand tokens and shared UI components. Gold text is reserved for
            navy surfaces; use gold-text on light backgrounds.
          </p>
        </header>

        <section aria-labelledby="color-tokens" className="mb-20">
          <SectionHeading
            id="color-tokens"
            title="Color tokens"
            eyebrow="Palette"
            description="Use the named Tailwind tokens in application components."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colorTokens.map((token) => (
              <div
                className="overflow-hidden rounded-card border border-border"
                key={token.name}
              >
                <div
                  className={`flex min-h-24 items-end p-4 ${token.className}`}
                >
                  <span className="font-heading text-sm font-bold">
                    {token.name}
                  </span>
                </div>
                <p className="px-4 py-3 text-sm text-muted">{token.example}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            The gold-on-white text combination is intentionally not shown
            because it does not meet WCAG AA contrast.
          </p>
        </section>

        <section aria-labelledby="type-scale" className="mb-20">
          <SectionHeading
            id="type-scale"
            title="Typography"
            eyebrow="Sora and Source Sans 3"
          />
          <div className="mt-8 space-y-8 rounded-card border border-border p-6 sm:p-8">
            <div>
              <p className="mb-2 text-sm font-semibold text-muted">Display</p>
              <p className="text-display font-extrabold text-navy">
                Expert HR support for growing businesses.
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-muted">Section</p>
              <p className="text-section font-extrabold text-navy">
                HR and payroll partners who get the details right.
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-muted">Card</p>
              <p className="text-card font-bold text-ink">
                Payroll services for growing teams
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-muted">Lead</p>
              <p className="max-w-2xl text-lead text-muted">
                We run your payroll, file every statutory return and put HR
                policies in place that protect your business and treat your
                people fairly.
              </p>
            </div>
            <p className="max-w-2xl text-body text-ink">
              Body copy uses a readable 17px base size with a 1.6 line height.
            </p>
          </div>
        </section>

        <section aria-labelledby="components" className="mb-20">
          <SectionHeading
            id="components"
            title="Shared components"
            eyebrow="UI"
            description="Buttons have at least a 48px target height; round icon buttons are 48px square."
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-5 rounded-card border border-border p-6">
              <p className="font-heading text-card font-bold text-navy">
                Buttons
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Gold pill</Button>
                <Button variant="navy">Navy pill</Button>
                <Button variant="outline">Outline pill</Button>
                <Button aria-label="Continue" size="icon" variant="icon">
                  <ArrowRight aria-hidden="true" size={18} />
                </Button>
              </div>
            </div>

            <div className="space-y-5 rounded-card border border-border p-6">
              <p className="font-heading text-card font-bold text-navy">
                Brand marks
              </p>
              <Eyebrow>HR consulting and payroll, Nairobi</Eyebrow>
              <div className="flex items-center gap-3">
                <TriangleMark className="h-8 w-8" />
                <span className="text-sm text-muted">
                  Decorative triangle mark
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeading
              title="Section heading example"
              eyebrow="About TruewardHR"
              description="SectionHeading combines an optional eyebrow, a Sora heading, and optional supporting copy."
            />
          </div>

          <div className="mt-8 max-w-xl">
            <IllustrationFrame className="aspect-[4/3]">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-end justify-center bg-navy-soft p-8"
              >
                <div className="h-3/4 w-2/3 rounded-t-[45%] bg-mist/20" />
              </div>
              <figcaption className="sr-only">
                Decorative illustration frame preview
              </figcaption>
            </IllustrationFrame>
          </div>
        </section>
      </div>
    </main>
  );
}
