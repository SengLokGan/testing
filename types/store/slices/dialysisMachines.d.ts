import { PayloadAction } from '@reduxjs/toolkit';
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
export declare const dialysisMachinesSlice: import('@reduxjs/toolkit').Slice<
  DialysisMachinesState,
  {
    getDialysisMachinesIsolationGroups: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
    ) => void;
    getDialysisMachinesIsolationGroupsSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      { payload }: PayloadAction<IsolationGroup[]>,
    ) => void;
    getDialysisMachinesList: (state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>) => void;
    getDialysisMachinesListSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      {
        payload,
      }: PayloadAction<{
        content: DialysisMachine[];
        totalElements: number;
      }>,
    ) => void;
    getDialysisMachine: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      { payload }: PayloadAction<string>,
    ) => void;
    getDialysisMachineSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      { payload }: PayloadAction<DialysisMachineFull | null>,
    ) => void;
    createDialysisMachine: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      { payload }: PayloadAction<DialysisMachinesCreationRequest>,
    ) => void;
    createDialysisMachineSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      { payload }: PayloadAction<DialysisMachinesCreationResponse>,
    ) => void;
    updateDialysisMachine: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      {
        payload,
      }: PayloadAction<{
        id: string;
        data: DialysisMachinesEditingRequest;
      }>,
    ) => void;
    updateDialysisMachineSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      { payload }: PayloadAction<DialysisMachinesEditingResponse>,
    ) => void;
    addDialysisMachinesError: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      { payload }: PayloadAction<BackendError[] | Error | null>,
    ) => void;
    clearDialysisMachinesError: (state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>) => void;
    changeDialysisMachinesPaginationPage: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeDialysisMachinesPaginationRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<DialysisMachinesState>,
      { payload }: PayloadAction<number>,
    ) => void;
  },
  'dialysisMachines'
>;
export declare const createDialysisMachine: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DialysisMachinesCreationRequest,
    'dialysisMachines/createDialysisMachine'
  >,
  createDialysisMachineSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DialysisMachineFull,
    'dialysisMachines/createDialysisMachineSuccess'
  >,
  getDialysisMachine: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'dialysisMachines/getDialysisMachine'
  >,
  getDialysisMachineSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DialysisMachineFull | null,
    'dialysisMachines/getDialysisMachineSuccess'
  >,
  getDialysisMachinesIsolationGroups: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysisMachines/getDialysisMachinesIsolationGroups'>,
  getDialysisMachinesIsolationGroupsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    IsolationGroup[],
    'dialysisMachines/getDialysisMachinesIsolationGroupsSuccess'
  >,
  getDialysisMachinesList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysisMachines/getDialysisMachinesList'>,
  getDialysisMachinesListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      content: DialysisMachine[];
      totalElements: number;
    },
    'dialysisMachines/getDialysisMachinesListSuccess'
  >,
  addDialysisMachinesError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error | BackendError[] | null,
    'dialysisMachines/addDialysisMachinesError'
  >,
  changeDialysisMachinesPaginationPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'dialysisMachines/changeDialysisMachinesPaginationPage'
  >,
  changeDialysisMachinesPaginationRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'dialysisMachines/changeDialysisMachinesPaginationRowsPerPage'
  >,
  updateDialysisMachine: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      id: string;
      data: DialysisMachinesEditingRequest;
    },
    'dialysisMachines/updateDialysisMachine'
  >,
  updateDialysisMachineSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DialysisMachineFull,
    'dialysisMachines/updateDialysisMachineSuccess'
  >,
  clearDialysisMachinesError: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysisMachines/clearDialysisMachinesError'>;
export declare const selectDialysisMachine: () => any;
export declare const selectDialysisMachinesList: () => any;
export declare const selectDialysisMachinesSortBy: () => any;
export declare const selectDialysisMachinesSortDir: () => any;
export declare const selectDialysisMachinesListPagination: () => any;
export declare const selectDialysisMachinesIsLoading: () => any;
export declare const selectDialysisMachinesIsSubmitting: () => any;
export declare const selectDialysisMachinesIsolationGroups: () => any;
export declare const selectDialysisMachinesError: () => any;
declare const dialysisMachinesReducer: import('redux').Reducer<DialysisMachinesState, import('redux').AnyAction>;
export default dialysisMachinesReducer;
