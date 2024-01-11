/// <reference types="react" />
import { LabOrdersFilters } from '@types';
type ControlButtonsProps = {
  notClearableFields?: (keyof LabOrdersFilters)[];
};
export declare const ControlButtons: ({ notClearableFields }: ControlButtonsProps) => JSX.Element;
export {};
