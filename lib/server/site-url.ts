export function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error("Set NEXT_PUBLIC_SITE_URL before generating site links.");
  }

  const parsedUrl = new URL(siteUrl);
  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTP or HTTPS.");
  }

  return parsedUrl.origin;
}
