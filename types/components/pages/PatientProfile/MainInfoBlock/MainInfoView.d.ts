/// <reference types="react" />
import type { Patient } from '@types';
type MainInfoProps = {
  patient: Partial<Patient>;
};
export declare const MainInfoView: ({ patient }: MainInfoProps) => JSX.Element;
export {};
