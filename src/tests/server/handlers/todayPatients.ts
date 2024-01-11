import { TodayPatientsPlannedInjectionsResponse } from '@types';
import { rest } from 'msw';

export const todayPatientsHandlers = [
  rest.post<any, any, TodayPatientsPlannedInjectionsResponse | null | undefined>(
    `${process.env.DEVELOPMENT_API_TARGET}/pm/appointments/injections/search`,
    (req, res, ctx) => {
      ctx.status(200);
      ctx.json([{}] as any);
    },
  ),
];
