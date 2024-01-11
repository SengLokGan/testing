import { ReactElement } from 'react';
import { OneDayCalendarAppointment, ShortServices } from '@types';
type ServicesListProps = {
  services: ShortServices;
  cardRef: HTMLElement | null;
  icon: ReactElement;
  timeLeft: number;
  onClose: () => void;
  appointment: OneDayCalendarAppointment;
};
export declare const POPUP_WIDTH = 336;
export declare const ServicesList: ({
  services,
  cardRef,
  icon,
  timeLeft,
  onClose,
  appointment,
}: ServicesListProps) => JSX.Element;
export {};
