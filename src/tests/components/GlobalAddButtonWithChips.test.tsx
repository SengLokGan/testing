import { render } from '@src/tests';
import { screen } from '@testing-library/dom';
import { GlobalAddButtonWithChips } from '@components/GlobalAddButtonWithChips/GlobalAddButtonWithChips';
import userEvent from '@testing-library/user-event';
import { theme } from '@src/styles';

describe('GlobalAddButtonWithChips', () => {
  it('should render component', () => {
    render(<GlobalAddButtonWithChips onChipClick={() => {}} chips={[]} />);
    expect(screen.getByTestId('globalAddButtonId')).toBeInTheDocument();
  });

  it('should change color of button, rotate icon and add backdrop effect, when click on the button', async () => {
    render(<GlobalAddButtonWithChips onChipClick={() => {}} chips={[]} />);
    const addButton = screen.getByTestId('globalAddButtonId');
    const backDrop = screen.getByTestId('globalAddButtonBackDropId');

    expect(addButton).toHaveStyle(`background-color: ${theme.palette.primary.main}; transform: rotate(0deg)`);
    await userEvent.click(addButton);
    expect(addButton).toHaveStyle(`background-color: ${theme.palette.text.black}; transform: rotate(45deg)`);
    expect(backDrop).toHaveStyle(`background-color: rgba(0, 0, 0, .2)`);
  });

  it('should render chips, when click on the button', async () => {
    render(<GlobalAddButtonWithChips onChipClick={() => {}} chips={[{ label: 'Test 1' }, { label: 'Test 2' }]} />);

    await userEvent.click(screen.getByTestId('globalAddButtonId'));

    expect(screen.getAllByTestId('chipContainer')).toHaveLength(2);
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  it('should evoke handler, when click on chip', async () => {
    const onChipClick = jest.fn();
    render(<GlobalAddButtonWithChips onChipClick={onChipClick} chips={[{ label: 'Test 1' }, { label: 'Test 2' }]} />);

    await userEvent.click(screen.getByTestId('globalAddButtonId'));
    await userEvent.click(screen.getAllByTestId('chipContainer')[0]);

    expect(onChipClick).toHaveBeenCalledWith('Test 1');
  });
});
