import type { NavigateFunction } from 'react-router-dom';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, UserSliceState, Organization, User } from '@types';
import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';

export const initialState: UserSliceState = {
  loading: false,
  error: null,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchTokenContinuously: () => {},
    fetchTokenContinuouslySuccess: () => {},
    fetchTokenContinuouslyError: () => {},
    checkActivity: () => {},
    logOut: () => {},
    getUserSummary: (state) => {
      state.loading = true;
    },
    getUserSummarySuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    setTenant: ({ user }, { payload: organization }: PayloadAction<Organization>) => {
      if (user) {
        const firstBranch = organization.branches[0];
        localStorage.setItem('currentOrganizationId', organization.id);

        user.currentOrganizationId = organization.id;
        user.currentBranchId = firstBranch.id;
      }
    },
    setBranch: (state, action: PayloadAction<{ value: string; navigate: NavigateFunction }>) => {
      if (state.user) {
        state.user.currentBranchId = action.payload.value;
      }
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload.message;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const {
  fetchTokenContinuously,
  fetchTokenContinuouslySuccess,
  fetchTokenContinuouslyError,
  logOut,
  checkActivity,
  getUserSummary,
  getUserSummarySuccess,
  setTenant,
  setBranch,
  setError,
  resetUser,
} = userSlice.actions;

export const selectUser = () => useAppSelector((state) => state.user.user);
export const selectUserId = () => useAppSelector((state: RootState) => state.user.user?.id);
export const selectUserPermissions = () => useAppSelector((state) => state.user.user?.permissions || []);
export const selectUserRoles = () => useAppSelector((state) => state.user.user?.roles || []);
export const selectCurrentOrganizationId = () => useAppSelector((state) => state.user.user?.currentOrganizationId);
export const selectCurrentBranchId = () => useAppSelector((state) => state.user.user?.currentBranchId);
export const selectCurrentOrganization = () =>
  useAppSelector((state) =>
    state.user.user.organizations.find((organization) => organization.id === selectCurrentOrganizationId()),
  );
export const selectCurrentBranch = () =>
  selectCurrentOrganization().branches.find((branch) => branch.id === selectCurrentBranchId());
export const selectHasUserOpenEncounter = () => useAppSelector((state) => state.user.user?.hasOpenEncounter);

const userReducer = userSlice.reducer;
export default userReducer;
