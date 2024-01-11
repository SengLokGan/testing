import { render } from '@src/tests/utils';
import { prescriptionFixture } from '@src/tests/fixtures/prescriptions';
import DialysisServicesStep from '@components/modals/ServiceModal/components/DialysisProcedureModal/components/steps/DialysisServicesStep';
import { ServiceModalName, DialysisStatus } from '@enums';
import { patient } from '@src/tests/fixtures';

const preloadedStateMock = {
  serviceModal: {
    [ServiceModalName.DialysisProcedureModal]: {
      patientId: 10,
    },
  },
  dialysis: {
    loading: false,
    patient,
    isolationGroup: {
      id: 1,
      name: 'Iso 1',
    },
    services: {
      hemodialysis: prescriptionFixture(),
    },
    metaData: {
      event: '',
    },
    status: {
      activeStep: DialysisStatus.CheckIn,
    },
  },
};

describe('DialysisHemodialysisServiceCard', () => {
  it('should render general info if patient has dialysis', () => {
    const { queryByText } = render(<DialysisServicesStep />, {
      preloadedState: { ...preloadedStateMock, dialysis: { ...preloadedStateMock.dialysis, withDialysis: true } },
    });
    expect(queryByText('activePrescription')).toBeTruthy();
    expect(queryByText('generalInfo')).toBeTruthy();
    expect(queryByText('enteredBy')).toBeTruthy();
    expect(queryByText('prescribedBy')).toBeTruthy();
    expect(queryByText('frequency')).toBeTruthy();
    expect(queryByText('isolation')).toBeTruthy();
    expect(queryByText('days')).toBeTruthy();
    expect(queryByText('startDate')).toBeTruthy();
    expect(queryByText('endDate')).toBeTruthy();
    expect(queryByText('hdSessions')).toBeTruthy();
    expect(queryByText('duration')).toBeTruthy();
    expect(queryByText('dialyzerUtilization')).toBeTruthy();
    expect(queryByText('dialyzerBrand')).toBeTruthy();
    expect(queryByText('surfaceArea')).toBeTruthy();
    expect(queryByText('dialysate')).toBeTruthy();
    expect(queryByText('anticoagulant')).toBeTruthy();
    expect(queryByText('comments')).toBeTruthy();
  });

  it('should not render general info if patient has no dialysis', () => {
    const { queryByText } = render(<DialysisServicesStep />, {
      preloadedState: { ...preloadedStateMock, dialysis: { ...preloadedStateMock.dialysis, withDialysis: false } },
    });
    expect(queryByText('activePrescription')).not.toBeTruthy();
  });
});
