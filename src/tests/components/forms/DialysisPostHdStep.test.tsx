import { render } from '@src/tests';
import { DialysisPostHdStep } from '@components/modals/ServiceModal/components/DialysisProcedureModal/components/steps/DialysisPostHdStep';
import { postHdFixture } from '@src/tests/fixtures';
import { UserPermissions, DialysisStatus } from '@enums';
import { format } from 'date-fns';

const initialState = {
  dialysis: {
    postHd: postHdFixture(),
    metaData: {
      event: null,
    },
    status: {
      currentStep: DialysisStatus.PostDialysis,
      activeStep: DialysisStatus.PostDialysis,
    },
    startTime: '2022-11-15T09:41:24.321Z',
    endTime: '2022-11-15T11:41:53.832Z',
    bay: 'Bay 05',
  },
  user: {
    user: {
      permissions: [UserPermissions.DialysisEditMeasurement],
    },
  },
};

describe('DialysisHdReadingStepForm', () => {
  it('should show postHd step with data', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<DialysisPostHdStep />, {
      preloadedState: initialState,
    });
    expect(getByTestId('postSessionWeightAutocompleteFreeSolo')).toHaveAttribute('value', '99');
    expect(getByTestId('weightLossTextInput')).toHaveAttribute('value', '1');
    expect(getByTestId('sittingSystolicBloodPressureTextInput')).toHaveAttribute('value', '44');
    expect(getByTestId('sittingDiastolicBloodPressureTextInput')).toHaveAttribute('value', '55');
    expect(getByTestId('sittingPulseTextInput')).toHaveAttribute('value', '66');
    expect(getByTestId('standingSystolicBloodPressureTextInput')).toHaveAttribute('value', '11');
    expect(getByTestId('standingDiastolicBloodPressureTextInput')).toHaveAttribute('value', '22');
    expect(getByTestId('standingPulseTextInput')).toHaveAttribute('value', '33');
    expect(getByTestId('bodyTemperatureTextInput')).toHaveAttribute('value', '38.0');
    expect(getByLabelText('ACCEPTABLE_PATIENT_CONDITIONRadioButton')).toHaveAttribute('checked');
    expect(getByLabelText('NO_ACCESS_PROBLEMS_POST_HDRadioButton')).toHaveAttribute('checked');
    expect(getByLabelText('WITHOUT_DIFFICULTIESRadioButton')).toHaveAttribute('checked');
    expect(getByText(format(new Date('2022-11-15T09:41:24.321z'), 'hh:mm aa'))).toBeInTheDocument();
    expect(getByText(format(new Date('2022-11-15T11:41:53.832z'), 'hh:mm aa'))).toBeInTheDocument();
    expect(getByText('02:00')).toBeInTheDocument();
    expect(getByLabelText('UNEVENTFULRadioButton')).toHaveAttribute('checked');
    expect(getByTestId('summaryTextTextInput')).toHaveTextContent('all is ok');
  });
});
