import { UserPermissions } from '@enums/store';
import { getTestStore, render } from '@src/tests';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodayInjectionsTablePreparedColumn } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTablePreparedColumn';
import { injectionFixture } from '@src/tests/fixtures';
import { updateTodayPatientsInjectionPrepared } from '@store/slices';
import { getTenantStartCurrentDay } from '@utils/getTenantDate';

const injections = [injectionFixture({ prepared: true }), injectionFixture({ prepared: false })];

const dispatch = jest.fn();
const store = getTestStore({
  user: {
    user: {
      permissions: [UserPermissions.DialysisInjectionPrepared],
    },
  },
  todayPatients: {
    filterDate: getTenantStartCurrentDay(),
    injectionsLoading: false,
  },
});
store.dispatch = dispatch;

describe('TodayInjectionsTablePreparedColumn', () => {
  it('renders checkbox for each injection', () => {
    render(<TodayInjectionsTablePreparedColumn appointmentId={1} injections={injections} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(injections.length);
  });

  it('calls onCheck when checkbox is clicked', async () => {
    render(<TodayInjectionsTablePreparedColumn appointmentId={1} injections={injections} />, { store } as any);

    const checkbox = screen.getAllByRole('checkbox')[0];
    await userEvent.click(checkbox);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
    expect(dispatch).toHaveBeenCalledWith(
      updateTodayPatientsInjectionPrepared({
        id: injections[0].id,
        status: false,
        appointmentId: 1,
        type: injections[0].type,
      }),
    );
  });
});
