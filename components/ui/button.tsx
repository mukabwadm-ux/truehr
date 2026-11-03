import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading text-base font-bold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold: "rounded-full bg-gold text-navy hover:bg-gold/90",
        navy: "rounded-full bg-navy text-white hover:bg-navy-soft",
        outline:
          "rounded-full border border-navy bg-transparent text-navy hover:bg-mist",
        icon: "h-12 w-12 rounded-full border border-line bg-white p-0 text-navy hover:border-navy hover:bg-mist",
      },
      size: {
        default: "min-h-12 px-6 py-3",
        sm: "min-h-12 px-5 py-3 text-sm",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const resolvedSize = size ?? (variant === "icon" ? "icon" : "default");

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size: resolvedSize }),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
