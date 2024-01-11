/// <reference types="react" />
import { DialysisMachineStatus as DialysisMachineStatusEnum } from '@enums';
interface DialysisMachineStatusProps {
  caption?: boolean;
  status?: DialysisMachineStatusEnum;
}
export declare const DialysisMachineStatus: ({ caption, status }: DialysisMachineStatusProps) => JSX.Element | null;
export {};
