import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-28 text-center">
      <p className="font-display text-6xl text-fl-accent">404</p>
      <h1 className="font-display text-2xl tracking-wide text-fl-text uppercase">
        Lift not found
      </h1>
      <p className="max-w-sm text-sm text-fl-muted">
        That page doesn&apos;t exist, or the workout you&apos;re looking for
        may have been removed from the library.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-fl-accent px-5 py-3 text-sm font-bold text-black transition hover:brightness-95"
      >
        <Dumbbell size={16} strokeWidth={2.5} />
        Back to workouts
      </Link>
    </section>
  );
}
