import express from "express";
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

app.post("/exercises", ({ body }: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.send(parseInputCalculateExercises(body?.target, body?.daily_exercises));
  } catch (error) {
    res.send(error);
  }
});

app.listen(3000);
