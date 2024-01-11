import { PayloadAction } from '@reduxjs/toolkit';
import { ClinicalEvent, ClinicalEventFormType, ClinicalScheduleSliceState, ShiftsResponse } from '@types';
export declare const clinicalScheduleSlice: import('@reduxjs/toolkit').Slice<
  ClinicalScheduleSliceState,
  {
    setClinicalScheduleDate: (
      state: import('immer/dist/internal').WritableDraft<ClinicalScheduleSliceState>,
      { payload }: PayloadAction<Date>,
    ) => void;
    getEvents: (state: import('immer/dist/internal').WritableDraft<ClinicalScheduleSliceState>) => void;
    getEventsSuccess: (
      state: import('immer/dist/internal').WritableDraft<ClinicalScheduleSliceState>,
      {
        payload,
      }: {
        payload: {
          [key: number]: {
            [key: string]: ClinicalEvent[];
          };
        };
        type: string;
      },
    ) => void;
    setClinicalScheduleError: (
      state: import('immer/dist/internal').WritableDraft<ClinicalScheduleSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    submitEventForm: (
      state: import('immer/dist/internal').WritableDraft<ClinicalScheduleSliceState>,
      {
        payload,
      }: PayloadAction<
        ClinicalEventFormType & {
          id?: string;
        }
      >,
    ) => void;
    getClinicalShiftList: () => void;
    getClinicalShiftListSuccess: (
      state: import('immer/dist/internal').WritableDraft<ClinicalScheduleSliceState>,
      { payload }: PayloadAction<ShiftsResponse>,
    ) => void;
    deleteEvent: (
      state: import('immer/dist/internal').WritableDraft<ClinicalScheduleSliceState>,
      { payload }: PayloadAction<string>,
    ) => void;
    clearEvents: (state: import('immer/dist/internal').WritableDraft<ClinicalScheduleSliceState>) => void;
  },
  'clinicalSchedule'
>;
export declare const setClinicalScheduleDate: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Date,
    'clinicalSchedule/setClinicalScheduleDate'
  >,
  getEvents: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'clinicalSchedule/getEvents'>,
  setClinicalScheduleError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'clinicalSchedule/setClinicalScheduleError'
  >,
  getEventsSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      [key: number]: {
        [key: string]: ClinicalEvent[];
      };
    },
    'clinicalSchedule/getEventsSuccess'
  >,
  submitEventForm: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ClinicalEventFormType & {
      id?: string | undefined;
    },
    'clinicalSchedule/submitEventForm'
  >,
  getClinicalShiftList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'clinicalSchedule/getClinicalShiftList'>,
  getClinicalShiftListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ShiftsResponse,
    'clinicalSchedule/getClinicalShiftListSuccess'
  >,
  deleteEvent: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'clinicalSchedule/deleteEvent'>,
  clearEvents: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'clinicalSchedule/clearEvents'>;
export declare const selectEvents: () => any;
export declare const selectClinicalScheduleDate: () => any;
export declare const selectLoadingClinicalSchedule: () => any;
export declare const selectClinicalShiftList: () => any;
declare const clinicalScheduleReducer: import('redux').Reducer<ClinicalScheduleSliceState, import('redux').AnyAction>;
export default clinicalScheduleReducer;
