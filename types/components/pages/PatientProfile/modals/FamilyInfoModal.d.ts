/// <reference types="react" />
import { FullScreenModalProps } from '@components';
import { WithSx } from '@types';
type FamilyInfoModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;
export declare const FamilyInfoModal: ({ onClose, ...props }: FamilyInfoModalProps) => JSX.Element;
export {};
