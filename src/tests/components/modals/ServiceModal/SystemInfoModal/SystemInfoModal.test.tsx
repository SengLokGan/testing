import { render } from '@src/tests/utils';
import { screen } from '@testing-library/dom';
import { ServiceModalName } from '@enums/components';
import { waitFor } from '@testing-library/react';

const user = {
  id: 1,
  firstName: 'Name',
  lastName: 'Lastname',
  login: 'login',
  organizations: [],
  currentBranchId: 1000,
  currentOrganizationId: 1001,
  roles: [],
  permissions: [],
};

describe('SystemInfoModal', () => {
  it('should render the SystemInfoModal and check that all text is there', async () => {
    await render(<></>, {
      preloadedState: {
        user: {
          user,
        },
        serviceModal: {
          [ServiceModalName.SystemInfoModal]: {},
        },
      },
    });
    await waitFor(() => {
      expect(screen.getByTestId('systemInfoModal')).toBeInTheDocument();
    });
    expect(screen.getByText(/productName/i)).toBeInTheDocument();
    expect(screen.getByText('appName')).toBeInTheDocument();
    expect(screen.getByText(/udipi/i)).toBeInTheDocument();
    expect(screen.getByText(/arName/i)).toBeInTheDocument();
    expect(screen.getByText('renalWorksName')).toBeInTheDocument();
    expect(screen.getByText(/arAddress/i)).toBeInTheDocument();
    expect(screen.getByText('renalWorksAddress')).toBeInTheDocument();
    expect(screen.getByText(/establishmentLicenseNo/i)).toBeInTheDocument();
    expect(screen.getByText('MDA-4587-W123')).toBeInTheDocument();
    expect(screen.getByText(/medicalDeviceIndication/i)).toBeInTheDocument();
    expect(screen.getByText('2023RenalWorksPteLtdAllRightsReserved')).toBeInTheDocument();
  });
});
