import type { RootState, Staff, StaffUserChangeProfileRequest, StaffUserSlice } from '@types';
import { PayloadAction } from '@reduxjs/toolkit';
export type ChangeStaffUserInfoPayload = {
  id: number | string;
  staffUser: StaffUserChangeProfileRequest;
};
export declare const staffUserSlice: import('@reduxjs/toolkit').Slice<
  StaffUserSlice,
  {
    getStaffUserInfo: (
      state: any,
      action: {
        payload: string;
        type: string;
      },
    ) => void;
    getStaffUserInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<StaffUserSlice>,
      { payload }: PayloadAction<Staff>,
    ) => void;
    addStaffUserError: (
      state: import('immer/dist/internal').WritableDraft<StaffUserSlice>,
      { payload }: PayloadAction<Error>,
    ) => void;
    clearStaffUserSaveSuccessState: (state: import('immer/dist/internal').WritableDraft<StaffUserSlice>) => void;
    clearStaffUserData: () => StaffUserSlice;
    changeStaffUserInfo: (
      state: any,
      action: {
        payload: ChangeStaffUserInfoPayload;
        type: string;
      },
    ) => void;
    changeStaffUserInfoSuccess: (
      state: import('immer/dist/internal').WritableDraft<StaffUserSlice>,
      { payload }: PayloadAction<Staff>,
    ) => void;
  },
  'staffUser'
>;
export declare const getStaffUserInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    string,
    'staffUser/getStaffUserInfo'
  >,
  getStaffUserInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Staff,
    'staffUser/getStaffUserInfoSuccess'
  >,
  changeStaffUserInfo: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ChangeStaffUserInfoPayload,
    'staffUser/changeStaffUserInfo'
  >,
  changeStaffUserInfoSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Staff,
    'staffUser/changeStaffUserInfoSuccess'
  >,
  clearStaffUserSaveSuccessState: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'staffUser/clearStaffUserSaveSuccessState'>,
  clearStaffUserData: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'staffUser/clearStaffUserData'>,
  addStaffUserError: import('@reduxjs/toolkit').ActionCreatorWithPayload<Error, 'staffUser/addStaffUserError'>;
export declare const selectStaffUserState: (state: RootState) => any;
export declare const selectStaffUserSaveDataSuccess: () => any;
export declare const selectStaffUserLoading: () => any;
export declare const selectStaffUser: () => any;
export declare const selectStaffUserId: () => any;
export declare const selectStaffUserName: () => any;
export declare const selectStaffUserPhoto: () => any;
export declare const selectStaffUserS3AntivirusErrors: () => any;
declare const staffUserReducer: import('redux').Reducer<StaffUserSlice, import('redux').AnyAction>;
export default staffUserReducer;
