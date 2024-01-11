/// <reference types="react" />
import { FullScreenModalProps } from '@components';
import { WithSx } from '@types';
type DocumentsModalProps = WithSx<{}> & Omit<FullScreenModalProps, 'title'>;
export declare const DocumentsModal: ({ onClose, ...props }: DocumentsModalProps) => JSX.Element;
export {};
