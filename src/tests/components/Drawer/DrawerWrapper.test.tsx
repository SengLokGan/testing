import { render } from '../../utils';
import { DrawerWrapper } from '@containers/layouts/Drawer/DrawerWrapper';
import { DrawerType } from '@enums';
import {
  getDrawerAccessManagementFixture,
  getDrawerClinicalNotesFormFixture,
  getDrawerEmptyFixture,
  getDrawerHdPrescriptionFormFixture,
  getDrawerHdSchedulingFixture,
  getDrawerLabOrderCreationFixture,
  getDrawerMedicationFixture,
  getDrawerPatientsOverviewFiltersFixture,
  getDrawerTodayPatientsFiltersFixture,
} from '@src/tests/fixtures/drawers';
import { MedicationDrawerType } from '@enums';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/test',
  }),
}));

describe('Drawer', () => {
  const user = userEvent.setup();

  it('should render hd prescription form in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.HdPrescriptionForm]: getDrawerHdPrescriptionFormFixture(),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('hdPrescription:form.title')).toBeInTheDocument();
  });

  it('should render empty drawer', () => {
    const { queryAllByTestId } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.Empty]: getDrawerEmptyFixture(),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
  });

  it('should render medication change form in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.Medication]: getDrawerMedicationFixture({
            payload: {
              id: 50,
              type: MedicationDrawerType.Change,
            },
          }),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('medications:form.changeTitle')).toBeInTheDocument();
  });

  it('should render medication confirm form in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.Medication]: getDrawerMedicationFixture({
            payload: {
              id: 50,
              type: MedicationDrawerType.Confirm,
            },
          }),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('medications:form.confirmTitle')).toBeInTheDocument();
  });

  it('should render medication edit form in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.Medication]: getDrawerMedicationFixture({
            payload: {
              id: 50,
              type: MedicationDrawerType.Edit,
            },
          }),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('medications:form.editTitle')).toBeInTheDocument();
  });

  it('should render medication add form in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.Medication]: getDrawerMedicationFixture(),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('medications:form.title')).toBeInTheDocument();
  });

  it('should render today patients filters in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.TodayPatientsFilters]: getDrawerTodayPatientsFiltersFixture(),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('common:filters')).toBeInTheDocument();
  });

  it('should render patients overview filters in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.PatientsOverviewFilters]: getDrawerPatientsOverviewFiltersFixture(),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('common:filters')).toBeInTheDocument();
  });

  it('should render clinical notes form in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.ClinicalNotesForm]: getDrawerClinicalNotesFormFixture(),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('clinicalNotes:clinicalNote')).toBeInTheDocument();
  });

  it('should render access management form in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.AccessManagementForm]: getDrawerAccessManagementFixture(),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('accessManagement:accessManagement')).toBeInTheDocument();
  });

  it('should render hd scheduling form in drawer', () => {
    const { queryAllByTestId, queryByText } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.HdScheduling]: getDrawerHdSchedulingFixture(),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(1);
    expect(queryByText('hdPrescription:form.hdScheduling')).toBeInTheDocument();
  });

  it('should render several drawers and remove one on close click in drawer', async () => {
    const { queryAllByTestId, getAllByTestId, rerender } = render(<DrawerWrapper />, {
      preloadedState: {
        drawer: {
          [DrawerType.Empty]: getDrawerEmptyFixture(),
          [DrawerType.AccessManagementForm]: getDrawerAccessManagementFixture(),
        },
      },
    });
    expect(queryAllByTestId('drawer')).toHaveLength(2);
    await user.click(getAllByTestId('drawerCloseIcon')[0]);
    rerender(<DrawerWrapper />);
    await waitFor(() => {
      expect(getAllByTestId('drawer')[0].querySelector('.MuiDrawer-paper')).toHaveStyle('right: -100vw');
    });
  });
});
