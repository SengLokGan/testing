import { MedicationFrequencyFormValue, MedicationFrequencySubmitValue } from '@types';
export declare const parseFrequencyToSubmit: (
  frequency: MedicationFrequencyFormValue | string,
) => MedicationFrequencySubmitValue | undefined;
