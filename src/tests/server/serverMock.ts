import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { doctorHandlers } from '@src/tests/server/handlers/doctors';
import { vaccinationDelete } from '@src/tests/server/handlers/vaccinations';
import { commonHandlers } from '@src/tests/server/handlers/common';
import { patientsHandlers } from '@src/tests/server/handlers/patients';
import { todayPatientsHandlers } from '@src/tests/server/handlers/todayPatients';

export const server = setupServer(
  ...commonHandlers,
  ...doctorHandlers,
  ...vaccinationDelete,
  ...patientsHandlers,
  ...todayPatientsHandlers,
  rest.get('*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
);
