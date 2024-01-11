import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import { BackendError, StaffEntity, StaffManagementState, StaffRole } from '@types';

const initialState: StaffManagementState = {
  statuses: {
    isLoading: false,
    isSubmitting: false,
  },
  error: null,
  staffList: [],
  filters: {
    roles: [],
    user: null,
  },
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
};

export interface StaffListSuccessPayload {
  content: StaffEntity[];
  totalElements: number;
}
export const staffManagementSlice = createSlice({
  name: 'staffManagement',
  initialState,
  reducers: {
    getStaffList: (state) => {
      state.statuses.isLoading = true;
    },
    getStaffListSuccess: (state, { payload }: PayloadAction<StaffListSuccessPayload>) => {
      state.staffList = payload.content;
      state.pagination.totalCount = payload.totalElements;
      state.error = null;
      state.statuses.isLoading = false;
    },
    getStaffRoles: (state) => {},
    getStaffRolesSuccess: (state, { payload }: PayloadAction<StaffRole[]>) => {
      state.filters.roles = payload;
    },
    changeStaffManagementPaginationPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.statuses.isLoading = false;
    },
    changeStaffManagementPaginationRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.statuses.isLoading = false;
    },
    setRoleFilter: (state, { payload }: PayloadAction<StaffRole[]>) => {
      state.filters.roles = payload;
      state.statuses.isLoading = true;
    },
    setUserFilter: (state, { payload }: PayloadAction<{ name: string; id: string }>) => {
      state.filters.user = payload;
      state.statuses.isLoading = true;
    },
    addStaffManagementError: (state, { payload }: PayloadAction<BackendError[] | Error | null>) => {
      state.statuses.isSubmitting = false;
      state.statuses.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  getStaffList,
  getStaffRoles,
  getStaffListSuccess,
  addStaffManagementError,
  changeStaffManagementPaginationPage,
  changeStaffManagementPaginationRowsPerPage,
  setRoleFilter,
  setUserFilter,
  getStaffRolesSuccess,
} = staffManagementSlice.actions;

export const selectStaffList = () => useAppSelector((state) => state.staffManagement.staffList);
export const selectStaffRolesFilter = () => useAppSelector((state) => state.staffManagement.filters.roles);
export const selectStaffUserFilter = () => useAppSelector((state) => state.staffManagement.filters.user);
export const selectStaffManagementIsLoading = () => useAppSelector((state) => state.staffManagement.statuses.isLoading);
export const selectStaffListPagination = () => useAppSelector((state) => state.staffManagement.pagination);

const staffManagementReducer = staffManagementSlice.reducer;
export default staffManagementReducer;
