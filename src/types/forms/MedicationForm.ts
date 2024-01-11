import type { AutocompleteFreeSoloAsyncOptionType, MedicationFrequencyFormValue } from '@types';
import {
  DoctorSpecialities,
  MedicationPlaces,
  MedicationDurationTypes,
  MedicationFrequencyLabel,
  MedicationFrequency,
} from '@enums';

export type Option = {
  label: string;
  value: string;
};

export type MedicationFrequencyType = { label: MedicationFrequencyLabel; value: MedicationFrequency };

export type DoctorsNameAutocompleteFreeSoloAsyncOptionType = AutocompleteFreeSoloAsyncOptionType & {
  specialities?: { id: number; name: DoctorSpecialities }[];
};

export interface MedicationForm {
  id: string;
  place: MedicationPlaces;
  nameDrug: {
    uid: string;
    label: string;
    description: string;
  };
  medicationGroup: Option | string;
  route: Option | string;
  amount: string;
  amounts: number[];
  frequencyLongTerm: MedicationFrequencyFormValue;
  frequencyDialysisRelated?: string;
  day: string;
  meal: Option | string;
  prescriptionDate: string | null | Date;
  durationType: MedicationDurationTypes;
  startDate: string | null | Date;
  visitsAmount: number;
  dueDate: string | null | Date;
  doctorsName: DoctorsNameAutocompleteFreeSoloAsyncOptionType;
  doctorsSpecialityText: string;
  doctorsSpecialitySelect: number;
  comments: string;
}
