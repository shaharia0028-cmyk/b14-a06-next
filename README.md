# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts, drill into a detailed exercise page, and build out "today's plan" — a capped, five-lift daily workout list — while bookmarking others to do later. Everything you add persists across page reloads.

## Technologies Used

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **DaisyUI**
- **React Context API** (for Today's Plan / Saved tab state)
- **React Toastify** (toast notifications)
- **Lucide React** (icons)
- **localStorage** (client-side persistence)

## Features

1. **Responsive workout library** — All exercises are fetched live from the FitLog API and rendered as a 3-column grid on desktop that collapses gracefully on tablet and mobile.
2. **Detailed workout pages** — Each lift has its own page with a full spec sheet (equipment, difficulty, sets, reps, duration, calories, rating) and step-by-step instructions.
3. **Today's Plan & Saved tabs (Context API)** — A shared `PlanContext` tracks which workouts are added to today's plan or saved for later, with a live-updating navbar badge for each.
4. **Live metrics dashboard** — The My Plan page shows exercise count, total minutes, and total calories that update instantly as items are added, removed, or marked done.
5. **Sort by duration, calories, or rating** — Both the library and My Plan lists can be re-sorted on the fly via a dropdown.
6. **Mark as done / remove workouts** — Each planned workout can be checked off or removed directly from its card, with toast confirmation for every action.
7. **Persistent state** — Today's Plan and Saved lists are saved to `localStorage`, so your plan survives a page refresh.
8. **Custom loading & 404 states** — A styled loading spinner while data fetches, and a branded 404 page for unknown routes.
9. **Plan cap enforcement** — Today's Plan is capped at five lifts; the "Add to today's plan" button disables once the cap is hit.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.