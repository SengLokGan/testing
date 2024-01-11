import { screen } from '@testing-library/dom';
import { render } from '@src/tests/utils';
import { medicationFixture } from '@src/tests/fixtures/medications';
import { MedicationsTable } from '@components/pages/PatientProfile';
import userEvent from '@testing-library/user-event';
import { MedicationPlaces } from '@enums';
import { act } from 'react-dom/test-utils';

const initialMedicationsState = {
  loading: false,
  error: undefined,
  medications: [medicationFixture()],
};

describe('Medications table', () => {
  const user = userEvent.setup();

  it('should render an empty body with tabs', () => {
    const { getByText } = render(<MedicationsTable />);
    const medicationsTab = getByText(/tableView.medications/i);
    const emptyInfo = getByText(/noResultsFound/i);
    expect([medicationsTab, emptyInfo]).toBeTruthy();
  });

  it('should render table with data', () => {
    render(<MedicationsTable />, {
      preloadedState: { medications: initialMedicationsState },
    });

    const expandLessIcon = screen.getByTestId(/ExpandLessIcon/i);
    const medicationName = screen.getByText(/medicationName/i);
    const administering = screen.getByText(/administering/i);
    const antibiotic = screen.getByText(/antibiotic/i);
    const status = screen.getByText(/statuses.UNCONFIRMED/i);
    expect(expandLessIcon).toBeTruthy();
    expect(medicationName).toBeTruthy();
    expect(administering).toBeTruthy();
    expect(antibiotic).toBeTruthy();
    expect(status).toBeTruthy();
  });

  it('should show additional info after expand', async () => {
    render(<MedicationsTable />, {
      preloadedState: { medications: { medications: [medicationFixture()] } },
    });

    await act(() => user.click(screen.getByTestId('ExpandLessIcon')));

    expect(screen.getAllByText('MedicationName')).toHaveLength(2);
    expect(screen.getAllByText('antibiotic')).toHaveLength(1);
    expect(screen.getByText('tableView.nameOfDrag')).toBeTruthy();
    expect(screen.getByText('tableView.medicalGroup')).toBeTruthy();
    expect(screen.getByText('tableView.route')).toBeTruthy();
    expect(screen.getByText('Route')).toBeTruthy();
    expect(screen.getByText('tableView.amount')).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
    expect(screen.getByText('tableView.frequency')).toBeTruthy();
    expect(screen.getByText('tableView.day')).toBeTruthy();
    expect(screen.getByText('DIALYSIS_DAY:daily')).toBeTruthy();
    expect(screen.getByText('Meal')).toBeTruthy();
    expect(screen.getByText('tableView.prescribedBy')).toBeTruthy();
    expect(screen.getByText('DoctorName, DOCTOR_SPECIALITIES:DOCTOR_NEPHROLOGIST')).toBeTruthy();
    expect(screen.getByText('11/10/2022')).toBeTruthy();
    expect(screen.getByText('tableView.enteredBy')).toBeTruthy();
    expect(screen.getByText('Karl')).toBeTruthy();
    expect(screen.getByText('12/10/2022')).toBeTruthy();
    expect(screen.getByText('tableView.editedBy')).toBeTruthy();
    expect(screen.getByText('Liza')).toBeTruthy();
    expect(screen.getByText('13/10/2022')).toBeTruthy();
    expect(screen.getByText('tableView.confirmedBy')).toBeTruthy();
    expect(screen.getByText('John')).toBeTruthy();
    expect(screen.getByText('14/10/2022')).toBeTruthy();
    expect(screen.getByText('tableView.orderedToDiscontinue')).toBeTruthy();
    expect(screen.getByText('Marco')).toBeTruthy();
    expect(screen.getByText('16/10/2022')).toBeTruthy();
    expect(screen.getByText('tableView.discontinueBy')).toBeTruthy();
    expect(screen.getByText('Abbigail')).toBeTruthy();
    expect(screen.getByText('15/10/2022')).toBeTruthy();
    expect(screen.getByText('tableView.discontinueReason')).toBeTruthy();
    expect(screen.getByText('wrong medication')).toBeTruthy();
    expect(screen.getByText('tableView.comments')).toBeTruthy();
  });

  it('should not show injections have been administered data if medication is long term', async () => {
    render(<MedicationsTable />, {
      preloadedState: { medications: { medications: [{ ...medicationFixture(), place: MedicationPlaces.AtHome }] } },
    });

    await act(() => user.click(screen.getByTestId('ExpandLessIcon')));

    expect(screen.queryByText('tableView.injectionsHaveBeenAdministered')).not.toBeInTheDocument();
  });
});
