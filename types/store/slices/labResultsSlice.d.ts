import { PayloadAction } from '@reduxjs/toolkit';
import type { LabResultsFilters, LabResultsFiltersErrors, LabResultsSliceState, LabResultsListResponse } from '@types';
export declare const labResultsSlice: import('@reduxjs/toolkit').Slice<
  LabResultsSliceState,
  {
    getLabResultsList: (
      state: import('immer/dist/internal').WritableDraft<LabResultsSliceState>,
      { payload }: PayloadAction<number | string>,
    ) => void;
    getLabResultsListSuccess: (
      state: import('immer/dist/internal').WritableDraft<LabResultsSliceState>,
      {
        payload: { resultPackages, specifications },
      }: PayloadAction<LabResultsListResponse>,
    ) => void;
    setLabResultsFilter: (
      state: import('immer/dist/internal').WritableDraft<LabResultsSliceState>,
      { payload }: PayloadAction<Partial<LabResultsFilters>>,
    ) => void;
    setLabResultsFilterError: (
      state: import('immer/dist/internal').WritableDraft<LabResultsSliceState>,
      { payload }: PayloadAction<LabResultsFiltersErrors>,
    ) => void;
    clearLabResultsFilters: (
      state: import('immer/dist/internal').WritableDraft<LabResultsSliceState>,
      { payload }: PayloadAction<(keyof LabResultsFilters)[] | undefined>,
    ) => void;
    exportLabResults: (
      state: import('immer/dist/internal').WritableDraft<LabResultsSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    exportLabResultsFinish: (state: import('immer/dist/internal').WritableDraft<LabResultsSliceState>) => void;
    exportLabResult: (
      state: import('immer/dist/internal').WritableDraft<LabResultsSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
  },
  'labResults'
>;
export declare const getLabResultsList: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string | number,
    'labResults/getLabResultsList'
  >,
  getLabResultsListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    LabResultsListResponse,
    'labResults/getLabResultsListSuccess'
  >,
  setLabResultsFilter: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Partial<LabResultsFilters>,
    'labResults/setLabResultsFilter'
  >,
  clearLabResultsFilters: import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload<
    (keyof LabResultsFilters)[] | undefined,
    'labResults/clearLabResultsFilters'
  >,
  setLabResultsFilterError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    LabResultsFiltersErrors,
    'labResults/setLabResultsFilterError'
  >,
  exportLabResults: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'labResults/exportLabResults'>,
  exportLabResultsFinish: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'labResults/exportLabResultsFinish'>,
  exportLabResult: import('@reduxjs/toolkit').ActionCreatorWithPayload<number, 'labResults/exportLabResult'>;
export declare const selectLabResultsIsLoading: () => any;
export declare const selectLabResultsIsFileLoading: () => any;
export declare const selectLabResultsSpecifications: () => any;
export declare const selectLabResultsList: () => any;
export declare const selectLabResultsFilters: () => any;
export declare const selectLabResultsFiltersError: () => any;
declare const labResultsReducer: import('redux').Reducer<LabResultsSliceState, import('redux').AnyAction>;
export default labResultsReducer;
