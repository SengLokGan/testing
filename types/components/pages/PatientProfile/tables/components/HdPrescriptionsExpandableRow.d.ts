/// <reference types="react" />
import { HdPrescription } from '@types';
export type HdPrescriptionsExpandableRowProps = HdPrescription;
export declare const HdPrescriptionsExpandableRow: ({
  enteredAt,
  prescriptionDate,
  ...prescription
}: HdPrescriptionsExpandableRowProps) => JSX.Element;
