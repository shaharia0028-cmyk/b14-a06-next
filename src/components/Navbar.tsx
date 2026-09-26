"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const navLinks = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-fl-border bg-fl-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={24} height={24} priority />
          <span className="font-display text-lg tracking-wide text-fl-text">
            FITLOG
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-fl-accent"
                    : "text-fl-muted hover:text-fl-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-fl-accent px-3 py-1 text-xs font-semibold text-black transition hover:brightness-95"
            aria-label={`Plan, ${planCount} items`}
          >
            Plan <span className="ml-1">{planCount}</span>
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-fl-border px-3 py-1 text-xs font-semibold text-fl-text transition hover:border-fl-muted"
            aria-label={`Saved, ${savedCount} items`}
          >
            Saved <span className="ml-1">{savedCount}</span>
          </Link>
        </div>
      </nav>

      {/* Mobile nav links */}
      <div className="flex items-center justify-center gap-6 border-t border-fl-border py-2 md:hidden">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive ? "text-fl-accent" : "text-fl-muted hover:text-fl-text"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
