/// <reference types="react" />
import type { WithSx } from '@types';
import { FullScreenModalProps } from '@components';
type ClinicalInfoModalProps = WithSx<Omit<FullScreenModalProps, 'title'>>;
export declare const ClinicalInfoModal: ({ onClose, ...props }: ClinicalInfoModalProps) => JSX.Element;
export {};
