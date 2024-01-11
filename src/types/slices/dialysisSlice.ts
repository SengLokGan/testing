import { IndexedDbStorage } from '@services';
import { HdProgressRecord, Dialysis, DialysisPatient, PostHd, DialysisServicesResponse } from '@types';
import { DialysisStatus, RowHighlightType } from '@enums';

export interface DialysisSliceState {
  loading: boolean;
  isFutureAppointment: boolean;
  isSubmitting: boolean;
  error: any;
  saveSuccess: boolean;
  preHd: Dialysis | null;
  hdReading: {
    rowsHighlight: { id: number; type: RowHighlightType }[];
    storage?: IndexedDbStorage<HdProgressRecord> | null;
    savedRecords: HdProgressRecord[];
    allRecords: HdProgressRecord[];
    isEditing: boolean;
  };
  postHd: PostHd | null;
  appointmentId: string | null;
  date: string | null;
  dialysisId: string | null;
  isolationGroup: { id: number; name: string } | null;
  patient: DialysisPatient | null;
  status: {
    activeStep: DialysisStatus;
    currentStep: DialysisStatus;
  };
  startTime?: string;
  endTime?: string;
  bay?: string;
  services: DialysisServicesResponse;
  hasBeenRedirectedToAddAccess: boolean;
  withDialysis: boolean;
}
