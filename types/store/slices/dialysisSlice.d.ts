import { PayloadAction } from '@reduxjs/toolkit';
import { IndexedDbStorage } from '@services';
import type {
  Dialysis,
  DialysisProcessInfoForProgress,
  DialysisSliceState,
  DialysisSummary,
  FinishHdForm,
  HdProgressRecord,
  HdReadingDataRequest,
  PostHd,
  PostHdRequest,
  PreDialysisRequest,
  SkipAppointmentForm,
  StartHdForm,
  VaccinationMedicationResolutionRequest,
} from '@types';
import {
  AppointmentEventPlace,
  DialysisStatus,
  RowHighlightType,
  UpdateHdRecordsType,
  VaccinationMedicationModalType,
  VaccineMedicationServiceType,
} from '@enums';
export interface AdministerVaccinationMedicationPayload {
  resolution?: VaccinationMedicationResolutionRequest;
  serviceId: number;
  serviceType: VaccineMedicationServiceType;
  mode?: VaccinationMedicationModalType;
}
export interface EditHdReadingPayload {
  data: HdReadingDataRequest;
  hdReadingId: number;
}
export interface AddHighlightToRowsPayload {
  rows: {
    id: number;
    type: RowHighlightType;
  }[];
}
export interface SkipAppointmentPayload {
  data: SkipAppointmentForm;
  id: number;
  skipPlace: AppointmentEventPlace;
}
export declare const dialysisSlice: import('@reduxjs/toolkit').Slice<
  DialysisSliceState,
  {
    getInitDialysisData: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      {
        payload,
      }: PayloadAction<{
        appointmentId: string;
        openOnStep?: DialysisStatus;
      }>,
    ) => void;
    getInitialDialysisDataSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<DialysisSummary>,
    ) => {
      loading: false;
      isFutureAppointment: boolean;
      error: undefined;
      patient: import('@types').DialysisPatient;
      appointmentId: string;
      date: string;
      status: {
        activeStep: DialysisStatus;
        currentStep: DialysisStatus;
      };
      startTime: string;
      endTime: string;
      bay: string;
      skippedBy?: import('@types').UserEntity | undefined;
      skippedAt?: string | undefined;
      editedBy?: import('@types').UserEntity | undefined;
      editedAt?: string | undefined;
      skipComment?: string | undefined;
      skipReason?: import('@enums').AppointmentSkipReason | undefined;
      hasEncounter?: boolean | undefined;
      previousSkipped: boolean;
      withDialysis: boolean;
      isSubmitting: boolean;
      saveSuccess: boolean;
      preHd: import('immer/dist/internal').WritableDraft<Dialysis> | null;
      hdReading: import('immer/dist/internal').WritableDraft<{
        rowsHighlight: {
          id: number;
          type: RowHighlightType;
        }[];
        storage?: IndexedDbStorage<HdProgressRecord> | null | undefined;
        savedRecords: HdProgressRecord[];
        allRecords: HdProgressRecord[];
        isEditing: boolean;
      }>;
      postHd: import('immer/dist/internal').WritableDraft<PostHd> | null;
      dialysisId: string | null;
      isolationGroup:
        | import('immer/dist/internal').WritableDraft<{
            id: number;
            name: string;
          }>
        | null;
      services: import('immer/dist/internal').WritableDraft<import('@types').DialysisServicesResponse>;
      hasBeenRedirectedToAddAccess: boolean;
    };
    clearInitialDialysisData: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
    ) => DialysisSliceState;
    addDialysisError: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    getDialysis: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    getDialysisPreSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<Dialysis>,
    ) => void;
    getServices: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    getServicesSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<any>,
    ) => void;
    setCurrentStep: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<DialysisStatus>,
    ) => void;
    saveDialysisPre: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<PreDialysisRequest>,
    ) => void;
    saveDialysisPreSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<Dialysis>,
    ) => void;
    startHdClick: () => void;
    openStartHDModal: () => void;
    startHd: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<StartHdForm>,
    ) => void;
    finishHdClick: () => void;
    finishHd: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<FinishHdForm>,
    ) => void;
    closeDialysisModal: () => void;
    resetSubmitting: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    initDialysisStorage: () => void;
    initDialysisStorageSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<IndexedDbStorage<HdProgressRecord>>,
    ) => void;
    submitDialysisHdReading: () => void;
    addDialysisHdReadingToStorage: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<HdProgressRecord>,
    ) => void;
    editDialysisHdReading: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<EditHdReadingPayload>,
    ) => void;
    deleteDialysisHdReading: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    deleteDialysisHdReadingSuccess: () => void;
    editDialysisHdReadingSuccess: () => void;
    addDialysisHdReadingToStorageSuccess: () => void;
    deleteDialysisHdReadingsFromStorage: () => void;
    deleteDialysisHdReadingsFromStorageSuccess: () => void;
    sendDialysisStorageRecords: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    sendDialysisStorageRecordsSuccess: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    updateDialysisHdReadingList: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      {
        payload,
      }: PayloadAction<{
        type?: UpdateHdRecordsType;
      }>,
    ) => void;
    updateDialysisHdReadingListSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      {
        payload,
      }: PayloadAction<{
        savedRecords: HdProgressRecord[];
        allRecords: HdProgressRecord[];
      }>,
    ) => void;
    deleteDialysisStorage: () => void;
    deleteDialysisStorageSuccess: () => void;
    abortDialysis: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    abortDialysisSuccess: () => {
      loading: boolean;
      isFutureAppointment: boolean;
      isSubmitting: boolean;
      error: any;
      saveSuccess: boolean;
      preHd: Dialysis | null;
      hdReading: {
        rowsHighlight: {
          id: number;
          type: RowHighlightType;
        }[];
        storage?: IndexedDbStorage<HdProgressRecord> | null | undefined;
        savedRecords: HdProgressRecord[];
        allRecords: HdProgressRecord[];
        isEditing: boolean;
      };
      postHd: PostHd | null;
      appointmentId: string | null;
      date: string | null;
      dialysisId: string | null;
      isolationGroup: {
        id: number;
        name: string;
      } | null;
      patient: import('@types').DialysisPatient | null;
      status: {
        activeStep: DialysisStatus;
        currentStep: DialysisStatus;
      };
      startTime?: string | undefined;
      endTime?: string | undefined;
      bay?: string | undefined;
      services: import('@types').DialysisServicesResponse;
      hasBeenRedirectedToAddAccess: boolean;
      withDialysis: boolean;
    };
    getPostHd: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    getPostHdSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<PostHd>,
    ) => void;
    savePostHd: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<PostHdRequest>,
    ) => void;
    savePostHdSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<any>,
    ) => void;
    finishAndSaveHdClick: () => void;
    finishAndSaveHd: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    finishAndSaveHdSuccess: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    saveAdministeringVaccinationMedication: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<AdministerVaccinationMedicationPayload>,
    ) => void;
    saveAdministeringVaccinationMedicationSuccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
    ) => void;
    changeHdReadingRecordStatus: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
    setHasBeenRedirectedToAddAccess: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<boolean>,
    ) => void;
    skipAppointment: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<SkipAppointmentPayload>,
    ) => void;
    skipAppointmentSuccess: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    reactivateAppointment: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    reactivateAppointmentSuccess: (state: import('immer/dist/internal').WritableDraft<DialysisSliceState>) => void;
    addHighlightToRows: (
      state: import('immer/dist/internal').WritableDraft<DialysisSliceState>,
      { payload }: PayloadAction<AddHighlightToRowsPayload>,
    ) => void;
    scrollToAccessManagementSection: () => void;
  },
  'dialysis'
>;
export declare const getDialysis: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/getDialysis'>,
  getServices: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/getServices'>,
  setCurrentStep: import('@reduxjs/toolkit').ActionCreatorWithPayload<DialysisStatus, 'dialysis/setCurrentStep'>,
  addDialysisError: import('@reduxjs/toolkit').ActionCreatorWithPayload<Error, 'dialysis/addDialysisError'>,
  getInitDialysisData: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      appointmentId: string;
      openOnStep?: DialysisStatus | undefined;
    },
    'dialysis/getInitDialysisData'
  >,
  getInitialDialysisDataSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DialysisSummary,
    'dialysis/getInitialDialysisDataSuccess'
  >,
  getServicesSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<any, 'dialysis/getServicesSuccess'>,
  clearInitialDialysisData: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/clearInitialDialysisData'>,
  getDialysisPreSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Dialysis,
    'dialysis/getDialysisPreSuccess'
  >,
  saveDialysisPre: import('@reduxjs/toolkit').ActionCreatorWithPayload<PreDialysisRequest, 'dialysis/saveDialysisPre'>,
  saveDialysisPreSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Dialysis,
    'dialysis/saveDialysisPreSuccess'
  >,
  startHdClick: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/startHdClick'>,
  finishHdClick: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/finishHdClick'>,
  closeDialysisModal: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/closeDialysisModal'>,
  startHd: import('@reduxjs/toolkit').ActionCreatorWithPayload<StartHdForm, 'dialysis/startHd'>,
  initDialysisStorage: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/initDialysisStorage'>,
  initDialysisStorageSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    IndexedDbStorage<HdProgressRecord>,
    'dialysis/initDialysisStorageSuccess'
  >,
  addDialysisHdReadingToStorage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    HdProgressRecord,
    'dialysis/addDialysisHdReadingToStorage'
  >,
  submitDialysisHdReading: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/submitDialysisHdReading'>,
  addDialysisHdReadingToStorageSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/addDialysisHdReadingToStorageSuccess'>,
  deleteDialysisHdReadingsFromStorage: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/deleteDialysisHdReadingsFromStorage'>,
  deleteDialysisHdReadingsFromStorageSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/deleteDialysisHdReadingsFromStorageSuccess'>,
  sendDialysisStorageRecords: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/sendDialysisStorageRecords'>,
  sendDialysisStorageRecordsSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/sendDialysisStorageRecordsSuccess'>,
  updateDialysisHdReadingList: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      type?: UpdateHdRecordsType | undefined;
    },
    'dialysis/updateDialysisHdReadingList'
  >,
  updateDialysisHdReadingListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      savedRecords: HdProgressRecord[];
      allRecords: HdProgressRecord[];
    },
    'dialysis/updateDialysisHdReadingListSuccess'
  >,
  finishHd: import('@reduxjs/toolkit').ActionCreatorWithPayload<FinishHdForm, 'dialysis/finishHd'>,
  resetSubmitting: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/resetSubmitting'>,
  deleteDialysisStorage: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/deleteDialysisStorage'>,
  deleteDialysisStorageSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/deleteDialysisStorageSuccess'>,
  abortDialysis: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/abortDialysis'>,
  abortDialysisSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/abortDialysisSuccess'>,
  getPostHd: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/getPostHd'>,
  getPostHdSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<PostHd, 'dialysis/getPostHdSuccess'>,
  savePostHd: import('@reduxjs/toolkit').ActionCreatorWithPayload<PostHdRequest, 'dialysis/savePostHd'>,
  savePostHdSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<any, 'dialysis/savePostHdSuccess'>,
  finishAndSaveHdClick: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/finishAndSaveHdClick'>,
  finishAndSaveHd: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/finishAndSaveHd'>,
  finishAndSaveHdSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/finishAndSaveHdSuccess'>,
  openStartHDModal: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/openStartHDModal'>,
  editDialysisHdReading: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    EditHdReadingPayload,
    'dialysis/editDialysisHdReading'
  >,
  editDialysisHdReadingSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/editDialysisHdReadingSuccess'>,
  changeHdReadingRecordStatus: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    boolean,
    'dialysis/changeHdReadingRecordStatus'
  >,
  deleteDialysisHdReading: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'dialysis/deleteDialysisHdReading'
  >,
  deleteDialysisHdReadingSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/deleteDialysisHdReadingSuccess'>,
  saveAdministeringVaccinationMedication: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AdministerVaccinationMedicationPayload,
    'dialysis/saveAdministeringVaccinationMedication'
  >,
  saveAdministeringVaccinationMedicationSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/saveAdministeringVaccinationMedicationSuccess'>,
  setHasBeenRedirectedToAddAccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    boolean,
    'dialysis/setHasBeenRedirectedToAddAccess'
  >,
  skipAppointment: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    SkipAppointmentPayload,
    'dialysis/skipAppointment'
  >,
  skipAppointmentSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/skipAppointmentSuccess'>,
  addHighlightToRows: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AddHighlightToRowsPayload,
    'dialysis/addHighlightToRows'
  >,
  reactivateAppointment: import('@reduxjs/toolkit').ActionCreatorWithPayload<number, 'dialysis/reactivateAppointment'>,
  reactivateAppointmentSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/reactivateAppointmentSuccess'>,
  scrollToAccessManagementSection: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'dialysis/scrollToAccessManagementSection'>;
export declare const selectDialysisPre: () => any;
export declare const selectDialysisLoading: () => any;
export declare const selectDialysisIsFutureAppointment: () => any;
export declare const selectHemodialysisService: () => any;
export declare const selectLabOrdersService: () => any;
export declare const selectMedicationsService: () => any;
export declare const selectVaccinesService: () => any;
export declare const selectDialysisPatient: () => any;
export declare const selectDialysisStatus: () => any;
export declare const selectIsDisableInterface: () => any;
export declare const selectDialysisIsolationGroup: () => any;
export declare const selectDialysisAppointmentId: () => any;
export declare const selectDialysisAppointmentDate: () => any;
export declare const selectDialysisHdReadingRecords: () => any;
export declare const selectHdReadingRecordsHighlightList: () => any;
export declare const selectDialysisBay: () => any;
export declare const selectDialysisIsSubmitting: () => any;
export declare const selectDialysisInfoForProgress: () => DialysisProcessInfoForProgress;
export declare const selectDialysisPostHd: () => any;
export declare const selectDialysisStartTime: () => any;
export declare const selectHasBeenRedirectedToAddAccess: () => any;
export declare const selectDialysisSkipInfo: () => any;
export declare const selectWithDialysis: () => any;
declare const dialysisReducer: import('redux').Reducer<DialysisSliceState, import('redux').AnyAction>;
export default dialysisReducer;
