import { render } from '../utils';
import { GlobalAddButton } from '@components/GlobalAddButton/GlobalAddButton';
import userEvent from '@testing-library/user-event';

describe('GlobalAddButton', () => {
  it('should call "onClick" handler', async () => {
    const clickHandler = jest.fn();
    const { getByTestId } = render(<GlobalAddButton onClick={clickHandler} />);

    await userEvent.click(getByTestId('globalAddButtonId'));

    expect(clickHandler).toBeCalled();
  });
});
