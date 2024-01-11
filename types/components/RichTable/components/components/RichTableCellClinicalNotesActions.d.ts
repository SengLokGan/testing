/// <reference types="react" />
import { ClinicalNoteTableDataItem } from '@store/slices';
type RichTableCellClinicalNotesActionsPropsType = {
  data: ClinicalNoteTableDataItem;
};
declare const RichTableCellClinicalNotesActions: ({
  data,
}: RichTableCellClinicalNotesActionsPropsType) => JSX.Element | null;
export default RichTableCellClinicalNotesActions;
