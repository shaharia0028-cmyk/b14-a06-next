import { Workout } from "./types";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetches the full list of workouts from the FitLog API.
 * Throws on a non-OK response so callers can render an error state.
 */
export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to load workouts (status ${res.status})`);
  }

  const data = (await res.json()) as Workout[];
  return data;
}

/**
 * Fetches a single workout by id. Returns null when the workout
 * cannot be found (404) so pages can render Next.js's not-found UI.
 */
export async function getWorkoutById(id: string): Promise<Workout | null> {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to load workout ${id} (status ${res.status})`);
  }

  const data = (await res.json()) as Workout;
  return data;
}
