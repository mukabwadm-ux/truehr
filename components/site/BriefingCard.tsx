import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail } from "lucide-react";

import { IllustrationFrame } from "@/components/brand/IllustrationFrame";
import type { BriefingSummary } from "@/lib/site-data";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getDateParts(value: string) {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("en-KE", {
      day: "2-digit",
      timeZone: "Africa/Nairobi",
    }).format(date),
    monthYear: new Intl.DateTimeFormat("en-KE", {
      month: "short",
      year: "numeric",
      timeZone: "Africa/Nairobi",
    }).format(date),
    full: new Intl.DateTimeFormat("en-KE", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Africa/Nairobi",
    }).format(date),
  };
}

export function BriefingCard({
  briefing,
  index,
  isPast = false,
}: {
  briefing: BriefingSummary;
  index: number;
  isPast?: boolean;
}) {
  const date = getDateParts(briefing.starts_at);
  const imageOnLeft = index % 2 === 1;

  return (
    <article
      aria-labelledby={`briefing-${briefing.id}-title`}
      className="grid items-center gap-0 lg:grid-cols-2"
    >
      <IllustrationFrame
        className={`relative aspect-[16/10] bg-navy-soft shadow-none lg:aspect-[4/3] ${
          imageOnLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {briefing.image_url ? (
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="(max-width: 1023px) 90vw, 45vw"
            src={briefing.image_url}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <Mail aria-hidden="true" className="text-gold/70" size={72} />
          </div>
        )}
        {!briefing.image_url ? (
          <figcaption className="absolute bottom-3 left-3 right-3 rounded-inner bg-navy/90 px-3 py-2 text-center text-xs text-on-navy">
            Briefing artwork to be supplied
          </figcaption>
        ) : null}
      </IllustrationFrame>

      <div
        className={`relative z-10 -mt-6 rounded-card bg-white p-5 shadow-soft sm:p-7 lg:mx-[-2rem] lg:mt-0 ${
          imageOnLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <p className="inline-flex items-center gap-2 font-heading text-sm font-bold text-gold-text">
          <CalendarDays aria-hidden="true" size={18} />
          {briefing.format === "online" ? "Online" : "In person"},{" "}
          {briefing.topic}
        </p>
        <h3
          className="mt-4 font-heading text-card font-bold text-navy"
          id={`briefing-${briefing.id}-title`}
        >
          {briefing.title}
        </h3>
        <p className="mt-3 text-body text-muted">{briefing.summary}</p>

        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full bg-navy text-center">
            <span className="font-heading text-xl font-bold text-gold">
              {date.day}
            </span>
            <span className="text-[0.65rem] font-semibold uppercase text-on-navy">
              {date.monthYear}
            </span>
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-navy">
              {date.full} (Nairobi time)
            </p>
            <p className="mt-1 text-sm text-muted">
              {briefing.format === "online"
                ? "Link sent on registration"
                : briefing.venue}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
          <div className="flex items-center gap-3">
            {briefing.speaker_photo_url ? (
              <Image
                alt=""
                className="h-10 w-10 rounded-full object-cover"
                height={40}
                src={briefing.speaker_photo_url}
                width={40}
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-soft font-heading text-xs font-bold text-white"
              >
                {getInitials(briefing.speaker_name)}
              </span>
            )}
            <span>
              <span className="block font-heading text-sm font-bold text-navy">
                {briefing.speaker_name}
              </span>
              <span className="block text-xs text-muted">
                {briefing.speaker_role}
              </span>
            </span>
          </div>
          <Link
            className="inline-flex min-h-11 items-center gap-2 font-heading text-sm font-bold text-navy hover:text-gold-text"
            href={`/briefings/${briefing.slug}`}
          >
            {isPast ? "View briefing" : "Reserve a seat"}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}
