"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/briefings", label: "Briefings" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const navLinkClass =
  "inline-flex min-h-11 items-center font-heading text-sm font-semibold text-on-navy transition-colors hover:text-white";

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
      className={`sticky top-0 z-50 border-b border-navy-soft/40 bg-navy transition-shadow ${
        isScrolled ? "shadow-soft" : "shadow-none"
      }`}
      data-scrolled={isScrolled}
    >
      <div className="container flex min-h-20 items-center justify-between gap-6">
        <Logo />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-5 lg:flex"
        >
          <ul className="flex items-center gap-5">
            {siteLinks.slice(0, 2).map((link) => (
              <li key={link.href}>
                <Link className={navLinkClass} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`${navLinkClass} gap-1`} type="button">
                    Services
                    <ChevronDown aria-hidden="true" size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="border-line bg-white text-ink"
                >
                  {serviceLinks.map((link) => (
                    <DropdownMenuItem asChild key={link.href}>
                      <Link
                        className="min-h-11 cursor-pointer"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {siteLinks.slice(2).map((link) => (
              <li key={link.href}>
                <Link className={navLinkClass} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" variant="gold">
            <Link href="/contact#book">Book a health check</Link>
          </Button>
        </div>

        <div className="lg:hidden">
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
                  {siteLinks.slice(0, 2).map((link) => (
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
                  <li className="px-3 py-3 font-heading text-sm font-bold text-gold-text">
                    Services
                  </li>
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Link
                          className="flex min-h-12 items-center rounded-inner px-6 font-heading font-semibold text-navy hover:bg-mist"
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                  {siteLinks.slice(2).map((link) => (
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
