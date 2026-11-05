import { NewsletterSubscribeForm } from "@/components/forms/NewsletterSubscribeForm";

export function NewsletterSection() {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="bg-white py-12 sm:py-16"
      id="newsletter"
    >
      <div className="container">
        <div className="grid gap-6 rounded-2xl bg-gold p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10 lg:p-10">
          <div>
            <h2
              className="max-w-md text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-navy sm:text-4xl"
              id="newsletter-title"
            >
              Stay ahead of Kenya&apos;s employment rules.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-navy/80">
              A monthly update with statutory changes, payroll reminders and
              practical HR tips. Subscribers hear first about our free employer
              briefings.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 text-ink shadow-sm sm:p-5">
            <NewsletterSubscribeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
