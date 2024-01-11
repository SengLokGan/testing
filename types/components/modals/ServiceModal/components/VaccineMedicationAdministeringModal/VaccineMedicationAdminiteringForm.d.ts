/// <reference types="react" />
import { VaccinationMedicationAdministeringForm } from '@types';
import { Control, UseFormSetValue } from 'react-hook-form/dist/types/form';
import { VaccinationMedicationAdministeringStatus, VaccinationMedicationModalType } from '@enums/global';
interface VaccineMedicationAdministeringFormProps {
  control: Control<VaccinationMedicationAdministeringForm>;
  setValue: UseFormSetValue<VaccinationMedicationAdministeringForm>;
  status: VaccinationMedicationAdministeringStatus;
  isMedication: boolean;
  mode?: VaccinationMedicationModalType;
}
declare const VaccineMedicationAdministeringForm: ({
  control,
  status,
  setValue,
  isMedication,
  mode,
}: VaccineMedicationAdministeringFormProps) => JSX.Element;
export default VaccineMedicationAdministeringForm;
