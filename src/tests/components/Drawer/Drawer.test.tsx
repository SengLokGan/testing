import userEvent from '@testing-library/user-event';
import { render } from '../../utils';
import { Drawer } from '@components';
import { DrawerStatus } from '@enums';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/test',
  }),
}));

describe('Drawer', () => {
  const title = 'Drawer Test';
  const user = userEvent.setup();

  it('should check that the component is being rendered', () => {
    const { queryByText } = render(
      <Drawer nextStatus={DrawerStatus.Showed} status={DrawerStatus.Showed} title={title} />,
    );
    expect(queryByText(title)).toBeTruthy();
  });

  it(`should render drawer's footer panel`, () => {
    const { queryByTestId } = render(
      <Drawer
        status={DrawerStatus.Showed}
        title={title}
        nextStatus={DrawerStatus.Showed}
        footerChildren={<button data-testid="drawerFooterElement">Button</button>}
      />,
    );
    expect(queryByTestId('drawerFooter')).toBeTruthy();
    expect(queryByTestId('drawerFooterElement')).toBeTruthy();
  });

  it('should test transition between collapsed status and hidden', async () => {
    let status = DrawerStatus.Collapsed;

    const DrawerComponent = () => (
      <Drawer
        status={status}
        title={title}
        nextStatus={status}
        onChangeStatus={(newStatus) => (status = newStatus)}
        footerChildren={<div />}
      >
        <button data-testid="drawerBodyElement">Button</button>
      </Drawer>
    );

    const { getByTestId, rerender } = render(<DrawerComponent />);
    await user.click(getByTestId('drawerCloseIcon'));
    rerender(<DrawerComponent />);
    expect(getByTestId('drawer').querySelector('.MuiDrawer-paper')).toHaveStyle('right: -100vw');
  });

  it('should check that the component is collapsing', async () => {
    const onChangeStatus = jest.fn();
    const { rerender, getByTestId } = render(
      <Drawer
        status={DrawerStatus.Showed}
        nextStatus={DrawerStatus.Showed}
        title={title}
        onChangeStatus={onChangeStatus}
        footerChildren={<div />}
      >
        <button data-testid="drawerBodyElement">Button</button>
      </Drawer>,
    );
    expect(getByTestId('drawerBodyElement')).toBeVisible();
    expect(getByTestId('drawerFooter')).toBeVisible();
    await user.click(getByTestId('drawerCloseFullscreenIcon'));
    await rerender(
      <Drawer
        status={DrawerStatus.Collapsed}
        nextStatus={DrawerStatus.Collapsed}
        title={title}
        onChangeStatus={onChangeStatus}
        footerChildren={<div />}
      >
        <button data-testid="drawerBodyElement">Button</button>
      </Drawer>,
    );
    expect(onChangeStatus).toHaveBeenCalledWith(DrawerStatus.Collapsed);
    expect(getByTestId('drawerBodyCollapseWrapper')).toHaveStyle('height: 0px');
    expect(getByTestId('drawerFooterCollapseWrapper')).toHaveStyle('height: 0px');
  });
});
