import sortBy from 'lodash/sortBy';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import { ClinicalEvent, ClinicalEventFormType, ClinicalScheduleSliceState, ShiftsResponse } from '@types';

const initialState: ClinicalScheduleSliceState = {
  loading: false,
  error: null,
  clinicalScheduleDate: new Date(),
  events: {},
  shifts: [],
};

export const clinicalScheduleSlice = createSlice({
  name: 'clinicalSchedule',
  initialState,
  reducers: {
    setClinicalScheduleDate: (state, { payload }: PayloadAction<Date>) => {
      state.clinicalScheduleDate = payload;
      state.events = [];
      state.loading = true;
    },
    getEvents: (state) => {
      state.loading = true;
    },
    getEventsSuccess: (state, { payload }: PayloadAction<{ [key: number]: { [key: string]: ClinicalEvent[] } }>) => {
      state.events = payload;
      state.loading = false;
    },
    setClinicalScheduleError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
    },
    submitEventForm: (state, { payload }: PayloadAction<ClinicalEventFormType & { id?: string }>) => {
      state.loading = true;
    },
    getClinicalShiftList: () => {},
    getClinicalShiftListSuccess: (state, { payload }: PayloadAction<ShiftsResponse>) => {
      state.shifts = sortBy(payload, 'timeStart');
    },
    deleteEvent: (state, { payload }: PayloadAction<string>) => {
      state.loading = true;
    },
    clearEvents: (state) => {
      state.loading = false;
      state.error = null;
      state.clinicalScheduleDate = new Date();
      state.events = {};
      state.shifts = [];
    },
  },
});

export const {
  setClinicalScheduleDate,
  getEvents,
  setClinicalScheduleError,
  getEventsSuccess,
  submitEventForm,
  getClinicalShiftList,
  getClinicalShiftListSuccess,
  deleteEvent,
  clearEvents,
} = clinicalScheduleSlice.actions;

export const selectEvents = () => useAppSelector((state) => state.clinicalSchedule.events);
export const selectClinicalScheduleDate = () => useAppSelector((state) => state.clinicalSchedule.clinicalScheduleDate);
export const selectLoadingClinicalSchedule = () => useAppSelector((state) => state.clinicalSchedule.loading);
export const selectClinicalShiftList = () => useAppSelector((state) => state.clinicalSchedule.shifts);

const clinicalScheduleReducer = clinicalScheduleSlice.reducer;
export default clinicalScheduleReducer;
