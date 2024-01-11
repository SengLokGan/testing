import { ClinicalNoteTypes } from '@enums/pages/ClinicalNotes';

export type ClinicalNoteForm = {
  type: ClinicalNoteTypes;
  note: string;
};
