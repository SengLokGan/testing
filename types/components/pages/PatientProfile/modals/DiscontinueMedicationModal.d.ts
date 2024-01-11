/// <reference types="react" />
import type { Medication } from '@types';
type DiscontinueMedicationModalProps = {
  onClose: () => void;
  medication: Medication;
  medicationId: string;
  prescriptionDate: Date | string;
};
export declare const DiscontinueMedicationModal: ({
  onClose,
  medication,
  medicationId,
  prescriptionDate,
}: DiscontinueMedicationModalProps) => JSX.Element;
export {};
