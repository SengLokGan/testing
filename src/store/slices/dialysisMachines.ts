import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import type {
  DialysisMachineFull,
  DialysisMachinesCreationResponse,
  DialysisMachine,
  DialysisMachinesCreationRequest,
  DialysisMachinesState,
  IsolationGroup,
  BackendError,
  DialysisMachinesEditingRequest,
  DialysisMachinesEditingResponse,
} from '@types';

const initialState: DialysisMachinesState = {
  statuses: {
    isLoading: false,
    isSubmitting: false,
  },
  error: null,
  machines: [],
  machine: null,
  isolationGroups: [],
  sortBy: 'name',
  sortDir: 'asc',
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
};

export const dialysisMachinesSlice = createSlice({
  name: 'dialysisMachines',
  initialState,
  reducers: {
    getDialysisMachinesIsolationGroups: (state) => {
      state.statuses.isLoading = true;
    },
    getDialysisMachinesIsolationGroupsSuccess: (state, { payload }: PayloadAction<IsolationGroup[]>) => {
      state.statuses.isLoading = false;
      state.isolationGroups = payload;
    },
    getDialysisMachinesList: (state) => {
      state.statuses.isLoading = true;
    },
    getDialysisMachinesListSuccess: (
      state,
      { payload }: PayloadAction<{ content: DialysisMachine[]; totalElements: number }>,
    ) => {
      state.machines = payload.content;
      state.pagination.totalCount = payload.totalElements;
      state.error = null;
      state.statuses.isLoading = false;
    },
    getDialysisMachine: (state, { payload }: PayloadAction<string>) => {
      state.statuses.isLoading = true;
    },
    getDialysisMachineSuccess: (state, { payload }: PayloadAction<DialysisMachineFull | null>) => {
      state.statuses.isLoading = false;
      state.machine = payload;
    },
    createDialysisMachine: (state, { payload }: PayloadAction<DialysisMachinesCreationRequest>) => {
      state.statuses.isSubmitting = true;
      state.statuses.isLoading = true;
    },
    createDialysisMachineSuccess: (state, { payload }: PayloadAction<DialysisMachinesCreationResponse>) => {
      const sortedMachines = [...state.machines, payload].sort((a, b) => {
        if (a[state.sortBy] > b[state.sortBy]) return -1;
        if (a[state.sortBy] < b[state.sortBy]) return 1;
        return 0;
      });

      if (state.sortDir === 'desc') {
        state.machines = sortedMachines;
      } else {
        state.machines = sortedMachines.reverse();
      }

      state.pagination.currentPage = 0;
      state.pagination.totalCount += 1;
      state.statuses.isSubmitting = false;
      state.statuses.isLoading = false;
    },
    updateDialysisMachine: (
      state,
      { payload }: PayloadAction<{ id: string; data: DialysisMachinesEditingRequest }>,
    ) => {
      state.statuses.isSubmitting = true;
      state.statuses.isLoading = true;
    },
    updateDialysisMachineSuccess: (state, { payload }: PayloadAction<DialysisMachinesEditingResponse>) => {
      state.statuses.isSubmitting = false;
      state.statuses.isLoading = false;
    },
    addDialysisMachinesError: (state, { payload }: PayloadAction<BackendError[] | Error | null>) => {
      state.statuses.isSubmitting = false;
      state.statuses.isLoading = false;
      state.error = payload;
    },
    clearDialysisMachinesError: (state) => {
      state.error = null;
    },
    changeDialysisMachinesPaginationPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.statuses.isLoading = false;
    },
    changeDialysisMachinesPaginationRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.statuses.isLoading = false;
    },
  },
});

export const {
  createDialysisMachine,
  createDialysisMachineSuccess,
  getDialysisMachine,
  getDialysisMachineSuccess,
  getDialysisMachinesIsolationGroups,
  getDialysisMachinesIsolationGroupsSuccess,
  getDialysisMachinesList,
  getDialysisMachinesListSuccess,
  addDialysisMachinesError,
  changeDialysisMachinesPaginationPage,
  changeDialysisMachinesPaginationRowsPerPage,
  updateDialysisMachine,
  updateDialysisMachineSuccess,
  clearDialysisMachinesError,
} = dialysisMachinesSlice.actions;

export const selectDialysisMachine = () => useAppSelector((state) => state.dialysisMachines.machine);
export const selectDialysisMachinesList = () => useAppSelector((state) => state.dialysisMachines.machines);
export const selectDialysisMachinesSortBy = () => useAppSelector((state) => state.dialysisMachines.sortBy);
export const selectDialysisMachinesSortDir = () => useAppSelector((state) => state.dialysisMachines.sortDir);
export const selectDialysisMachinesListPagination = () => useAppSelector((state) => state.dialysisMachines.pagination);
export const selectDialysisMachinesIsLoading = () =>
  useAppSelector((state) => state.dialysisMachines.statuses.isLoading);
export const selectDialysisMachinesIsSubmitting = () =>
  useAppSelector((state) => state.dialysisMachines.statuses.isSubmitting);
export const selectDialysisMachinesIsolationGroups = () =>
  useAppSelector((state) => state.dialysisMachines.isolationGroups);
export const selectDialysisMachinesError = () => useAppSelector((state) => state.dialysisMachines.error);

const dialysisMachinesReducer = dialysisMachinesSlice.reducer;
export default dialysisMachinesReducer;
