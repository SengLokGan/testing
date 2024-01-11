import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import { DrawerType } from '@enums/containers/DrawerWrapper';
import { DrawerStatus } from '@enums/components/Drawer';
import type {
  DrawerFull,
  DrawerFullPartial,
  DrawerSliceState,
  DrawerStatuses,
  DrawerWithOptionalStatuses,
  WithDrawerType,
  RootState,
} from '@types';

export const initialStatuses: DrawerStatuses = { isDirty: false };

const initialState: DrawerSliceState = {};

const initialDrawer: DrawerFull = {
  status: DrawerStatus.Hidden,
  nextStatus: DrawerStatus.Hidden,
  payload: {},
  collapsable: true,
  allowedPathsToShowDrawer: [],
  statuses: {
    isDirty: false,
  },
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    addDrawer: (
      state,
      { payload: { type, ...payload } }: PayloadAction<WithDrawerType<Partial<DrawerWithOptionalStatuses>>>,
    ) => {
      const drawerData = {
        ...initialDrawer,
        ...payload,
        status: DrawerStatus.Hidden,
        nextStatus: DrawerStatus.Showed,
        statuses: initialStatuses,
        transition: false,
      };
      if (payload.statuses) drawerData.statuses = { ...drawerData.statuses, ...payload.statuses };
      state[type] = drawerData;
    },
    addDrawerSuccess: (state, { payload: drawerType }: PayloadAction<DrawerType>) => {
      if (drawerType in state) {
        state[drawerType]!.status = DrawerStatus.Showed;
      }
    },
    removeDrawer: (state, { payload: drawerType }: PayloadAction<DrawerType>) => {
      if (drawerType in state) {
        state[drawerType]!.nextStatus = DrawerStatus.Hidden;
      }
    },
    removeDrawerSuccess: (state, { payload: drawerType }: PayloadAction<DrawerType>) => {
      if (drawerType in state) {
        delete state[drawerType];
      }
    },
    collapseAllDrawers: (state) => {
      (Object.keys(state) as DrawerType[]).forEach((type) => {
        state[type]!.status = DrawerStatus.Collapsed;
      });
    },
    expandAllDrawers: (state) => {
      (Object.keys(state) as DrawerType[]).forEach((type) => {
        state[type]!.status = DrawerStatus.Showed;
      });
    },
    updateDrawer: (state, { payload: { type, ...payload } }: PayloadAction<WithDrawerType<DrawerFullPartial>>) => {
      if (type in state) {
        const statuses = {
          ...initialStatuses,
          ...(state[type]!.statuses || {}),
          ...(payload.statuses || {}),
        };

        (state[type] as any) = {
          ...state[type],
          ...payload,
          statuses,
        };
      }
    },
    removeAllDrawers: () => initialState,
  },
});

export const {
  addDrawer,
  addDrawerSuccess,
  removeDrawer,
  removeDrawerSuccess,
  expandAllDrawers,
  collapseAllDrawers,
  removeAllDrawers,
  updateDrawer,
} = drawerSlice.actions;

export const selectDrawerStatus = (type: DrawerType) =>
  useAppSelector((state: RootState) => state.drawer[type]?.status);
export const selectHasActiveDrawers = () =>
  useAppSelector((state: RootState) => {
    return Boolean(Object.values(state.drawer).length);
  });
export const selectActiveDrawers = () => useAppSelector((state: RootState) => state.drawer);
export const selectDrawerPayload = (type: DrawerType) =>
  useAppSelector((state: RootState) => state.drawer[type]?.payload || {});

const drawerReducer = drawerSlice.reducer;
export default drawerReducer;
