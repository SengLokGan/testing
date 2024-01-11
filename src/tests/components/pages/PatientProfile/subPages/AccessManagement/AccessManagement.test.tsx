import { render } from '@src/tests/utils';
import { AccessManagement } from '@pages/PatientProfile/subPages/AccessManagement/AccessManagement';
import { userFixture } from '@src/tests/fixtures/user';

describe('Access management', () => {
  it('should render empty access page', () => {
    const { getByTestId, getByText } = render(<AccessManagement />, {
      preloadedState: { user: { user: userFixture() } },
    });

    expect(getByText('tableView.noActiveAccessManagement')).toBeTruthy();
    expect(getByText('noResultsFound')).toBeTruthy();
    expect(getByTestId('globalAddButtonId')).toBeInTheDocument();
  });
});
