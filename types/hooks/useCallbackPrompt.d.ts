export declare function useCallbackPrompt(
  condition: boolean,
  allowedPath?: string[],
): {
  showPrompt: boolean;
  confirmNavigation: () => void;
  cancelNavigation: () => void;
};
