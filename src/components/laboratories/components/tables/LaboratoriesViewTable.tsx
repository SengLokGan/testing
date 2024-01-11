import type { PropsWithChildren } from 'react';
import type { Column } from '@types';
import {
  changeLabOrdersPaginationPage,
  changeLabOrdersPaginationRowsPerPage,
  selectAllLabOrders,
  selectLabOrder,
  selectLabOrdersHighLightedRows,
  selectLabOrdersIsLoading,
  selectLabOrdersPagination,
  selectSelectedLabOrders,
  selectSortedLabOrdersList,
} from '@store/slices/labOrdersSlice';
import { RichTable } from '@components/RichTable/RichTable';
import { useAppDispatch } from '@hooks/storeHooks';
import { LabOrderStatus, LabResultInputType } from '@enums/global';

type LaboratoriesViewTableProps = PropsWithChildren<{ columns: Column[] }>;

export const LaboratoriesViewTable = ({ columns, children }: LaboratoriesViewTableProps) => {
  const dispatch = useAppDispatch();
  const pagination = selectLabOrdersPagination();
  const orders = selectSortedLabOrdersList();
  const selectedLabOrders = selectSelectedLabOrders();
  const highlightedRows = selectLabOrdersHighLightedRows();
  const loading = selectLabOrdersIsLoading();

  const setResultInputValue = (order) => {
    if (order.status !== LabOrderStatus.COMPLETED) {
      return '';
    }
    return order.resultInputType === LabResultInputType.User ? order.completedBy?.name : order.labName;
  };

  return (
    <RichTable
      stickyHeader
      fullScreen
      headerDivider
      columns={columns}
      rows={orders.map(({ patient: { document, ...patient }, ...order }) => ({
        ...order,
        document,
        patient,
        resultInput: setResultInputValue(order),
      }))}
      isDataLoading={loading}
      pagination={pagination}
      onChangePage={changeLabOrdersPaginationPage}
      onChangeRowsPerPage={changeLabOrdersPaginationRowsPerPage}
      highlightedRows={highlightedRows}
      selectedRows={selectedLabOrders}
      onAllRowsSelect={() => dispatch(selectAllLabOrders())}
      onRowSelect={(id) => dispatch(selectLabOrder(id))}
    >
      {children}
    </RichTable>
  );
};
