import { cn } from "@/lib/utils";

type IllustrationFrameProps = Omit<
  React.ComponentProps<"figure">,
  "children"
> & {
  children: React.ReactNode;
};

export function IllustrationFrame({
  children,
  className,
  ...props
}: IllustrationFrameProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-card bg-navy-soft shadow-soft",
        className,
      )}
      {...props}
    >
      {children}
    </figure>
  );
}
