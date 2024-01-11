import {
  HospitalizationReportCountersResponse,
  HospitalizationReportFilters,
  HospitalizationResponseContentItem,
} from '@types';
export declare const setHospitalizationReasonsBadges: (
  data: HospitalizationReportCountersResponse,
  filters: HospitalizationReportFilters,
) => HospitalizationReportFilters;
export declare const convertHospitalizationReportDataToTableFormat: (data: HospitalizationResponseContentItem[]) => {
  reason: string;
  id: number;
  patient: {
    id: number;
    name: string;
  };
  date: string;
  returningDate: string;
  details: string;
  clinic: string;
  comment: string;
}[];
