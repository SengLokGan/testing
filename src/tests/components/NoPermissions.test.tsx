import { render } from '../utils';
import { NoPermissions } from '@containers/layouts/NoPermissions/NoPermissions';
describe('NoPermission', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should render NoPermission component', () => {
    const { getByTestId, getByText } = render(<NoPermissions />);

    expect(getByTestId('ContentPasteSearchIcon')).toBeInTheDocument();
    expect(getByText('anyResponsibilities')).toBeTruthy();
    expect(getByTestId('logOutButton')).toBeTruthy();
  });
});
