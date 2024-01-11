import { PropsWithChildren, useMemo } from 'react';
import {
  changeOverviewPatientPage,
  changeOverviewPatientRowsPerPage,
  selectOverviewPatients,
  selectOverviewPatientsLoading,
} from '@store';
import { RichTable } from '@components';
import { Pagination } from '@types';
import { getPatientsOverviewTableColumns } from '@constants';

type PatientsTableProps = PropsWithChildren<{
  pagination: Pagination;
}>;

export const PatientsTable = ({ pagination, children }: PatientsTableProps) => {
  const patientsList = selectOverviewPatients();
  const loading = selectOverviewPatientsLoading();
  const patientsOverviewTableColumns = useMemo(getPatientsOverviewTableColumns, []);

  return (
    <RichTable
      stickyHeader
      columns={patientsOverviewTableColumns}
      rows={patientsList}
      pagination={pagination}
      onChangePage={changeOverviewPatientPage}
      onChangeRowsPerPage={changeOverviewPatientRowsPerPage}
      isDataLoading={loading}
    >
      {children}
    </RichTable>
  );
};
