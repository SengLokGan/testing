/// <reference types="react" />
import { ClinicalScheduleEventType } from '@enums/pages/Schedule';
import { ClinicalEvent } from '@types';
type EventsListProps = {
  events: ClinicalEvent[];
  onClose: () => void;
  date: Date;
};
export declare const getEventTypeLabel: (type: ClinicalScheduleEventType) => string | null;
export declare const EventsList: ({ events, onClose, date }: EventsListProps) => JSX.Element;
export {};
