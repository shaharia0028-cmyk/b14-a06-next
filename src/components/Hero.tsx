import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-2 lg:px-8">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-fl-accent">
          WORKOUT LIBRARY
        </p>
        <h1 className="font-display text-4xl leading-tight text-fl-text sm:text-5xl lg:text-6xl">
          TRAIN WITH INTENT.
          <br />
          LOG EVERY SET.
        </h1>
        <p className="mt-4 max-w-md text-sm text-fl-muted sm:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-fl-accent px-5 py-3 text-sm font-bold tracking-wide text-black transition hover:brightness-95"
        >
          <Dumbbell size={18} strokeWidth={2.5} />
          BROWSE WORKOUTS
        </a>
      </div>
      <div className="relative mx-auto h-64 w-full max-w-md sm:h-80">
        <Image
          src="/banner.png"
          alt="Illustration of a gym-goer with equipment"
          fill
          priority
          className="object-contain"
        />
      </div>
    </section>
  );
}
