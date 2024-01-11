/// <reference types="react" />
import { HdPrescriptionStatuses } from '@enums';
interface RichTableCellHdPrescriptionStatusProps {
  dotsTextOverflow: boolean;
  status: HdPrescriptionStatuses;
}
declare const RichTableCellHdPrescriptionStatus: ({
  status,
  dotsTextOverflow,
}: RichTableCellHdPrescriptionStatusProps) => JSX.Element;
export default RichTableCellHdPrescriptionStatus;
