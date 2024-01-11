import { ClinicalNote } from '@types';
import { ClinicalNoteTypes } from '@enums';

export const clinicalNoteFixture: ClinicalNote = {
  id: 1,
  patientId: 1,
  type: ClinicalNoteTypes.DoctorNote,
  note: 'Test note',
  enteredAt: new Date(),
  enteredBy: {
    id: 2,
    name: 'Test Entered At',
    deleted: false,
  },
};
