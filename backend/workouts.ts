import express, {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import type { Workout } from "@workout-tracker/shared";

// initial data
let workouts: Workout[] = [];

const router = Router();

router.use(express.json());

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request received for workouts route: ${req.method} ${req.url}`);
  next();
});

// GET - Retrieve all workouts
router.route("/").get((req, res) => {
  res.json(workouts);
});

// POST - Add ALL workouts
router.route("/").post((req, res) => {
  workouts.push(req.body.workouts);

  res.status(201).json(workouts);
});

export default router;
