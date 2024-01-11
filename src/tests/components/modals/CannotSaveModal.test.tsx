import userEvent from '@testing-library/user-event';
import { render } from '../../utils';
import { CannotSaveModal } from '../../../components/modals/ServiceModal/components/DialysisProcedureModal/components/steps/components/CannotSaveModal';

describe('CannotSaveModal', () => {
  const onClose = jest.fn();
  const user = userEvent.setup();

  it('should render modal if open prop is true', () => {
    const { getByTestId } = render(<CannotSaveModal open={true} onClose={onClose} />);
    expect(getByTestId('errorHdReadingModal')).toBeInTheDocument();
  });

  it('should close modal on close  open prop is true', async () => {
    const { getByTestId } = render(<CannotSaveModal open={true} onClose={onClose} />);
    await user.click(getByTestId('cannotSaveModalOkButton'));
    await user.click(getByTestId('cannotSaveModalCloseButton'));
    expect(onClose).toBeCalledTimes(2);
  });
});
