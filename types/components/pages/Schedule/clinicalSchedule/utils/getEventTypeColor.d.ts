import { ClinicalScheduleEventType } from '@enums/pages/Schedule';
import { AddHocEventTypes } from '@types';
export declare const getEventTypeColor: (
  type: ClinicalScheduleEventType | AddHocEventTypes,
) => '#006398' | '#BA1A1A' | '#FF9254' | '#F05674' | '#B24399' | '#00AEA9' | undefined;
