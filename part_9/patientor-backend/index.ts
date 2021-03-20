import express from "express";
import cors from "cors";

import diagnosesJSON from "./data/diagnoses.json";
import patientsJSON from "./data/patients.json";

const tempPatients: Patient[] = [...patientsJSON];

import { v1 as uuid } from "uuid";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  const diagnoses: Diagnose[] = diagnosesJSON;
  res.send(diagnoses);
});

const getNonSensitiveEntriesFromPatient = (
  patients: Patient[]
): Omit<Patient, "ssn">[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

app.get("/api/patients", (_req, res) => {
  res.send(getNonSensitiveEntriesFromPatient(tempPatients));
});

const createPatient = (patient: Omit<Patient, "id">): Patient => {
  const id = uuid();
  const newPatient = { id, ...patient };
  tempPatients.push(newPatient);

  return newPatient;
};

app.post("/api/patients", ({ body }, res) => {
  res.send(createPatient(body));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
