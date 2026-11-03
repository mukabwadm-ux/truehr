import Image from "next/image";
import { Phone, UserRound } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";

export interface TeamMember {
  name: string;
  role: string;
  phone: string;
  photoUrl?: string | null;
  bio?: string | null;
}

interface TeamSectionProps {
  members: readonly TeamMember[];
  minimumMembers?: number;
  memberLimit?: number;
  showBio?: boolean;
}

export function TeamSection({
  members,
  minimumMembers = 2,
  memberLimit = 4,
  showBio = false,
}: TeamSectionProps) {
  if (members.length < minimumMembers) {
    return null;
  }

  const displayedMembers = members.slice(0, memberLimit);

  return (
    <section
      aria-labelledby="team-title"
      className="bg-mist py-section-mobile lg:py-section"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Our team"
          id="team-title"
          title="Meet the people behind your payroll"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedMembers.map((member, index) => (
            <article
              className="overflow-hidden rounded-card bg-white p-5 shadow-sm"
              key={member.name}
            >
              <div className="relative mx-auto aspect-square w-full max-w-56">
                <div className="absolute inset-2 overflow-hidden rounded-[42%_58%_54%_46%/48%_44%_56%_52%] bg-navy-soft">
                  {member.photoUrl ? (
                    <Image
                      alt={member.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 639px) 80vw, (max-width: 1023px) 40vw, 20vw"
                      src={member.photoUrl}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-on-navy">
                      <UserRound aria-hidden="true" size={64} />
                    </div>
                  )}
                </div>
              </div>
              <h3 className="mt-5 font-heading text-card font-bold text-navy">
                {member.name}
              </h3>
              <p className="mt-1 font-heading text-sm font-bold text-gold-text">
                {member.role}
              </p>
              {showBio && member.bio ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>
              ) : null}
              <a
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-navy"
                href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
              >
                <Phone aria-hidden="true" size={16} />
                {member.phone}
              </a>
              <div
                aria-hidden="true"
                className={`mt-4 h-1.5 w-16 rounded-full ${
                  index % 2 === 0 ? "bg-gold" : "bg-navy"
                }`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
