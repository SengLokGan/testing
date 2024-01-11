import { injectionFixture, patientPlannedInjectionsFixture } from '@src/tests/fixtures';
import { Injection, PatientPlannedInjection } from '@types';

export const defaultInjectionsResponse: Injection[] = [injectionFixture({ id: 1 }), injectionFixture({ id: 2 })];

export const defaultPlannedInjectionsResponse: PatientPlannedInjection[] = [
  patientPlannedInjectionsFixture(),
  patientPlannedInjectionsFixture(),
  patientPlannedInjectionsFixture(),
];
