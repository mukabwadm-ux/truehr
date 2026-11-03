export interface EmailAttachment {
  filename: string;
  content: string;
  contentType?: string;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  headers?: Record<string, string>;
  attachments?: EmailAttachment[];
}

export type EmailResult =
  { success: true } | { success: false; reason: string };

export function isEmailDeliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

export async function sendEmail({
  to,
  subject,
  html,
  headers,
  attachments,
}: SendEmailOptions): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error(
      "Email delivery is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.",
    );
    return {
      success: false,
      reason: "Email delivery is not configured.",
    };
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        headers,
        attachments,
      }),
    });
  } catch (error) {
    console.error(
      "Resend request failed before a response was received.",
      error,
    );
    return {
      success: false,
      reason: "The email service could not be reached.",
    };
  }

  if (!response.ok) {
    const details = await response.text();
    console.error(
      `Resend rejected an email with status ${response.status}: ${details.slice(0, 500)}`,
    );
    return {
      success: false,
      reason: "The email service rejected the message.",
    };
  }

  return { success: true };
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
