import type { VascularAccessFilters, VascularAccessChipsCountersResponse, VascularAccessReportsContent } from '@types';
import { CvcTimeCategory, VascularAccessType, ChipsCountersSumNames } from '@enums';
export declare const setValueFromCatalog: (catalogName: any, value: any) => string;
export declare const convertVascularAccessReportsDataToTableFormat: (data: VascularAccessReportsContent[]) => {
  vaCreationDate: string;
  category: string;
  vaType: string;
  cvcCategory: string;
  side: string;
  vaNeedleType: string;
  vaNeedleSizeA: string;
  vaNeedleSizeV: string;
  cvcInstillation: string;
  patient: {
    id: number;
    name: string;
  };
  vaCreationPerson: string;
  vaCreatedPlace: string;
  comments: string;
}[];
export declare const setVascularAccessReportsFiltersBadges: (
  data: VascularAccessChipsCountersResponse,
  filters: VascularAccessFilters,
) => {
  accessTypes: {
    badge: string;
    name: VascularAccessType | ChipsCountersSumNames.vascular;
    selected: boolean;
  }[];
  categories: {
    badge: string;
    selected: boolean;
    name: CvcTimeCategory | ChipsCountersSumNames.cvc;
  }[];
  date: Date | null;
};
