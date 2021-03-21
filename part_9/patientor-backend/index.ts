import express from "express";
import cors from "cors";

import diagnosesJSON from "./data/diagnoses.json";
import patientsJSON from "./data/patients.json";

const tempPatients: Patient[] = [...(patientsJSON as Patient[])];
const diagnoses: Diagnose[] = [...diagnosesJSON];

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

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  id: string;
  discharge: Discharge;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry;

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

const parseEntryType = (type: unknown) => {
  if (type === "OccupationalHealthcare") {
    return "OccupationalHealthcare" as const;
  } else if (type === "Hospital") {
    return "Hospital" as const;
  } else {
    throw "No valid entry type found";
  }
};

interface BaseEntryFields {
  type: unknown;
  description: unknown;
  id: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
}

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error("Incorrect or missing id");
  }

  return id;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }

  return criteria;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }

  return employerName;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!(typeof discharge === "object" && discharge !== null)) {
    throw new Error("Incorrect or missing discharge");
  }

  if (!("date" in discharge && "criteria" in discharge)) {
    throw new Error("Discharge object doesn't include the required fields");
  }

  const dischargeObject = discharge as { date: unknown; criteria: unknown };

  return {
    criteria: parseCriteria(dischargeObject.criteria),
    date: parseDate(dischargeObject.date),
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!(typeof sickLeave === "object" && sickLeave !== null)) {
    throw new Error("Incorrect or missing sick leave property");
  }

  if (!("startDate" in sickLeave && "endDate" in sickLeave)) {
    throw new Error("sick leave object doesn't include the required fields");
  }

  const sickLeaveObject = sickLeave as { date: unknown; criteria: unknown };

  return {
    startDate: parseCriteria(sickLeaveObject.criteria),
    endDate: parseDate(sickLeaveObject.date),
  };
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (codes === undefined) return [] as string[];

  if (Array.isArray(codes) === false) {
    throw new Error("Diagnosis codes should be either undefined or an array");
  }

  if (!(codes as string[]).every((code) => isString(code))) {
    throw new Error("All codes must be strings");
  }

  return codes as string[];
};

const parseEntry = (object: BaseEntryFields): Entry => {
  const commonProperties = {
    type: parseEntryType(object.type),
    id: parseId(object.id),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  switch (commonProperties.type) {
    case "Hospital": {
      return {
        ...commonProperties,
        type: "Hospital",
        discharge: parseDischarge(object?.discharge),
      };
    }
    case "OccupationalHealthcare": {
      return {
        ...commonProperties,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    }
  }
};

app.get("/api/patients", (_req, res) => {
  res.send(getNonSensitiveEntriesFromPatient(tempPatients));
});

const createPatient = (patient: Omit<Patient, "id" | "entries">): Patient => {
  const id = uuid();
  const entries: Entry[] = [];
  const newPatient = { id, ...patient, entries };
  tempPatients.push(newPatient);

  return newPatient;
};

app.get("/api/patients/:id", (req, res) => {
  const id = req.params.id;
  const patientById = tempPatients.find((patient) => patient.id === id);
  res.send(patientById);
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
    const parsedPatient = parseValidPatient(body);
    const createdPatient = createPatient(parsedPatient);
    res.send(createdPatient);
  } catch (error) {
    console.error("error: ", error);
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
