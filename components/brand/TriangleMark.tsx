import { cn } from "@/lib/utils";

interface TriangleMarkProps {
  className?: string;
}

export function TriangleMark({ className }: TriangleMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-3 w-3 shrink-0 text-gold", className)}
      focusable="false"
      viewBox="0 0 12 12"
    >
      <path d="M6 0 12 12H0L6 0Z" fill="currentColor" />
    </svg>
  );
}
