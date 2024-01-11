import { ClinicalNoteTypes } from '@enums';

export type ClinicalNote = {
  id: number;
  patientId: number;
  type: ClinicalNoteTypes;
  note: string;
  details?: string;
  enteredAt: Date | string;
  enteredBy: {
    id: number;
    name: string;
    deleted: boolean;
  };
  editedBy?: {
    id: number;
    name: string;
    deleted: boolean;
  };
};

export type ClinicalNotesTableData = {
  content: ClinicalNote[];
  totalElements: number;
  totalPages: number;
  size: number;
  first: boolean;
  last: boolean;
};
