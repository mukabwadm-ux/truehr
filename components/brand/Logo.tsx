import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
}

export function Logo({ tone = "light", className }: LogoProps) {
  return (
    <Link
      aria-label="TruewardHR home"
      className={cn(
        "inline-flex min-h-11 items-center font-heading text-xl font-extrabold tracking-tight",
        tone === "light" ? "text-white" : "text-navy",
        className,
      )}
      href="/"
    >
      Trueward
      <span className={tone === "light" ? "text-gold" : "text-gold-text"}>
        HR
      </span>
    </Link>
  );
}
