"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/Eyebrow";

export interface Testimonial {
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
}

interface TestimonialsSectionProps {
  testimonials: readonly Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = testimonials[activeIndex];

  function showPrevious() {
    setActiveIndex((index) =>
      index === 0 ? testimonials.length - 1 : index - 1,
    );
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % testimonials.length);
  }

  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-white py-section-mobile lg:py-section"
    >
      <div className="container grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Eyebrow>Client stories</Eyebrow>
          <h2
            className="mt-3 text-section font-extrabold text-navy"
            id="testimonials-title"
          >
            What employers say about working with us
          </h2>
          {testimonials.length > 0 ? (
            <div className="mt-6 flex items-center gap-3">
              <p aria-live="polite" className="min-w-16 text-sm text-muted">
                {activeIndex + 1} of {testimonials.length}
              </p>
              {testimonials.length > 1 ? (
                <>
                  <Button
                    aria-label="Previous testimonial"
                    onClick={showPrevious}
                    size="icon"
                    variant="icon"
                  >
                    <ChevronLeft aria-hidden="true" size={18} />
                  </Button>
                  <Button
                    aria-label="Next testimonial"
                    onClick={showNext}
                    size="icon"
                    variant="icon"
                  >
                    <ChevronRight aria-hidden="true" size={18} />
                  </Button>
                </>
              ) : null}
            </div>
          ) : (
            <p className="mt-5 text-body text-muted">
              Consented client stories will appear here when they are added.
            </p>
          )}
        </div>

        {testimonial ? (
          <div className="relative mx-auto w-full max-w-2xl">
            <div
              aria-hidden="true"
              className="absolute -left-4 top-1/2 hidden -translate-y-1/2 items-center gap-3 sm:flex"
            >
              {[0, 1, 2, 3].map((avatar) => (
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-navy-soft text-on-navy shadow-sm"
                  key={avatar}
                >
                  <UserRound size={18} />
                </span>
              ))}
            </div>
            <blockquote className="relative rounded-[42%_58%_48%_52%/16%_16%_18%_18%] bg-navy px-8 py-12 text-white shadow-soft sm:px-12 sm:py-16">
              <Quote
                aria-hidden="true"
                className="mb-5 text-gold"
                fill="currentColor"
                size={32}
              />
              <p className="text-lead leading-relaxed">{testimonial.quote}</p>
              <footer className="mt-7 font-heading text-sm font-bold text-gold">
                <cite className="not-italic">
                  {testimonial.clientName}, {testimonial.clientRole},{" "}
                  {testimonial.company}
                </cite>
              </footer>
            </blockquote>
          </div>
        ) : (
          <div className="flex min-h-64 items-center justify-center rounded-card border border-dashed border-border bg-mist p-8 text-center">
            <p className="max-w-sm text-body text-muted">
              Only real, consented testimonials are published. Client stories
              are awaiting approved content.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
