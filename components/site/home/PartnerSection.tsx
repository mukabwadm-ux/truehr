import Image from "next/image";

const teamPhoto = "/images/truewardhr-team.jpg";
const briefingPhoto = "/images/employer-briefing.jpg";
const officePhoto = "/images/office-signage.jpg";

export function PartnerSection() {
  return (
    <section
      aria-labelledby="partner-section-title"
      className="bg-mist py-16 sm:py-20 lg:py-24"
      id="about"
    >
      <div className="container grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <div>
          <h2
            className="max-w-lg text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-navy sm:text-4xl"
            id="partner-section-title"
          >
            HR and payroll partners who get the details right.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            We treat HR as a compliance discipline, so every engagement leaves
            you with records that stand up to a labour officer, an auditor or a
            court.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-12 w-12 rounded-full bg-navy"
            />
            <span>
              <span className="block font-heading text-xs font-bold text-navy">
                The TruewardHR team
              </span>
              <span className="mt-1 block text-xs text-muted">
                Managing Director, TruewardHR
              </span>
            </span>
          </div>
        </div>

        <div className="grid min-h-[19rem] grid-cols-[1fr_1fr] grid-rows-2 gap-3 sm:min-h-[22rem]">
          <figure className="relative row-span-2 overflow-hidden rounded-2xl bg-white p-[2px]">
            <div className="relative h-full w-full overflow-hidden rounded-[14px]">
              <Image
                alt="The TruewardHR team collaborating in their office"
                className="object-cover"
                fill
                unoptimized
                sizes="(max-width: 1023px) 45vw, 22vw"
                src={teamPhoto}
              />
            </div>
          </figure>
          <figure className="relative overflow-hidden rounded-2xl bg-white p-[2px]">
            <div className="relative h-full w-full overflow-hidden rounded-[14px]">
              <Image
                alt="Employer briefing session on employment law and HR"
                className="object-cover"
                fill
                unoptimized
                sizes="(max-width: 1023px) 40vw, 18vw"
                src={briefingPhoto}
              />
              <figcaption className="absolute bottom-2 left-2 rounded bg-navy/70 px-2 py-1 text-[10px] font-medium text-white">
                Employer briefing session
              </figcaption>
            </div>
          </figure>
          <figure className="relative overflow-hidden rounded-2xl bg-white p-[2px]">
            <div className="relative h-full w-full overflow-hidden rounded-[14px]">
              <Image
                alt="TruewardHR office entrance and signage"
                className="object-cover"
                fill
                unoptimized
                sizes="(max-width: 1023px) 40vw, 18vw"
                src={officePhoto}
              />
              <figcaption className="absolute bottom-2 left-2 rounded bg-navy/70 px-2 py-1 text-[10px] font-medium text-white">
                TruewardHR office
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
