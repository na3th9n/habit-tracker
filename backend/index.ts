import express, { type ErrorRequestHandler } from "express";
import habitsRouter from "./habits.js";

// Create the express application

const app = express();

const port = process.env.PORT || 3001;

// Middleware Functions

// Error Handlers

function errorHandler(err, req, res, next): ErrorRequestHandler {
  console.error(err.stack);
  res.status(500).send("Something went wrong! Error 500");
}

// Middleware (Application Level)
// routes can have their own middleware

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Application level request received: ${req.method} ${req.url}`);
  next();
});

// Route handlers

app.get("/", (req, res) => {
  res.send("Root response");
});

app.get("/error", (req, res) => {
  throw new Error("Fake error");
});

app.use("/habits", habitsRouter);

// Initiate Error Handling

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
