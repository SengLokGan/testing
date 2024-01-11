import { HemodialysisServices, ShiftServices } from '@types';
import { ReactElement } from 'react';
type HemodialysisServiceProps = {
  openServicesScreen: () => void;
  hemodialysis: HemodialysisServices;
  shift: ShiftServices;
  icon: ReactElement;
  timeLeft: number;
};
export declare const HemodialysisService: ({
  openServicesScreen,
  hemodialysis,
  shift,
  icon,
  timeLeft,
}: HemodialysisServiceProps) => JSX.Element;
export {};
