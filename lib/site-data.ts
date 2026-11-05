import { createPublicDataClient } from "@/lib/supabase/public-data";
import type { Database } from "@/lib/supabase/database.types";

export type PostCategory =
  "Payroll" | "Employment law" | "Data protection" | "HR practice";

export type BriefingSummary = Pick<
  Database["public"]["Tables"]["briefings"]["Row"],
  | "id"
  | "slug"
  | "title"
  | "summary"
  | "format"
  | "topic"
  | "starts_at"
  | "ends_at"
  | "venue"
  | "speaker_name"
  | "speaker_role"
  | "speaker_photo_url"
  | "agenda"
  | "capacity"
  | "image_url"
  | "published"
>;

export async function getHomepageData() {
  const client = createPublicDataClient();
  const { data, error } = await client
    .from("testimonials")
    .select(
      "id, quote, client_name, client_role, company, photo_url, consent_confirmed, sort_order, published",
    )
    .eq("published", true)
    .eq("consent_confirmed", true)
    .order("sort_order", { ascending: true })
    .limit(10);

  if (error) {
    console.error("Could not load published testimonials.", error);
    throw new Error("Could not load published testimonials.");
  }

  return data ?? [];
}

export async function getPublishedTeamMembers() {
  const client = createPublicDataClient();
  const { data, error } = await client
    .from("team_members")
    .select("id, name, role, phone, photo_url, bio, sort_order, published")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Could not load published team members.", error);
    throw new Error("Could not load published team members.");
  }

  return data ?? [];
}

export async function getBriefings() {
  const client = createPublicDataClient();
  const now = new Date().toISOString();
  const selection =
    "id, slug, title, summary, format, topic, starts_at, ends_at, venue, speaker_name, speaker_role, speaker_photo_url, agenda, capacity, image_url, published";
  const [upcoming, past] = await Promise.all([
    client
      .from("briefings")
      .select(selection)
      .eq("published", true)
      .gt("starts_at", now)
      .order("starts_at", { ascending: true }),
    client
      .from("briefings")
      .select(selection)
      .eq("published", true)
      .lt("starts_at", now)
      .order("starts_at", { ascending: false }),
  ]);

  if (upcoming.error || past.error) {
    const error = upcoming.error ?? past.error;
    console.error("Could not load published briefings.", error);
    throw new Error("Could not load published briefings.");
  }

  return { upcoming: upcoming.data ?? [], past: past.data ?? [] };
}

export async function getPublishedBriefing(slug: string) {
  const client = createPublicDataClient();
  const { data, error } = await client
    .from("briefings")
    .select(
      "id, slug, title, summary, format, topic, starts_at, ends_at, venue, speaker_name, speaker_role, speaker_photo_url, agenda, capacity, image_url, published",
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Could not load the published briefing.", error);
    throw new Error("Could not load the published briefing.");
  }

  return data;
}

export async function getPublishedPosts(category?: PostCategory) {
  const client = createPublicDataClient();
  let query = client
    .from("posts")
    .select(
      "id, slug, title, excerpt, body_md, category, author_name, cover_url, published_at, published, seo_title, seo_description",
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Could not load published insights.", error);
    throw new Error("Could not load published insights.");
  }

  return data ?? [];
}

export async function getPublishedPost(slug: string) {
  const client = createPublicDataClient();
  const { data, error } = await client
    .from("posts")
    .select(
      "id, slug, title, excerpt, body_md, category, author_name, cover_url, published_at, published, seo_title, seo_description, updated_at",
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Could not load the published insight.", error);
    throw new Error("Could not load the published insight.");
  }

  return data;
}

export async function getRelatedPosts(
  category: PostCategory,
  excludedSlug: string,
) {
  const client = createPublicDataClient();
  const { data, error } = await client
    .from("posts")
    .select(
      "id, slug, title, excerpt, body_md, category, author_name, cover_url, published_at, published, seo_title, seo_description",
    )
    .eq("published", true)
    .eq("category", category)
    .neq("slug", excludedSlug)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Could not load related insights.", error);
    throw new Error("Could not load related insights.");
  }

  return data ?? [];
}
