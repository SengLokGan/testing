import type { ClinicalNoteForm, ClinicalNote, Pagination } from '@types';
import { ClinicalNotesFilters, ClinicalNotesFiltersError } from '@store/slices/clinicalNotesSlice';
import { ClinicalNoteTypes } from '@enums';

export type ClinicalNoteTypeOptionType = { label: string; value: ClinicalNoteTypes }[];

export type ClinicalNotesSliceState = {
  submitting: boolean;
  loading: boolean;
  saveSuccess: boolean;
  error: string | null;
  clinicalNoteForm: ClinicalNoteForm | null;
  clinicalNotes: ClinicalNote[];
  filters: ClinicalNotesFilters;
  filtersError: ClinicalNotesFiltersError;
  pagination: Pagination;
  selectedClinicalNoteType: ClinicalNoteTypes | null;
  availableClinicalNoteTypes: ClinicalNoteTypeOptionType;
  selectedClinicalNoteId: number | null;
};

export type EditClinicalNotePayload = ClinicalNoteForm & { patientId: number };
