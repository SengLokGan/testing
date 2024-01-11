import { ClinicalScheduleEventType } from '@enums/pages/Schedule';
import { AddHocEventTypes } from '@types';

export const getEventTypeColor = (type: ClinicalScheduleEventType | AddHocEventTypes) => {
  switch (type) {
    case AddHocEventTypes.LAB_TEST:
    case ClinicalScheduleEventType.QuarterlyBloodTest:
      return '#BA1A1A';
    case ClinicalScheduleEventType.NephrologistVisit:
      return '#00AEA9';
    case ClinicalScheduleEventType.PICVisit:
      return '#F05674';
    case ClinicalScheduleEventType.StaffSerologyScreening:
      return '#FF9254';
    case ClinicalScheduleEventType.StaffHepBVaccination:
      return '#B24399';
    case ClinicalScheduleEventType.CustomEvent:
      return '#006398';
  }
};
