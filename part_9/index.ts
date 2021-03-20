const express = require("express");
const app = express();
import { Request, Response } from "express";
import { parseAndCalculateBmi } from "./bmiCalculator";

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

app.listen(3000);
