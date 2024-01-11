import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getStaffList,
  getStaffListSuccess,
  addStaffManagementError,
  setRoleFilter,
  setUserFilter,
  getStaffRoles,
  getStaffRolesSuccess,
  changeStaffManagementPaginationPage,
  changeStaffManagementPaginationRowsPerPage,
} from '@store/slices';
import { API } from '@utils/api';
import { AxiosResponse } from 'axios';
import { StaffRoleResponse, StaffListResponse } from '@types';
import { convertStaffListDataToTableFormat } from '@utils/converters/staffList';

const AllChipName = 'ALL';

function* getStaffListSaga() {
  const pagination = yield select((state) => state.staffManagement.pagination);
  const filters = yield select((state) => state.staffManagement.filters);
  const selectedRole = filters.roles.filter((role) => role.name !== AllChipName).find(({ selected }) => selected)?.name;

  try {
    const { data }: AxiosResponse<StaffListResponse> = yield call(
      API.post,
      '/pm/users/search',
      { roles: selectedRole ? [selectedRole] : [], userId: filters?.user?.id || '' },
      {
        params: {
          page: pagination.currentPage,
          size: pagination.perPage,
        },
      },
    );
    yield put(
      getStaffListSuccess({
        totalElements: data.totalElements,
        content: convertStaffListDataToTableFormat(data.content),
      }),
    );
  } catch (error) {
    yield put({ type: addStaffManagementError.type, payload: error as Error });
  }
}

function* getStaffRolesSaga() {
  try {
    const { data }: AxiosResponse<StaffRoleResponse[]> = yield call(API.post, '/pm/users/count');

    const roles = data.map(({ roleCode, count }) => ({
      name: roleCode,
      selected: roleCode === AllChipName,
      badge: count,
    }));

    yield put({ type: getStaffRolesSuccess.type, payload: roles });
  } catch (error) {
    yield put(addStaffManagementError(error as Error));
  }
}

export function* staffManagementWatcher() {
  yield takeLatest(
    [
      getStaffList.type,
      setRoleFilter.type,
      setUserFilter.type,
      changeStaffManagementPaginationPage.type,
      changeStaffManagementPaginationRowsPerPage.type,
    ],
    getStaffListSaga,
  );
  yield takeLatest(getStaffRoles.type, getStaffRolesSaga);
}
