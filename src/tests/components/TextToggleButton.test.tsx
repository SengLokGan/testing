import { render } from '../utils';
import { TextToggleButton } from '@components/TextToggleButton/TextToggleButton';
import userEvent from '@testing-library/user-event';
import palette from '../../styles/theme/palette';

const title = 'Test title';
const value = 'Test value';

const titleId = 'textToggleButtonTitle';
const badgeId = 'textToggleButtonBadge';
const badgeTitleId = 'textToggleButtonBadgeText';

describe('TextToggleButton', () => {
  it('should display title', () => {
    const { getByTestId, getByText } = render(
      <TextToggleButton value={value} title={title} isSelected={false} onChange={() => {}} />,
    );

    expect(getByTestId(titleId)).toBeInTheDocument();
    expect(getByText(title)).toBeTruthy();
  });

  it('should display badge, if prop "badge" is passed', () => {
    const { getByTestId, getByText } = render(
      <TextToggleButton value={value} title={title} isSelected={false} badge="30" onChange={() => {}} />,
    );

    expect(getByTestId(badgeId)).toBeInTheDocument();
    expect(getByText('30')).toBeTruthy();
  });

  it('should not display badge, if prop "badge" is not passed', () => {
    const { queryByTestId } = render(
      <TextToggleButton value={value} title={title} isSelected={false} onChange={() => {}} />,
    );

    expect(queryByTestId(badgeId)).not.toBeInTheDocument();
  });

  it('should call change handler', async () => {
    const changeHandler = jest.fn();
    const { getByTestId } = render(
      <TextToggleButton value={value} title={title} isSelected={false} onChange={changeHandler} />,
    );

    await userEvent.click(getByTestId(`${value}TextToggleButton`));

    expect(changeHandler).toBeCalled();
  });

  it('should apply correct styles, when button is selected', () => {
    const { getByTestId } = render(
      <TextToggleButton value={value} title={title} isSelected={true} badge="30" onChange={() => {}} />,
    );

    expect(getByTestId(titleId)).toHaveStyle(`color: ${palette.text.white}`);
    expect(getByTestId(badgeId)).toHaveStyle(`background-color: ${palette.primary.main}`);
    expect(getByTestId(badgeTitleId)).toHaveStyle(`color: ${palette.text.white}`);
  });

  it('should apply correct styles, when button is not selected', () => {
    const { getByTestId } = render(
      <TextToggleButton value={value} title={title} isSelected={false} badge="30" onChange={() => {}} />,
    );

    expect(getByTestId(titleId)).toHaveStyle(`color: ${palette.primary.main}`);
    expect(getByTestId(badgeId)).toHaveStyle(`background-color: ${palette.primary.main}`);
    expect(getByTestId(badgeTitleId)).toHaveStyle(`color: ${palette.text.white}`);
  });
});
