import type { FormActionState } from "@/lib/forms/action-state";

export function FormFeedback({
  id,
  state,
}: {
  id: string;
  state: FormActionState;
}) {
  if (!state.message) {
    return null;
  }

  return (
    <p
      aria-live="polite"
      className={`mt-4 text-sm ${
        state.status === "error" ? "text-red-700" : "text-navy"
      }`}
      id={id}
      role={state.status === "error" ? "alert" : "status"}
    >
      {state.message}
    </p>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1 text-sm text-red-700" id={id} role="alert">
      {message}
    </p>
  );
}
