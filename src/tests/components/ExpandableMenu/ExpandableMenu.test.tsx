import { render } from '../../utils';
import { ExpandableMenu } from '@components/ExpandableMenu/ExpandableMenu';
import userEvent from '@testing-library/user-event';

const label = 'Test label';
const labelId = 'expandableMenuLabel';
const menuId = 'expandableMenuContainer';
const groupedMenuItemId = 'expandableMenuGroupedItem';

const optionCallback = jest.fn();
const options = [
  { value: 'test 1', optionCallback },
  { value: 'test 2', optionCallback },
  { value: 'test 3', optionCallback },
];
const groupedOptions = [{ name: 'test subheader', options }];

describe('ExpandableMenu', () => {
  it('should render nothing', () => {
    const { queryByText } = render(<ExpandableMenu label={label} />);
    expect(queryByText(label)).not.toBeTruthy();
  });

  it('should open menu, when click on label', async () => {
    const { getByTestId } = render(<ExpandableMenu label={label} options={options} />);
    await userEvent.click(getByTestId(labelId));
    expect(getByTestId(menuId)).toBeVisible();
  });

  it('should call "optionCallback" handler and close the menu, when click on menu item', async () => {
    const { getByTestId, getAllByRole } = render(<ExpandableMenu label={label} options={options} />);

    await userEvent.click(getByTestId(labelId));

    const menuItems = getAllByRole('menuitem');
    expect(menuItems[0]).toBeVisible();
    expect(menuItems).toHaveLength(3);

    await userEvent.click(menuItems[0]);

    expect(optionCallback).toBeCalledTimes(1);
    expect(menuItems[0]).not.toBeVisible();
  });

  it('should render grouped menu', async () => {
    const { getAllByTestId, getByTestId, getAllByRole } = render(
      <ExpandableMenu label={label} groupedOptions={groupedOptions} />,
    );
    await userEvent.click(getByTestId(labelId));
    const menuItems = getAllByRole('menuitem');

    expect(menuItems).toHaveLength(3);
    expect(menuItems[0]).toBeVisible();
    expect(getAllByTestId(groupedMenuItemId)).toHaveLength(1);
    expect(getAllByTestId('expandableMenuGroupedItemSubHeader')[0]).toBeVisible();
    expect(getAllByTestId('expandableMenuGroupedItemSubHeader')[0]).toHaveStyle('text-transform: uppercase');
  });
});
