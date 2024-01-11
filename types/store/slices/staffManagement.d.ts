import { PayloadAction } from '@reduxjs/toolkit';
import { BackendError, StaffEntity, StaffManagementState, StaffRole } from '@types';
export interface StaffListSuccessPayload {
  content: StaffEntity[];
  totalElements: number;
}
export declare const staffManagementSlice: import('@reduxjs/toolkit').Slice<
  StaffManagementState,
  {
    getStaffList: (state: import('immer/dist/internal').WritableDraft<StaffManagementState>) => void;
    getStaffListSuccess: (
      state: import('immer/dist/internal').WritableDraft<StaffManagementState>,
      { payload }: PayloadAction<StaffListSuccessPayload>,
    ) => void;
    getStaffRoles: (state: import('immer/dist/internal').WritableDraft<StaffManagementState>) => void;
    getStaffRolesSuccess: (
      state: import('immer/dist/internal').WritableDraft<StaffManagementState>,
      { payload }: PayloadAction<StaffRole[]>,
    ) => void;
    changeStaffManagementPaginationPage: (
      state: import('immer/dist/internal').WritableDraft<StaffManagementState>,
      { payload }: PayloadAction<number>,
    ) => void;
    changeStaffManagementPaginationRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<StaffManagementState>,
      { payload }: PayloadAction<number>,
    ) => void;
    setRoleFilter: (
      state: import('immer/dist/internal').WritableDraft<StaffManagementState>,
      { payload }: PayloadAction<StaffRole[]>,
    ) => void;
    setUserFilter: (
      state: import('immer/dist/internal').WritableDraft<StaffManagementState>,
      {
        payload,
      }: PayloadAction<{
        name: string;
        id: string;
      }>,
    ) => void;
    addStaffManagementError: (
      state: import('immer/dist/internal').WritableDraft<StaffManagementState>,
      { payload }: PayloadAction<BackendError[] | Error | null>,
    ) => void;
  },
  'staffManagement'
>;
export declare const getStaffList: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'staffManagement/getStaffList'>,
  getStaffRoles: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'staffManagement/getStaffRoles'>,
  getStaffListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    StaffListSuccessPayload,
    'staffManagement/getStaffListSuccess'
  >,
  addStaffManagementError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error | BackendError[] | null,
    'staffManagement/addStaffManagementError'
  >,
  changeStaffManagementPaginationPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'staffManagement/changeStaffManagementPaginationPage'
  >,
  changeStaffManagementPaginationRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'staffManagement/changeStaffManagementPaginationRowsPerPage'
  >,
  setRoleFilter: import('@reduxjs/toolkit').ActionCreatorWithPayload<StaffRole[], 'staffManagement/setRoleFilter'>,
  setUserFilter: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      name: string;
      id: string;
    },
    'staffManagement/setUserFilter'
  >,
  getStaffRolesSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    StaffRole[],
    'staffManagement/getStaffRolesSuccess'
  >;
export declare const selectStaffList: () => any;
export declare const selectStaffRolesFilter: () => any;
export declare const selectStaffUserFilter: () => any;
export declare const selectStaffManagementIsLoading: () => any;
export declare const selectStaffListPagination: () => any;
declare const staffManagementReducer: import('redux').Reducer<StaffManagementState, import('redux').AnyAction>;
export default staffManagementReducer;
