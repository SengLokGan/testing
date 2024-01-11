import type { NavigateFunction } from 'react-router-dom';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserSliceState, Organization, User } from '@types';
export declare const initialState: UserSliceState;
export declare const userSlice: import('@reduxjs/toolkit').Slice<
  UserSliceState,
  {
    fetchTokenContinuously: () => void;
    fetchTokenContinuouslySuccess: () => void;
    fetchTokenContinuouslyError: () => void;
    checkActivity: () => void;
    logOut: () => void;
    getUserSummary: (state: import('immer/dist/internal').WritableDraft<UserSliceState>) => void;
    getUserSummarySuccess: (
      state: import('immer/dist/internal').WritableDraft<UserSliceState>,
      action: PayloadAction<User>,
    ) => void;
    setTenant: (
      { user }: import('immer/dist/internal').WritableDraft<UserSliceState>,
      { payload: organization }: PayloadAction<Organization>,
    ) => void;
    setBranch: (
      state: import('immer/dist/internal').WritableDraft<UserSliceState>,
      action: PayloadAction<{
        value: string;
        navigate: NavigateFunction;
      }>,
    ) => void;
    setError: (
      state: import('immer/dist/internal').WritableDraft<UserSliceState>,
      action: PayloadAction<Error>,
    ) => void;
    resetUser: (state: import('immer/dist/internal').WritableDraft<UserSliceState>) => void;
  },
  'user'
>;
export declare const fetchTokenContinuously: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'user/fetchTokenContinuously'>,
  fetchTokenContinuouslySuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'user/fetchTokenContinuouslySuccess'>,
  fetchTokenContinuouslyError: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'user/fetchTokenContinuouslyError'>,
  logOut: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'user/logOut'>,
  checkActivity: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'user/checkActivity'>,
  getUserSummary: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'user/getUserSummary'>,
  getUserSummarySuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<User, 'user/getUserSummarySuccess'>,
  setTenant: import('@reduxjs/toolkit').ActionCreatorWithPayload<Organization, 'user/setTenant'>,
  setBranch: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      value: string;
      navigate: NavigateFunction;
    },
    'user/setBranch'
  >,
  setError: import('@reduxjs/toolkit').ActionCreatorWithPayload<Error, 'user/setError'>,
  resetUser: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'user/resetUser'>;
export declare const selectUser: () => any;
export declare const selectUserId: () => any;
export declare const selectUserPermissions: () => any;
export declare const selectUserRoles: () => any;
export declare const selectCurrentOrganizationId: () => any;
export declare const selectCurrentBranchId: () => any;
export declare const selectCurrentOrganization: () => any;
export declare const selectCurrentBranch: () => any;
export declare const selectHasUserOpenEncounter: () => any;
declare const userReducer: import('redux').Reducer<UserSliceState, import('redux').AnyAction>;
export default userReducer;
