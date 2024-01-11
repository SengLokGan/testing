import { ReactNode } from 'react';
type PartialConfirmModalConfig = Partial<{
  cancelButton: string;
  confirmButton: string;
  text: string;
  title: string;
  icon: ReactNode;
  closeCallback: () => void;
  cancelCallback: () => void;
}>;
export declare const useConfirmNavigation: (
  condition: boolean,
  allowedPaths?: string[],
  { cancelCallback, closeCallback, ...confirmModalConfig }?: PartialConfirmModalConfig,
) => void;
export {};
