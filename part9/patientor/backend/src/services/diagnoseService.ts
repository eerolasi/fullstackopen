import diagnosesData from '../../data/diagnoses'

import { Diagnose } from '../types'

const diagnoses: Diagnose[] = diagnosesData;

const getDiagnoses = (): Diagnose[] => {
  console.log(diagnoses)
  return diagnoses
}

export default { getDiagnoses }