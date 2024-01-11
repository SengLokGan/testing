import { render } from '../../../../utils';
import { StartHdModal } from '../../../../../components/modals/ServiceModal/components/DialysisProcedureModal/components/steps/components/StartHdModal';
import userEvent from '@testing-library/user-event';

describe('SatrtHdModal', () => {
  const user = userEvent.setup();
  const onClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render satrtHd modal', () => {
    const { getByTestId } = render(<StartHdModal open onClose={onClose} />);
    const modal = getByTestId('startHdModal');
    const header = getByTestId('startHdHeader');
    const timePiker = getByTestId('startedAtFormTimePicker');
    const saveButton = getByTestId('saveStartDialysisTimeButton');

    expect(modal).toBeInTheDocument();
    expect(timePiker).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent('buttons.startHd');
    expect(header).toHaveTextContent('buttons.startHd');
  });

  it('should call close function', async () => {
    const { getByTestId } = render(<StartHdModal open onClose={onClose} />, {
      preloadedState: { dialysis: { isSubmitting: true } },
    });
    const cancelButton = getByTestId('closeIcon');

    await user.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
