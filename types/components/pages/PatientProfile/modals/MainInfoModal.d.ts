/// <reference types="react" />
import type { WithSx } from '@types';
import { FullScreenModalProps } from '@components';
type MainInfoModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;
export declare const MainInfoModal: ({ onClose, ...props }: MainInfoModalProps) => JSX.Element;
export {};
