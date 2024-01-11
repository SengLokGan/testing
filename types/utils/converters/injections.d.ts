import type { PatientPlannedInjection, Shift, TodayPatientsShiftsWithPatients } from '@types';
export declare const convertPlannedInjectionsToShiftsWithInjections: (
  shifts: Shift[],
  plannedInjections: PatientPlannedInjection[],
) => TodayPatientsShiftsWithPatients;
