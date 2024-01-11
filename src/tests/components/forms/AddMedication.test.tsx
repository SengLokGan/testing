import userEvent from '@testing-library/user-event';
import { render } from '@src/tests';
import AddMedicationForm from '@containers/layouts/Drawer/components/AddMedicationForm/AddMedicationForm';
import { medicationFixture } from '@src/tests/fixtures/medications';
import { MedicationDurationTypes, DrawerType, MedicationPlaces, MedicationFrequency } from '@enums';
import { waitFor, screen } from '@testing-library/dom';

const medication = {
  id: 'exampleId',
  amount: 'amount',
  comments: 'test comments',
  day: 'daily',
  doctorType: 'EXTERNAL',
  doctorsName: 'John',
  doctorsSpeciality: 'speciality',
  frequency: MedicationFrequency.ONCE_PER_DAY,
  meal: 'meal',
  nameDrug: { id: '', name: '' },
  medicationGroup: 'Anti-Cholesterol',
  prescriptionDate: new Date(),
  route: 'Oral',
};

const preloadedState = {
  medications: {
    medications: [medicationFixture()],
  },
};

describe('AddMedicationForm', () => {
  const user = userEvent.setup();

  it('should render form', () => {
    render(<AddMedicationForm />);

    expect(screen.getByTestId('addMedicationForm')).toBeInTheDocument();
  });

  it('should contain control elements', () => {
    const { getByTestId, getAllByRole } = render(<AddMedicationForm />);
    const inputs = getAllByRole('textbox');
    const combobox = getAllByRole('combobox');
    const select = getByTestId('daySelectInput');
    const radioButtons = getAllByRole('radio');
    const canselButton = getByTestId('cancelMedicationButton');
    const saveButton = getByTestId('saveMedicationButton');

    expect(inputs).toHaveLength(4);
    expect(combobox).toHaveLength(6);
    expect(select).toBeInTheDocument();
    expect(radioButtons).toHaveLength(2);
    expect(canselButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it('should show confirm modal', async () => {
    render(<AddMedicationForm />, {
      preloadedState,
    });

    await user.type(screen.getByTestId('amountTextInput'), '5');
    await user.click(screen.getByTestId('cancelMedicationButton'));

    await waitFor(() => {
      expect(screen.getByTestId('GlobalConfirmModal')).toBeInTheDocument();
    });
  });

  it('should show and close confirm modal', async () => {
    render(<AddMedicationForm />, {
      preloadedState,
    });

    await user.type(screen.getByTestId('amountTextInput'), '5');
    await user.click(screen.getByTestId('cancelMedicationButton'));

    await waitFor(() => {
      expect(screen.getByTestId('GlobalConfirmModal')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('confirmModalCancelButton'));
    expect(screen.queryByTestId('GlobalConfirmModal')).not.toBeInTheDocument();
    expect(screen.getByTestId('addMedicationForm')).toBeInTheDocument();
  });

  it('should confirm close confirm modal', async () => {
    render(<AddMedicationForm />, {
      preloadedState: {
        drawer: {
          [DrawerType.Medication]: {
            payload: { id: 1 },
            onCloseStatus: {
              isDirty: true,
            },
          },
        },
      },
    });

    await user.type(screen.getByTestId('amountTextInput'), '5');
    await user.click(screen.getByTestId('cancelMedicationButton'));

    await waitFor(() => {
      expect(screen.getByTestId('GlobalConfirmModal')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('confirmModalConfirmButton'));
    expect(screen.queryByTestId('GlobalConfirmModal')).not.toBeInTheDocument();
  });

  it('should disable button while form submitting', async () => {
    render(<AddMedicationForm />, {
      preloadedState: {
        medications: { ...preloadedState.medications, medicationForm: medication, loading: true, saveSuccess: false },
      },
    });

    const saveMedicationButton = screen.getByTestId('saveMedicationButton');

    expect(saveMedicationButton).toBeInTheDocument();
    expect(saveMedicationButton).toHaveAttribute('disabled');
    expect(screen.getByTestId('progressbar')).toBeInTheDocument();
  });

  it('should not show some elements, when administering "At home" is selected', async () => {
    render(<AddMedicationForm />);

    await userEvent.click(screen.getByTestId(`${MedicationPlaces.AtHome}RadioButton`));

    expect(screen.getByTestId('frequencyLongTermAutocompleteFreeSolo')).toBeInTheDocument();
    expect(screen.queryByTestId('frequencyDialysisRelatedSelectInput')).not.toBeInTheDocument();
    expect(screen.queryByTestId('durationOfMedicationSectionTitle')).not.toBeInTheDocument();
    expect(screen.queryByTestId('startDateDatePicker')).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${MedicationDurationTypes.Unlimited}RadioButton`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${MedicationDurationTypes.VisitsAmount}RadioButton`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${MedicationDurationTypes.DueDate}RadioButton`)).not.toBeInTheDocument();
  });

  it('should show needed elements, when administering "In center" is selected', async () => {
    render(<AddMedicationForm />);

    await userEvent.click(screen.getByTestId(`${MedicationPlaces.InCenter}RadioButton`));

    expect(screen.queryByTestId('frequencyLongTermAutocompleteFreeSolo')).not.toBeInTheDocument();
    expect(screen.getByTestId('frequencyDialysisRelatedSelectInput')).toBeInTheDocument();
    expect(screen.getByTestId('durationOfMedicationSectionTitle')).toBeInTheDocument();
    expect(screen.getByTestId('startDateDatePicker')).toBeInTheDocument();
    expect(screen.getByTestId(`${MedicationDurationTypes.Unlimited}RadioButton`)).toBeInTheDocument();
    expect(screen.getByTestId(`${MedicationDurationTypes.VisitsAmount}RadioButton`)).toBeInTheDocument();
    expect(screen.getByTestId(`${MedicationDurationTypes.DueDate}RadioButton`)).toBeInTheDocument();
  });

  it('should show needed elements, when "days amount" duration type is selected', async () => {
    render(<AddMedicationForm />);

    await userEvent.click(screen.getByTestId(`${MedicationPlaces.InCenter}RadioButton`));
    await userEvent.click(screen.getByTestId(`${MedicationDurationTypes.VisitsAmount}RadioButton`));

    expect(screen.getByTestId('visitsAmountTextInput')).toBeInTheDocument();
  });

  it('should show needed elements, when "due date" duration type is selected', async () => {
    render(<AddMedicationForm />);

    await userEvent.click(screen.getByTestId(`${MedicationPlaces.InCenter}RadioButton`));
    await userEvent.click(screen.getByTestId(`${MedicationDurationTypes.DueDate}RadioButton`));

    expect(screen.getByTestId('dueDateDatePicker')).toBeInTheDocument();
  });

  it('should disable day input and set its value to an empty string, when "Dialysis related medication" is selected', async () => {
    render(<AddMedicationForm />);

    await userEvent.click(screen.getByTestId(`${MedicationPlaces.InCenter}RadioButton`));

    expect(screen.getByTestId('dayTextInput')).toBeDisabled();
    expect(screen.getByTestId('dayTextInput')).toHaveAttribute('value', 'form.dialysisDay');
  });
});
