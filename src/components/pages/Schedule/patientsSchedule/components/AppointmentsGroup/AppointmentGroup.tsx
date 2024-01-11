import { selectShifts } from '@store/slices';
import { IsoGroupHeader } from '../IsoGroupHeader/IsoGroupHeader';
import { TableRow } from '../TableRow/TableRow';
import { AppointmentsGroup } from '@types';

type AppointmentGroupProps = {
  group: AppointmentsGroup;
};
export const AppointmentGroup = ({ group }: AppointmentGroupProps) => {
  const isIsoGroup = !!group.isolations.length;
  const shifts = selectShifts();

  return (
    <>
      {isIsoGroup && <IsoGroupHeader isoKey={group.isoKey} isoName={group.isoName} isolations={group.isolations} />}
      {Object.keys(group.slots).map((slotKey, index) => (
        <TableRow
          key={slotKey}
          isIsoGroup={isIsoGroup}
          shiftCount={shifts.length}
          slotKey={slotKey}
          index={index}
          rowData={group.slots[slotKey]}
          isoKey={group.isoKey}
        />
      ))}
    </>
  );
};
