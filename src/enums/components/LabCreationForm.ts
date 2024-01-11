export enum LabSpecimenType {
  BLOOD = 'BLOOD',
  URINE = 'URINE',
  FAECES = 'FAECES',
  SWAB = 'SWAB',
  SPUTUM = 'SPUTUM',
  FLUIDS = 'FLUIDS',
  BLOOD_CULTURE_VIAL = 'BLOOD_CULTURE_VIAL',
}

export enum LabOrderType {
  QUARTERLY = 'QUARTERLY',
  INDIVIDUAL = 'INDIVIDUAL',
  URGENT = 'URGENT',
}

export enum LabMealStatus {
  UNKNOWN = 'UNKNOWN',
  FASTING = 'FASTING',
  NON_FASTING = 'NON_FASTING',
}

export enum LabPriority {
  ROUTINE = 'ROUTINE',
  URGENT = 'URGENT',
}
