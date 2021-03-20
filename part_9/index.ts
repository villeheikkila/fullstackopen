const express = require("express");
const app = express();
import { Request, Response } from "express";

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.listen(3000);
