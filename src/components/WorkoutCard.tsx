import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-fl-border bg-fl-surface transition hover:border-fl-accent/60"
    >
      <div className="relative h-44 w-full overflow-hidden bg-fl-surface-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-fl-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black"
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <h3 className="font-display text-base tracking-wide text-fl-text uppercase">
            {workout.name}
          </h3>
          <p className="mt-0.5 text-xs text-fl-muted">{workout.equipment}</p>
        </div>
        <StatsRow
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
          className="mt-auto"
        />
      </div>
    </Link>
  );
}
