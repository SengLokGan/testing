import { useMemo } from 'react';
import {
  changeStaffManagementPaginationPage,
  changeStaffManagementPaginationRowsPerPage,
  selectStaffList,
  selectStaffListPagination,
  selectStaffManagementIsLoading,
  selectStaffRolesFilter,
} from '@store/slices';
import { GlobalLoader, RichTable } from '@components';
import { getStaffListViewTableColumns } from '@constants/pages/StaffManagement';
import { Filters } from './components/Filters';

export const StaffManagementViewTable = () => {
  const staffList = selectStaffList();
  const staffRolesFilter = selectStaffRolesFilter();
  const isLoading = selectStaffManagementIsLoading();
  const pagination = selectStaffListPagination();
  const columns = useMemo(getStaffListViewTableColumns, []);

  if (!staffRolesFilter.length) {
    return <GlobalLoader />;
  }

  return (
    <RichTable
      stickyHeader
      fullScreen
      headerDivider
      columns={columns}
      rows={staffList}
      isDataLoading={isLoading}
      pagination={pagination}
      onChangePage={changeStaffManagementPaginationPage}
      onChangeRowsPerPage={changeStaffManagementPaginationRowsPerPage}
    >
      <Filters />
    </RichTable>
  );
};
