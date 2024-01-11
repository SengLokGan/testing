import { rest } from 'msw';
import { defaultIsolationGroupsResponse, defaultIsolationGroupsDetectResponse } from '@src/tests/server/responses';
import type { PatientIsolationDetectResponse, IsolationGroupsResponse } from '@types';

export const commonHandlers = [
  rest.post<{ patientId: string | number }, any, PatientIsolationDetectResponse | null | undefined>(
    `${process.env.DEVELOPMENT_API_TARGET}/pm/isolation-groups/detect`,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json(defaultIsolationGroupsDetectResponse));
    },
  ),
  rest.get<any, any, IsolationGroupsResponse>(
    `${process.env.DEVELOPMENT_API_TARGET}/pm/isolation-groups`,
    (req, res, ctx) => {
      ctx.status(200);
      ctx.json(defaultIsolationGroupsResponse);
    },
  ),
];
