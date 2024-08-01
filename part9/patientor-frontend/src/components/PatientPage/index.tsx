import { Patient, Entry, Diagnosis} from "./types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import HealthRatingBar from "../HealthRatingBar";

import { Box, Typography } from '@mui/material';
import { HealthCheckRating } from '../../types';

interface Props {
  patient: Patient | null | undefined
  diagnoses: Diagnosis
}

const HealthRating = (health: HealthCheckRating) => {
  switch (health) {
    case 0:
      return <FavoriteIcon style={{color: 'green'}} />;
    case 1:
      return <FavoriteIcon style={{color: 'yellow'}} />;
    case 2:
      return <FavoriteIcon style={{color: 'orange'}} />;
    case 3:
      return <FavoriteIcon style={{color: 'red'}} />;
    default:
      return null;
  }
};

const EntryDetails = ({entry}: {entry: Entry}) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <div>
          {entry.date} <MedicalServicesIcon/> <br/>
          <i>{entry.description}</i> <br/>
          {HealthRating(entry.healthCheckRating)}
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          {entry.date} <WorkIcon/> {entry.employerName}
          <br/>
          <i>{entry.description}</i> <br/>
        </div>
      );
    case 'Hospital':
      return (
        <div>
          {entry.date} <MedicalServicesIcon/> <br/>
          <i>{entry.description}</i> <br/>
          {entry.discharge.date} {entry.discharge.criteria}
        </div>
      );
    default:
      return null;
  }
};


const PatientPage = ({patient, diagnoses}: Props) => {
  console.log(patient); 
 if (!patient) {
    return null;
  }
  return (
  <Box>
    <Typography variant="h6" fontWeight="bold">{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />} </Typography>
    <div>ssn: {patient?.ssn} <br/>
    occupation: {patient?.occupation}</div>
    <h3>entries</h3>
    {patient.entries.map((entry: Entry) => (
      <div key={entry.id}>
        <Box sx={{border: 2, padding: 1, margin:1, borderRadius: 2}}>
      <EntryDetails entry={entry} />
      <div>

      {entry.diagnosisCodes?.map((code: string) => {
        const diagnosis = diagnoses.find(d => d.code === code);
        return (
          <li key={code}>{code} {diagnosis.name}</li>
        );
      }
      
      )}
      
      </div>
      diagnose by {entry.specialist}

      </Box>
      
      </div>
      
    ))}
    </Box>

);  
};

export default PatientPage;