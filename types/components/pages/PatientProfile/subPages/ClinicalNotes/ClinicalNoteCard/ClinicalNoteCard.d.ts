/// <reference types="react" />
import { ClinicalNote } from '@types';
type ClinicalNoteCardProps = {
  data: ClinicalNote;
};
export declare const ClinicalNoteCard: ({
  data: { id, type, details, enteredBy, enteredAt, editedBy, note },
}: ClinicalNoteCardProps) => JSX.Element;
export {};
