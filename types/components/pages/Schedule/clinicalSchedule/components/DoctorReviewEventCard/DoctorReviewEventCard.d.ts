/// <reference types="react" />
import { NephrologistVisitEvent, PICVisitEvent } from '@types';
type DoctorReviewEventCardProps = {
  event: PICVisitEvent | NephrologistVisitEvent;
};
export declare const DoctorReviewEventCard: ({ event }: DoctorReviewEventCardProps) => JSX.Element;
export {};
