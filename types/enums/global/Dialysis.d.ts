export declare enum HdReadingOfflineOperationType {
  Create = 'CREATE',
  Update = 'UPDATE',
  Delete = 'DELETE',
}
export declare enum DialysisStatus {
  CheckIn = 'CHECK_IN',
  PreDialysis = 'PRE_DIALYSIS',
  HDReading = 'HD_READING',
  PostDialysis = 'POST_DIALYSIS',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}
export declare enum DialysisSubmitSource {
  HEADER = 0,
  FORM = 1,
}
export declare enum AppointmentSkipReason {
  PatientRequest = 'PATIENT_REQUEST',
  PatientHospitalized = 'PATIENT_WAS_HOSPITALIZED',
  PatientTemporaryTransferred = 'TRANSFERRED',
  PatientAbsent = 'PATIENT_WAS_ABSENT',
  TechnicalIssue = 'TECHNICAL_ISSUE',
}
export declare enum AppointmentEventPlace {
  Services = 0,
  Scheduler = 1,
}
