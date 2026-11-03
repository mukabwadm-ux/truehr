import { createHmac } from "node:crypto";
import { headers } from "next/headers";

import { FORM_HONEYPOT_FIELD, FORM_STARTED_FIELD } from "@/lib/forms/constants";
import { createAdminClient } from "@/lib/supabase/admin";

const MINIMUM_FILL_TIME_MS = 3_000;
const MAXIMUM_FILL_TIME_MS = 60 * 60 * 1_000;

export type ProtectionResult =
  { allowed: true } | { allowed: false; message: string };

export function checkFormTiming(formData: FormData): ProtectionResult {
  const honeypot = formData.get(FORM_HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim()) {
    return {
      allowed: false,
      message:
        "We couldn't accept this submission. Please refresh and try again.",
    };
  }

  const startedAt = Number(formData.get(FORM_STARTED_FIELD));
  const elapsed = Date.now() - startedAt;
  if (
    !Number.isFinite(startedAt) ||
    elapsed < MINIMUM_FILL_TIME_MS ||
    elapsed > MAXIMUM_FILL_TIME_MS
  ) {
    return {
      allowed: false,
      message:
        "Please keep the form open for at least three seconds, then try again.",
    };
  }

  return { allowed: true };
}

export async function consumeIpRateLimit(): Promise<ProtectionResult> {
  const secret = process.env.RATE_LIMIT_SECRET;
  if (!secret) {
    console.error(
      "Submission protection is not configured: RATE_LIMIT_SECRET is missing.",
    );
    return {
      allowed: false,
      message:
        "Secure form submissions are not configured yet. Please contact us by phone or email.",
    };
  }

  const requestHeaders = await headers();
  const forwardedIp = requestHeaders.get("x-forwarded-for");
  const ip =
    requestHeaders.get("x-real-ip")?.trim() ||
    forwardedIp?.split(",")[0]?.trim();

  if (!ip) {
    console.error("Submission protection could not determine the request IP.");
    return {
      allowed: false,
      message:
        "We couldn't verify this request. Please contact us by phone or email.",
    };
  }

  const ipHash = createHmac("sha256", secret).update(ip).digest("hex");

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient.rpc(
      "consume_submission_rate_limit",
      { p_ip_hash: ipHash },
    );

    if (error) {
      console.error("Submission rate limit check failed.", error);
      return {
        allowed: false,
        message:
          "We couldn't verify this submission. Please try again later or contact us.",
      };
    }

    if (!data) {
      return {
        allowed: false,
        message:
          "Too many submissions from this connection. Please wait ten minutes before trying again.",
      };
    }
  } catch (error) {
    console.error("Submission rate limit check could not run.", error);
    return {
      allowed: false,
      message:
        "We couldn't verify this submission. Please try again later or contact us.",
    };
  }

  return { allowed: true };
}
