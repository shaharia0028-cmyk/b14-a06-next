"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Dumbbell } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the console so the failure is visible during grading/deploys.
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-28 text-center">
      <p className="font-display text-5xl text-fl-accent">OOPS</p>
      <h1 className="font-display text-2xl tracking-wide text-fl-text uppercase">
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm text-fl-muted">
        An unexpected error interrupted this page. You can try again, or
        head back to the workout library.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-fl-accent px-5 py-3 text-sm font-bold text-black transition hover:brightness-95"
        >
          <RefreshCw size={16} strokeWidth={2.5} />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-fl-border px-5 py-3 text-sm font-semibold text-fl-text transition hover:border-fl-muted"
        >
          <Dumbbell size={16} />
          Back to workouts
        </Link>
      </div>
    </section>
  );
}