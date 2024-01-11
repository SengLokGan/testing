/// <reference types="react" />
import type { Patient } from '@types';
type FamilyInfoProps = {
  patient: Partial<Patient>;
};
export declare const FamilyInfoView: ({ patient }: FamilyInfoProps) => JSX.Element;
export {};
