"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import { FieldError, FormFeedback } from "@/components/forms/FormFeedback";
import { SpamProtectionFields } from "@/components/forms/SpamProtectionFields";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { subscribeToNewsletter } from "@/app/actions";
import { initialFormActionState } from "@/lib/forms/action-state";
import { NEWSLETTER_CONSENT_TEXT } from "@/lib/forms/constants";

export function NewsletterSubscribeForm() {
  const [state, formAction] = useFormState(
    subscribeToNewsletter,
    initialFormActionState,
  );

  return (
    <form
      action={formAction}
      aria-labelledby="newsletter-title"
      className="relative"
    >
      <SpamProtectionFields />
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-border sm:p-1">
        <input
          aria-describedby={
            state.fieldErrors.email ? "newsletter-email-error" : undefined
          }
          aria-invalid={Boolean(state.fieldErrors.email)}
          autoComplete="email"
          className="min-h-12 min-w-0 flex-1 rounded-full border border-border px-5 text-body text-ink placeholder:text-muted focus-visible:outline-gold sm:border-0"
          id="newsletter-email"
          name="email"
          placeholder="Your work email"
          required
          type="email"
        />
        <SubmitButton pendingLabel="Subscribing...">Subscribe</SubmitButton>
      </div>
      <FieldError
        id="newsletter-email-error"
        message={state.fieldErrors.email}
      />
      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input
          aria-describedby={
            state.fieldErrors.consent ? "newsletter-consent-error" : undefined
          }
          aria-invalid={Boolean(state.fieldErrors.consent)}
          className="mt-1 h-4 w-4 accent-navy"
          name="consent"
          required
          type="checkbox"
        />
        <span>{NEWSLETTER_CONSENT_TEXT}</span>
      </label>
      <FieldError
        id="newsletter-consent-error"
        message={state.fieldErrors.consent}
      />
      <p className="mt-3 text-sm text-muted">
        Read our{" "}
        <Link className="font-semibold text-navy underline" href="/privacy">
          privacy notice
        </Link>
        .
      </p>
      <FormFeedback id="newsletter-status" state={state} />
    </form>
  );
}
