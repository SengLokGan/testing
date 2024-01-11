import { PropsWithChildren } from 'react';
import type { WithSx } from '@types';
export type FullScreenModalProps = PropsWithChildren<
  WithSx<{
    isOpen: boolean;
    title: string;
    onClose: () => void;
    titleBlockColor?: string;
    contentBlockColor?: string;
  }>
>;
export declare const FullScreenModal: ({
  isOpen,
  title,
  onClose,
  children,
  titleBlockColor,
  contentBlockColor,
  sx,
}: FullScreenModalProps) => JSX.Element;
