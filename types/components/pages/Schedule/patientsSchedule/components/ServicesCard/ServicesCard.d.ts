import { ReactElement } from 'react';
import { OneDayCalendarAppointment } from '@types';
type ServicesCardProps = {
  onClose: () => void;
  appointment: OneDayCalendarAppointment;
  icon: ReactElement;
  timeLeft: number;
};
export declare const ServicesCard: ({ onClose, appointment, icon, timeLeft }: ServicesCardProps) => JSX.Element;
export {};
