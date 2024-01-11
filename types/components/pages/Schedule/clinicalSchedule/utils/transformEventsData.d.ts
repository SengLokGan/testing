import { ClinicalEvent } from '@types';
export declare const transformEventsData: (events: ClinicalEvent[]) => {
  [key: number]: {
    [key: string]: ClinicalEvent[];
  };
};
