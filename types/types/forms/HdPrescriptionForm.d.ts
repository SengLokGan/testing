import type { AutocompleteFreeSoloAsyncOptionType } from '@types';
import { HdPrescriptionStatuses, DialyzerUseType, DaysOfWeek, HdType, HDPrescriptionScheduleFrequency } from '@enums';
import { DoctorRequestType } from '@types';
export interface HdPrescriptionForm {
  status?: HdPrescriptionStatuses;
  prescriptionDate: Date | string;
  prescribedBy?: AutocompleteFreeSoloAsyncOptionType;
  bloodFlow?: number;
  dryWeight?: number;
  dialyzerUseType?: DialyzerUseType;
  dialyzerBrand?: string;
  surfaceArea?: number;
  calcium?: number;
  sodiumStart?: number;
  sodiumEnd?: number;
  potassium?: number;
  temperature?: number;
  flow?: number;
  anticoagulantType?: string;
  primeDose?: number;
  bolusDose?: number;
  hourlyDose?: number;
  comments?: string;
  schedule?: {
    recurrent?: {
      frequency?: HDPrescriptionScheduleFrequency;
      daysOfWeek?: DaysOfWeek[];
      shift?: {
        id: number;
        name: string;
      };
      startedAt: Date | string;
      endsAt: Date | string;
      duration: number;
    };
    adHoc?: {
      dateShifts: {
        duration: number;
        shiftId: string;
        date: string;
      }[];
    };
  };
}
export interface DateShifts {
  date: Date | null;
  shiftId: string;
  duration: number;
}
export interface HdSchedulingForm {
  hdType?: HdType;
  daysOfWeek?: DaysOfWeek;
  frequency?: HDPrescriptionScheduleFrequency;
  shift?: {
    shiftId: number;
    days: DaysOfWeek[];
  };
  duration: number;
  startDate: Date | null | string;
  endDate: Date | null | string;
  hdSession?: number;
  dateShifts?: DateShifts[];
}
export interface HdSchedulingData extends Omit<HdSchedulingForm, 'shift'> {
  shift?: {
    shiftId: number;
    shiftName: string;
    day?: DaysOfWeek;
  };
}
export type HdPrescriptionRequest = Omit<
  HdPrescriptionForm,
  'frequency' | 'daysOfWeek' | 'prescribedBy' | 'dateShifts'
> & {
  prescribedBy: DoctorRequestType;
  schedule: {
    recurrent?: {
      startedAt: Date | string;
      endsAt: Date | string;
      duration: number;
      frequency: HDPrescriptionScheduleFrequency;
      daysOfWeek: DaysOfWeek[];
      shiftId: number;
    };
    adHoc?: {
      dateShifts: {
        date: string;
        shiftId: string;
        duration: number;
      }[];
    };
  };
};
