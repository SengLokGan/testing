/// <reference types="react" />
import { VaccinationStatus } from '@enums/global';
import type { WithSx } from '@types';
interface RichTableCellVaccinationStatusProps extends WithSx {
  dotsTextOverflow: boolean;
  status: VaccinationStatus;
}
declare const RichTableCellVaccinationStatus: ({
  status,
  dotsTextOverflow,
  sx,
}: RichTableCellVaccinationStatusProps) => JSX.Element;
export default RichTableCellVaccinationStatus;
