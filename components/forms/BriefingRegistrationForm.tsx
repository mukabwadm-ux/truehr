"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import { FieldError, FormFeedback } from "@/components/forms/FormFeedback";
import { SpamProtectionFields } from "@/components/forms/SpamProtectionFields";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { registerForBriefing } from "@/app/actions";
import { initialFormActionState } from "@/lib/forms/action-state";

export function BriefingRegistrationForm({
  briefingId,
}: {
  briefingId: string;
}) {
  const [state, formAction] = useFormState(
    registerForBriefing,
    initialFormActionState,
  );

  return (
    <form action={formAction} className="relative">
      <SpamProtectionFields />
      <input name="briefing_id" type="hidden" value={briefingId} />
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">
          Employer briefing registration details
        </legend>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="briefing-full-name"
          >
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={
              state.fieldErrors.full_name
                ? "briefing-full-name-error"
                : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.full_name)}
            autoComplete="name"
            className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
            id="briefing-full-name"
            name="full_name"
            required
            type="text"
          />
          <FieldError
            id="briefing-full-name-error"
            message={state.fieldErrors.full_name}
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="briefing-company"
          >
            Company <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={
              state.fieldErrors.company ? "briefing-company-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.company)}
            autoComplete="organization"
            className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
            id="briefing-company"
            name="company"
            required
            type="text"
          />
          <FieldError
            id="briefing-company-error"
            message={state.fieldErrors.company}
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="briefing-role"
          >
            Role <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={
              state.fieldErrors.role ? "briefing-role-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.role)}
            className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
            id="briefing-role"
            name="role"
            required
            type="text"
          />
          <FieldError
            id="briefing-role-error"
            message={state.fieldErrors.role}
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="briefing-email"
          >
            Work email <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={
              state.fieldErrors.email ? "briefing-email-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.email)}
            autoComplete="email"
            className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
            id="briefing-email"
            name="email"
            required
            type="email"
          />
          <FieldError
            id="briefing-email-error"
            message={state.fieldErrors.email}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="briefing-phone"
          >
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={
              state.fieldErrors.phone ? "briefing-phone-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.phone)}
            autoComplete="tel"
            className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
            id="briefing-phone"
            name="phone"
            required
            type="tel"
          />
          <FieldError
            id="briefing-phone-error"
            message={state.fieldErrors.phone}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              aria-describedby={
                state.fieldErrors.consent_contact
                  ? "briefing-consent-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors.consent_contact)}
              className="mt-1 h-4 w-4 accent-navy"
              name="consent_contact"
              required
              type="checkbox"
            />
            <span>
              I agree to TruewardHR contacting me about this registration.
              <span aria-hidden="true"> *</span>
            </span>
          </label>
          <FieldError
            id="briefing-consent-error"
            message={state.fieldErrors.consent_contact}
          />
        </div>
      </fieldset>
      <div className="mt-6">
        <SubmitButton pendingLabel="Registering...">
          Reserve a seat
        </SubmitButton>
        <p className="mt-3 text-sm text-muted">
          We use your details only to respond to this registration. Read our{" "}
          <Link className="font-semibold text-navy underline" href="/privacy">
            privacy notice
          </Link>
          .
        </p>
      </div>
      <FormFeedback id="briefing-registration-response" state={state} />
    </form>
  );
}
