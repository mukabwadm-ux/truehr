"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";

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

  if (!testimonial) {
    return null;
  }

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
      aria-label="Client testimonial"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <figure className="relative aspect-[4/3] overflow-hidden rounded-br-2xl rounded-tl-[5rem] bg-[#f3e7c1]">
          <figcaption className="absolute bottom-4 left-4 text-[10px] font-medium text-navy/70">
            Client portrait, shared with permission
          </figcaption>
        </figure>

        <div>
          <Quote
            aria-hidden="true"
            className="mb-3 text-gold"
            fill="currentColor"
            size={32}
          />
          <blockquote>
            <p className="font-heading text-xl font-semibold leading-snug tracking-tight text-navy sm:text-2xl">
              {testimonial.quote}
            </p>
            <footer className="mt-5 text-xs text-muted">
              <cite className="font-bold not-italic text-navy">
                {testimonial.clientName}
              </cite>
              {testimonial.clientRole ? `, ${testimonial.clientRole}` : ""}
              {testimonial.company ? `, ${testimonial.company}` : ""}
            </footer>
          </blockquote>
          {testimonials.length > 1 ? (
            <div className="mt-5 flex items-center gap-2">
              <Button
                aria-label="Previous testimonial"
                onClick={showPrevious}
                size="icon"
                variant="icon"
              >
                <ChevronLeft aria-hidden="true" size={16} />
              </Button>
              <Button
                aria-label="Next testimonial"
                onClick={showNext}
                size="icon"
                variant="icon"
              >
                <ChevronRight aria-hidden="true" size={16} />
              </Button>
              <span aria-live="polite" className="ml-1 text-xs text-muted">
                {activeIndex + 1} of {testimonials.length}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
