/// <reference types="react" />
import { FullScreenModalProps } from '@components';
type TreatmentInfoModalProps = Omit<FullScreenModalProps, 'title'>;
export declare const TreatmentInfoModal: ({ onClose, ...props }: TreatmentInfoModalProps) => JSX.Element;
export {};
