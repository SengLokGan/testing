/// <reference types="react" />
import { FullScreenModalProps } from '@components';
import type { WithSx } from '@types';
type RegisterPatientModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;
export declare const RegisterPatientModal: ({ onClose, ...props }: RegisterPatientModalProps) => JSX.Element;
export {};
