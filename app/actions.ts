"use server";

import { randomBytes } from "node:crypto";
import { redirect } from "next/navigation";

import { NEWSLETTER_CONSENT_TEXT } from "@/lib/forms/constants";
import type { FormActionState } from "@/lib/forms/action-state";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendEmail,
  escapeHtml,
  isEmailDeliveryConfigured,
} from "@/lib/server/email";
import { buildCalendarFile } from "@/lib/server/ical";
import { getSiteUrl } from "@/lib/server/site-url";
import {
  checkFormTiming,
  consumeIpRateLimit,
} from "@/lib/server/submission-security";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]+$/;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMPLOYEE_BANDS = ["1-10", "11-50", "51-150", "150+"] as const;
const SUPPORT_NEEDS = ["payroll", "hr_consulting", "both", "not_sure"] as const;

function getText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function errorState(
  message: string,
  fieldErrors: Record<string, string> = {},
): FormActionState {
  return { status: "error", message, fieldErrors };
}

function hasErrors(fieldErrors: Record<string, string>) {
  return Object.keys(fieldErrors).length > 0;
}

function requiredText(
  formData: FormData,
  name: string,
  label: string,
  fieldErrors: Record<string, string>,
  maxLength = 200,
) {
  const value = getText(formData, name).replace(/\s+/g, " ");

  if (!value) {
    fieldErrors[name] = `Enter your ${label}.`;
  } else if (value.length > maxLength) {
    fieldErrors[name] = `${label} must be ${maxLength} characters or fewer.`;
  }

  return value;
}

function validEmail(formData: FormData, fieldErrors: Record<string, string>) {
  const email = getText(formData, "email").toLowerCase();

  if (!email || !EMAIL_PATTERN.test(email) || email.length > 254) {
    fieldErrors.email = "Enter a valid email address.";
  }

  return email;
}

function validPhone(formData: FormData, fieldErrors: Record<string, string>) {
  const phone = requiredText(
    formData,
    "phone",
    "phone number",
    fieldErrors,
    32,
  );
  const digitCount = phone.replace(/\D/g, "").length;

  if (phone && (!PHONE_PATTERN.test(phone) || digitCount < 7)) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  return phone;
}

function formConfigurationError(requiresNotification: boolean) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.RATE_LIMIT_SECRET ||
    !process.env.NEXT_PUBLIC_SITE_URL ||
    !isEmailDeliveryConfigured() ||
    (requiresNotification && !process.env.NOTIFY_EMAIL)
  ) {
    console.error("Form submission configuration is incomplete.");
    return "Secure form submissions are not configured yet. Please contact us by phone or email.";
  }

  try {
    getSiteUrl();
  } catch (error) {
    console.error("Form submission site URL is invalid.", error);
    return "Secure form submissions are not configured yet. Please contact us by phone or email.";
  }

  return null;
}

function htmlParagraph(label: string, value: string) {
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value || "Not provided")}</p>`;
}

function formatNairobiDateTime(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export async function submitHealthCheck(
  _previousState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const timing = checkFormTiming(formData);
  if (!timing.allowed) {
    return errorState(timing.message);
  }

  const fieldErrors: Record<string, string> = {};
  const fullName = requiredText(
    formData,
    "full_name",
    "full name",
    fieldErrors,
  );
  const company = requiredText(
    formData,
    "company",
    "company name",
    fieldErrors,
  );
  const email = validEmail(formData, fieldErrors);
  const phone = validPhone(formData, fieldErrors);
  const employeeBandInput = getText(formData, "employee_band");
  const employeeBand = EMPLOYEE_BANDS.find(
    (option) => option === employeeBandInput,
  );
  const needInput = getText(formData, "need");
  const need = SUPPORT_NEEDS.find((option) => option === needInput);
  const message = getText(formData, "message");
  const consentContact = formData.get("consent_contact") === "on";

  if (!employeeBand) {
    fieldErrors.employee_band = "Choose the number of employees.";
  }
  if (!need) {
    fieldErrors.need = "Choose what you need help with.";
  }
  if (message.length > 2_000) {
    fieldErrors.message = "Keep your message to 2,000 characters or fewer.";
  }
  if (!consentContact) {
    fieldErrors.consent_contact =
      "Agree to be contacted about this request to continue.";
  }
  if (hasErrors(fieldErrors)) {
    return errorState(
      "Check the highlighted fields and try again.",
      fieldErrors,
    );
  }
  if (!employeeBand || !need) {
    return errorState(
      "Choose the number of employees and the support you need.",
      {
        employee_band: "Choose the number of employees.",
        need: "Choose what you need help with.",
      },
    );
  }

  const configError = formConfigurationError(true);
  if (configError) {
    return errorState(configError);
  }

  const rateLimit = await consumeIpRateLimit();
  if (!rateLimit.allowed) {
    return errorState(rateLimit.message);
  }

  try {
    const { error } = await createAdminClient()
      .from("health_check_requests")
      .insert({
        full_name: fullName,
        company,
        email,
        phone,
        employee_band: employeeBand as (typeof EMPLOYEE_BANDS)[number],
        need: need as (typeof SUPPORT_NEEDS)[number],
        message: message || null,
        consent_contact: consentContact,
        source_page: "/contact",
      });

    if (error) {
      console.error("Could not save a health check request.", error);
      return errorState(
        "We couldn't save your request. Please try again or contact us directly.",
      );
    }
  } catch (error) {
    console.error("Health check request could not be saved.", error);
    return errorState(
      "We couldn't save your request. Please try again or contact us directly.",
    );
  }

  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!notifyEmail) {
    return errorState(
      "Your request was saved, but the team notification is not configured. Please call us if you need a prompt response.",
    );
  }

  const siteUrl = getSiteUrl();
  const details = [
    htmlParagraph("Full name", fullName),
    htmlParagraph("Company", company),
    htmlParagraph("Email", email),
    htmlParagraph("Phone", phone),
    htmlParagraph("Number of employees", employeeBand),
    htmlParagraph("Help needed", need.replace(/_/g, " ")),
    htmlParagraph("Message", message),
  ].join("");

  const [notification, acknowledgement] = await Promise.all([
    sendEmail({
      to: notifyEmail,
      subject: `New health check request from ${fullName}`,
      html: `<h1>New health check request</h1>${details}`,
    }),
    sendEmail({
      to: email,
      subject: "We received your TruewardHR health check request",
      html: `<p>Hello ${escapeHtml(fullName)},</p><p>Thank you for contacting TruewardHR. We have received your health check request and will follow up using the details you provided.</p><p>If you need to reach us in the meantime, call <a href="tel:+254797500747">+254 797 500747</a> or email <a href="mailto:john@truewardhr.com">john@truewardhr.com</a>.</p><p><a href="${siteUrl}/privacy">Read our privacy notice</a>.</p>`,
    }),
  ]);

  if (!notification.success || !acknowledgement.success) {
    return errorState(
      "Your request was saved, but we couldn't send all confirmation emails. Please call us if you need a prompt response.",
    );
  }

  redirect("/thank-you?type=booking");
}

export async function registerForBriefing(
  _previousState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const timing = checkFormTiming(formData);
  if (!timing.allowed) {
    return errorState(timing.message);
  }

  const fieldErrors: Record<string, string> = {};
  const briefingId = getText(formData, "briefing_id");
  const fullName = requiredText(
    formData,
    "full_name",
    "full name",
    fieldErrors,
  );
  const company = requiredText(
    formData,
    "company",
    "company name",
    fieldErrors,
  );
  const role = requiredText(formData, "role", "role", fieldErrors);
  const email = validEmail(formData, fieldErrors);
  const phone = validPhone(formData, fieldErrors);
  const consentContact = formData.get("consent_contact") === "on";

  if (!UUID_PATTERN.test(briefingId)) {
    fieldErrors.briefing_id =
      "This briefing is not available for registration.";
  }
  if (!consentContact) {
    fieldErrors.consent_contact =
      "Agree to be contacted about this registration to continue.";
  }
  if (hasErrors(fieldErrors)) {
    return errorState(
      "Check the highlighted fields and try again.",
      fieldErrors,
    );
  }

  const configError = formConfigurationError(false);
  if (configError) {
    return errorState(configError);
  }

  let adminClient: ReturnType<typeof createAdminClient>;
  try {
    adminClient = createAdminClient();
  } catch (error) {
    console.error("Briefing registration is not configured.", error);
    return errorState(
      "Secure registration is not available right now. Please try again later.",
    );
  }

  const rateLimit = await consumeIpRateLimit();
  if (!rateLimit.allowed) {
    return errorState(rateLimit.message);
  }

  const { data: briefing, error: briefingError } = await adminClient
    .from("briefings")
    .select(
      "id, slug, title, summary, format, starts_at, ends_at, venue, published",
    )
    .eq("id", briefingId)
    .eq("published", true)
    .maybeSingle();

  if (briefingError) {
    console.error("Could not load briefing for registration.", briefingError);
    return errorState(
      "We couldn't verify this briefing. Please try again later.",
    );
  }
  if (!briefing || new Date(briefing.starts_at).getTime() <= Date.now()) {
    return errorState(
      "Registration for this briefing is closed. Please view the briefing list for upcoming sessions.",
    );
  }

  const { error: registrationError } = await adminClient.rpc(
    "register_briefing",
    {
      p_briefing_id: briefing.id,
      p_full_name: fullName,
      p_company: company,
      p_role: role,
      p_email: email,
      p_phone: phone,
      p_consent_contact: consentContact,
    },
  );

  if (registrationError) {
    if (registrationError.message.includes("already_registered")) {
      return errorState("This email is already registered for the briefing.");
    }
    if (registrationError.message.includes("briefing_full")) {
      return errorState(
        "This briefing is full and is no longer accepting registrations.",
      );
    }
    if (registrationError.message.includes("briefing_closed")) {
      return errorState("Registration for this briefing is closed.");
    }
    console.error("Could not save briefing registration.", registrationError);
    return errorState(
      "We couldn't complete your registration. Please try again or contact us.",
    );
  }

  const siteUrl = getSiteUrl();
  const location =
    briefing.format === "online"
      ? "Link sent on registration"
      : (briefing.venue ?? "");
  const startsAt = formatNairobiDateTime(briefing.starts_at);
  const endsAt = formatNairobiDateTime(briefing.ends_at);
  const calendarFile = buildCalendarFile({
    uid: `${briefing.slug}-${briefing.starts_at}@truewardhr.com`,
    title: briefing.title,
    description: briefing.summary,
    startsAt: briefing.starts_at,
    endsAt: briefing.ends_at,
    location,
    url: `${siteUrl}/briefings/${briefing.slug}`,
  });
  const emailResult = await sendEmail({
    to: email,
    subject: `Your registration: ${briefing.title}`,
    html: `<p>Hello ${escapeHtml(fullName)},</p><p>Your registration for <strong>${escapeHtml(briefing.title)}</strong> is confirmed.</p><p><strong>Date and time:</strong> ${escapeHtml(startsAt)} - ${escapeHtml(endsAt)} (Nairobi time)</p><p><strong>Format:</strong> ${briefing.format === "online" ? "Online - link sent on registration" : "In person - " + escapeHtml(location)}</p><p>The event is also attached as a calendar file.</p>`,
    attachments: [
      {
        filename: `${briefing.slug}.ics`,
        content: Buffer.from(calendarFile, "utf8").toString("base64"),
        contentType: "text/calendar",
      },
    ],
  });

  if (!emailResult.success) {
    return errorState(
      "Your registration was saved, but we couldn't send the confirmation email. Please contact us for the session details.",
    );
  }

  redirect("/thank-you?type=briefing");
}

export async function subscribeToNewsletter(
  _previousState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const timing = checkFormTiming(formData);
  if (!timing.allowed) {
    return errorState(timing.message);
  }

  const fieldErrors: Record<string, string> = {};
  const email = validEmail(formData, fieldErrors);
  const consent = formData.get("consent") === "on";

  if (!consent) {
    fieldErrors.consent =
      "Tick the consent box to receive the monthly employer update.";
  }
  if (hasErrors(fieldErrors)) {
    return errorState(
      "Check the highlighted fields and try again.",
      fieldErrors,
    );
  }

  const configError = formConfigurationError(false);
  if (configError) {
    return errorState(configError);
  }

  const rateLimit = await consumeIpRateLimit();
  if (!rateLimit.allowed) {
    return errorState(rateLimit.message);
  }

  const unsubscribeToken = randomBytes(32).toString("hex");
  const siteUrl = getSiteUrl();

  try {
    const { error } = await createAdminClient()
      .from("newsletter_subscribers")
      .upsert(
        {
          email,
          consent: true,
          consent_text: NEWSLETTER_CONSENT_TEXT,
          consented_at: new Date().toISOString(),
          unsubscribed_at: null,
          unsubscribe_token: unsubscribeToken,
        },
        { onConflict: "email" },
      );

    if (error) {
      console.error("Could not save newsletter consent.", error);
      return errorState(
        "We couldn't save your subscription. Please try again later.",
      );
    }
  } catch (error) {
    console.error("Newsletter consent could not be saved.", error);
    return errorState(
      "We couldn't save your subscription. Please try again later.",
    );
  }

  const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  const emailResult = await sendEmail({
    to: email,
    subject: "Your TruewardHR employer update subscription",
    html: `<p>Thanks for subscribing to the TruewardHR monthly employer update.</p><p>You can <a href="${unsubscribeUrl}">unsubscribe at any time</a>.</p>`,
    headers: {
      "List-Unsubscribe": `<${siteUrl}/api/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });

  if (!emailResult.success) {
    return errorState(
      "Your subscription was saved, but we couldn't send the confirmation email. Please contact us if you need help.",
    );
  }

  redirect("/thank-you?type=newsletter");
}

export async function unsubscribeNewsletter(formData: FormData) {
  const token = getText(formData, "token");
  if (!/^[a-f0-9]{64}$/.test(token)) {
    redirect("/unsubscribe?status=invalid");
  }

  let updateError: Error | null = null;
  try {
    const { error } = await createAdminClient()
      .from("newsletter_subscribers")
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq("unsubscribe_token", token);
    updateError = error;
  } catch (error) {
    console.error("Newsletter unsubscribe could not be processed.", error);
    redirect("/unsubscribe?status=error");
  }

  if (updateError) {
    console.error("Could not process newsletter unsubscribe.", updateError);
    redirect("/unsubscribe?status=error");
  }

  redirect("/unsubscribe?status=complete");
}
