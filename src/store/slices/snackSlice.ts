import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import type { SnacksSliceState, SnackState } from '@types';

const initialState: SnacksSliceState = {
  snacks: [],
};

export const snackSlice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    addSnack: (
      state,
      {
        payload: { noDuplicates = true, clear = false, ...newSnack },
      }: PayloadAction<SnackState & { noDuplicates?: boolean; clear?: boolean }>,
    ) => {
      if (clear) state.snacks = [];

      const index = state.snacks.findIndex((snack) => snack.message === newSnack.message);

      if (noDuplicates && index !== -1) return;
      state.snacks.push({ timeout: 5000, ...newSnack });
    },
    clearSnack: (state) => {
      if (state.snacks.length) state.snacks.shift();
    },
    clearAllSnacks: (state) => {
      state.snacks = [];
    },
  },
});

export const { addSnack, clearSnack, clearAllSnacks } = snackSlice.actions;

export const selectSnacks = () => useAppSelector((state) => state.snack.snacks);

const snackReducer = snackSlice.reducer;
export default snackReducer;
