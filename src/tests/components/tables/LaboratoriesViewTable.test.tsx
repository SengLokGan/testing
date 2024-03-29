import { getTestStore, render } from '@src/tests';
import { RenderResult } from '@testing-library/react';
import { LaboratoriesViewTable } from '@components/laboratories/components/tables/LaboratoriesViewTable';
import { getLabOrdersTableColumns } from '@constants';
import { labOrderContentFixture } from '@src/tests/fixtures';
import userEvent from '@testing-library/user-event';
import { LabOrdersStatusFilters, UserPermissions } from '@enums';
import type { LabOrdersSliceState } from '@types';
import { updateLabOrdersListSuccess } from '@store/slices';

const columnLabels = {
  procedureName: 'labOrders:tables.ordersView.procedure',
  labOrderNumber: 'labOrders:tables.ordersView.labOrderNumber',
  patient: 'labOrders:tables.ordersView.patient',
  samplingDate: 'labOrders:tables.ordersView.samplingDate',
  shift: 'labOrders:tables.ordersView.shift',
  labName: 'labOrders:tables.ordersView.labName',
  mealStatus: 'labOrders:tables.ordersView.mealStatus',
  specimenType: 'labOrders:tables.ordersView.specimenType',
  actions: 'labOrders:tables.ordersView.actions',
};

const initialLabOrdersViewTableState: LabOrdersSliceState = {
  statuses: {
    isLoading: false,
    isSubmitting: false,
    isFileLoading: false,
  },
  ordersList: [labOrderContentFixture()],
  selectedRows: [],
  highlightedRows: [],
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
  sortBy: 'createdAt',
  sortDir: 'desc',
  errors: [],
  filters: {
    from: null,
    to: null,
    planFrom: null,
    planTo: null,
    appointmentFrom: null,
    appointmentTo: null,
    submissionFrom: null,
    submissionTo: null,
    resultFrom: null,
    resultTo: null,
    patient: null,
    appointmentId: undefined,
    procedures: [],
    labIds: [],
    order: null,
    shifts: [],
    type: null,
  },
  statusFilters: [
    {
      name: LabOrdersStatusFilters.All,
      selected: true,
    },
    {
      name: LabOrdersStatusFilters.Draft,
      selected: false,
    },
    {
      name: LabOrdersStatusFilters.ToPerform,
      selected: false,
    },
    {
      name: LabOrdersStatusFilters.ToSubmit,
      selected: false,
    },
    {
      name: LabOrdersStatusFilters.Pending,
      selected: false,
    },
    {
      name: LabOrdersStatusFilters.Completed,
      selected: false,
    },
  ],
  filtersError: {
    from: null,
    to: null,
    planFrom: null,
    planTo: null,
    appointmentFrom: null,
    appointmentTo: null,
    submissionFrom: null,
    submissionTo: null,
    resultFrom: null,
    resultTo: null,
  },
  labTestPlan: null,
};

describe('LaboratoriesViewTable', () => {
  let r: RenderResult;
  const user = userEvent.setup();
  const labOrdersTableColumns = getLabOrdersTableColumns();

  const store = getTestStore({
    labOrders: initialLabOrdersViewTableState,
    user: { user: { permissions: [UserPermissions.AnalysesModifyOrder, UserPermissions.AnalysesDeleteOrder] } },
  });

  beforeEach(() => {
    r = render(<LaboratoriesViewTable columns={labOrdersTableColumns} />, {
      store,
    } as any);
  });

  it('should render the component and all required columns', () => {
    expect(r.queryByText(columnLabels.procedureName)).toBeTruthy();
    expect(r.queryByText(columnLabels.labOrderNumber)).toBeTruthy();
    expect(r.queryByText(columnLabels.patient)).toBeTruthy();
    expect(r.queryByText(columnLabels.shift)).toBeTruthy();
    expect(r.queryByText(columnLabels.labName)).toBeTruthy();
    expect(r.queryByText(columnLabels.mealStatus)).toBeTruthy();
    expect(r.queryByText(columnLabels.specimenType)).toBeTruthy();
    expect(r.queryByText(columnLabels.actions)).toBeTruthy();
  });

  //skip because hidden functionality
  it.skip('should contain action buttons', async () => {
    expect(r.getByTestId('labOrdersViewTableExpandActionsButton')).toBeInTheDocument();
    await user.click(r.getByTestId('labOrdersViewTableExpandActionsButton'));
    expect(r.queryByTestId('labOrdersEditButton')).toBeInTheDocument();
    expect(r.queryByTestId('labOrdersDeleteButton')).toBeInTheDocument();
  });

  //skip because hidden functionality
  it.skip('should delete labOrder and check that table becomes empty', async () => {
    await user.click(r.getByTestId('labOrdersViewTableExpandActionsButton'));
    await user.click(r.getByTestId('labOrdersDeleteButton'));
    r.rerender(<LaboratoriesViewTable columns={labOrdersTableColumns} />);
    await user.click(r.getByTestId('confirmModalConfirmButton'));
    await store.dispatch(
      updateLabOrdersListSuccess({
        content: [],
        pagination: {
          currentPage: 1,
          perPage: 25,
          totalCount: 1,
        },
      }),
    );
    r.rerender(<LaboratoriesViewTable columns={labOrdersTableColumns} />);
    expect(r.queryByText('noResultsFound')).toBeTruthy();
  });
});
