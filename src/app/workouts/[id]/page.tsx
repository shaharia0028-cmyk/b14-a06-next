import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutDetailActions from "@/components/WorkoutDetailActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating.toFixed(1) },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-fl-surface-2 sm:h-96 lg:h-full lg:min-h-[420px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="font-display text-3xl tracking-wide text-fl-text uppercase sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 max-w-lg text-sm text-fl-muted sm:text-base">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-fl-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-6 divide-y divide-fl-border rounded-2xl border border-fl-border bg-fl-surface">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <dt className="font-semibold uppercase tracking-wide text-fl-muted">
                  {spec.label}
                </dt>
                <dd className="text-fl-text">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <h2 className="font-display text-lg tracking-wide text-fl-text">
              INSTRUCTIONS
            </h2>
            <ol className="mt-3 space-y-2 text-sm text-fl-muted">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="font-display text-fl-accent">
                    {index + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <WorkoutDetailActions workout={workout} />
          </div>
        </div>
      </div>
    </section>
  );
}
