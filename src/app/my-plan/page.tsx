"use client";

import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";
import { SortKey, Workout } from "@/lib/types";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import EmptyState from "@/components/EmptyState";
import SortDropdown from "@/components/SortDropdown";
import SearchInput from "@/components/SearchInput";
import Spinner from "@/components/Spinner";

const sortComparators: Record<SortKey, (a: Workout, b: Workout) => number> = {
  duration: (a, b) => a.duration - b.duration,
  calories: (a, b) => a.caloriesBurned - b.caloriesBurned,
  rating: (a, b) => b.rating - a.rating,
};

export default function MyPlanPage() {
  const {
    today,
    saved,
    activeTab,
    setActiveTab,
    isHydrated,
    removeFromToday,
    removeFromSaved,
    markDone,
  } = usePlan();
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  const activeList = activeTab === "today" ? today : saved;

  const totalMinutes = activeList.reduce(
    (sum, item) => sum + item.workout.duration,
    0
  );
  const totalCalories = activeList.reduce(
    (sum, item) => sum + item.workout.caloriesBurned,
    0
  );

  const sortedList = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? activeList.filter(
          (item) =>
            item.workout.name.toLowerCase().includes(q) ||
            item.workout.muscleGroups.some((tag) =>
              tag.toLowerCase().includes(q)
            )
        )
      : activeList;
    return [...filtered].sort((a, b) =>
      sortComparators[sortKey](a.workout, b.workout)
    );
  }, [activeList, sortKey, query]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl tracking-wide text-fl-text sm:text-4xl">
        MY PLAN
      </h1>
      <p className="mt-1 text-sm text-fl-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-fl-border bg-fl-surface p-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-fl-muted">
            Exercises
          </p>
          <p className="font-display text-2xl text-fl-accent sm:text-3xl">
            {activeList.length}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-fl-muted">
            Minutes
          </p>
          <p className="font-display text-2xl text-fl-text sm:text-3xl">
            {totalMinutes}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-fl-muted">
            Calories
          </p>
          <p className="font-display text-2xl text-fl-text sm:text-3xl">
            {totalCalories}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 rounded-full border border-fl-border p-1">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              activeTab === "today"
                ? "bg-fl-accent text-black"
                : "text-fl-muted hover:text-fl-text"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              activeTab === "saved"
                ? "bg-fl-accent text-black"
                : "text-fl-muted hover:text-fl-text"
            }`}
          >
            Saved
          </button>
        </div>

        {isHydrated && activeList.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput value={query} onChange={setQuery} />
            <SortDropdown value={sortKey} onChange={setSortKey} />
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {!isHydrated && <Spinner label="Loading workouts…" />}

        {isHydrated && activeList.length === 0 && <EmptyState />}

        {isHydrated && activeList.length > 0 && sortedList.length === 0 && (
          <div className="rounded-2xl border border-fl-border bg-fl-surface p-8 text-center text-sm text-fl-muted">
            No workouts match &quot;{query}&quot;.
          </div>
        )}

        {isHydrated &&
          sortedList.map((item) => (
            <PlanWorkoutCard
              key={item.workout.id}
              item={item}
              showMarkDone={activeTab === "today"}
              onMarkDone={() => markDone(item.workout.id)}
              onRemove={() =>
                activeTab === "today"
                  ? removeFromToday(item.workout.id)
                  : removeFromSaved(item.workout.id)
              }
            />
          ))}
      </div>
    </section>
  );
}