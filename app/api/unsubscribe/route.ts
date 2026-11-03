import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const TOKEN_PATTERN = /^[a-f0-9]{64}$/;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (
    !contentType.toLowerCase().startsWith("application/x-www-form-urlencoded")
  ) {
    return new Response(
      "Expected an application/x-www-form-urlencoded request.",
      {
        status: 415,
      },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response("Invalid unsubscribe request.", { status: 400 });
  }

  if (formData.get("List-Unsubscribe") !== "One-Click") {
    return new Response("Invalid one-click unsubscribe request.", {
      status: 400,
    });
  }

  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!TOKEN_PATTERN.test(token)) {
    return new Response("Invalid unsubscribe token.", { status: 400 });
  }

  try {
    const { error } = await createAdminClient()
      .from("newsletter_subscribers")
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq("unsubscribe_token", token)
      .is("unsubscribed_at", null);

    if (error) {
      console.error("One-click newsletter unsubscribe failed.", error);
      return new Response("Unsubscribe could not be completed.", {
        status: 500,
      });
    }
  } catch (error) {
    console.error(
      "One-click newsletter unsubscribe could not be processed.",
      error,
    );
    return new Response("Unsubscribe could not be completed.", {
      status: 500,
    });
  }

  return new Response(null, {
    headers: { "Cache-Control": "no-store" },
    status: 204,
  });
}
