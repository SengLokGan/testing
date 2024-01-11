import userEvent from '@testing-library/user-event';
import { RenderResult } from '@testing-library/react';
import { HdPrescriptionsTable } from '@components/pages/PatientProfile';
import { render } from '@src/tests/utils';
import { prescriptionFixture } from '@src/tests/fixtures/prescriptions';

const columnLabels = {
  entered: 'hdPrescription:tableView.entered',
  enteredBy: 'hdPrescription:tableView.enteredBy',
  prescribed: 'hdPrescription:tableView.prescribed',
  status: 'hdPrescription:tableView.status',
};

const prescription = prescriptionFixture();

const initialHdPrescriptionState = {
  loading: false,
  error: undefined,
  prescriptions: [prescription],
};

describe('HdPrescriptionsTable', () => {
  let r: RenderResult;
  const user = userEvent.setup();

  beforeEach(() => {
    r = render(<HdPrescriptionsTable />, {
      preloadedState: { hdPrescriptions: initialHdPrescriptionState },
    });
  });

  it('should render an empty body', () => {
    const { getByText } = render(<HdPrescriptionsTable />);
    expect(getByText('noResultsFound')).toBeTruthy();
  });

  it('should show additional info after expand', async () => {
    const expandLessIcon = r.getByTestId('ExpandLessIcon');
    await user.click(expandLessIcon);

    expect(r.getByText('tableView.generalInfo')).toBeTruthy();
    expect(r.getByText('tableView.prescribedBy')).toBeTruthy();
    expect(r.getByText(prescription.dialyzerBrand)).toBeTruthy();
    expect(r.getByText(prescription.anticoagulantType)).toBeTruthy();
  });

  it('should render the component and all required columns', () => {
    expect(r.queryByText(columnLabels.entered)).toBeTruthy();
    expect(r.queryByText(columnLabels.enteredBy)).toBeTruthy();
    expect(r.queryByText(columnLabels.prescribed)).toBeTruthy();
    expect(r.queryByText(columnLabels.status)).toBeTruthy();
  });
});
