import type { ReactNode } from "react";

import { TriangleMark } from "@/components/brand/TriangleMark";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-heading text-sm font-bold text-gold-text",
        className,
      )}
    >
      <TriangleMark />
      {children}
    </p>
  );
}
