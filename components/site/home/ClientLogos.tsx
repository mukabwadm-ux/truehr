import Image from "next/image";
import Link from "next/link";

export interface ClientLogo {
  company: string;
  logoUrl: string;
  websiteUrl?: string | null;
}

interface ClientLogosProps {
  logos: readonly ClientLogo[];
}

export function ClientLogos({ logos }: ClientLogosProps) {
  const publishedLogos = logos.slice(0, 6);

  if (publishedLogos.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Our clients"
      className="border-b border-line bg-white py-12"
    >
      <div className="container grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {publishedLogos.map((logo) => {
          const image = (
            <Image
              alt={`${logo.company} logo`}
              className="mx-auto max-h-14 w-auto object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
              height={56}
              sizes="(max-width: 639px) 40vw, (max-width: 1023px) 25vw, 15vw"
              src={logo.logoUrl}
              width={160}
            />
          );

          return (
            <div className="flex min-h-16 items-center" key={logo.company}>
              {logo.websiteUrl ? (
                <Link
                  aria-label={logo.company}
                  href={logo.websiteUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {image}
                </Link>
              ) : (
                image
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
