export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  female = "female",
  male = "male",
}

export type BirthDate = `${number}-${number}-${number}`;

export interface BaseEntry {
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

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  id: string;
  discharge: Discharge;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: BirthDate;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
