import { PayloadAction } from '@reduxjs/toolkit';
import { DrawerType } from '@enums/containers/DrawerWrapper';
import type {
  DrawerFull,
  DrawerFullPartial,
  DrawerSliceState,
  DrawerStatuses,
  DrawerWithOptionalStatuses,
  WithDrawerType,
} from '@types';
export declare const initialStatuses: DrawerStatuses;
export declare const drawerSlice: import('@reduxjs/toolkit').Slice<
  DrawerSliceState,
  {
    addDrawer: (
      state: import('immer/dist/internal').WritableDraft<DrawerSliceState>,
      {
        payload: { type, ...payload },
      }: PayloadAction<WithDrawerType<Partial<DrawerWithOptionalStatuses>>>,
    ) => void;
    addDrawerSuccess: (
      state: import('immer/dist/internal').WritableDraft<DrawerSliceState>,
      { payload: drawerType }: PayloadAction<DrawerType>,
    ) => void;
    removeDrawer: (
      state: import('immer/dist/internal').WritableDraft<DrawerSliceState>,
      { payload: drawerType }: PayloadAction<DrawerType>,
    ) => void;
    removeDrawerSuccess: (
      state: import('immer/dist/internal').WritableDraft<DrawerSliceState>,
      { payload: drawerType }: PayloadAction<DrawerType>,
    ) => void;
    collapseAllDrawers: (state: import('immer/dist/internal').WritableDraft<DrawerSliceState>) => void;
    expandAllDrawers: (state: import('immer/dist/internal').WritableDraft<DrawerSliceState>) => void;
    updateDrawer: (
      state: import('immer/dist/internal').WritableDraft<DrawerSliceState>,
      {
        payload: { type, ...payload },
      }: PayloadAction<WithDrawerType<DrawerFullPartial>>,
    ) => void;
    removeAllDrawers: () => DrawerSliceState;
  },
  'drawer'
>;
export declare const addDrawer: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    WithDrawerType<Partial<DrawerWithOptionalStatuses>>,
    'drawer/addDrawer'
  >,
  addDrawerSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<DrawerType, 'drawer/addDrawerSuccess'>,
  removeDrawer: import('@reduxjs/toolkit').ActionCreatorWithPayload<DrawerType, 'drawer/removeDrawer'>,
  removeDrawerSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<DrawerType, 'drawer/removeDrawerSuccess'>,
  expandAllDrawers: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'drawer/expandAllDrawers'>,
  collapseAllDrawers: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'drawer/collapseAllDrawers'>,
  removeAllDrawers: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'drawer/removeAllDrawers'>,
  updateDrawer: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    WithDrawerType<Partial<DrawerFull>>,
    'drawer/updateDrawer'
  >;
export declare const selectDrawerStatus: (type: DrawerType) => any;
export declare const selectHasActiveDrawers: () => boolean;
export declare const selectActiveDrawers: () => any;
export declare const selectDrawerPayload: (type: DrawerType) => any;
declare const drawerReducer: import('redux').Reducer<DrawerSliceState, import('redux').AnyAction>;
export default drawerReducer;
