import { render } from '../../utils';
import { BaseProgressBar } from '../../../components/BaseProgressBar/BaseProgressBar';

describe('BaseProgressBar', () => {
  it('should display label, and progress with right percentage of fullness', () => {
    const { getByTestId, getByText } = render(<BaseProgressBar current={35} label="-01h:30m" />);

    expect(getByTestId('BaseProgressBarLine')).toHaveStyle('width: 35%');
    expect(getByText('-01h:30m')).toBeTruthy();
  });

  it('should display yellow color if progress not equals 100%', () => {
    const { getByTestId } = render(<BaseProgressBar current={35} label="" />);
    expect(getByTestId('BaseProgressBarLine')).toHaveStyle('background-color: #F7E468');
  });

  it('should display green color and label "Finished" if progress equals 100%', () => {
    const { getByTestId } = render(<BaseProgressBar current={100} label="" />);
    expect(getByTestId('BaseProgressBarLine')).toHaveStyle('background-color: #83FAAE');
  });

  it('should have 100% width even if percentage is bigger than 100', () => {
    const { getByTestId } = render(<BaseProgressBar current={130} label="" />);
    expect(getByTestId('BaseProgressBarLine')).toHaveStyle('width: 100%');
  });

  it('should display "in progress icon", when process is not finished', () => {
    const { getByTestId, queryByTestId } = render(<BaseProgressBar current={87} label="" />);
    expect(getByTestId('BaseProgressBarInProgressIcon')).toBeInTheDocument();
    expect(queryByTestId('BaseProgressBarProgressDoneIcon')).not.toBeInTheDocument();
  });

  it('should display "progress done icon" and label must be "Finished", when process is finished', () => {
    const { getByTestId, queryByTestId, getByText } = render(
      <BaseProgressBar current={100} label="" finished={true} />,
    );
    expect(getByTestId('BaseProgressBarProgressDoneIcon')).toBeInTheDocument();
    expect(queryByTestId('BaseProgressBarInProgressIcon')).not.toBeInTheDocument();
    expect(getByText('finished')).toBeTruthy();
  });
});
