/// <reference types="react" />
import { MedicationStatus } from '@enums';
interface RichTableCellMedicationStatusProps {
  dotsTextOverflow: boolean;
  status: MedicationStatus;
}
declare const RichTableCellMedicationStatus: ({
  status,
  dotsTextOverflow,
}: RichTableCellMedicationStatusProps) => JSX.Element;
export default RichTableCellMedicationStatus;
