import type { RootState, Staff, StaffUserChangeProfileRequest, StaffUserSlice } from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import { ERROR_CODES } from '@constants/global';

const initialState: StaffUserSlice = {
  loading: false,
  saveSuccess: false,
  errors: [],
  staffUser: null,
};

export type ChangeStaffUserInfoPayload = {
  id: number | string;
  staffUser: StaffUserChangeProfileRequest;
};

function setLoading<T>() {
  return (state, action: PayloadAction<T>) => {
    state.loading = true;
    state.saveSuccess = false;
    state.errors = [];
  };
}

export const staffUserSlice = createSlice({
  name: 'staffUser',
  initialState,
  reducers: {
    getStaffUserInfo: setLoading<string>(),
    getStaffUserInfoSuccess: (state, { payload }: PayloadAction<Staff>) => {
      state.loading = false;
      state.staffUser = {
        ...state.staffUser,
        ...payload,
      };
      state.errors = [];
    },
    addStaffUserError: (state, { payload }: PayloadAction<Error>) => {
      state.loading = false;
      state.saveSuccess = false;
      state.errors = [...state.errors, payload];
    },
    clearStaffUserSaveSuccessState: (state) => {
      state.saveSuccess = false;
      state.errors = [];
    },
    clearStaffUserData: () => initialState,
    changeStaffUserInfo: setLoading<ChangeStaffUserInfoPayload>(),
    changeStaffUserInfoSuccess: (state, { payload }: PayloadAction<Staff>) => {
      state.loading = false;
      state.saveSuccess = true;
      state.staffUser = {
        ...state.staffUser,
        ...payload,
      };
      state.errors = [];
    },
  },
});

export const {
  getStaffUserInfo,
  getStaffUserInfoSuccess,
  changeStaffUserInfo,
  changeStaffUserInfoSuccess,
  clearStaffUserSaveSuccessState,
  clearStaffUserData,
  addStaffUserError,
} = staffUserSlice.actions;

export const selectStaffUserState = (state: RootState) => state.staffUser;
export const selectStaffUserSaveDataSuccess = () => useAppSelector((state) => state.staffUser.saveSuccess);
export const selectStaffUserLoading = () => useAppSelector((state) => state.staffUser.loading);
export const selectStaffUser = () => useAppSelector((state) => state.staffUser?.staffUser);
export const selectStaffUserId = () => useAppSelector((state) => state.staffUser?.staffUser?.id);
export const selectStaffUserName = () => useAppSelector((state) => state.staffUser?.staffUser?.name);
export const selectStaffUserPhoto = () => useAppSelector((state) => state.staffUser?.staffUser?.photoPath);
export const selectStaffUserS3AntivirusErrors = () =>
  useAppSelector((state) => {
    return state.staffUser.errors
      .filter((error) => error?.code === ERROR_CODES.S3_FILE_IS_NOT_FOUND)
      .map((error) => error.rejectedValue);
  });

const staffUserReducer = staffUserSlice.reducer;
export default staffUserReducer;
