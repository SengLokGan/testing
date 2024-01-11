import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import { LabOrderEventPlace } from '@enums/components/ServiceModal';
import type {
  CreateLabTestPayload,
  DeleteLabResultPayload,
  HighlightedRow,
  LabOrdersFilters,
  LabOrdersFiltersErrors,
  LabOrdersSliceState,
  Pagination,
  PerformLabTestPayload,
  SubmitLabResultFilePayload,
  SubmitManualLabResultsPayload,
} from '@types';
import { ERROR_CODES } from '@constants/global';
import { LabOrdersStatusFilters, LabOrderStatus } from '@enums';
import { LabTestPlanResponse, LabOrdersStatusFilter, LabOrdersContent } from '@types';

export const labOrderInitialState: LabOrdersSliceState = {
  statuses: {
    isLoading: false,
    isSubmitting: false,
    isFileLoading: false,
  },
  ordersList: [],
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

export const labOrdersSlice = createSlice({
  name: 'labOrders',
  initialState: labOrderInitialState,
  reducers: {
    addLabOrdersError: (state, { payload }: PayloadAction<Error>) => {
      state.statuses.isLoading = false;
      state.statuses.isSubmitting = false;
      state.errors = [...state.errors, payload];
    },
    resetLabOrdersList: (state) => {
      state.ordersList = labOrderInitialState.ordersList;
    },
    updateLabOrdersListSuccess: (
      state,
      { payload: { content, pagination } }: PayloadAction<{ content: LabOrdersContent[]; pagination: Pagination }>,
    ) => {
      state.statuses.isLoading = false;
      state.ordersList = content;
      state.pagination = pagination;
      state.errors = [];
    },
    submitLabOrderForm: (state, { payload }: PayloadAction<CreateLabTestPayload>) => {
      state.statuses.isSubmitting = true;
    },
    createLabOrderSuccess: (state) => {
      state.statuses.isSubmitting = false;
      state.errors = [];
    },
    deleteUrgentLabOrder: (state, { payload }: PayloadAction<{ id: number; place?: LabOrderEventPlace }>) => {
      state.statuses.isLoading = true;
    },
    deleteUrgentLabOrderSuccess: (state) => {
      state.statuses.isLoading = false;
      state.errors = [];
    },
    performLabOrder: (state, { payload }: PayloadAction<PerformLabTestPayload>) => {
      state.statuses.isLoading = true;
      state.statuses.isSubmitting = true;
    },
    performLabOrderSuccess: (state) => {
      state.statuses.isLoading = false;
      state.statuses.isSubmitting = false;
      state.errors = [];
    },
    setFilters: (state, { payload }: PayloadAction<Partial<LabOrdersFilters>>) => {
      state.filters = {
        ...state.filters,
        ...payload,
      };
    },
    setFilterErrors: (state, { payload }: PayloadAction<LabOrdersFiltersErrors>) => {
      state.filtersError = payload;
    },
    clearLabOrderFilters: (state, { payload = [] }: PayloadAction<(keyof LabOrdersFilters)[] | undefined>) => {
      const newFilters = { ...labOrderInitialState.filters };

      if (payload) {
        Object.keys(labOrderInitialState.filters).forEach((key) => {
          if (payload.includes(key as keyof LabOrdersFilters)) newFilters[key] = state.filters[key];
        });
      }

      state.filters = newFilters;
      state.statusFilters = labOrderInitialState.statusFilters;
      state.filtersError = labOrderInitialState.filtersError;
    },
    changeLabOrdersPaginationRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.perPage = payload;
      state.pagination.currentPage = 0;
      state.statuses.isLoading = false;
      state.errors = [];
    },
    selectAllLabOrders: (state) => {
      if (state.selectedRows.length !== state.ordersList.length) {
        state.selectedRows = state.ordersList.map((order) => order.id);
      } else {
        state.selectedRows = [];
      }
    },
    selectLabOrder: (state, { payload }: PayloadAction<number>) => {
      const index = state.selectedRows.findIndex((rowId) => rowId === payload);
      if (index === -1) {
        state.selectedRows.push(payload);
      } else {
        state.selectedRows.splice(index, 1);
      }
    },
    changeLabOrdersPaginationPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
      state.statuses.isLoading = true;
    },
    submitLabOrders: (state, payload: PayloadAction<{ orderIds: number[]; place?: LabOrderEventPlace.Dialysis }>) => {
      state.statuses.isSubmitting = true;
    },
    submitLabOrderSuccess: (state) => {
      state.statuses.isSubmitting = false;
      state.errors = [];
    },
    clearLabOrdersError: (state) => {
      state.errors = [];
    },
    exportLabOrders: (state) => {
      state.statuses.isFileLoading = true;
    },
    exportLabOrdersFinish: (state) => {
      state.statuses.isFileLoading = false;
      state.errors = [];
    },
    exportLabOrder: (state, { payload }: PayloadAction<number>) => {
      state.statuses.isFileLoading = true;
    },
    printSelectedOrders: (state, { payload }: PayloadAction<number[]>) => {
      state.statuses.isFileLoading = true;
    },
    submitManualLabResults: (state, { payload }: PayloadAction<SubmitManualLabResultsPayload>) => {
      state.statuses.isSubmitting = true;
    },
    submitManualLabResultsSuccess: (state, { payload }: PayloadAction<SubmitManualLabResultsPayload>) => {
      state.statuses.isSubmitting = false;
      state.errors = [];
    },
    submitManualLabResultError: (state, { payload }: PayloadAction<Error>) => {
      state.statuses.isSubmitting = false;
      state.errors = [...state.errors, payload];
    },
    submitLabResultFile: (state, { payload }: PayloadAction<SubmitLabResultFilePayload>) => {
      state.statuses.isSubmitting = true;
    },
    submitLabResultFileSuccess: (state) => {
      state.statuses.isSubmitting = false;
      state.errors = [];
    },
    submitLabResultFileError: (state, { payload }: PayloadAction<Error>) => {
      state.statuses.isSubmitting = false;
      state.errors = [...state.errors, payload];
    },
    deleteLabResult: (state, { payload }: PayloadAction<DeleteLabResultPayload>) => {
      state.statuses.isLoading = true;
    },
    deleteLabResultSuccess: (state) => {
      state.statuses.isLoading = false;
      state.errors = [];
    },
    getFilteredLabOrdersList: (state) => {
      state.statuses.isLoading = true;
      state.pagination.currentPage = 0;
    },
    setStatusFilters: (state, { payload }: PayloadAction<LabOrdersStatusFilter[]>) => {
      state.statusFilters = payload;
    },
    setHighlightedRows: (state, { payload }: PayloadAction<HighlightedRow[]>) => {
      state.highlightedRows = payload;
    },
    getLabTestPlan: (state, { payload }: PayloadAction<string>) => {
      state.statuses.isLoading = true;
    },
    getLabTestPlanSuccess: (state, { payload }: PayloadAction<LabTestPlanResponse>) => {
      state.statuses.isLoading = false;
      state.labTestPlan = payload;
    },
    clearEditableLabTestPlan: (state) => {
      state.labTestPlan = null;
    },
  },
});

export const {
  addLabOrdersError,
  submitLabOrderForm,
  createLabOrderSuccess,
  performLabOrder,
  performLabOrderSuccess,
  deleteUrgentLabOrder,
  deleteUrgentLabOrderSuccess,
  updateLabOrdersListSuccess,
  setFilters,
  setFilterErrors,
  clearLabOrderFilters,
  changeLabOrdersPaginationPage,
  changeLabOrdersPaginationRowsPerPage,
  resetLabOrdersList,
  selectAllLabOrders,
  selectLabOrder,
  submitLabOrders,
  submitLabOrderSuccess,
  exportLabOrders,
  exportLabOrdersFinish,
  exportLabOrder,
  printSelectedOrders,
  submitManualLabResults,
  submitManualLabResultsSuccess,
  submitLabResultFile,
  submitLabResultFileSuccess,
  deleteLabResult,
  deleteLabResultSuccess,
  submitLabResultFileError,
  submitManualLabResultError,
  getFilteredLabOrdersList,
  setStatusFilters,
  setHighlightedRows,
  getLabTestPlan,
  getLabTestPlanSuccess,
  clearEditableLabTestPlan,
} = labOrdersSlice.actions;

export const selectLabOrdersIsLoading = () => useAppSelector((state) => state.labOrders.statuses.isLoading);
export const selectLabOrdersIsSubmitting = () => useAppSelector((state) => state.labOrders.statuses.isSubmitting);
export const selectLabOrdersPagination = () => useAppSelector((state) => state.labOrders.pagination);
export const selectLabOrdersList = () => useAppSelector((state) => state.labOrders.ordersList);
export const selectSortedLabOrdersList = () =>
  useAppSelector((state) => {
    const sortByPlaneDate = (arr: { [key: string]: any; planeDate: number }[]) => {
      return arr.sort((order1, order2) => {
        const planeDate1 = new Date(order1.planeDate).getTime();
        const planeDate2 = new Date(order2.planeDate).getTime();
        return planeDate1 - planeDate2;
      });
    };
    const sortByQuarter = (arr: { [key: string]: any; quarterNumber: number }[]) => {
      return arr.sort((order1, order2) => {
        const quarterNumber1 = order1.quarterNumber;
        const quarterNumber2 = order2.quarterNumber;
        return quarterNumber1 - quarterNumber2;
      });
    };

    const orders = state.labOrders.ordersList;
    const draftOrders = sortByQuarter(orders.filter((order) => order.status === LabOrderStatus.DRAFT));
    const toPerformOrders = sortByPlaneDate(orders.filter((order) => order.status === LabOrderStatus.TO_PERFORM));
    const toSubmitOrders = sortByPlaneDate(orders.filter((order) => order.status === LabOrderStatus.TO_SUBMIT));
    const pendingOrders = sortByPlaneDate(orders.filter((order) => order.status === LabOrderStatus.PENDING));
    const completedOrders = sortByPlaneDate(orders.filter((order) => order.status === LabOrderStatus.COMPLETED));
    const otherOrders = orders.filter(
      (order) =>
        order.status !== LabOrderStatus.COMPLETED &&
        order.status !== LabOrderStatus.PENDING &&
        order.status !== LabOrderStatus.TO_SUBMIT &&
        order.status !== LabOrderStatus.TO_PERFORM &&
        order.status !== LabOrderStatus.DRAFT,
    );

    return [
      ...draftOrders,
      ...toPerformOrders,
      ...toSubmitOrders,
      ...pendingOrders,
      ...completedOrders,
      ...otherOrders,
    ];
  });
export const selectLabOrderFilters = () => useAppSelector((state) => state.labOrders.filters);
export const selectLabOrdersFiltersErrors = () => useAppSelector((state) => state.labOrders.filtersError);
export const selectSelectedLabOrders = () => useAppSelector((state) => state.labOrders.selectedRows);
export const selectLabOrdersIsFileLoading = () => useAppSelector((state) => state.labOrders.statuses.isFileLoading);
export const selectLabOrdersS3AntivirusErrors = () =>
  useAppSelector((state) => {
    return state.labOrders.errors
      .filter((error) => error?.code === ERROR_CODES.S3_FILE_IS_NOT_FOUND)
      .map((error) => error.rejectedValue);
  });
export const selectIsAllLabOrdersFiltersValid = () =>
  useAppSelector((state) =>
    Object.keys(state.labOrders.filtersError).every((errorKey) => {
      return !state.labOrders.filtersError[errorKey];
    }),
  );
export const selectLabOrderStatusFilters = () => useAppSelector((state) => state.labOrders.statusFilters);
export const selectLabOrdersHighLightedRows = () => useAppSelector((state) => state.labOrders.highlightedRows);

export const selectEditableLabTestPlan = () => useAppSelector((state) => state.labOrders.labTestPlan);

const labOrdersReducer = labOrdersSlice.reducer;
export default labOrdersReducer;
