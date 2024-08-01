import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatient, Patient, NonSensitivePatient } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getNoSsnPatient = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, findById, getNoSsnPatient, addPatient };