import { render } from '@src/tests/utils';
import { AccessManagement } from '@pages/PatientProfile/subPages/AccessManagement/AccessManagement';
import { userFixture } from '@src/tests/fixtures/user';
import { accessManagementFixture } from '@src/tests/fixtures/accessManagement';
import { AccessManagementStatuses } from '@enums';

describe('Access management', () => {
  it('should render table', () => {
    const { getByText } = render(<AccessManagement />, {
      preloadedState: {
        user: { user: userFixture() },
        accessManagement: { accessManagement: accessManagementFixture },
      },
    });

    expect(getByText('accessManagement:tableView.accessCategory')).toBeTruthy();
    expect(getByText('accessManagement:tableView.dateOfCreation')).toBeTruthy();
    expect(getByText('accessManagement:tableView.status')).toBeTruthy();
    expect(getByText('accessManagement')).toBeTruthy();

    expect(getByText('ACCESS_CATEGORIES:CVC')).toBeTruthy();
    expect(getByText('28/12/2022')).toBeTruthy();
    expect(getByText('statuses.active')).toBeTruthy();

    expect(getByText('ACCESS_CATEGORIES:VASCULAR_ACCESS')).toBeTruthy();
    expect(getByText('28/12/2022')).toBeTruthy();
    expect(getByText('statuses.discontinued')).toBeTruthy();
  });

  it('should render table without active', () => {
    const { getByText } = render(<AccessManagement />, {
      preloadedState: {
        user: { user: userFixture() },
        accessManagement: {
          accessManagement: accessManagementFixture.map((access) => ({
            ...access,
            status: AccessManagementStatuses.DISCONTINUED,
          })),
        },
      },
    });

    expect(getByText('tableView.noActiveAccessManagement')).toBeTruthy();
  });
});
