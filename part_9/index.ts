const express = require("express");
const app = express();

app.use(express.json());

import { Request, Response } from "express";
import { parseAndCalculateBmi } from "./bmiCalculator";
import { parseInputCalculateExercises } from "./exerciseCalculator";

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", ({ query }: Request, res: Response) => {
  const weight = query.weight;
  const height = query.height;
  try {
    res.send({ weight, height, bmi: parseAndCalculateBmi(height, weight) });
  } catch {
    res.send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req: Request, res: Response) => {
  try {
    res.send(
      parseInputCalculateExercises(req.body.target, req.body.daily_exercises)
    );
  } catch (error) {
    res.send(error);
  }
});

app.listen(3000);
