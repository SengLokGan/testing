import React from 'react';
import { screen } from '@testing-library/react';
import { PatientStatuses } from '@enums';
import { PatientStatusBlock } from '@src/components/pages/PatientProfile/PatientStatusBlock/PatientStatusBlock';
import { patientPermanentFixture, patientStatusFixture } from '@src/tests/fixtures';
import { render } from '@src/tests/utils';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';

const patient = patientPermanentFixture();
const statusesHistory = [
  patientStatusFixture({ statusId: 1, status: PatientStatuses.Permanent }),
  patientStatusFixture({ statusId: 2, status: PatientStatuses.Hospitalized }),
  patientStatusFixture({ statusId: 2, status: PatientStatuses.Visiting }),
  patientStatusFixture({ statusId: 3, status: PatientStatuses.Dead }),
];

describe('PatientStatusBlock', () => {
  const user = userEvent.setup();

  it('should render component with many statuses', async () => {
    render(<PatientStatusBlock />, {
      preloadedState: {
        patient: {
          loading: false,
          error: null,
          saveSuccess: false,
          patient,
          patientIsolation: undefined,
          statusesHistory,
        },
      },
    });

    expect(screen.getByTestId('patientStatusCollapse')).toBeInTheDocument();
    statusesHistory.forEach((statusData) => {
      expect(screen.getByTestId(`patientStatusData${statusData.status}`)).toBeInTheDocument();
    });
    expect(screen.getByText('showMore')).toBeInTheDocument();
    await user.click(screen.getByText('showMore'));
    await waitFor(() => {
      expect(screen.getByText('showLess')).toBeInTheDocument();
    });
    await user.click(screen.getByText('showLess'));
    await waitFor(() => {
      expect(screen.getByText('showMore')).toBeInTheDocument();
    });
    expect(screen.getByText('dateOfDeath')).toBeInTheDocument();
  });

  it('should render component with single status', async () => {
    render(<PatientStatusBlock />, {
      preloadedState: {
        patient: {
          loading: false,
          error: null,
          saveSuccess: false,
          patient,
          patientIsolation: undefined,
          statusesHistory: statusesHistory[0],
        },
      },
    });

    expect(screen.queryByTestId('patientStatusCollapse')).not.toBeInTheDocument();
  });
});
