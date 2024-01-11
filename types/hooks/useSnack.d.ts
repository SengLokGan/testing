import type { SnackState } from '@types';
export declare const useSnack: () => {
  readonly displaySnack: (snack: SnackState) => void;
  readonly hideSnack: () => void;
};
