export enum AccessCategory {
  VascularAccess = 'VASCULAR_ACCESS',
  CVC = 'CVC',
}

export enum VascularAccessType {
  AVF = 'AVF',
  AVG = 'AVG',
}

export enum AccessSide {
  Left = 'LEFT',
  Right = 'RIGHT',
}

export enum NeedleType {
  StandardAVF = 'STANDARD_AVF_NEEDLE',
  BluntAVF = 'BLUNT_AVF_NEEDLE',
  Single = 'SINGLE_NEEDLE',
}

export enum NeedleSize {
  Gauge17 = '17',
  Gauge16 = '16',
  Gauge15 = '15',
  Gauge14 = '14',
}

export enum CvcTimeCategory {
  Permanent = 'PERMANENT',
  Temporary = 'TEMPORARY',
}

export enum Instillation {
  Heparin = 'HEPARIN_UNITS_ML',
  Others = 'OTHERS',
}
