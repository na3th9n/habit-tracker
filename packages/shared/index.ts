import * as z from "zod";

// Schemas

const Workout = z.object({
  title: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  description: z.string(),
  exercise_title: z.string(),
  superset_id: z.string(),
  exercise_notes: z.string(),
  set_index: z.string(),
  set_type: z.string(),
  weight_lbs: z.string(),
  reps: z.string(),
  distance_km: z.string(),
  duration_seconds: z.string(),
});

// Inferred Exported Types

export type Workout = z.infer<typeof Workout>;
