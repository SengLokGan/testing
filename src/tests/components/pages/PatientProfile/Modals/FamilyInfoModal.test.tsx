import userEvent from '@testing-library/user-event';
import { FamilyInfoModal } from '@components/pages/PatientProfile';
import { render } from '../../../../utils';
import { waitFor, screen } from '@testing-library/dom';

const patient = {
  family: {
    maritalStatus: 'M',
    childCount: 4,
    kins: [
      {
        name: 'John',
        phone: {
          countryCode: '+65',
          number: '123123123',
        },
      },
    ],
  },
};

describe('FamilyInfoModal', () => {
  const onClose = jest.fn();
  const user = userEvent.setup();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal if isOpen prop is true', () => {
    render(<FamilyInfoModal isOpen={true} onClose={onClose} />);

    expect(screen.getByTestId('profile.familyInfoFullScreenModal')).toBeInTheDocument();
    expect(screen.getAllByText('profile.familyInfo')).toHaveLength(2);
  });

  it('should be unmounted if isOpen false', () => {
    render(<FamilyInfoModal isOpen={false} onClose={onClose} />);
    expect(screen.queryByTestId('profile.familyInfoFullScreenModal')).not.toBeInTheDocument();
  });

  it('should be closed on press cancel or close button', async () => {
    render(<FamilyInfoModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByTestId('cancelFamilyInfoModalButton'));
    await user.click(screen.getByTestId('closeModalButton'));

    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('should contain inputs', async () => {
    render(<FamilyInfoModal isOpen={true} onClose={onClose} />);

    expect(screen.getByTestId('maritalStatusSelectInput')).toBeInTheDocument();
    expect(screen.getByTestId('childCountNumberInput')).toBeInTheDocument();
    expect(screen.getByTestId('kins.0.nameTextInput')).toBeInTheDocument();
    expect(screen.getByTestId('kins.0.relationshipTextInput')).toBeInTheDocument();
    expect(screen.getByTestId('kins.0.phone.numberPhoneInput')).toBeInTheDocument();
  });

  it('should show confirm modal after changing data', async () => {
    await render(<FamilyInfoModal isOpen={true} onClose={onClose} />, {
      preloadedState: { patient: { patient } },
    });

    const childrenCountInput = screen.getByTestId('childCountNumberInput');
    expect(childrenCountInput).toBeTruthy();
    expect(childrenCountInput).toHaveAttribute('value', '4');
    await user.clear(childrenCountInput);
    await user.type(childrenCountInput, '1');
    expect(childrenCountInput).toHaveAttribute('value', '1');

    await user.click(screen.getByTestId('cancelFamilyInfoModalButton'));
    await waitFor(() => {
      expect(screen.getByTestId('GlobalConfirmModal')).toBeInTheDocument();
    });
  });

  it('should close confirm modal', async () => {
    await render(<FamilyInfoModal isOpen={true} onClose={onClose} />, {
      preloadedState: { patient: { patient } },
    });

    const childrenCountInput = screen.getByTestId('childCountNumberInput');
    await user.clear(childrenCountInput);
    await user.type(childrenCountInput, '1');
    const cancelFamilyInfoModalButton = screen.getByTestId('cancelFamilyInfoModalButton');
    await user.click(cancelFamilyInfoModalButton);
    await waitFor(() => {
      expect(screen.getByTestId('GlobalConfirmModal')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('confirmModalCancelButton'));
    expect(screen.queryByTestId('GlobalConfirmModal')).not.toBeInTheDocument();

    await user.click(cancelFamilyInfoModalButton);
    const confirmModalConfirmButton = screen.getByTestId('confirmModalConfirmButton');
    await user.click(confirmModalConfirmButton);
    expect(screen.queryByTestId('GlobalConfirmModal')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should disable button while form submitting', async () => {
    await render(<FamilyInfoModal isOpen={true} onClose={onClose} />, {
      preloadedState: { patient: { patient, loading: true, saveSuccess: false } },
    });

    const saveButton = screen.getByTestId('saveFamilyInfoModalButton');
    expect(saveButton).toHaveAttribute('disabled');
    expect(screen.getByTestId('progressbar')).toBeInTheDocument();
  });

  it('should call close after success submit', async () => {
    await render(<FamilyInfoModal isOpen={true} onClose={onClose} />, {
      preloadedState: { patient: { patient, loading: false, saveSuccess: true } },
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
