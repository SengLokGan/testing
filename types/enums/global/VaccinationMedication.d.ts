export declare enum VaccineMedicationServiceType {
  Medication = 'MEDICATION',
  Vaccine = 'VACCINE',
}
export declare enum VaccinationType {
  ToAdminister = 'INTERNAL_TO_ADMINISTER',
  Administered = 'EXTERNAL_ADMINISTERED',
}
export declare enum VaccinationDossingSchedule {
  First = 'FIRST',
  Second = 'SECOND',
  Third = 'THIRD',
  Forth = 'FORTH',
  Booster = 'BOOSTER',
  Single = 'SINGLE',
}
export declare enum VaccinationStatus {
  NotDone = 'NOT_DONE',
  Pending = 'PENDING',
  AdministeredExternal = 'ADMINISTERED_EXTERNAL',
  AdministeredInternal = 'ADMINISTERED_INTERNAL',
  Omitted = 'OMITTED',
}
export declare enum VaccinationMedicationAdministeringStatus {
  Omit = 0,
  Administering = 1,
}
export declare enum VaccinationMedicationModalType {
  Editing = 0,
  Adding = 1,
}
export declare enum VaccineMedicationOmittingStatus {
  Rescheduled = 'RESCHEDULED',
  Omitted = 'OMITTED',
}
export declare enum VaccinationMedicationResolution {
  Rescheduled = 'RESCHEDULED',
  Administered = 'ADMINISTERED',
  Omitted = 'OMITTED',
}
