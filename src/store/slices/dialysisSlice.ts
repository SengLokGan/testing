import { compareAsc, endOfDay, isAfter, startOfDay } from 'date-fns';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import intersection from 'lodash/intersection';
import { useAppSelector } from '@hooks/storeHooks';
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
  UserPermissions,
  VaccinationMedicationModalType,
  VaccineMedicationServiceType,
} from '@enums';
import { getTenantEndCurrentDay, getTenantStartCurrentDay } from '@utils/getTenantDate';

const initialState: DialysisSliceState = {
  loading: false,
  isFutureAppointment: false,
  isSubmitting: false,
  error: undefined,
  saveSuccess: false,
  patient: null,
  appointmentId: '',
  date: null,
  dialysisId: '',
  isolationGroup: null,
  status: {
    activeStep: DialysisStatus.CheckIn,
    currentStep: DialysisStatus.CheckIn,
  },
  startTime: '',
  endTime: '',
  bay: '',
  services: {
    labOrders: [],
    hemodialysis: {},
    medications: [],
    vaccines: [],
    skipInfo: {},
  },
  preHd: null,
  hdReading: {
    rowsHighlight: [],
    storage: null,
    savedRecords: [],
    allRecords: [],
    isEditing: false,
  },
  postHd: null,
  hasBeenRedirectedToAddAccess: false,
  withDialysis: false,
};

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

export const dialysisSlice = createSlice({
  name: 'dialysis',
  initialState,
  reducers: {
    getInitDialysisData: (
      state,
      { payload }: PayloadAction<{ appointmentId: string; openOnStep?: DialysisStatus }>,
    ) => {
      state.loading = true;
    },
    getInitialDialysisDataSuccess: (state, { payload }: PayloadAction<DialysisSummary>) => {
      return {
        ...state,
        ...payload,
        loading: false,
        isFutureAppointment: isAfter(endOfDay(new Date(payload.date)), getTenantEndCurrentDay()),
        error: undefined,
      };
    },
    clearInitialDialysisData: (state) => initialState,
    addDialysisError: (state, { payload }: PayloadAction<Error>) => {
      state.loading = false;
      state.isSubmitting = false;
      state.saveSuccess = false;
      state.error = payload?.message;
    },
    getDialysis: (state) => {
      state.loading = true;
    },
    getDialysisPreSuccess: (state, { payload }: PayloadAction<Dialysis>) => {
      state.preHd = payload;
      state.loading = false;
      state.error = undefined;
    },
    getServices: (state) => {
      state.loading = true;
    },
    getServicesSuccess: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.services = payload;
    },
    setCurrentStep: (state, { payload }: PayloadAction<DialysisStatus>) => {
      state.status.currentStep = payload;
    },
    saveDialysisPre: (state, { payload }: PayloadAction<PreDialysisRequest>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    saveDialysisPreSuccess: (state, { payload }: PayloadAction<Dialysis>) => {
      state.preHd = payload;
      state.loading = false;
      state.error = undefined;
      state.saveSuccess = true;
    },
    startHdClick: () => {},
    openStartHDModal: () => {},
    startHd: (state, { payload }: PayloadAction<StartHdForm>) => {
      state.isSubmitting = true;
    },
    finishHdClick: () => {},
    finishHd: (state, { payload }: PayloadAction<FinishHdForm>) => {
      state.isSubmitting = true;
    },
    closeDialysisModal: () => {},
    resetSubmitting: (state) => {
      state.isSubmitting = false;
    },
    initDialysisStorage: () => {},
    initDialysisStorageSuccess: (state, { payload }: PayloadAction<IndexedDbStorage<HdProgressRecord>>) => {
      state.hdReading.storage = payload;
      state.hdReading.savedRecords = [];
      state.hdReading.allRecords = [];
    },
    submitDialysisHdReading: () => {},
    addDialysisHdReadingToStorage: (state, { payload }: PayloadAction<HdProgressRecord>) => {},
    editDialysisHdReading: (state, { payload }: PayloadAction<EditHdReadingPayload>) => {
      state.loading = true;
    },
    deleteDialysisHdReading: (state, { payload }: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteDialysisHdReadingSuccess: () => {},
    editDialysisHdReadingSuccess: () => {},
    addDialysisHdReadingToStorageSuccess: () => {},
    deleteDialysisHdReadingsFromStorage: () => {},
    deleteDialysisHdReadingsFromStorageSuccess: () => {},
    sendDialysisStorageRecords: (state) => {
      state.loading = true;
      state.isSubmitting = true;
    },
    sendDialysisStorageRecordsSuccess: (state) => {
      state.isSubmitting = false;
    },
    updateDialysisHdReadingList: (state, { payload }: PayloadAction<{ type?: UpdateHdRecordsType }>) => {
      state.loading = true;
    },
    updateDialysisHdReadingListSuccess: (
      state,
      { payload }: PayloadAction<{ savedRecords: HdProgressRecord[]; allRecords: HdProgressRecord[] }>,
    ) => {
      state.loading = false;
      state.hdReading.savedRecords = payload.savedRecords;
      state.hdReading.allRecords = payload.allRecords;
    },
    deleteDialysisStorage: () => {},
    deleteDialysisStorageSuccess: () => {},
    abortDialysis: (state) => {
      state.loading = true;
    },
    abortDialysisSuccess: () => {
      return { ...initialState };
    },
    getPostHd: (state) => {
      state.loading = true;
    },
    getPostHdSuccess: (state, { payload }: PayloadAction<PostHd>) => {
      state.loading = false;
      state.postHd = payload;
    },
    savePostHd: (state, { payload }: PayloadAction<PostHdRequest>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    savePostHdSuccess: (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.saveSuccess = true;
    },
    finishAndSaveHdClick: () => {},
    finishAndSaveHd: (state) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    finishAndSaveHdSuccess: (state) => {
      state.loading = false;
      state.saveSuccess = true;
    },
    saveAdministeringVaccinationMedication: (
      state,
      { payload }: PayloadAction<AdministerVaccinationMedicationPayload>,
    ) => {
      state.isSubmitting = true;
      state.saveSuccess = false;
    },
    saveAdministeringVaccinationMedicationSuccess: (state) => {
      state.isSubmitting = false;
      state.saveSuccess = true;
    },
    changeHdReadingRecordStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.hdReading.isEditing = payload;
    },
    setHasBeenRedirectedToAddAccess: (state, { payload }: PayloadAction<boolean>) => {
      state.hasBeenRedirectedToAddAccess = payload;
    },
    skipAppointment: (state, { payload }: PayloadAction<SkipAppointmentPayload>) => {
      state.loading = true;
    },
    skipAppointmentSuccess: (state) => {
      state.loading = false;
    },
    reactivateAppointment: (state, { payload }: PayloadAction<number>) => {
      state.loading = true;
    },
    reactivateAppointmentSuccess: (state) => {
      state.loading = false;
    },
    addHighlightToRows: (state, { payload }: PayloadAction<AddHighlightToRowsPayload>) => {
      state.hdReading.rowsHighlight = payload.rows;
    },
    scrollToAccessManagementSection: () => {},
  },
});

export const {
  getDialysis,
  getServices,
  setCurrentStep,
  addDialysisError,
  getInitDialysisData,
  getInitialDialysisDataSuccess,
  getServicesSuccess,
  clearInitialDialysisData,
  getDialysisPreSuccess,
  saveDialysisPre,
  saveDialysisPreSuccess,
  startHdClick,
  finishHdClick,
  closeDialysisModal,
  startHd,
  initDialysisStorage,
  initDialysisStorageSuccess,
  addDialysisHdReadingToStorage,
  submitDialysisHdReading,
  addDialysisHdReadingToStorageSuccess,
  deleteDialysisHdReadingsFromStorage,
  deleteDialysisHdReadingsFromStorageSuccess,
  sendDialysisStorageRecords,
  sendDialysisStorageRecordsSuccess,
  updateDialysisHdReadingList,
  updateDialysisHdReadingListSuccess,
  finishHd,
  resetSubmitting,
  deleteDialysisStorage,
  deleteDialysisStorageSuccess,
  abortDialysis,
  abortDialysisSuccess,
  getPostHd,
  getPostHdSuccess,
  savePostHd,
  savePostHdSuccess,
  finishAndSaveHdClick,
  finishAndSaveHd,
  finishAndSaveHdSuccess,
  openStartHDModal,
  editDialysisHdReading,
  editDialysisHdReadingSuccess,
  changeHdReadingRecordStatus,
  deleteDialysisHdReading,
  deleteDialysisHdReadingSuccess,
  saveAdministeringVaccinationMedication,
  saveAdministeringVaccinationMedicationSuccess,
  setHasBeenRedirectedToAddAccess,
  skipAppointment,
  skipAppointmentSuccess,
  addHighlightToRows,
  reactivateAppointment,
  reactivateAppointmentSuccess,
  scrollToAccessManagementSection,
} = dialysisSlice.actions;

export const selectDialysisPre = () => useAppSelector((state) => state.dialysis.preHd);
export const selectDialysisLoading = () => useAppSelector((state) => state.dialysis.loading);
export const selectDialysisIsFutureAppointment = () => useAppSelector((state) => state.dialysis.isFutureAppointment);
export const selectHemodialysisService = () => useAppSelector((state) => state.dialysis.services?.hemodialysis);
export const selectLabOrdersService = () => useAppSelector((state) => state.dialysis.services?.labOrders);
export const selectMedicationsService = () => useAppSelector((state) => state.dialysis.services?.medications);
export const selectVaccinesService = () => useAppSelector((state) => state.dialysis.services?.vaccines);
export const selectDialysisPatient = () => useAppSelector((state) => state.dialysis.patient);
export const selectDialysisStatus = () => useAppSelector((state) => state.dialysis.status);
export const selectIsDisableInterface = () =>
  useAppSelector((state) => {
    const isHasNotPermissions = !intersection(state.user.user?.permissions, [
      UserPermissions.DialysisAddMeasurement,
      UserPermissions.DialysisEditMeasurement,
    ]).length;

    const isPastTenantDate = compareAsc(getTenantStartCurrentDay(), startOfDay(new Date(state.dialysis.date!))) === 1;
    return (
      state.dialysis.status.activeStep === DialysisStatus.Completed ||
      isHasNotPermissions ||
      isPastTenantDate ||
      state.dialysis?.isFutureAppointment
    );
  });
export const selectDialysisIsolationGroup = () => useAppSelector((state) => state.dialysis.isolationGroup);
export const selectDialysisAppointmentId = () => useAppSelector((state) => state.dialysis.appointmentId);
export const selectDialysisAppointmentDate = () => useAppSelector((state) => state.dialysis.date);
export const selectDialysisHdReadingRecords = () => useAppSelector((state) => state.dialysis.hdReading.allRecords);
export const selectHdReadingRecordsHighlightList = () =>
  useAppSelector((state) => state.dialysis.hdReading.rowsHighlight);
export const selectDialysisBay = () => useAppSelector((state) => state.dialysis.bay);
export const selectDialysisIsSubmitting = () => useAppSelector((state) => state.dialysis.isSubmitting);
export const selectDialysisInfoForProgress = (): DialysisProcessInfoForProgress => ({
  status: selectDialysisStatus().activeStep,
  startTime: useAppSelector((state) => state.dialysis.startTime),
  endTime: useAppSelector((state) => state.dialysis.endTime),
  bay: useAppSelector((state) => state.dialysis.bay),
});
export const selectDialysisPostHd = () => useAppSelector((state) => state.dialysis.postHd);
export const selectDialysisStartTime = () => useAppSelector((state) => state.dialysis.startTime);
export const selectHasBeenRedirectedToAddAccess = () =>
  useAppSelector((state) => state.dialysis.hasBeenRedirectedToAddAccess);
export const selectDialysisSkipInfo = () => useAppSelector((state) => state.dialysis.services?.skipInfo);
export const selectWithDialysis = () => useAppSelector((state) => state.dialysis.withDialysis);

const dialysisReducer = dialysisSlice.reducer;
export default dialysisReducer;
