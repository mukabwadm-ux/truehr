"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function SubmitButton({
  pendingLabel,
  children,
  variant = "gold",
}: {
  pendingLabel: string;
  children: React.ReactNode;
  variant?: "gold" | "navy";
}) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant={variant}>
      {pending ? pendingLabel : children}
    </Button>
  );
}
