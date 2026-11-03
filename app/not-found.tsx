import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-navy text-white">
      <div className="container flex min-h-20 items-center">
        <Logo />
      </div>
      <div className="container flex flex-1 flex-col justify-center py-16">
        <Eyebrow className="text-on-navy">Page not found</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-display font-extrabold">
          We can&apos;t find that page.
        </h1>
        <p className="mt-5 max-w-xl text-lead text-on-navy">
          The page may have moved or the address may be incorrect.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold">
            <Link href="/">Go to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              className="border-on-navy text-white hover:bg-navy-soft"
              href="/contact"
            >
              Contact us
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
