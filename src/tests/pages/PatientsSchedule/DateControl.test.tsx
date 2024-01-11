import { render } from '@src/tests/utils';
import { DateControl } from '@components/pages/Schedule/patientsSchedule/components/DateControl/DateControl';
import { screen } from '@testing-library/dom';
import { getTenantDate } from '@utils/getTenantDate';
import { format, addDays, subDays } from 'date-fns';
import userEvent from '@testing-library/user-event';

describe.skip('DateControl', () => {
  const user = userEvent.setup();
  it('should render date control element', () => {
    render(<DateControl />, {
      preloadedState: {
        patientsSchedule: {
          scheduleDate: getTenantDate(),
        },
      },
    });

    expect(screen.getByTestId('schedulePatientsNavigateToBackButton')).toBeInTheDocument();
    expect(screen.getByTestId('schedulePatientsNavigateTodayButton')).toBeInTheDocument();
    expect(screen.getByText(format(getTenantDate(), 'LLLL dd, yyyy'))).toBeInTheDocument();
    expect(screen.getByTestId('schedulePatientsNavigateBackButton')).toBeInTheDocument();
    expect(screen.getByTestId('schedulePatientsNavigateForwardButton')).toBeInTheDocument();
  });

  it('should change date', async () => {
    render(<DateControl />, {
      preloadedState: {
        patientsSchedule: {
          scheduleDate: getTenantDate(),
        },
      },
    });

    await user.click(screen.getByTestId('schedulePatientsNavigateBackButton'));
    expect(screen.getByText(format(subDays(getTenantDate(new Date()), 1), 'LLLL dd, yyyy'))).toBeInTheDocument();

    await user.click(screen.getByTestId('schedulePatientsNavigateTodayButton'));
    expect(screen.getByText(format(getTenantDate(), 'LLLL dd, yyyy'))).toBeInTheDocument();

    await user.click(screen.getByTestId('schedulePatientsNavigateForwardButton'));
    expect(screen.getByText(format(addDays(getTenantDate(), 1), 'LLLL dd, yyyy'))).toBeInTheDocument();
  });
});
