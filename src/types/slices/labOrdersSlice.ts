import type {
  LabOrdersFilters,
  LabOrdersFiltersErrors,
  Pagination,
  FileDocument,
  LabCreationForm,
  PerformLabOrderRequestParams,
  CreateIndividualLabTestPlanForm,
  HighlightedRow,
} from '@types';
import { LabOrderEventPlace, LabResultTestCategories, LabTestTypes, FormType } from '@enums';
import { CreateQuarterlyBTForm, LabOrdersContent, LabOrdersStatusFilter, LabTestPlanResponse } from '@types';

export interface LabOrdersSliceState {
  statuses: {
    isLoading: boolean;
    isSubmitting: boolean;
    isFileLoading: boolean;
  };
  labTestPlan: LabTestPlanResponse | null;
  ordersList: LabOrdersContent[];
  selectedRows: number[];
  highlightedRows: HighlightedRow[];
  pagination: Pagination;
  sortBy:
    | 'id'
    | 'patientId'
    | 'patientName'
    | 'procedureName'
    | 'number'
    | 'mealStatus'
    | 'status'
    | 'sampledAt'
    | 'createdAt'
    | 'labName'
    | 'specimenType';
  sortDir: 'asc' | 'desc';
  errors: Error[];
  filters: LabOrdersFilters;
  statusFilters: LabOrdersStatusFilter[];
  filtersError: LabOrdersFiltersErrors;
}

export type ManualLabResultsTestSet = {
  categoryCode: LabResultTestCategories;
  tests: {
    code: string;
    value: string;
    isAbnormal: boolean;
  }[];
};

export type SubmitManualLabResultsPayload = {
  isEditing: boolean;
  labOrderId: number;
  submitData: {
    labResultNumber: number;
    resultDate: string | Date;
    testSets: ManualLabResultsTestSet[];
    file?: FileDocument | null;
  };
};

export type CreateLabTestPayload = {
  id?: string;
  type: LabTestTypes;
  place: LabOrderEventPlace;
  mode: FormType;
  formData: LabCreationForm | CreateIndividualLabTestPlanForm | CreateQuarterlyBTForm;
};

export type PerformLabTestPayload = {
  place: LabOrderEventPlace;
  orderId: number;
  formData: PerformLabOrderRequestParams;
};

export type SubmitLabResultFilePayload = {
  labOrderId: number;
  file: FileDocument;
};

export type DeleteLabResultPayload = {
  id: number;
};
