import { useState, useEffect } from 'react';
import { getAllWorkouts, postWorkouts } from '../api';
import type { Workout } from '@workout-tracker/shared';

export default function useWorkouts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function fetchWorkouts() {
    try {
      setLoading(true);
      const res = await getAllWorkouts();
      setWorkouts(res);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown Error")
      }
    } finally {
      setLoading(false);
    }
  }

  async function addWorkouts(data: Workout[]) {
    try {
      setLoading(true);
      const res = await postWorkouts(data);
      setWorkouts(res);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown Error");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    workouts,
    fetchWorkouts,
    addWorkouts,
  }
}
