import { render } from '@src/tests/utils';
import { NeedleSizeRadioLabel } from '@components/pages/PatientProfile';
import { NeedleSize } from '@enums';

describe('Label for needle size radio group', () => {
  it('should render label with 300MlMin text', () => {
    const { getByText } = render(<NeedleSizeRadioLabel label={NeedleSize.Gauge17} />);
    expect(getByText(/modal.300MlMin/i)).toBeInTheDocument();
  });

  it('should render label with 300350MlMin text', () => {
    const { getByText } = render(<NeedleSizeRadioLabel label={NeedleSize.Gauge16} />);
    expect(getByText(/modal.300350MlMin/i)).toBeInTheDocument();
  });

  it('should render label with 350450MlMin text', () => {
    const { getByText } = render(<NeedleSizeRadioLabel label={NeedleSize.Gauge15} />);
    expect(getByText(/modal.350450MlMin/i)).toBeInTheDocument();
  });

  it('should render label with 450MlMin text', () => {
    const { getByText } = render(<NeedleSizeRadioLabel label={NeedleSize.Gauge14} />);
    expect(getByText(/modal.450MlMin/i)).toBeInTheDocument();
  });
});
