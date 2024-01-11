import { render } from '@src/tests';
import { ClinicalNotes } from '@pages/PatientProfile/subPages/ClinicalNotes/ClinicalNotes';
import { userFixture } from '@src/tests/fixtures/user';
import { UserPermissions } from '@enums';
import { screen } from '@testing-library/dom';
const globalAddButtonId = 'globalAddButtonId';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockImplementation(() => ({ id: 1 })),
}));

describe('Clinical notes', () => {
  it('should render initial elements', () => {
    render(<ClinicalNotes />, {
      preloadedState: { user: { user: userFixture() } },
    });

    expect(screen.getByTestId('clinicalNotesPageHeader')).toBeInTheDocument();
    expect(screen.getByTestId('fromDatePicker')).toBeInTheDocument();
    expect(screen.getByTestId('toDatePicker')).toBeInTheDocument();
    expect(screen.getByTestId('globalAddButtonId')).toBeInTheDocument();
    expect(screen.getByText('clinicalNotes')).toBeTruthy();
  });

  it('should show "global Add button", when user have right permission', () => {
    const { getByTestId } = render(<ClinicalNotes />, {
      preloadedState: { user: { user: userFixture() } },
    });

    expect(getByTestId(globalAddButtonId)).toBeInTheDocument();
  });

  it('should not show "global Add button", when user does not have right permission', () => {
    const userFixtureWithoutRightPermission = {
      ...userFixture(),
      permissions: userFixture().permissions.filter((permission) => permission !== UserPermissions.IssueModify),
    };
    const { queryByTestId } = render(<ClinicalNotes />, {
      preloadedState: { user: { user: userFixtureWithoutRightPermission } },
    });

    expect(queryByTestId(globalAddButtonId)).not.toBeInTheDocument();
  });
});
