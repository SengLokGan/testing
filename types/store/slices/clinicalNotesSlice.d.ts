import { PayloadAction } from '@reduxjs/toolkit';
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
  noteTypes: {
    name: ClinicalNoteTypes | CustomClinicalNoteTypes;
    selected: boolean;
  }[];
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
  enteredAt: {
    date: Date | string;
    isEdited?: boolean;
  };
};
export declare const clinicalNotesInitialState: ClinicalNotesSliceState;
export declare const clinicalNotesSlice: import('@reduxjs/toolkit').Slice<
  ClinicalNotesSliceState,
  {
    getClinicalNotesList: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      payload: PayloadAction<GetClinicalNotesListPayload>,
    ) => void;
    getClinicalNotesListSuccess: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<ClinicalNotesTableData>,
    ) => void;
    addOrEditClinicalNote: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<AddOrEditClinicalNotePayload>,
    ) => void;
    addOrEditClinicalNoteSuccess: (state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>) => void;
    addOrEditClinicalNoteError: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    setClinicalNotesListError: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<Error>,
    ) => void;
    setClinicalNotesFilters: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<Partial<ClinicalNotesFilters>>,
    ) => void;
    clearNoteTypeFilters: (state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>) => void;
    setClinicalNotesFiltersError: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<ClinicalNotesFiltersError>,
    ) => void;
    changeClinicalNotesPage: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<GetClinicalNotesListPayload>,
    ) => void;
    changeClinicalNotesRowsPerPage: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<GetClinicalNotesListPayload>,
    ) => void;
    setSelectedClinicalNoteType: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<ClinicalNoteTypes>,
    ) => void;
    setAvailableClinicalNoteTypes: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<ClinicalNoteTypeOptionType>,
    ) => void;
    setClinicalNoteFormData: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<ClinicalNoteForm>,
    ) => void;
    resetClinicalNoteFormData: (state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>) => void;
    setSelectedClinicalNoteId: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<number>,
    ) => void;
    deleteClinicalNote: (
      state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>,
      { payload }: PayloadAction<DeleteClinicalNotePayload>,
    ) => void;
    deleteClinicalNoteSuccess: (state: import('immer/dist/internal').WritableDraft<ClinicalNotesSliceState>) => void;
  },
  'clinicalNotes'
>;
export declare const getClinicalNotesList: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    GetClinicalNotesListPayload,
    'clinicalNotes/getClinicalNotesList'
  >,
  getClinicalNotesListSuccess: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ClinicalNotesTableData,
    'clinicalNotes/getClinicalNotesListSuccess'
  >,
  addOrEditClinicalNote: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    AddOrEditClinicalNotePayload,
    'clinicalNotes/addOrEditClinicalNote'
  >,
  addOrEditClinicalNoteSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'clinicalNotes/addOrEditClinicalNoteSuccess'>,
  addOrEditClinicalNoteError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'clinicalNotes/addOrEditClinicalNoteError'
  >,
  setClinicalNotesFilters: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Partial<ClinicalNotesFilters>,
    'clinicalNotes/setClinicalNotesFilters'
  >,
  setClinicalNotesFiltersError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ClinicalNotesFiltersError,
    'clinicalNotes/setClinicalNotesFiltersError'
  >,
  setClinicalNotesListError: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    Error,
    'clinicalNotes/setClinicalNotesListError'
  >,
  changeClinicalNotesPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    GetClinicalNotesListPayload,
    'clinicalNotes/changeClinicalNotesPage'
  >,
  changeClinicalNotesRowsPerPage: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    GetClinicalNotesListPayload,
    'clinicalNotes/changeClinicalNotesRowsPerPage'
  >,
  setSelectedClinicalNoteType: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ClinicalNoteTypes,
    'clinicalNotes/setSelectedClinicalNoteType'
  >,
  setAvailableClinicalNoteTypes: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ClinicalNoteTypeOptionType,
    'clinicalNotes/setAvailableClinicalNoteTypes'
  >,
  setClinicalNoteFormData: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    ClinicalNoteForm,
    'clinicalNotes/setClinicalNoteFormData'
  >,
  resetClinicalNoteFormData: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'clinicalNotes/resetClinicalNoteFormData'>,
  setSelectedClinicalNoteId: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    number,
    'clinicalNotes/setSelectedClinicalNoteId'
  >,
  deleteClinicalNote: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    DeleteClinicalNotePayload,
    'clinicalNotes/deleteClinicalNote'
  >,
  deleteClinicalNoteSuccess: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'clinicalNotes/deleteClinicalNoteSuccess'>,
  clearNoteTypeFilters: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'clinicalNotes/clearNoteTypeFilters'>;
export declare const selectClinicalNoteSubmitting: () => any;
export declare const selectClinicalNotesFilters: () => any;
export declare const selectClinicalNotesFiltersError: () => any;
export declare const selectClinicalNotesTablePagination: () => any;
export declare const selectClinicalNotesList: () => any;
export declare const selectSelectedClinicalNoteType: () => any;
export declare const selectAvailableClinicalNoteTypes: () => any;
export declare const selectAvailableClinicalNoteTypesChips: () => any;
export declare const selectClinicalNoteForm: () => any;
declare const clinicalNotesReducer: import('redux').Reducer<ClinicalNotesSliceState, import('redux').AnyAction>;
export default clinicalNotesReducer;
