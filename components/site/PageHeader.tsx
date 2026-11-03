import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Eyebrow } from "@/components/site/Eyebrow";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: readonly BreadcrumbItem[];
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section
      aria-labelledby="page-title"
      className="bg-navy py-10 text-white sm:py-14"
    >
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-on-navy">
            {breadcrumbs.map((item, index) => (
              <li className="flex items-center gap-2" key={item.label}>
                {index > 0 ? (
                  <ChevronRight aria-hidden="true" size={14} />
                ) : null}
                {item.href ? (
                  <Link
                    className="underline-offset-4 hover:underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Eyebrow className="text-gold">{eyebrow}</Eyebrow>
        <h1
          className="mt-3 max-w-4xl text-display font-extrabold text-white"
          id="page-title"
        >
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lead text-on-navy">{description}</p>
      </div>
    </section>
  );
}
