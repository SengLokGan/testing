import userEvent from '@testing-library/user-event';
import { render } from '../../utils';
import AddAccessManagementForm from '@containers/layouts/Drawer/components/AddAccessManagementForm/AddAccessManagementForm';

describe('AddAccessManagementForm', () => {
  const user = userEvent.setup();

  it('should render form', () => {
    const { getByTestId } = render(<AddAccessManagementForm />);

    expect(getByTestId('addAccessManagementForm')).toBeInTheDocument();
  });

  it('should contain control vascular elements', () => {
    const { getByText, getByTestId, getAllByTestId } = render(<AddAccessManagementForm />);

    expect(getByText('modal.accessCategory')).toBeInTheDocument();
    expect(getByTestId('VASCULAR_ACCESSRadioButton')).toBeInTheDocument();
    expect(getByTestId('CVCRadioButton')).toBeInTheDocument();

    expect(getByTestId('creationDateDatePicker')).toBeInTheDocument();
    expect(getByTestId('createdByTextInput')).toBeInTheDocument();
    expect(getByTestId('createdAtTextInput')).toBeInTheDocument();

    expect(getByText('modal.accessType')).toBeInTheDocument();
    expect(getByTestId('AVFRadioButton')).toBeInTheDocument();
    expect(getByTestId('AVGRadioButton')).toBeInTheDocument();

    expect(getByTestId('noteTextInput')).toBeInTheDocument();

    expect(getByText('modal.side')).toBeInTheDocument();
    expect(getByTestId('LEFTRadioButton')).toBeInTheDocument();
    expect(getByTestId('RIGHTRadioButton')).toBeInTheDocument();

    expect(getByText('modal.needleType')).toBeInTheDocument();
    expect(getByTestId('STANDARD_AVF_NEEDLERadioButton')).toBeInTheDocument();
    expect(getByTestId('BLUNT_AVF_NEEDLERadioButton')).toBeInTheDocument();
    expect(getByTestId('SINGLE_NEEDLERadioButton')).toBeInTheDocument();

    expect(getByText('modal.arterialNeedleSize')).toBeInTheDocument();
    expect(getAllByTestId('17RadioButton')).toHaveLength(2);
    expect(getAllByTestId('16RadioButton')).toHaveLength(2);
    expect(getAllByTestId('15RadioButton')).toHaveLength(2);
    expect(getAllByTestId('14RadioButton')).toHaveLength(2);

    expect(getByText('modal.venousNeedleSize')).toBeInTheDocument();
    expect(getByTestId('commentsTextInput')).toBeInTheDocument();

    expect(getByTestId('cancelAddAccessManagementButton')).toBeInTheDocument();
    expect(getByTestId('saveAddAccessManagementButton')).toBeInTheDocument();
  });

  it('should contain control cvc elements', async () => {
    const { getByTestId } = render(<AddAccessManagementForm />);
    const cvcRadioButton = getByTestId('CVCRadioButton').querySelector('input');
    expect(cvcRadioButton).toBeTruthy();

    cvcRadioButton && (await user.click(cvcRadioButton));
    expect(cvcRadioButton).toBeChecked();
    expect(getByTestId('insertionDateDatePicker')).toBeInTheDocument();
    expect(getByTestId('PERMANENTRadioButton')).toBeInTheDocument();
    expect(getByTestId('TEMPORARYRadioButton')).toBeInTheDocument();
    expect(getByTestId('LEFTRadioButton')).toBeInTheDocument();
    expect(getByTestId('RIGHTRadioButton')).toBeInTheDocument();
    expect(getByTestId('HEPARIN_UNITS_MLRadioButton')).toBeInTheDocument();
    expect(getByTestId('arterialVolumeTextInput')).toBeInTheDocument();
    expect(getByTestId('venousVolumeTextInput')).toBeInTheDocument();
    expect(getByTestId('commentsTextInput')).toBeInTheDocument();
  });
});
