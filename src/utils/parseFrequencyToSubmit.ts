import { MedicationFrequencyFormValue, MedicationFrequencySubmitValue } from '@types';
import { MedicationFrequency } from '@enums';

export const parseFrequencyToSubmit = (
  frequency: MedicationFrequencyFormValue | string,
): MedicationFrequencySubmitValue | undefined => {
  if (typeof frequency === 'string') {
    return { code: frequency as MedicationFrequency };
  }
  if (typeof frequency === 'object') {
    if (frequency.value === MedicationFrequency.OTHER || !Object.keys(MedicationFrequency).includes(frequency.value)) {
      return { code: MedicationFrequency.OTHER, extValue: frequency.label };
    }
    return { code: frequency.value as MedicationFrequency };
  }
};
