import express, {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";

// type
interface habits {
  id: number;
  name: string;
  completed: boolean;
}

// habit data
let habits: habits[] = [
  { id: 1, name: "fake-habit-1", completed: true },
  { id: 2, name: "fake-habit-2", completed: false },
  { id: 3, name: "fake-habit-3", completed: true },
];

const router = Router();

router.use(express.json());

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request received for habits route: ${req.method} ${req.url}`);
  next();
});

// GET - Retrieve all habits
router.route("/").get((req, res) => {
  res.json(habits);
});

// GET - Retrieve a specific habit (unsure if this is applicable)
router.route("/:id").get((req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.status(404).json({ message: "Habit not found" });

  const habit = habits.find((h) => h.id === id);

  if (!habit) return res.status(404).json({ message: "Habit not found!!" });

  res.json(habit);
});

// POST - Create new habit
router.route("/").post((req, res) => {
  const newHabit = {
    id: habits.length + 1,
    name: req.body.name,
    completed: false,
  };

  habits.push(newHabit);

  res.status(201).json(newHabit);
});

// PUT - Update new habit
router.route("/:id").put((req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.status(404).json({ message: "Habit not found" });

  const habit = habits.find((h) => h.id === parseInt(req.params.id));

  if (!habit) return res.status(404).json({ message: "Habit not found" });

  habit.name = req.body.name;
  habit.completed = req.body.completed;

  res.json(habit);
});

// DELETE - Delete a habit
router.route("/:id").delete((req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.status(404).json({ message: "Habit not found" });

  const index = habits.findIndex((h) => h.id === id);

  if (index === -1) return res.status(404).json({ message: "Habit not found" });

  const deletedHabit = habits.splice(index, 1);

  res.json(deletedHabit[0]);
});

export default router;
