import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-fl-border py-16 text-center">
      <h3 className="font-display text-lg tracking-wide text-fl-text">
        NOTHING HERE YET
      </h3>
      <p className="max-w-xs text-sm text-fl-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-fl-accent px-4 py-2 text-xs font-bold text-black transition hover:brightness-95"
      >
        <Dumbbell size={14} strokeWidth={2.5} />
        Go to workouts
      </Link>
    </div>
  );
}
