"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { PlanItem } from "@/lib/types";
import StatsRow from "./StatsRow";

interface PlanWorkoutCardProps {
  item: PlanItem;
  showMarkDone?: boolean;
  onMarkDone?: () => void;
  onRemove: () => void;
}

export default function PlanWorkoutCard({
  item,
  showMarkDone = false,
  onMarkDone,
  onRemove,
}: PlanWorkoutCardProps) {
  const { workout, done } = item;

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center ${
        done ? "border-fl-accent/40 bg-fl-accent/5" : "border-fl-border bg-fl-surface"
      }`}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-fl-surface-2">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-sm tracking-wide uppercase ${
            done ? "text-fl-muted line-through" : "text-fl-text"
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-fl-muted">{workout.equipment}</p>
        <StatsRow
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
          className="mt-1"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-fl-border px-3 py-1.5 text-xs font-semibold text-fl-text transition hover:border-fl-muted"
        >
          View Details
        </Link>
        {showMarkDone && (
          <button
            type="button"
            onClick={onMarkDone}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              done
                ? "bg-fl-surface-2 text-fl-muted"
                : "bg-fl-accent text-black hover:brightness-95"
            }`}
          >
            <Check size={14} strokeWidth={3} />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="rounded-full border border-fl-border p-1.5 text-fl-muted transition hover:border-red-400 hover:text-red-400"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
