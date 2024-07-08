import { Gender, NewPatient } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};


const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrent or missing name')
  }
  return name
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrent or missing date: ' + date)
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrent or missing name')
  }
  return ssn
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrent or missing name')
  }
  return occupation
}


const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    }

    return newPatient
  }
  throw new Error('Incorrect data: some fields are missing')
};

export default toNewPatient;