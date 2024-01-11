import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import type { LabResultsFilters, LabResultsFiltersErrors, LabResultsSliceState, LabResultsListResponse } from '@types';

const initialState: LabResultsSliceState = {
  statuses: {
    isLoading: false,
    isFileLoading: false,
  },
  specifications: [],
  labResultsList: [],
  filters: {
    from: null,
    to: null,
    procedure: [],
    labName: [],
  },
  filtersError: {
    from: null,
    to: null,
  },
};

export const labResultsSlice = createSlice({
  name: 'labResults',
  initialState,
  reducers: {
    getLabResultsList: (state, { payload }: PayloadAction<number | string>) => {
      state.statuses.isLoading = true;
    },
    getLabResultsListSuccess: (
      state,
      { payload: { resultPackages, specifications } }: PayloadAction<LabResultsListResponse>,
    ) => {
      state.statuses.isLoading = false;
      state.labResultsList = resultPackages;
      state.specifications = specifications;
    },
    setLabResultsFilter: (state, { payload }: PayloadAction<Partial<LabResultsFilters>>) => {
      state.filters = {
        ...state.filters,
        ...payload,
      };
    },
    setLabResultsFilterError: (state, { payload }: PayloadAction<LabResultsFiltersErrors>) => {
      state.filtersError = payload;
    },
    clearLabResultsFilters: (state, { payload = [] }: PayloadAction<(keyof LabResultsFilters)[] | undefined>) => {
      const newFilters = { ...initialState.filters };
      if (payload) {
        Object.keys(initialState.filters).forEach((key) => {
          if (payload.includes(key as keyof LabResultsFilters)) newFilters[key] = state.filters[key];
        });
      }
      state.filters = newFilters;
      state.filtersError = initialState.filtersError;
    },
    exportLabResults: (state, { payload }: PayloadAction<string>) => {
      state.statuses.isFileLoading = true;
    },
    exportLabResultsFinish: (state) => {
      state.statuses.isFileLoading = false;
    },
    exportLabResult: (state, { payload }: PayloadAction<number>) => {
      state.statuses.isFileLoading = true;
    },
  },
});

export const {
  getLabResultsList,
  getLabResultsListSuccess,
  setLabResultsFilter,
  clearLabResultsFilters,
  setLabResultsFilterError,
  exportLabResults,
  exportLabResultsFinish,
  exportLabResult,
} = labResultsSlice.actions;

export const selectLabResultsIsLoading = () => useAppSelector((state) => state.labResults.statuses.isLoading);
export const selectLabResultsIsFileLoading = () => useAppSelector((state) => state.labResults.statuses.isFileLoading);
export const selectLabResultsSpecifications = () => useAppSelector((state) => state.labResults.specifications);
export const selectLabResultsList = () => useAppSelector((state) => state.labResults.labResultsList);
export const selectLabResultsFilters = () => useAppSelector((state) => state.labResults.filters);
export const selectLabResultsFiltersError = () => useAppSelector((state) => state.labResults.filtersError);

const labResultsReducer = labResultsSlice.reducer;
export default labResultsReducer;
