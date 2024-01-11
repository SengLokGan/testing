import { render } from '@src/tests/utils';
import { accessManagementFixture } from '@src/tests/fixtures/accessManagement';

import { AccessManagementExpandableRow } from '@components/pages/PatientProfile';
import { userFixture } from '@src/tests/fixtures/user';

describe('Access management expandable row', () => {
  it('should render expandable row', () => {
    const { getByText } = render(<AccessManagementExpandableRow {...accessManagementFixture[0]} />);

    expect(getByText('tableView.enteredBy')).toBeTruthy();
    expect(getByText('John Boue')).toBeTruthy();
    expect(getByText('29/12/2022')).toBeTruthy();

    expect(getByText('tableView.accessCategory')).toBeTruthy();
    expect(getByText('ACCESS_CATEGORIES:CVC, CVC_CATEGORIES:TEMPORARY, SIDES:RIGHT')).toBeTruthy();

    expect(getByText('tableView.dateOfInsertion')).toBeTruthy();
    expect(getByText('15/12/2022')).toBeTruthy();

    expect(getByText('tableView.instillation')).toBeTruthy();
    expect(getByText('INSTILLATION:HEPARIN_UNITS_ML')).toBeTruthy();

    expect(getByText('tableView.arterial')).toBeTruthy();
    expect(getByText('2.2 modal.ml')).toBeTruthy();

    expect(getByText('tableView.venous')).toBeTruthy();
    expect(getByText('2.1 modal.ml')).toBeTruthy();

    expect(getByText('tableView.comments')).toBeTruthy();
    expect(getByText('comments')).toBeTruthy();
  });

  it('should render control buttons for active access', () => {
    const { getByText } = render(<AccessManagementExpandableRow {...accessManagementFixture[0]} />, {
      preloadedState: { user: { user: userFixture() } },
    });
    expect(getByText('button.edit')).toBeTruthy();
    expect(getByText('button.delete')).toBeTruthy();
  });

  it('should hide control buttons for discontinued access', () => {
    const { queryByText } = render(<AccessManagementExpandableRow {...accessManagementFixture[1]} />, {
      preloadedState: { user: { user: userFixture() } },
    });
    expect(queryByText('button.edit')).toBeNull();
    expect(queryByText('button.delete')).toBeNull();
  });
});
