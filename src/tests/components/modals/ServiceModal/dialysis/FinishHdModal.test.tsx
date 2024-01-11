import { render } from '../../../../utils';
import { FinishHdModal } from '../../../../../components/modals/ServiceModal/components/DialysisProcedureModal/components/steps/components/FinishHdModal';
import userEvent from '@testing-library/user-event';

describe('FinishHdModal', () => {
  const user = userEvent.setup();
  const onClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render finishHd modal', () => {
    const { getByTestId } = render(<FinishHdModal open onClose={onClose} />);
    const modal = getByTestId('finishHdModal');
    const header = getByTestId('finishHdHeader');
    const timePiker = getByTestId('endsAtFormTimePicker');
    const saveButton = getByTestId('saveFinishDialysisTimeButton');

    expect(modal).toBeInTheDocument();
    expect(timePiker).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent('buttons.finishHd');
    expect(header).toHaveTextContent('buttons.finishHd');
  });

  it('should call close function', async () => {
    const { getByTestId } = render(<FinishHdModal open onClose={onClose} />, {
      preloadedState: { dialysis: { isSubmitting: true } },
    });
    const cancelButton = getByTestId('closeIcon');

    await user.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
