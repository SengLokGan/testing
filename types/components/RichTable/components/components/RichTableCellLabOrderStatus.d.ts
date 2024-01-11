/// <reference types="react" />
import { LabOrderStatus } from '@enums';
import { LabOrderStatusCellCallbackProps } from '@types';
interface RichTableCellLabOrderStatusProps {
  dotsTextOverflow: boolean;
  status: LabOrderStatus;
  data: any;
  cellCallback?: ({ status, id, data }: LabOrderStatusCellCallbackProps) => void;
  disabled?: boolean;
}
declare const RichTableCellLabOrderStatus: ({
  status,
  data,
  disabled,
  cellCallback,
  dotsTextOverflow,
}: RichTableCellLabOrderStatusProps) => JSX.Element;
export default RichTableCellLabOrderStatus;
