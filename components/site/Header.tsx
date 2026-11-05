"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const serviceLinks = [
  { href: "/services/hr-consulting", label: "HR Consulting" },
  { href: "/services/payroll", label: "Payroll Services" },
  { href: "/services/compliance-audits", label: "Compliance Audits" },
];

const siteLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Our work" },
  { href: "/about", label: "About" },
  { href: "/briefings", label: "Briefings" },
  { href: "/contact", label: "Contact" },
];

const navLinkClass =
  "inline-flex min-h-10 items-center font-heading text-[9px] font-semibold text-on-navy transition-colors hover:text-white xl:text-[10px]";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 80);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-navy-deep transition-shadow ${
        isScrolled ? "shadow-soft" : "shadow-none"
      }`}
      data-scrolled={isScrolled}
    >
      <div className="container flex min-h-[60px] items-center justify-between gap-6 md:pl-11 md:pr-6">
        <Logo className="text-base" />

        <div className="hidden items-center gap-5 md:flex">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-[17px]">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link className={navLinkClass} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button
            asChild
            className="min-h-8 px-3 py-1 text-[9px] xl:text-[10px]"
            size="sm"
            variant="gold"
          >
            <Link href="/contact#book">Book a health check</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Open site navigation"
                size="icon"
                variant="icon"
              >
                <Menu aria-hidden="true" size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-[calc(100vw_-_2rem)] border-line bg-white p-6 text-ink sm:w-[22rem]"
              side="right"
            >
              <div className="mb-6">
                <SheetTitle>
                  <Logo className="text-xl" tone="dark" />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Browse TruewardHR pages and services.
                </SheetDescription>
              </div>
              <nav aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {siteLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Link
                          className="flex min-h-12 items-center rounded-inner px-3 font-heading font-semibold text-navy hover:bg-mist"
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Link
                          className="flex min-h-10 items-center rounded-inner px-6 text-sm text-muted hover:bg-mist"
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                  <li className="pt-4">
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          buttonVariants({ variant: "gold" }),
                          "w-full",
                        )}
                        href="/contact#book"
                      >
                        Book a health check
                      </Link>
                    </SheetClose>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
