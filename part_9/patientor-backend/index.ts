import express from "express";
import cors from "cors";

import diagnosesJSON from "./data/diagnoses.json";
import patientsJSON from "./data/patients.json";

const tempPatients: Patient[] = [...(patientsJSON as Patient[])];

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

enum Gender {
  female = "female",
  male = "male",
}

type BirthDate = `${number}-${number}-${number}`;

export interface Entry {}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: BirthDate;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  const diagnoses: Diagnose[] = diagnosesJSON;
  res.send(diagnoses);
});

const parseGender = (gender: unknown): Gender => {
  if (gender === "male") {
    return Gender.male;
  }

  if (gender === "female") {
    return Gender.female;
  }

  throw new Error("Gender can only be female or male, it was " + gender);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseDateOfBirth = (dateOfBirth: unknown): BirthDate => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }

  const splitDateOfBirth = dateOfBirth.split("-");

  if (splitDateOfBirth.length !== 3) {
    throw new Error("Date is in incorrect format");
  }

  const dateInNumbers = splitDateOfBirth.map((e) => parseInt(e));

  if (dateInNumbers.some((e) => isNaN(e))) {
    throw new Error("Date is in incorrect format");
  }

  return `${dateInNumbers[0]}-${dateInNumbers[1]}-${dateInNumbers[2]}` as BirthDate;
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

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  ssn: unknown;
  occupation: unknown;
};

const parseValidPatient = (
  object: Fields
): Omit<Patient, "id" | "entries"> => ({
  name: parseName(object.name),
  dateOfBirth: parseDateOfBirth(object.dateOfBirth),
  gender: parseGender(object.gender),
  ssn: parseSSN(object.ssn),
  occupation: parseOccupation(object.occupation),
});

app.get("/api/patients", (_req, res) => {
  res.send(getNonSensitiveEntriesFromPatient(tempPatients));
});

const createPatient = (patient: Omit<Patient, "id" | "entries">): Patient => {
  const id = uuid();
  const entries: string[] = [];
  const newPatient = { id, ...patient, entries };
  tempPatients.push(newPatient);

  return newPatient;
};

app.get("/api/patients/:id", (req, res) => {
  const id = req.params.id;
  const patientById = tempPatients.find((patient) => patient.id === id);
  res.send(patientById);
});

app.post("/api/patients", ({ body }, res) => {
  try {
    const parsedPatient = parseValidPatient(body);
    const createdPatient = createPatient(parsedPatient);
    res.send(createdPatient);
  } catch (error) {
    console.log("error: ", error);
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
