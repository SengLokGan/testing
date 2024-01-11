import { render } from '@src/tests/utils';
import { DocumentsBlock } from '@components/pages/PatientProfile';
import { UserPermissions } from '@enums';

const permissions = [UserPermissions.PatientEditProfile, UserPermissions.PatientAddDocuments];

describe('Patient profile documents block', () => {
  it('should render documents block', async () => {
    const { getByText } = render(<DocumentsBlock />);
    const documentBlock = getByText('profile.documents');
    expect(documentBlock).toBeTruthy();
  });

  it('user should to be able to edit info if has permission', async () => {
    const { getByTestId } = render(<DocumentsBlock />, {
      preloadedState: { user: { user: { permissions } } },
    });
    const editButton = getByTestId('EditOutlinedIcon');
    expect(editButton).toBeTruthy();
  });

  it('user should not to be able to edit info if has not permission', async () => {
    const { queryByTestId } = render(<DocumentsBlock />);
    const editButton = queryByTestId('EditOutlinedIcon');
    expect(editButton).not.toBeTruthy();
  });

  it('user should to be able to add info if has permission', async () => {
    const { getByText } = render(<DocumentsBlock />, {
      preloadedState: { user: { user: { permissions } } },
    });
    const addButton = getByText('button.addInfo');
    expect(addButton).toBeTruthy();
  });

  it('user should not to be able to add info if has not permission', async () => {
    const { queryByText } = render(<DocumentsBlock />);
    const addButton = queryByText('button.addInfo');
    expect(addButton).not.toBeTruthy();
  });
});
