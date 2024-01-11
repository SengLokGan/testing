import { PatientCensusReportContent } from '@types';
import { PatientCensusFilters, PatientCensusFiltersChipsCountersPayload } from '@types';
import { PatientCensusIsolationFilter, PatientCensusStatusFilter } from '@enums';
export declare const convertPatientCensusDataToTableFormat: (data: PatientCensusReportContent[]) => {
  patient: {
    name: string;
    id: number;
  };
  address: string;
  age: string;
  gender: string;
  race: string;
  religion: string;
  diagnosis: string;
  virology: string[];
  treatmentReferral: string;
  createdAt: string;
  status: string;
  modifiedAt: string;
  previousStatus: string;
  id: number;
  documentNumber: string;
  phone: string;
}[];
export declare const setPatientCensusBadges: (
  data: PatientCensusFiltersChipsCountersPayload,
  filters: PatientCensusFilters,
) => {
  isolations: {
    badge: string;
    name: PatientCensusIsolationFilter;
    selected: boolean;
  }[];
  statuses: {
    badge: string;
    name: PatientCensusStatusFilter;
    selected: boolean;
  }[];
  date: Date | null;
};
