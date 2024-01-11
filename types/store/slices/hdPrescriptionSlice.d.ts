import { PayloadAction } from '@reduxjs/toolkit';
import type {
  HdPrescriptionForm,
  HdPrescriptionRequest,
  HdPrescriptionViewTable,
  HdSchedulingData,
  Shift,
  DiscontinueHdPrescriptionRequest,
  HdPrescriptionSliceState,
} from '@types';
export type AddHdPrescriptionPayload = {
  hdPrescription: HdPrescriptionRequest;
  id: string;
};
export type DeleteHdPrescriptionPayload = {
  patientId: string;
};
export declare const hdPrescriptionsSlice: import('@reduxjs/toolkit').Slice<
  HdPrescriptionSliceState,
  {
    getHdPrescriptionsList(
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      payload: PayloadAction<string>,
    ): void;
    getHdPrescriptionsListSuccess: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<HdPrescriptionViewTable>,
    ) => void;
    addHdPrescriptionsError: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    addHdPrescription: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<AddHdPrescriptionPayload>,
    ) => void;
    addHdSchedulingData: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<HdSchedulingData | null>,
    ) => void;
    addHdPrescriptionSuccess: (state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>) => void;
    clearHdPrescriptionSaveSuccessState: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
    ) => void;
    addHdPrescriptionFormData: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<HdPrescriptionForm>,
    ) => void;
    clearHdPrescriptionFormData: (state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>) => void;
    addHdPrescriptionError: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    deleteHdPrescription: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<DeleteHdPrescriptionPayload>,
    ) => void;
    deleteHdPrescriptionSuccess: (state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>) => void;
    changeSchedulingFormStatus: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
    getShiftDictionary: () => void;
    getShiftDictionarySuccess: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<Shift[]>,
    ) => void;
    discontinueHdPrescription: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<DiscontinueHdPrescriptionRequest>,
    ) => void;
    discontinueHdPrescriptionSuccess: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
    ) => void;
    exportHdPrescription: (
      state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    exportHdPrescriptionFinish: (state: import('immer/dist/internal').WritableDraft<HdPrescriptionSliceState>) => void;
  },
  'hdPrescription'
>;
export declare const getHdPrescriptionsList: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'hdPrescription/getHdPrescriptionsList'
  >,
  getHdPrescriptionsListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    HdPrescriptionViewTable,
    'hdPrescription/getHdPrescriptionsListSuccess'
  >,
  addHdPrescriptionsError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'hdPrescription/addHdPrescriptionsError'
  >,
  clearHdPrescriptionSaveSuccessState: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'hdPrescription/clearHdPrescriptionSaveSuccessState'>,
  addHdPrescription: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AddHdPrescriptionPayload,
    'hdPrescription/addHdPrescription'
  >,
  addHdPrescriptionFormData: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    HdPrescriptionForm,
    'hdPrescription/addHdPrescriptionFormData'
  >,
  clearHdPrescriptionFormData: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'hdPrescription/clearHdPrescriptionFormData'>,
  addHdPrescriptionError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'hdPrescription/addHdPrescriptionError'
  >,
  addHdPrescriptionSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'hdPrescription/addHdPrescriptionSuccess'>,
  addHdSchedulingData: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    HdSchedulingData | null,
    'hdPrescription/addHdSchedulingData'
  >,
  deleteHdPrescription: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DeleteHdPrescriptionPayload,
    'hdPrescription/deleteHdPrescription'
  >,
  deleteHdPrescriptionSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'hdPrescription/deleteHdPrescriptionSuccess'>,
  changeSchedulingFormStatus: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    boolean,
    'hdPrescription/changeSchedulingFormStatus'
  >,
  getShiftDictionary: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'hdPrescription/getShiftDictionary'>,
  getShiftDictionarySuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Shift[],
    'hdPrescription/getShiftDictionarySuccess'
  >,
  discontinueHdPrescription: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DiscontinueHdPrescriptionRequest,
    'hdPrescription/discontinueHdPrescription'
  >,
  discontinueHdPrescriptionSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'hdPrescription/discontinueHdPrescriptionSuccess'>,
  exportHdPrescription: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'hdPrescription/exportHdPrescription'
  >,
  exportHdPrescriptionFinish: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'hdPrescription/exportHdPrescriptionFinish'>;
export declare const selectHdPrescriptions: () => any;
export declare const selectHdPrescriptionsLoading: () => any;
export declare const selectHdPrescriptionsLoaded: () => any;
export declare const selectHdPrescriptionSubmitting: () => any;
export declare const selectHdPrescriptionForm: () => any;
export declare const selectHdSchedulingForm: () => any;
export declare const selectHdPrescriptionSaveDataSuccess: () => any;
export declare const selectHdPrescriptionFileLoading: () => any;
export declare const selectHdSchedulingFormDirtyStatus: () => any;
export declare const selectShiftDictionary: () => any;
declare const hdPrescriptionsReducer: import('redux').Reducer<HdPrescriptionSliceState, import('redux').AnyAction>;
export default hdPrescriptionsReducer;
