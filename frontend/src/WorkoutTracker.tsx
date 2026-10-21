import { useState } from 'react';
import CsvExport from './components/CsvExport';
import { type Workout } from '@workout-tracker/shared';
import useWorkouts from './hooks/useWorkouts';

const columnLabels: Record<keyof Workout, string> = {
  title: "Title",
  start_time: "Start Time",
  end_time: "End Time",
  description: "Description",
  exercise_title: "Exercise Title",
  superset_id: "Superset ID",
  exercise_notes: "Exercise Notes",
  set_index: "Set Index",
  set_type: "Set Type",
  weight_lbs: "Weights (lbs)",
  reps: "Reps",
  distance_km: "Distance (km)",
  duration_seconds: "Duration (s)",
}

const keys = Object.keys(columnLabels) as (keyof Workout)[];

export default function WorkoutTracker() {

  const {
    loading,
    error,
    workouts,
    addWorkouts,
  } = useWorkouts();

  return (
    <div>
      <CsvExport onSet={addWorkouts} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        error ? (<div>Error loading...</div>) :
          (
            <table>
              <thead>
                <tr>
                  {keys.map((k) => (<th key={k}>{columnLabels[k]}</th>))}
                </tr>
              </thead>
              <tbody>
                {(workouts.length > 0) && (
                  workouts.map((w, i) =>
                  (
                    <tr key={i}>
                      {keys.map((k) => (
                        <td key={k}>{w[k]}</td>
                      ))}
                    </tr>
                  )))}
              </tbody>
            </table>
          ))}
    </div>
  )
}
