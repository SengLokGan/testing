export enum DaysOfWeek {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
}

export enum TwicePerWeek {
  'MondayWednesday' = 'MONDAY_WEDNESDAY',
  'MondayFriday' = 'MONDAY_FRIDAY',
  'WednesdayFriday' = 'WEDNESDAY_FRIDAY',
  'ThursdaySaturday' = 'THURSDAY_SATURDAY',
  'TuesdayThursday' = 'TUESDAY_THURSDAY',
  'TuesdaySaturday' = 'TUESDAY_SATURDAY',
}

export enum ThricePerWeek {
  'MondayWednesdayFriday' = 'MONDAY_WEDNESDAY_FRIDAY',
  'TuesdayThursdaySaturday' = 'TUESDAY_THURSDAY_SATURDAY',
}

export enum DialyzerUseType {
  Single = 'SINGLE_USE',
  Reuse = 'REUSE',
}

export enum HdType {
  Recurrent = 'RECURRENT',
  AdHoc = 'AD_HOC',
}

export enum HdPrescriptionPlace {
  AtHome = 'AT_HOME',
  InCenter = 'IN_CENTER',
}

export enum HdPrescriptionPrescriberSource {
  Internal = 'INTERNAL',
  External = 'EXTERNAL',
}
