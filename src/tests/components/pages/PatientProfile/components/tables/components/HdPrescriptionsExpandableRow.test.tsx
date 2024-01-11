import { format } from 'date-fns';
import { render } from '@src/tests/utils';
import { HdPrescriptionsExpandableRow } from '@components/pages/PatientProfile';
import { prescriptionFixture } from '@src/tests/fixtures/prescriptions';
import { HdPrescription } from '@types';
import { UserPermissions } from '@enums';

describe('HdPrescriptionsExpandableRow', () => {
  const prescription: HdPrescription = prescriptionFixture();

  it('should render the collapsed component', () => {
    const { getByText, queryByTestId } = render(<HdPrescriptionsExpandableRow {...prescription} />);
    expect(queryByTestId('changeHdPrescriptionButton')).toBeNull();
    expect(getByText(prescription.prescribedBy.name)).toBeTruthy();
    expect(getByText((prescription as any).enteredBy?.name)).toBeTruthy();
    expect(getByText(prescription.comments)).toBeTruthy();
    expect(getByText(format(new Date(prescription.enteredAt), 'MM/dd/yyyy HH:mm a'))).toBeTruthy();
    expect(getByText(format(new Date(prescription.prescriptionDate), 'MM/dd/yyyy'))).toBeTruthy();
  });

  it('should render edit button if user has permission', () => {
    const { getByTestId } = render(<HdPrescriptionsExpandableRow {...prescription} />, {
      preloadedState: { user: { user: { permissions: [UserPermissions.DialysisEditPrescriptions] } } },
    });
    expect(getByTestId('changeHdPrescriptionButton')).toBeInTheDocument();
  });
});
