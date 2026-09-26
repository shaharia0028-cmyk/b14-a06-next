export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export type SortKey = "duration" | "calories" | "rating";

export type PlanTab = "today" | "saved";

export interface PlanItem {
  workout: Workout;
  done: boolean;
}
