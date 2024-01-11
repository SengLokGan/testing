import { PayloadAction } from '@reduxjs/toolkit';
import { LabOrderEventPlace } from '@enums/components/ServiceModal';
import type {
  CreateLabTestPayload,
  DeleteLabResultPayload,
  HighlightedRow,
  LabOrdersFilters,
  LabOrdersFiltersErrors,
  LabOrdersSliceState,
  Pagination,
  PerformLabTestPayload,
  SubmitLabResultFilePayload,
  SubmitManualLabResultsPayload,
} from '@types';
import { LabTestPlanResponse, LabOrdersStatusFilter, LabOrdersContent } from '@types';
export declare const labOrderInitialState: LabOrdersSliceState;
export declare const labOrdersSlice: import('@reduxjs/toolkit').Slice<
  LabOrdersSliceState,
  {
    addLabOrdersError: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    resetLabOrdersList: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    updateLabOrdersListSuccess: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      {
        payload: { content, pagination },
      }: {
        payload: {
          content: LabOrdersContent[];
          pagination: Pagination;
        };
        type: string;
      },
    ) => void;
    submitLabOrderForm: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<CreateLabTestPayload>,
    ) => void;
    createLabOrderSuccess: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    deleteUrgentLabOrder: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      {
        payload,
      }: PayloadAction<{
        id: number;
        place?: LabOrderEventPlace;
      }>,
    ) => void;
    deleteUrgentLabOrderSuccess: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    performLabOrder: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<PerformLabTestPayload>,
    ) => void;
    performLabOrderSuccess: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    setFilters: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<Partial<LabOrdersFilters>>,
    ) => void;
    setFilterErrors: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<LabOrdersFiltersErrors>,
    ) => void;
    clearLabOrderFilters: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<(keyof LabOrdersFilters)[] | undefined>,
    ) => void;
    changeLabOrdersPaginationRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    selectAllLabOrders: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    selectLabOrder: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeLabOrdersPaginationPage: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    submitLabOrders: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      payload: PayloadAction<{
        orderIds: number[];
        place?: LabOrderEventPlace.Dialysis;
      }>,
    ) => void;
    submitLabOrderSuccess: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    clearLabOrdersError: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    exportLabOrders: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    exportLabOrdersFinish: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    exportLabOrder: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    printSelectedOrders: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<number[]>,
    ) => void;
    submitManualLabResults: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<SubmitManualLabResultsPayload>,
    ) => void;
    submitManualLabResultsSuccess: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<SubmitManualLabResultsPayload>,
    ) => void;
    submitManualLabResultError: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    submitLabResultFile: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<SubmitLabResultFilePayload>,
    ) => void;
    submitLabResultFileSuccess: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    submitLabResultFileError: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    deleteLabResult: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<DeleteLabResultPayload>,
    ) => void;
    deleteLabResultSuccess: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    getFilteredLabOrdersList: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
    setStatusFilters: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<LabOrdersStatusFilter[]>,
    ) => void;
    setHighlightedRows: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<HighlightedRow[]>,
    ) => void;
    getLabTestPlan: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    getLabTestPlanSuccess: (
      state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>,
      { payload }: PayloadAction<LabTestPlanResponse>,
    ) => void;
    clearEditableLabTestPlan: (state: import('immer/dist/internal').WritableDraft<LabOrdersSliceState>) => void;
  },
  'labOrders'
>;
export declare const addLabOrdersError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'labOrders/addLabOrdersError'
  >,
  submitLabOrderForm: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    CreateLabTestPayload,
    'labOrders/submitLabOrderForm'
  >,
  createLabOrderSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/createLabOrderSuccess'>,
  performLabOrder: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    PerformLabTestPayload,
    'labOrders/performLabOrder'
  >,
  performLabOrderSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/performLabOrderSuccess'>,
  deleteUrgentLabOrder: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      id: number;
      place?: LabOrderEventPlace | undefined;
    },
    'labOrders/deleteUrgentLabOrder'
  >,
  deleteUrgentLabOrderSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/deleteUrgentLabOrderSuccess'>,
  updateLabOrdersListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      content: LabOrdersContent[];
      pagination: Pagination;
    },
    'labOrders/updateLabOrdersListSuccess'
  >,
  setFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<Partial<LabOrdersFilters>, 'labOrders/setFilters'>,
  setFilterErrors: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    LabOrdersFiltersErrors,
    'labOrders/setFilterErrors'
  >,
  clearLabOrderFilters: import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload<
    (keyof LabOrdersFilters)[] | undefined,
    'labOrders/clearLabOrderFilters'
  >,
  changeLabOrdersPaginationPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'labOrders/changeLabOrdersPaginationPage'
  >,
  changeLabOrdersPaginationRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'labOrders/changeLabOrdersPaginationRowsPerPage'
  >,
  resetLabOrdersList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/resetLabOrdersList'>,
  selectAllLabOrders: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/selectAllLabOrders'>,
  selectLabOrder: import('@reduxjs/toolkit').ActionCreatorWithPayload<number, 'labOrders/selectLabOrder'>,
  submitLabOrders: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      orderIds: number[];
      place?: LabOrderEventPlace.Dialysis | undefined;
    },
    'labOrders/submitLabOrders'
  >,
  submitLabOrderSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/submitLabOrderSuccess'>,
  exportLabOrders: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/exportLabOrders'>,
  exportLabOrdersFinish: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/exportLabOrdersFinish'>,
  exportLabOrder: import('@reduxjs/toolkit').ActionCreatorWithPayload<number, 'labOrders/exportLabOrder'>,
  printSelectedOrders: import('@reduxjs/toolkit').ActionCreatorWithPayload<number[], 'labOrders/printSelectedOrders'>,
  submitManualLabResults: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    SubmitManualLabResultsPayload,
    'labOrders/submitManualLabResults'
  >,
  submitManualLabResultsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    SubmitManualLabResultsPayload,
    'labOrders/submitManualLabResultsSuccess'
  >,
  submitLabResultFile: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    SubmitLabResultFilePayload,
    'labOrders/submitLabResultFile'
  >,
  submitLabResultFileSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/submitLabResultFileSuccess'>,
  deleteLabResult: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DeleteLabResultPayload,
    'labOrders/deleteLabResult'
  >,
  deleteLabResultSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/deleteLabResultSuccess'>,
  submitLabResultFileError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'labOrders/submitLabResultFileError'
  >,
  submitManualLabResultError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'labOrders/submitManualLabResultError'
  >,
  getFilteredLabOrdersList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/getFilteredLabOrdersList'>,
  setStatusFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    LabOrdersStatusFilter[],
    'labOrders/setStatusFilters'
  >,
  setHighlightedRows: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    HighlightedRow[],
    'labOrders/setHighlightedRows'
  >,
  getLabTestPlan: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'labOrders/getLabTestPlan'>,
  getLabTestPlanSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    LabTestPlanResponse,
    'labOrders/getLabTestPlanSuccess'
  >,
  clearEditableLabTestPlan: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labOrders/clearEditableLabTestPlan'>;
export declare const selectLabOrdersIsLoading: () => any;
export declare const selectLabOrdersIsSubmitting: () => any;
export declare const selectLabOrdersPagination: () => any;
export declare const selectLabOrdersList: () => any;
export declare const selectSortedLabOrdersList: () => any[];
export declare const selectLabOrderFilters: () => any;
export declare const selectLabOrdersFiltersErrors: () => any;
export declare const selectSelectedLabOrders: () => any;
export declare const selectLabOrdersIsFileLoading: () => any;
export declare const selectLabOrdersS3AntivirusErrors: () => any;
export declare const selectIsAllLabOrdersFiltersValid: () => boolean;
export declare const selectLabOrderStatusFilters: () => any;
export declare const selectLabOrdersHighLightedRows: () => any;
export declare const selectEditableLabTestPlan: () => any;
declare const labOrdersReducer: import('redux').Reducer<LabOrdersSliceState, import('redux').AnyAction>;
export default labOrdersReducer;
