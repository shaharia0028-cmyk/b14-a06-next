"use client";

import { useEffect, useMemo, useState } from "react";
import { getWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import Spinner from "@/components/Spinner";

const sortComparators: Record<SortKey, (a: Workout, b: Workout) => number> = {
  duration: (a, b) => a.duration - b.duration,
  calories: (a, b) => a.caloriesBurned - b.caloriesBurned,
  rating: (a, b) => b.rating - a.rating,
};

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  useEffect(() => {
    let cancelled = false;

    getWorkouts()
      .then((data) => {
        if (!cancelled) {
          setWorkouts(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const sortedWorkouts = useMemo(
    () => [...workouts].sort(sortComparators[sortKey]),
    [workouts, sortKey]
  );

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl tracking-wide text-fl-text sm:text-3xl">
              THE LIBRARY
            </h2>
            <p className="mt-1 text-sm text-fl-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          {status === "ready" && (
            <SortDropdown value={sortKey} onChange={setSortKey} />
          )}
        </div>

        {status === "loading" && <Spinner label="Loading workouts…" />}

        {status === "error" && (
          <div className="rounded-2xl border border-fl-border bg-fl-surface p-8 text-center text-sm text-fl-muted">
            Couldn&apos;t load the workout library right now. Please refresh
            the page to try again.
          </div>
        )}

        {status === "ready" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
