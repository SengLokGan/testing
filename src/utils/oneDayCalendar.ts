import type {
  OneDayCalendarData,
  OneDayCalendarAppointment,
  AppointmentSchedule,
  IsolationGroupSummary,
  Shift,
} from '@types';

interface IsolationGroupShiftAppointments {
  [key: string]: OneDayCalendarAppointment[];
}

interface IsolationGroupSlots {
  [key: string]: IsolationGroupShiftAppointments;
}

export const prepareOneDayCalendarData = (
  appointments: AppointmentSchedule[],
  isolationGroups: IsolationGroupSummary[],
  shifts: Shift[],
): OneDayCalendarData => {
  const formattedData = {};

  isolationGroups.forEach(
    ({ id: isolationGroupId, isolations, name: isolationGroupName, locations: amountOfLocations }) => {
      const slots = {
        ...new Array(amountOfLocations)
          .fill(null)
          .reduce((state, _, index) => ({ ...state, [`slot_${index}`]: getIsolationGroupShifts(shifts) }), {}),
      };

      formattedData[`isolation_group_${isolationGroupId}`] = {
        id: isolationGroupId,
        isoName: isolationGroupName,
        isoKey: 'iso_' + isolationGroupId,
        isolations,
        slots,
      };
    },
  );

  appointments.forEach((appointment) => {
    const appointmentShift =
      formattedData[`isolation_group_${appointment.isolationGroupId}`]?.slots?.[`slot_0`]?.[
        `shift_${appointment.shiftId}`
      ];
    if (appointmentShift) appointmentShift.push(appointment);
  });

  return formattedData;
};

export const sortOneDayCalendarData = (
  calendarData: OneDayCalendarData,
  shifts: Shift[],
  slotDuration: number,
): OneDayCalendarData => {
  const shiftKeys = shifts.map((shift) => `shift_${shift.id}`);

  const sortedCalendarData = Object.keys(calendarData).reduce((sortedCalendarDataReduce, isolationGroupKey) => {
    let currentSlotIndex = 0;

    const isolationGroupAppointments = Object.keys(calendarData[isolationGroupKey].slots).reduce(
      (appointments, slotKey) => {
        const isolationGroupSlotAppointments = shiftKeys.reduce((slotAppointments, shiftKey) => {
          return [
            ...slotAppointments,
            ...(calendarData[isolationGroupKey].slots[slotKey][shiftKey] as OneDayCalendarAppointment[]),
          ];
        }, [] as OneDayCalendarAppointment[]);
        return [...appointments, ...isolationGroupSlotAppointments];
      },
      [] as OneDayCalendarAppointment[],
    );

    const isolationGroupAppointmentsByShifts = isolationGroupAppointments.reduce((appointmentsByShift, appointment) => {
      const activeShiftKey = `shift_${appointment.shiftId}`;
      if (!appointmentsByShift[activeShiftKey]) appointmentsByShift[activeShiftKey] = [];
      appointmentsByShift[activeShiftKey].push({ ...appointment, path: [] });
      return appointmentsByShift;
    }, {} as IsolationGroupShiftAppointments);

    const isolationGroupSlots = Object.keys(calendarData[isolationGroupKey].slots).reduce((slotsReduce, slotKey) => {
      const slotShifts = shiftKeys.reduce(
        (shiftsReduce, shiftKey) => ({ ...shiftsReduce, [shiftKey]: [] }),
        {} as IsolationGroupShiftAppointments,
      );

      return {
        ...slotsReduce,
        [slotKey]: slotShifts,
      };
    }, {} as IsolationGroupSlots);

    Object.keys(isolationGroupAppointmentsByShifts).forEach((shiftKey) => {
      const shiftAppointments = sortAppointmentsByField(isolationGroupAppointmentsByShifts[shiftKey], 'duration');

      shiftAppointments.forEach((appointment) => {
        const currentSlotKey = `slot_${currentSlotIndex}`;
        const currentShiftKey = `shift_${appointment.shiftId}`;

        if (!isolationGroupSlots[currentSlotKey]) return; // Cut amount of appointments in slot if it's over than we support

        isolationGroupSlots[currentSlotKey][currentShiftKey].push(appointment);

        isolationGroupSlots[currentSlotKey][currentShiftKey] = sortAppointmentsByField(
          isolationGroupSlots[currentSlotKey][currentShiftKey],
          'patientName',
        )
          .reverse()
          .map((appointment, index) => ({
            ...appointment,
            path: [isolationGroupKey, 'slots', currentSlotKey, currentShiftKey, index],
          })) as OneDayCalendarAppointment[];

        const currentSlotShiftDuration = getAppointmentsCommonDuration(
          isolationGroupSlots[currentSlotKey][currentShiftKey],
        );

        if (
          currentSlotShiftDuration - slotDuration / 2 >= 0 ||
          isolationGroupSlots[currentSlotKey][currentShiftKey].length >= 2
        )
          currentSlotIndex += 1;
      });

      currentSlotIndex = 0;
    });

    return {
      ...sortedCalendarDataReduce,
      [isolationGroupKey]: {
        ...calendarData[isolationGroupKey],
        slots: isolationGroupSlots,
      },
    };
  }, {} as any);

  return sortedCalendarData as OneDayCalendarData;
};

const getIsolationGroupShifts = (shifts: Shift[]) =>
  shifts.reduce((state, shift) => {
    return { ...state, [`shift_${shift.id}`]: [] };
  }, {});

const getAppointmentsCommonDuration = (appointments: OneDayCalendarAppointment[]) => {
  return appointments.reduce((appointmentsReduce, appointment) => {
    return appointmentsReduce + appointment.duration;
  }, 0);
};

const sortAppointmentsByField = (appointments: OneDayCalendarAppointment[], field: string) => {
  return appointments.sort((a, b) => {
    if (a[field] > b[field]) return -1;
    if (a[field] < b[field]) return 1;
    return 0;
  });
};
