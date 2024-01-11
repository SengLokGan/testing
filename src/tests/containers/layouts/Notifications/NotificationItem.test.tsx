import { render } from '../../../utils';
import { NotificationItem } from '@containers/layouts/Notifications/NotificationItem';
import { notificationFixture } from '../../../fixtures/notifications';
import userEvent from '@testing-library/user-event';

describe('NotificationItem', () => {
  const onClose = jest.fn();
  const user = userEvent.setup();

  it('should render notification with link to hd prescription page', () => {
    const { getByTestId, getByText } = render(
      <NotificationItem onClose={onClose} notification={notificationFixture()} />,
    );
    expect(getByTestId('notificationItem-1/patients-overview/1/hd-prescription')).toBeInTheDocument();
    expect(getByText(/HD prescription for/i)).toBeTruthy();
  });

  it('should render notification with link to lab results page', () => {
    const { getByTestId } = render(
      <NotificationItem onClose={onClose} notification={notificationFixture({ navigationScreen: 'LAB_RESULTS' })} />,
    );
    expect(getByTestId('notificationItem-1/patients-overview/1/lab-results')).toBeInTheDocument();
  });

  it('should render notification with link to medications page', () => {
    const { getByTestId } = render(
      <NotificationItem onClose={onClose} notification={notificationFixture({ navigationScreen: 'MEDICATIONS' })} />,
    );
    expect(getByTestId('notificationItem-1/patients-overview/1/medication')).toBeInTheDocument();
  });

  it('should render notification with link to the same page', () => {
    const { getByTestId } = render(
      <NotificationItem onClose={onClose} notification={notificationFixture({ navigationScreen: null })} />,
    );
    expect(getByTestId('notificationItem-1#')).toBeInTheDocument();
  });

  it('should close notifications on item click', async () => {
    const { getByTestId } = render(<NotificationItem onClose={onClose} notification={notificationFixture()} />);
    const notification = getByTestId('notificationItem-1/patients-overview/1/hd-prescription');
    expect(notification);
    await user.click(notification);
    expect(onClose).toBeCalledTimes(1);
  });
});
