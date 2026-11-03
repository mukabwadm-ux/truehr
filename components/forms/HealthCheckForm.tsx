"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import { FieldError, FormFeedback } from "@/components/forms/FormFeedback";
import { SpamProtectionFields } from "@/components/forms/SpamProtectionFields";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { submitHealthCheck } from "@/app/actions";
import { initialFormActionState } from "@/lib/forms/action-state";

const employeeBands = ["1-10", "11-50", "51-150", "150+"];
const supportNeeds = [
  { value: "payroll", label: "Payroll" },
  { value: "hr_consulting", label: "HR consulting" },
  { value: "both", label: "Both" },
  { value: "not_sure", label: "Not sure yet" },
];

export function HealthCheckForm() {
  const [state, formAction] = useFormState(
    submitHealthCheck,
    initialFormActionState,
  );

  return (
    <form action={formAction} className="relative mt-6">
      <SpamProtectionFields />
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Health check request details</legend>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="full_name"
          >
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={
              state.fieldErrors.full_name ? "full-name-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.full_name)}
            autoComplete="name"
            className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
            id="full_name"
            name="full_name"
            required
            type="text"
          />
          <FieldError
            id="full-name-error"
            message={state.fieldErrors.full_name}
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="company"
          >
            Company <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={
              state.fieldErrors.company ? "company-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.company)}
            autoComplete="organization"
            className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
            id="company"
            name="company"
            required
            type="text"
          />
          <FieldError id="company-error" message={state.fieldErrors.company} />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="health-email"
          >
            Work email <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={
              state.fieldErrors.email ? "health-email-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.email)}
            autoComplete="email"
            className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
            id="health-email"
            name="email"
            required
            type="email"
          />
          <FieldError
            id="health-email-error"
            message={state.fieldErrors.email}
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="health-phone"
          >
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            aria-describedby={
              state.fieldErrors.phone ? "health-phone-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.phone)}
            autoComplete="tel"
            className="min-h-12 w-full rounded-inner border border-border px-4 text-body text-ink"
            id="health-phone"
            name="phone"
            required
            type="tel"
          />
          <FieldError
            id="health-phone-error"
            message={state.fieldErrors.phone}
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="employee_band"
          >
            Number of employees <span aria-hidden="true">*</span>
          </label>
          <select
            aria-describedby={
              state.fieldErrors.employee_band
                ? "employee-band-error"
                : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.employee_band)}
            className="min-h-12 w-full rounded-inner border border-border bg-white px-4 text-body text-ink"
            defaultValue=""
            id="employee_band"
            name="employee_band"
            required
          >
            <option disabled value="">
              Select a range
            </option>
            {employeeBands.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </select>
          <FieldError
            id="employee-band-error"
            message={state.fieldErrors.employee_band}
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="need"
          >
            I need help with <span aria-hidden="true">*</span>
          </label>
          <select
            aria-describedby={state.fieldErrors.need ? "need-error" : undefined}
            aria-invalid={Boolean(state.fieldErrors.need)}
            className="min-h-12 w-full rounded-inner border border-border bg-white px-4 text-body text-ink"
            defaultValue=""
            id="need"
            name="need"
            required
          >
            <option disabled value="">
              Select an option
            </option>
            {supportNeeds.map((need) => (
              <option key={need.value} value={need.value}>
                {need.label}
              </option>
            ))}
          </select>
          <FieldError id="need-error" message={state.fieldErrors.need} />
        </div>
        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-sm font-semibold text-ink"
            htmlFor="message"
          >
            Message <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            aria-describedby={
              state.fieldErrors.message ? "health-message-error" : undefined
            }
            aria-invalid={Boolean(state.fieldErrors.message)}
            className="min-h-28 w-full rounded-inner border border-border p-4 text-body text-ink"
            id="message"
            name="message"
            rows={4}
          />
          <FieldError
            id="health-message-error"
            message={state.fieldErrors.message}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              aria-describedby={
                state.fieldErrors.consent_contact
                  ? "health-consent-error"
                  : undefined
              }
              aria-invalid={Boolean(state.fieldErrors.consent_contact)}
              className="mt-1 h-4 w-4 accent-navy"
              name="consent_contact"
              required
              type="checkbox"
            />
            <span>
              I agree to TruewardHR contacting me about this request.
              <span aria-hidden="true"> *</span>
            </span>
          </label>
          <FieldError
            id="health-consent-error"
            message={state.fieldErrors.consent_contact}
          />
        </div>
      </fieldset>
      <div className="mt-6">
        <SubmitButton pendingLabel="Sending request...">
          Send request
        </SubmitButton>
        <p className="mt-3 text-sm text-muted">
          We use your details only to respond to this request. Read our{" "}
          <Link className="font-semibold text-navy underline" href="/privacy">
            privacy notice
          </Link>
          .
        </p>
      </div>
      <FormFeedback id="health-check-response" state={state} />
    </form>
  );
}
