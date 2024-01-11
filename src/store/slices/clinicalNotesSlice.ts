import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@hooks/storeHooks';
import type {
  ClinicalNoteForm,
  ClinicalNoteTypeOptionType,
  ClinicalNotesSliceState,
  ClinicalNote,
  ClinicalNotesTableData,
} from '@types';
import { ClinicalNoteTypes, CustomClinicalNoteTypes } from '@enums/pages/ClinicalNotes';

export type ClinicalNotesFilters = {
  from: Date | null;
  to: Date;
  noteTypes: { name: ClinicalNoteTypes | CustomClinicalNoteTypes; selected: boolean }[];
};

export type ClinicalNotesFiltersError = {
  from: string | null;
  to: string | null;
};

export type AddOrEditClinicalNotePayload = {
  isAdding: boolean;
  clinicalNote: ClinicalNoteForm;
  patientId: number;
};

export type GetClinicalNotesListPayload = {
  patientId: number;
  paginationValue?: number;
};

export type DeleteClinicalNotePayload = Pick<GetClinicalNotesListPayload, 'patientId'>;

export type ClinicalNoteTableDataItem = ClinicalNote & {
  enteredBy: string;
  enteredById: number;
  enteredByDeleted: boolean;
  enteredAt: { date: Date | string; isEdited?: boolean };
};

export const clinicalNotesInitialState: ClinicalNotesSliceState = {
  submitting: false,
  loading: false,
  saveSuccess: false,
  error: null,
  clinicalNoteForm: null,
  clinicalNotes: [],
  filters: {
    from: null,
    to: new Date(),
    noteTypes: [
      { name: Object.keys(CustomClinicalNoteTypes)[0] as CustomClinicalNoteTypes, selected: false },
      ...Object.keys(ClinicalNoteTypes).map((key) => ({ name: key as ClinicalNoteTypes, selected: false })),
    ],
  },
  filtersError: {
    from: null,
    to: null,
  },
  pagination: {
    currentPage: 0,
    perPage: 50,
    totalCount: 0,
  },
  selectedClinicalNoteType: null,
  availableClinicalNoteTypes: [],
  selectedClinicalNoteId: null,
};

export const clinicalNotesSlice = createSlice({
  name: 'clinicalNotes',
  initialState: clinicalNotesInitialState,
  reducers: {
    getClinicalNotesList: (state, payload: PayloadAction<GetClinicalNotesListPayload>) => {
      state.loading = true;
    },
    getClinicalNotesListSuccess: (state, { payload }: PayloadAction<ClinicalNotesTableData>) => {
      state.clinicalNotes = payload.content;
      state.pagination.totalCount = payload.totalElements;
      state.loading = false;
      state.error = null;
    },
    addOrEditClinicalNote: (state, { payload }: PayloadAction<AddOrEditClinicalNotePayload>) => {
      state.submitting = true;
      state.saveSuccess = false;
    },
    addOrEditClinicalNoteSuccess: (state) => {
      state.submitting = false;
      state.saveSuccess = true;
    },
    addOrEditClinicalNoteError: (state, { payload }: PayloadAction<Error>) => {
      state.loading = false;
      state.submitting = false;
      state.saveSuccess = false;
      state.error = payload.message;
    },
    setClinicalNotesListError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload?.message;
      state.loading = false;
    },
    setClinicalNotesFilters: (state, { payload }: PayloadAction<Partial<ClinicalNotesFilters>>) => {
      state.filters = {
        ...state.filters,
        ...payload,
      };
      state.pagination.currentPage = clinicalNotesInitialState.pagination.currentPage;
    },
    clearNoteTypeFilters: (state) => {
      state.filters.noteTypes = clinicalNotesInitialState.filters.noteTypes;
      state.pagination.currentPage = clinicalNotesInitialState.pagination.currentPage;
    },
    setClinicalNotesFiltersError: (state, { payload }: PayloadAction<ClinicalNotesFiltersError>) => {
      state.filtersError = payload;
    },
    changeClinicalNotesPage: (state, { payload }: PayloadAction<GetClinicalNotesListPayload>) => {
      state.pagination.currentPage = payload.paginationValue!;
      state.loading = true;
    },
    changeClinicalNotesRowsPerPage: (state, { payload }: PayloadAction<GetClinicalNotesListPayload>) => {
      state.pagination.perPage = payload.paginationValue!;
      state.pagination.currentPage = 0;
      state.loading = true;
    },
    setSelectedClinicalNoteType: (state, { payload }: PayloadAction<ClinicalNoteTypes>) => {
      state.selectedClinicalNoteType = payload;
    },
    setAvailableClinicalNoteTypes: (state, { payload }: PayloadAction<ClinicalNoteTypeOptionType>) => {
      state.availableClinicalNoteTypes = payload;
    },
    setClinicalNoteFormData: (state, { payload }: PayloadAction<ClinicalNoteForm>) => {
      state.clinicalNoteForm = payload;
    },
    resetClinicalNoteFormData: (state) => {
      state.clinicalNoteForm = clinicalNotesInitialState.clinicalNoteForm;
      state.selectedClinicalNoteId = clinicalNotesInitialState.selectedClinicalNoteId;
    },
    setSelectedClinicalNoteId: (state, { payload }: PayloadAction<number>) => {
      state.selectedClinicalNoteId = payload;
    },
    deleteClinicalNote: (state, { payload }: PayloadAction<DeleteClinicalNotePayload>) => {
      state.loading = true;
      state.saveSuccess = false;
    },
    deleteClinicalNoteSuccess: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getClinicalNotesList,
  getClinicalNotesListSuccess,
  addOrEditClinicalNote,
  addOrEditClinicalNoteSuccess,
  addOrEditClinicalNoteError,
  setClinicalNotesFilters,
  setClinicalNotesFiltersError,
  setClinicalNotesListError,
  changeClinicalNotesPage,
  changeClinicalNotesRowsPerPage,
  setSelectedClinicalNoteType,
  setAvailableClinicalNoteTypes,
  setClinicalNoteFormData,
  resetClinicalNoteFormData,
  setSelectedClinicalNoteId,
  deleteClinicalNote,
  deleteClinicalNoteSuccess,
  clearNoteTypeFilters,
} = clinicalNotesSlice.actions;

export const selectClinicalNoteSubmitting = () => useAppSelector((state) => state.clinicalNotes.submitting);
export const selectClinicalNotesFilters = () => useAppSelector((state) => state.clinicalNotes.filters);
export const selectClinicalNotesFiltersError = () => useAppSelector((state) => state.clinicalNotes.filtersError);
export const selectClinicalNotesTablePagination = () => useAppSelector((state) => state.clinicalNotes.pagination);
export const selectClinicalNotesList = () => useAppSelector((state) => state.clinicalNotes.clinicalNotes);
export const selectSelectedClinicalNoteType = () =>
  useAppSelector((state) => state.clinicalNotes.selectedClinicalNoteType);
export const selectAvailableClinicalNoteTypes = () =>
  useAppSelector((state) => state.clinicalNotes.availableClinicalNoteTypes);
export const selectAvailableClinicalNoteTypesChips = () =>
  useAppSelector((state) => state.clinicalNotes.availableClinicalNoteTypes);
export const selectClinicalNoteForm = () => useAppSelector((state) => state.clinicalNotes.clinicalNoteForm);

const clinicalNotesReducer = clinicalNotesSlice.reducer;
export default clinicalNotesReducer;
