import { waitFor, screen } from '@testing-library/dom';
import { ServiceModalName } from '@enums';
import { render } from '@src/tests';
import { patientPermanentFixture } from '@src/tests/fixtures';

describe.skip('ServiceModal', () => {
  it('should render custom modal', async () => {
    await render(<div></div>, {
      preloadedState: {
        patient: {
          loading: false,
          error: null,
          patient: patientPermanentFixture(),
        },
        serviceModal: {
          [ServiceModalName.PatientStatusModal]: {
            isHistory: false,
          },
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByTestId('patientStatusModal')).toBeInTheDocument();
    });
  });
  it('should close custom modal', async () => {
    const { container } = render(<></>, {
      preloadedState: { serviceModal: {} },
    });

    expect(container).toBeEmptyDOMElement();
  });
});
