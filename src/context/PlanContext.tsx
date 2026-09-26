"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import { PlanItem, Workout } from "@/lib/types";

const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog:plan-state:v1";

interface StoredState {
  today: PlanItem[];
  saved: PlanItem[];
}

interface PlanContextValue {
  today: PlanItem[];
  saved: PlanItem[];
  activeTab: "today" | "saved";
  setActiveTab: (tab: "today" | "saved") => void;
  isHydrated: boolean;
  planCount: number;
  savedCount: number;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isPlanFull: boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromToday: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

function readStoredState(): StoredState {
  if (typeof window === "undefined") {
    return { today: [], saved: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { today: [], saved: [] };
    const parsed = JSON.parse(raw) as StoredState;
    return {
      today: Array.isArray(parsed.today) ? parsed.today : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return { today: [], saved: [] };
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [today, setToday] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted plan/saved data once on mount (client only). This runs
  // after the server-rendered markup hydrates, so the initial render always
  // matches the server and localStorage is only ever touched on the client.
  useEffect(() => {
    const stored = readStoredState();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from an external system (localStorage) on mount, not derived from props/state
    setToday(stored.today);
    setSaved(stored.saved);
    setIsHydrated(true);
  }, []);

  // Persist whenever plan/saved change, after the initial hydration.
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ today, saved })
      );
    } catch {
      // Storage can fail (private mode, quota). Non-fatal for the app.
    }
  }, [today, saved, isHydrated]);

  const isInPlan = (id: number) => today.some((item) => item.workout.id === id);
  const isSaved = (id: number) => saved.some((item) => item.workout.id === id);
  const isPlanFull = today.length >= PLAN_LIMIT;

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      toast.info("Already in today's plan");
      return;
    }
    if (isPlanFull) {
      toast.warn("Today's plan is full — finish or remove a lift first.");
      return;
    }
    setToday((prev) => [...prev, { workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout: Workout) => {
    if (isSaved(workout.id)) {
      toast.info("Already saved");
      return;
    }
    setSaved((prev) => [...prev, { workout, done: false }]);
    toast.success("Saved for later");
  };

  const removeFromToday = (id: number) => {
    setToday((prev) => prev.filter((item) => item.workout.id !== id));
    toast.info("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.workout.id !== id));
    toast.info("Removed from saved");
  };

  const markDone = (id: number) => {
    setToday((prev) =>
      prev.map((item) =>
        item.workout.id === id ? { ...item, done: !item.done } : item
      )
    );
    toast.success("Marked as done");
  };

  const value: PlanContextValue = {
    today,
    saved,
    activeTab,
    setActiveTab,
    isHydrated,
    planCount: today.length,
    savedCount: saved.length,
    isInPlan,
    isSaved,
    isPlanFull,
    addToPlan,
    addToSaved,
    removeFromToday,
    removeFromSaved,
    markDone,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return ctx;
}
