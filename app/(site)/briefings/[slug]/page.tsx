import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Video } from "lucide-react";

import { BriefingRegistrationForm } from "@/components/forms/BriefingRegistrationForm";
import { CTABand } from "@/components/site/CTABand";
import { ContentStatusNotice } from "@/components/site/ContentStatusNotice";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/server/site-url";
import { getPublishedBriefing } from "@/lib/site-data";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

interface BriefingDetailPageProps {
  params: { slug: string };
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function BriefingDetailPage({
  params,
}: BriefingDetailPageProps) {
  if (!hasSupabasePublicEnv()) {
    return (
      <>
        <ContentStatusNotice content="briefing details" />
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Briefings", href: "/briefings" },
            { label: "Briefing details" },
          ]}
          description="Session details and registration will be available when a briefing is published."
          eyebrow="Employer briefing"
          title="Briefing details"
        />
        <section className="bg-white py-section-mobile lg:py-section">
          <div className="container max-w-3xl">
            <p className="rounded-card border border-dashed border-border bg-mist p-6 text-body text-muted sm:p-8">
              Supabase is not configured, so published briefing details cannot
              be loaded yet.
            </p>
            <Button asChild className="mt-7" variant="navy">
              <Link href="/briefings">View all briefings</Link>
            </Button>
          </div>
        </section>
        <CTABand />
      </>
    );
  }

  const briefing = await getPublishedBriefing(params.slug);
  if (!briefing) {
    notFound();
  }

  const adminClient = createAdminClient();
  const { count, error } = await adminClient
    .from("briefing_registrations")
    .select("id", { count: "exact", head: true })
    .eq("briefing_id", briefing.id);

  if (error) {
    console.error("Could not check briefing capacity.", error);
    throw new Error("Could not check briefing registration capacity.");
  }

  const isPast = new Date(briefing.starts_at).getTime() <= Date.now();
  const isFull =
    briefing.capacity !== null && (count ?? 0) >= briefing.capacity;
  const registrationClosed = isPast || isFull;
  const dateTime = `${formatDateTime(briefing.starts_at)} - ${formatDateTime(briefing.ends_at)} (Nairobi time)`;
  const location =
    briefing.format === "online" ? "Link sent on registration" : briefing.venue;
  const siteUrl = getSiteUrl();
  const eventUrl = `${siteUrl}/briefings/${briefing.slug}`;
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: briefing.title,
    description: briefing.summary,
    startDate: briefing.starts_at,
    endDate: briefing.ends_at,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      briefing.format === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    location:
      briefing.format === "online"
        ? {
            "@type": "VirtualLocation",
            url: eventUrl,
          }
        : {
            "@type": "Place",
            name: briefing.venue,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Nairobi",
              addressCountry: "KE",
            },
          },
    performer: {
      "@type": "Person",
      name: briefing.speaker_name,
      jobTitle: briefing.speaker_role,
    },
    organizer: {
      "@type": "Organization",
      name: "TruewardHR",
      url: siteUrl,
    },
    url: eventUrl,
    isAccessibleForFree: true,
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Briefings", href: "/briefings" },
          { label: briefing.title },
        ]}
        description={briefing.summary}
        eyebrow="Free employer briefing"
        title={briefing.title}
      />

      <section className="bg-white py-section-mobile lg:py-section">
        <div className="container grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-section font-extrabold text-navy">
              Session details
            </h2>
            <ul className="mt-7 space-y-5">
              <li className="flex items-start gap-3 text-body text-ink">
                <CalendarDays
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-gold-text"
                />
                <span>{dateTime}</span>
              </li>
              <li className="flex items-start gap-3 text-body text-ink">
                {briefing.format === "online" ? (
                  <Video
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-gold-text"
                  />
                ) : (
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-gold-text"
                  />
                )}
                <span>
                  {briefing.format === "online" ? "Online" : "In person"} -{" "}
                  {location}
                </span>
              </li>
            </ul>

            <a
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-heading font-bold text-navy underline underline-offset-4 hover:text-gold-text"
              download={`${briefing.slug}.ics`}
              href={`/api/briefings/${encodeURIComponent(briefing.slug)}/calendar.ics`}
            >
              <CalendarDays aria-hidden="true" size={18} />
              Add to calendar
            </a>

            <div className="mt-9 rounded-card bg-mist p-6">
              <h2 className="font-heading text-card font-bold text-navy">
                Speaker
              </h2>
              <div className="mt-4 flex items-center gap-4">
                {briefing.speaker_photo_url ? (
                  <Image
                    alt=""
                    className="h-14 w-14 rounded-full object-cover"
                    height={56}
                    src={briefing.speaker_photo_url}
                    width={56}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-navy font-heading font-bold text-white"
                  >
                    {getInitials(briefing.speaker_name)}
                  </span>
                )}
                <span>
                  <span className="block font-heading font-bold text-navy">
                    {briefing.speaker_name}
                  </span>
                  <span className="text-sm text-muted">
                    {briefing.speaker_role}
                  </span>
                </span>
              </div>
            </div>

            {briefing.agenda.length > 0 ? (
              <div className="mt-9">
                <h2 className="font-heading text-card font-bold text-navy">
                  What we&apos;ll cover
                </h2>
                <ul className="mt-4 list-inside list-disc space-y-2 text-body text-muted">
                  {briefing.agenda.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside
            aria-labelledby="registration-title"
            className="scroll-mt-24 rounded-card border border-line bg-white p-5 shadow-soft sm:p-8"
            id="register"
          >
            <h2
              className="font-heading text-card font-bold text-navy"
              id="registration-title"
            >
              Register for this briefing
            </h2>
            {registrationClosed ? (
              <p className="mt-4 rounded-inner bg-mist p-4 text-body text-muted">
                {isPast
                  ? "Registration is closed because this briefing has started."
                  : "This briefing has reached capacity and is no longer accepting registrations."}
              </p>
            ) : (
              <>
                <p className="mt-2 text-body text-muted">
                  Complete the form to reserve your seat.
                </p>
                <BriefingRegistrationForm briefingId={briefing.id} />
              </>
            )}
          </aside>
        </div>
      </section>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <CTABand />
    </>
  );
}
