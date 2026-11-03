import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
  );
}

if (adminEmails.length === 0) {
  throw new Error("Set at least one email in ADMIN_EMAILS before seeding admins.");
}

const response = await fetch(`${supabaseUrl}/rest/v1/admins?on_conflict=email`, {
  method: "POST",
  headers: {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  },
  body: JSON.stringify(adminEmails.map((email) => ({ email }))),
});

if (!response.ok) {
  const details = await response.text();
  throw new Error(`Could not seed admin emails (${response.status}): ${details}`);
}

console.log(`Added or updated ${adminEmails.length} admin email(s).`);
