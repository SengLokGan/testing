/// <reference types="react" />
import type { MedicationResponse } from '@types';
export type MedicationsExpandableRowProps = MedicationResponse;
export declare const MedicationsExpandableRow: ({
  doctor,
  frequency,
  duration,
  status,
  ...medication
}: MedicationsExpandableRowProps) => JSX.Element;
