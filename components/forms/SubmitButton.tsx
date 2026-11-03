"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function SubmitButton({
  pendingLabel,
  children,
}: {
  pendingLabel: string;
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant="gold">
      {pending ? pendingLabel : children}
    </Button>
  );
}
