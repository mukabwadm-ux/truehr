import { Mail, MapPin, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-navy-deep text-on-navy">
      <div className="container flex flex-col items-start justify-center gap-0 py-2 text-sm sm:min-h-11 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-center gap-5">
          <a
            className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap hover:text-white"
            href="mailto:john@truewardhr.com"
          >
            <Mail aria-hidden="true" size={16} />
            <span>john@truewardhr.com</span>
          </a>
          <span className="hidden items-center gap-2 whitespace-nowrap sm:inline-flex">
            <MapPin aria-hidden="true" size={16} />
            [OFFICE ADDRESS], Nairobi
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <a
            className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap hover:text-white"
            href="tel:+254797500747"
          >
            <Phone aria-hidden="true" size={16} />
            +254 797 500747
          </a>
          <span className="hidden text-xs text-on-navy xl:inline">
            Social profile URLs to be supplied
          </span>
        </div>
      </div>
    </div>
  );
}
