import express from "express";
import cors from "cors";
import { v1 as uuid } from "uuid";

import { parseEntry, parseValidPatient } from "./typeguards";
import { Diagnose, Entry, Patient, PublicPatient } from "./types";

import diagnosesJSON from "./data/diagnoses.json";
import patientsJSON from "./data/patients.json";

const tempPatients: Patient[] = [...(patientsJSON as Patient[])];
const diagnoses: Diagnose[] = [...diagnosesJSON];

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

const createPatient = (patient: Omit<Patient, "id" | "entries">): Patient => {
  const newPatient = { id: uuid(), ...patient, entries: [] as Entry[] };
  tempPatients.push(newPatient);
  return newPatient;
};

const getNonSensitiveEntriesFromPatient = (
  patients: Patient[]
): PublicPatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(diagnosesJSON as Diagnose[]);
});

app.get("/api/patients", (_req, res) => {
  res.send(getNonSensitiveEntriesFromPatient(tempPatients));
});

app.get("/api/patients/:id", (req, res) => {
  res.send(tempPatients.find((patient) => patient.id === req.params.id));
});

app.post("/api/patients/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const patientIndex = tempPatients.findIndex((patient) => patient.id === id);
    if (patientIndex === -1) throw "Patient doesn't exist";

    const { entries, ...rest } = tempPatients[patientIndex];
    const newEntry = parseEntry({ ...req.body, id: uuid() });

    const updatedPatient = { ...rest, entries: [...entries, newEntry] };
    tempPatients[patientIndex] = updatedPatient;

    res.send(newEntry);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/diagnosis", (_req, res) => {
  res.send(diagnoses);
});

app.post("/api/patients", ({ body }, res) => {
  try {
    const createdPatient = createPatient(parseValidPatient(body));
    res.send(createdPatient);
  } catch (error) {
    console.error("error: ", error);
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
