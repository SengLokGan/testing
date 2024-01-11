/// <reference types="react" />
import { EditHdReadingPayload } from '@store/slices/dialysisSlice';
import type { HdReadingForm, WithSx, HdReadingDataRequest } from '@types';
type DialysisHdReadingStepFormProps = WithSx<{
  onSubmit: (payload: EditHdReadingPayload | HdReadingDataRequest) => void;
  onClose?: () => void;
  data?: HdReadingForm;
  id?: number;
}>;
export declare const DialysisHdReadingStepForm: ({
  sx,
  data,
  id,
  onClose,
  onSubmit,
}: DialysisHdReadingStepFormProps) => JSX.Element;
export {};
