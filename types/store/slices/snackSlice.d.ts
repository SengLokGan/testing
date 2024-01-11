import { PayloadAction } from '@reduxjs/toolkit';
import type { SnacksSliceState, SnackState } from '@types';
export declare const snackSlice: import('@reduxjs/toolkit').Slice<
  SnacksSliceState,
  {
    addSnack: (
      state: import('immer/dist/internal').WritableDraft<SnacksSliceState>,
      {
        payload: { noDuplicates, clear, ...newSnack },
      }: {
        payload: SnackState & {
          noDuplicates?: boolean | undefined;
          clear?: boolean | undefined;
        };
        type: string;
      },
    ) => void;
    clearSnack: (state: import('immer/dist/internal').WritableDraft<SnacksSliceState>) => void;
    clearAllSnacks: (state: import('immer/dist/internal').WritableDraft<SnacksSliceState>) => void;
  },
  'snack'
>;
export declare const addSnack: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    SnackState & {
      noDuplicates?: boolean | undefined;
      clear?: boolean | undefined;
    },
    'snack/addSnack'
  >,
  clearSnack: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'snack/clearSnack'>,
  clearAllSnacks: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'snack/clearAllSnacks'>;
export declare const selectSnacks: () => any;
declare const snackReducer: import('redux').Reducer<SnacksSliceState, import('redux').AnyAction>;
export default snackReducer;
