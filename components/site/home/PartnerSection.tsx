import Image from "next/image";

const founderPhoto = "/images/Founder_reviewing_documents_at_desk_db1882ce.jpg";

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
          <figure className="relative row-span-2 overflow-hidden rounded-2xl bg-navy">
            <Image
              alt="TruewardHR founder reviewing documents at a desk"
              className="object-cover"
              fill
              unoptimized
              sizes="(max-width: 1023px) 45vw, 22vw"
              src={founderPhoto}
            />
          </figure>
          <figure className="flex items-end rounded-2xl bg-[#e6d090] p-3">
            <figcaption className="text-[10px] font-medium text-navy/70">
              Photo: employer briefing session
            </figcaption>
          </figure>
          <figure className="flex items-end rounded-2xl bg-[#cbd6e7] p-3">
            <figcaption className="text-[10px] font-medium text-navy/70">
              Photo: office or signage detail
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
