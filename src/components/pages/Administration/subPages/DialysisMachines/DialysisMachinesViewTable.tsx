import { useMemo } from 'react';
import { getDialysisMachinesViewTableColumns } from '@constants';
import {
  changeDialysisMachinesPaginationPage,
  changeDialysisMachinesPaginationRowsPerPage,
  selectDialysisMachinesIsLoading,
  selectDialysisMachinesList,
  selectDialysisMachinesListPagination,
} from '@store';
import { RichTable } from '@components';

export const DialysisMachinesViewTable = () => {
  const data = selectDialysisMachinesList();
  const isLoading = selectDialysisMachinesIsLoading();
  const pagination = selectDialysisMachinesListPagination();

  const columns = useMemo(getDialysisMachinesViewTableColumns, []);

  return (
    <RichTable
      stickyHeader
      fullScreen
      headerDivider
      columns={columns}
      rows={data}
      isDataLoading={isLoading}
      pagination={pagination}
      onChangePage={changeDialysisMachinesPaginationPage}
      onChangeRowsPerPage={changeDialysisMachinesPaginationRowsPerPage}
    />
  );
};
