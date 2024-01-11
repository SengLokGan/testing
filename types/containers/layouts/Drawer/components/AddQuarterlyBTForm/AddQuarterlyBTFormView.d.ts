/// <reference types="react" />
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import { QuarterlyBtFormType } from '@types';
type QuarterlyBtFormViewProps = {
  control: Control<QuarterlyBtFormType>;
  watch: UseFormWatch<QuarterlyBtFormType>;
  setPatientOptions: (
    options: {
      id: string;
      name: string;
      hasQuarterlyLabOrder: boolean;
    }[],
  ) => void;
  patientQuarterlyBTPlanId: string | null;
  disabledPatient: boolean;
};
export declare const AddQuarterlyBTFormView: ({
  control,
  watch,
  setPatientOptions,
  patientQuarterlyBTPlanId,
  disabledPatient,
}: QuarterlyBtFormViewProps) => JSX.Element;
export {};
