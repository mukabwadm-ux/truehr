const steps = [
  {
    number: "1",
    title: "Health check",
    description:
      "We review your contracts, files and remittances against Kenyan law and show you where you stand.",
  },
  {
    number: "2",
    title: "A clear plan",
    description:
      "A written plan to fix each gap: policies to put in place, contracts to update, filings to correct.",
  },
  {
    number: "3",
    title: "We run it with you",
    description:
      "Monthly payroll, statutory filings and day-to-day HR support, every month.",
  },
];

export function ProcessSteps() {
  return (
    <section
      aria-labelledby="process-steps-title"
      className="bg-navy py-16 text-white sm:py-20 lg:py-24"
      id="approach"
    >
      <div className="container">
        <h2
          className="max-w-sm text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl"
          id="process-steps-title"
        >
          Three steps to records you can defend.
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li
              className="rounded-2xl bg-navy-soft p-5 sm:p-6"
              key={step.number}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-heading font-bold text-navy">
                {step.number}
              </span>
              <h3 className="mt-4 font-heading font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-navy">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
