/// <reference types="react" />
import { ClinicalEvent } from '@types';
type EventsCardProps = {
  onClose: () => void;
  date: Date;
  events: ClinicalEvent[];
};
export declare const EventsCard: ({ onClose, date, events }: EventsCardProps) => JSX.Element | null;
export {};
