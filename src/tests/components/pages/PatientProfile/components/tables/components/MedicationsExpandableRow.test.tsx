import { render } from '@src/tests/utils';
import type { MedicationResponse } from '@types';
import { medicationFixture } from '@src/tests/fixtures/medications';
import { MedicationsExpandableRow } from '@components/pages/PatientProfile';
import userEvent from '@testing-library/user-event';
import { MedicationFrequency, UserPermissions } from '@enums';
import { screen, waitFor } from '@testing-library/dom';
import { DoctorTypes } from '@enums/global/Doctor';

describe('MedicationsExpandableRow', () => {
  const medication: MedicationResponse = medicationFixture();
  const user = userEvent.setup();

  it('should render the collapsed info with other frequency value', () => {
    render(
      <MedicationsExpandableRow
        {...medication}
        frequency={{
          code: MedicationFrequency.OTHER,
          extValue: 'other frequency',
        }}
      />,
    );
    expect(screen.getByText('other frequency')).toBeTruthy();
  });

  it('should render the collapsed component', () => {
    render(<MedicationsExpandableRow {...medication} frequency={undefined} />);
    expect(screen.getByText(MedicationFrequency.EVERY_DIALYSIS)).toBeTruthy();
  });

  it('should show only the speciality if name field is empty', () => {
    render(
      <MedicationsExpandableRow
        {...medication}
        doctor={{ source: DoctorTypes.Internal, speciality: medication.doctor.speciality }}
      />,
    );
    expect(screen.getByText('DOCTOR_SPECIALITIES:DOCTOR_NEPHROLOGIST')).toBeTruthy();
  });

  it('should show only the name of doctor if speciality field is empty', () => {
    render(
      <MedicationsExpandableRow
        {...medication}
        doctor={{ source: DoctorTypes.Internal, name: medication.doctor.name }}
      />,
    );
    expect(screen.getByText('DoctorName')).toBeTruthy();
  });

  it('should show empty value if the name of doctor and speciality field are empty', () => {
    render(<MedicationsExpandableRow {...medication} doctor={{ source: DoctorTypes.Internal }} />);
    expect(screen.getAllByText('—')).toHaveLength(1);
  });

  it('should open confirm modal on delete button click', async () => {
    render(<MedicationsExpandableRow {...medication} />, {
      preloadedState: {
        user: { user: { permissions: UserPermissions.MedicationDelete } },
      },
    });
    await user.click(screen.getByTestId('deleteMedicationButton'));
    await waitFor(() => {
      expect(screen.getByText('youWantToDelete')).toBeTruthy();
    });
  });

  it('should close modal after deleting the medication', async () => {
    render(<MedicationsExpandableRow {...medication} />, {
      preloadedState: {
        user: { user: { permissions: UserPermissions.MedicationDelete } },
      },
    });
    await user.click(screen.getByTestId('deleteMedicationButton'));
    let confirmModalDeleteButton;
    await waitFor(() => {
      confirmModalDeleteButton = screen.getByTestId('confirmModalConfirmButton');
    });
    await user.click(confirmModalDeleteButton);
    await waitFor(() => {
      expect(screen.queryByText('youWantToDelete')).not.toBeTruthy();
    });
  });
});
