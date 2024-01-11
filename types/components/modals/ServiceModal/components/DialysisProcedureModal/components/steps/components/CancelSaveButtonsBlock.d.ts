/// <reference types="react" />
type CancelSaveButtonsBlockProps = {
  isDirty: boolean;
  reset: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};
export declare const CancelSaveButtonsBlock: ({
  isDirty,
  reset,
  onSubmit,
  isSubmitting,
}: CancelSaveButtonsBlockProps) => JSX.Element;
export {};
