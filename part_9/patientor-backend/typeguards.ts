import {
  BirthDate,
  Discharge,
  Entry,
  Gender,
  Patient,
  SickLeave,
} from "./types";

export const parseEntry = (object: {
  type: unknown;
  description: unknown;
  id: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
}): Entry => {
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

export const parseValidPatient = (object: {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  ssn: unknown;
  occupation: unknown;
}): Omit<Patient, "id" | "entries"> => ({
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

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

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

const parseGender = (gender: unknown): Gender => {
  if (gender === "male") {
    return Gender.male;
  }

  if (gender === "female") {
    return Gender.female;
  }

  throw new Error("Gender can only be female or male, it was " + gender);
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
