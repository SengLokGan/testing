import Stack from '@mui/material/Stack';
import { MainInformation } from './MainInformation';
import { Control, UseFormRegister, UseFormWatch } from 'react-hook-form/dist/types/form';
import { Address } from './Address';
import { AdditionalComments } from './AdditionalComment';
import { PatientStatuses } from '@enums';
import { RegisterPatientForm } from '@types';

type WalkInFormProps = {
  control: Control<RegisterPatientForm>;
  watch: UseFormWatch<RegisterPatientForm>;
  patientStatus: PatientStatuses;
  register: UseFormRegister<RegisterPatientForm>;
};

export const WalkInForm = ({ control, watch, patientStatus, register }: WalkInFormProps) => {
  return (
    <Stack spacing={6} direction="column" data-testid="walkinRegisterForm">
      <MainInformation control={control} watch={watch} patientStatus={patientStatus} register={register} />
      <AdditionalComments control={control} />
      <Address control={control} />
    </Stack>
  );
};
