import { render } from '@src/tests/utils';
import { getCodeValueFromCatalog, getTimeFromDate } from '@utils';
import { Header } from '@components/modals/ServiceModal/components/DialysisProcedureModal/components/Header';
import { dialysisFixture, patient } from '@src/tests/fixtures/dialysis';
import { DialysisStatus } from '@enums';
import userEvent from '@testing-library/user-event';
import { selectDialysisStatus } from '@store/slices/dialysisSlice';
import { waitFor, screen } from '@testing-library/dom';

const HeaderWithWrapper = () => {
  const status = selectDialysisStatus();
  return <Header patient={patient} status={status} />;
};

describe('DialysisProcedureModalHeader', () => {
  const user = userEvent.setup();

  it('should render patient info', () => {
    render(<HeaderWithWrapper />, {
      preloadedState: {
        ...dialysisFixture(DialysisStatus.PreDialysis),
        serviceModal: {},
      },
    });
    const header = screen.getByTestId('dialysisProcedureModalHeader');
    const closeArrow = screen.getByTestId('closeModalButton');

    expect(header).toBeInTheDocument();
    expect(closeArrow).toBeInTheDocument();
    expect(
      screen.getByText(
        `${patient.patientName} - ${patient.document.number} - ${getTimeFromDate(
          patient.birthDate,
        )} - ${getCodeValueFromCatalog('gender', patient.gender.code)}`,
      ),
    ).toBeTruthy();
  });

  it('should render step buttons', () => {
    render(<HeaderWithWrapper />, {
      preloadedState: {
        ...dialysisFixture(DialysisStatus.PreDialysis),
        serviceModal: {},
      },
    });

    const serviceButton = screen.getByTestId(`${DialysisStatus.CheckIn}Button`);
    const preHdButton = screen.getByTestId(`${DialysisStatus.PreDialysis}Button`);
    const hdReadingButton = screen.getByTestId(`${DialysisStatus.HDReading}Button`);
    const postHdButton = screen.getByTestId(`${DialysisStatus.PostDialysis}Button`);

    expect(serviceButton).toBeInTheDocument();
    expect(preHdButton).toBeInTheDocument();
    expect(hdReadingButton).toBeInTheDocument();
    expect(postHdButton).toBeInTheDocument();
  });

  it('should render only services step button, when patient has no dialysis', () => {
    render(<HeaderWithWrapper />, {
      preloadedState: {
        ...dialysisFixture(DialysisStatus.PreDialysis, [], false),
        serviceModal: {},
      },
    });

    const serviceButton = screen.getByTestId(`${DialysisStatus.CheckIn}Button`);
    const preHdButton = screen.queryByTestId(`${DialysisStatus.PreDialysis}Button`);
    const hdReadingButton = screen.queryByTestId(`${DialysisStatus.HDReading}Button`);
    const postHdButton = screen.queryByTestId(`${DialysisStatus.PostDialysis}Button`);

    expect(serviceButton).toBeInTheDocument();
    expect(preHdButton).not.toBeInTheDocument();
    expect(hdReadingButton).not.toBeInTheDocument();
    expect(postHdButton).not.toBeInTheDocument();
  });

  it('should render active and current step buttons', async () => {
    render(<HeaderWithWrapper />, {
      preloadedState: {
        ...dialysisFixture(DialysisStatus.PreDialysis),
        serviceModal: {},
      },
    });
    const serviceButton = screen.getByTestId(`${DialysisStatus.CheckIn}Button`);
    const preHdButton = screen.getByTestId(`${DialysisStatus.PreDialysis}Button`);

    expect(serviceButton).toBeInTheDocument();
    expect(serviceButton.classList.contains('MuiButton-outlined')).toBe(true);
    expect(preHdButton.classList.contains('MuiButton-contained')).toBe(true);
  });

  it('should render header without abort button', () => {
    render(<HeaderWithWrapper />, {
      preloadedState: {
        ...dialysisFixture(DialysisStatus.CheckIn),
        serviceModal: {},
      },
    });
    expect(screen.queryByTestId('abortDialysisButton')).not.toBeInTheDocument();
  });

  it('should render header with abort button and check that its working', async () => {
    render(<HeaderWithWrapper />, {
      preloadedState: {
        ...dialysisFixture(DialysisStatus.HDReading),
        serviceModal: {},
      },
    });

    const abortButton = screen.getByTestId('abortDialysisButton');

    expect(abortButton).toBeTruthy();

    await user.click(abortButton);
    await waitFor(() => {
      expect(screen.getByTestId('GlobalConfirmModal')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('GlobalConfirmModal').querySelector('svg')).toBeInTheDocument();
    });
    expect(screen.getByText('areYouSureYouWantToAbort')).toBeInTheDocument();
    expect(screen.getByText('allDataWillBeLost')).toBeInTheDocument();

    await user.click(screen.getByTestId('confirmModalConfirmButton'));
    expect(screen.queryByTestId('GlobalConfirmModal')).not.toBeInTheDocument();
  });

  it('should render actions buttons, when patient has dialysis', () => {
    render(<HeaderWithWrapper />, {
      preloadedState: {
        ...dialysisFixture(DialysisStatus.PreDialysis, []),
        serviceModal: {},
      },
    });

    expect(screen.getByTestId('dialysisServicesModalControlButtons')).toBeInTheDocument();
  });

  it('should not render actions buttons, when patient has no dialysis', () => {
    render(<HeaderWithWrapper />, {
      preloadedState: {
        ...dialysisFixture(DialysisStatus.PreDialysis, [], false),
        serviceModal: {},
      },
    });

    expect(screen.queryByTestId('dialysisServicesModalControlButtons')).not.toBeInTheDocument();
  });
});
