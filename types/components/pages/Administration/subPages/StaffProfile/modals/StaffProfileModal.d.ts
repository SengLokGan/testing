/// <reference types="react" />
import type { WithSx } from '@types';
import { FullScreenModalProps } from '@components';
type StaffProfileModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;
export declare const StaffProfileModal: ({ onClose, ...props }: StaffProfileModalProps) => JSX.Element;
export {};
