import type { Workout } from "@habit-tracker/shared";

// URLs

const workoutsUrl = "http://localhost:3001/workouts";

// handlers for /workouts

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(workoutsUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok)
    throw new Error(`Error ${res.status}. GET request to /workouts.`);
  return res.json();
}

export async function postWorkouts(workouts: Workout[]): Promise<Workout[]> {
  const res = await fetch(workoutsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workouts: workouts }),
  });

  if (!res.ok)
    throw new Error(`Error ${res.status}. POST request to /workouts`);
  return res.json();
}
