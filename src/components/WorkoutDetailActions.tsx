"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull } = usePlan();

  const alreadyPlanned = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const disablePlanButton = alreadyPlanned || (isPlanFull && !alreadyPlanned);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={disablePlanButton}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-fl-accent px-5 py-3 text-sm font-bold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CalendarPlus size={18} strokeWidth={2.5} />
        {alreadyPlanned ? "In Today's Plan" : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={() => addToSaved(workout)}
        disabled={alreadySaved}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-fl-border px-5 py-3 text-sm font-semibold text-fl-text transition hover:border-fl-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Bookmark size={18} />
        {alreadySaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
