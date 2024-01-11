import { WithSx } from '@types';
import { PropsWithChildren } from 'react';
export type InfoModalProps = PropsWithChildren<
  WithSx<{
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onBackButtonClick?: () => void;
  }>
>;
export declare const InfoModal: ({
  isOpen,
  onBackButtonClick,
  title,
  children,
  onClose,
  sx,
}: InfoModalProps) => JSX.Element;
export default InfoModal;
