import { AccessCondition, DialyzerUseType, Instillation, NeedleSize, NeedleType, PatientCondition } from '@enums';
import { AutocompleteFreeSoloOptionType } from '@components/autocompletes/AutocompleteFreeSolo/AutocompleteFreeSolo';

export interface AccessForm {
  needleType?: NeedleType;
  arterialNeedleSize?: NeedleSize;
  venousNeedleSize?: NeedleSize;
  instillation?: Instillation;
  instillationExtValue?: string;
  wasUsed?: boolean;
}

export interface PreHDForm {
  initialBayNumber: string;
  initialTreatmentNumber: string | number;
  initialToday: Date;
  initialDuration: string;
  preSessionWeight: { label: string; value: string };
  lastSessionWeight: string;
  idwg: string;
  dryWeight: string;
  weightDifference: string;
  reinfusionVolume: string;
  flushesInfusion: string;
  ufTarget: string;
  standingSystolicBloodPressure: string | number;
  standingDiastolicBloodPressure: string | number;
  standingPulse: string | number;
  sittingSystolicBloodPressure: string | number;
  sittingDiastolicBloodPressure: string | number;
  sittingPulse: string | number;
  bodyTemperature: string | number;
  patientCondition: PatientCondition;
  patientConditionExtValue: string;
  accessCondition: AccessCondition;
  accessConditionExtValue: string;
  access: AccessForm[];
  anticoagulantType: AutocompleteFreeSoloOptionType;
  anticoagulantPrimeDose: string | number;
  anticoagulantBolusDose: string | number;
  anticoagulantHourlyDose: string | number;
  dialysateCalcium: number | string;
  dialysateSodiumStart: number | string;
  dialysateSodiumEnd: number | string;
  dialysatePotassium: number | string;
  dialysateTemperature: number | string;
  dialysateFlow: number | string;
  notes?: string;
  useType: DialyzerUseType;
  dialyzerBrand: AutocompleteFreeSoloOptionType;
  dialyzerSurfaceArea: string;
  dialyzerPrimedBy: AutocompleteFreeSoloOptionType;
  dialyzerReuseNum: number | string;
  dialyzerSterilantVeComment: string;
  dialyzerTestedBy: AutocompleteFreeSoloOptionType;
  residualTestedBy: AutocompleteFreeSoloOptionType;
  residualVe: boolean;
  sterilantVe: boolean;
  newDialyzer: boolean;
}

export interface StartHdForm {
  startedAt: Date;
}

export interface FinishHdForm {
  endsAt: Date;
}
