/// <reference types="react" />
import { ActiveService, OneDayCalendarAppointment } from '@types';
type ServiceDotMenuProps = {
  activeService: ActiveService | null;
  onClose: () => void;
  appointment: OneDayCalendarAppointment;
};
export declare const ServiceDotMenu: ({
  activeService,
  onClose,
  appointment,
}: ServiceDotMenuProps) => JSX.Element | null;
export {};
