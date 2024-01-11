import userEvent from '@testing-library/user-event';
import { render } from '@src/tests';
import AddHdSchedulingForm from '@containers/layouts/Drawer/components/AddHdSchedulingForm/AddHdSchedulingForm';
import { within } from '@testing-library/react';
import { waitFor, screen } from '@testing-library/dom';

const initialHdSchedulingState = {
  loading: false,
  error: undefined,
  hdSchedulingForm: { startDate: new Date('2022-11-11T00:00:00.000Z'), endDate: new Date('2022-11-18T00:00:00.000Z') },
};

describe('AddHdSchedulingForm', () => {
  const user = userEvent.setup();

  it('should render form', () => {
    render(<AddHdSchedulingForm />);

    expect(screen.getByTestId('addHdSchedulingForm')).toBeInTheDocument();
  });
  it('should contain hd scheduling form fields', () => {
    render(<AddHdSchedulingForm />);
    expect(screen.getByTestId('RECURRENTRadioButton')).toBeInTheDocument();
    expect(screen.getByTestId('AD_HOCRadioButton')).toBeInTheDocument();
    expect(screen.getByTestId('ONCE_PER_WEEKRadioButton')).toBeInTheDocument();
    expect(screen.getByTestId('TWICE_PER_WEEKRadioButton')).toBeInTheDocument();
    expect(screen.getByTestId('THREE_TIMES_PER_WEEKRadioButton')).toBeInTheDocument();
    expect(screen.getByTestId('daysOfWeekSelectInput')).toBeInTheDocument();
    expect(screen.getByTestId('shiftScheduler-shift')).toBeInTheDocument();
    expect(screen.getByTestId('durationTimeDurationPicker')).toBeInTheDocument();
    expect(screen.getByTestId('startDateDatePicker')).toBeInTheDocument();
    expect(screen.getByTestId('endDateDatePicker')).toBeInTheDocument();
    expect(screen.getByTestId('hdSessionTextInput')).toHaveAttribute('disabled');
  });

  it('should show confirm modal', async () => {
    render(<AddHdSchedulingForm />);
    await user.click(screen.getByTestId('TWICE_PER_WEEKRadioButton'));
    await user.click(screen.getByTestId('cancelHdSchedulingButton'));
    await waitFor(() => {
      expect(screen.getByTestId('GlobalConfirmModal')).toBeInTheDocument();
    });
  });

  it('should show and close confirm modal', async () => {
    render(<AddHdSchedulingForm />);

    await user.click(screen.getByTestId('TWICE_PER_WEEKRadioButton'));
    await user.click(screen.getByTestId('cancelHdSchedulingButton'));
    let confirmModalCancelButton;
    await waitFor(() => {
      confirmModalCancelButton = screen.getByTestId('confirmModalCancelButton');
    });
    await user.click(confirmModalCancelButton);
    expect(screen.queryByTestId('GlobalConfirmModal')).not.toBeInTheDocument();
    expect(screen.getByTestId('addHdSchedulingForm')).toBeInTheDocument();
  });

  it('should show count hd session when frequency, days and dates are selected', async () => {
    render(<AddHdSchedulingForm />, {
      preloadedState: {
        hdPrescriptions: initialHdSchedulingState,
      },
    });
    await user.click(screen.getByTestId('TWICE_PER_WEEKRadioButton'));
    const selectLabel = /form.days/i;
    await user.click(await screen.findByLabelText(selectLabel));
    const optionsPopupEl = await screen.findByRole('listbox', {
      name: selectLabel,
    });
    await user.click(within(optionsPopupEl).getByText(/MONDAY_FRIDAY/i));
    expect(await screen.findByText(/MONDAY_FRIDAY/i)).toBeInTheDocument();
    expect(screen.getByTestId('hdSessionTextInput')).toHaveValue('3');
  });
});
