/// <reference types="react" />
import { SpecialNote } from '@enums';
interface RichTableCellSpecialNotesProps {
  specialNotes: SpecialNote[];
}
declare const RichTableCellSpecialNotes: ({ specialNotes }: RichTableCellSpecialNotesProps) => JSX.Element;
export default RichTableCellSpecialNotes;
