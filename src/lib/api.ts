import { Workout } from "./types";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";


export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to load workouts (status ${res.status})`);
  }

  const data = (await res.json()) as Workout[];
  return data;
}


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
