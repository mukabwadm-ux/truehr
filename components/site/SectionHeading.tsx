import type { ReactNode } from "react";

import { Eyebrow } from "@/components/site/Eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 text-section font-extrabold text-navy" id={id}>
        {title}
      </h2>
      {description ? (
        <div className="mt-4 text-lead text-muted">{description}</div>
      ) : null}
    </div>
  );
}
