import { render } from '@src/tests/utils';
import { ReportsLayout } from '@containers/layouts/Reports/ReportsLayout';
import theme from '@src/styles/theme';
import userEvent from '@testing-library/user-event';
import { ROUTES } from '@constants/global';

const mainContainerId = 'reportsLayoutMainContentContainer';
const goBackButtonId = 'reportsLayoutNavigateToBackButton';

const mockedNavigation = jest.fn();

let mockReportParameter = '';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: mockReportParameter }),
  useNavigate: () => mockedNavigation,
}));

describe('ReportsLayout', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  // it('should correctly navigate, when click on expandable menu item', async () => {
  //   const { getByTestId, getAllByRole } = render(<ReportsLayout />, {
  //     preloadedState: { user: { user: { permissions: [ViewPermissions.ViewClinicalReports] } } },
  //   });
  //
  //   await userEvent.click(getByTestId('expandableMenuLabel'));
  //
  //   expect(getByTestId('expandableMenuContainer')).toBeVisible();
  //
  //   const menuItems = getAllByRole('menuitem');
  //   expect(menuItems[0]).toBeVisible();
  //
  //   await userEvent.click(menuItems[0]);
  //
  //   expect(mockedNavigation).toHaveBeenCalledWith(
  //     `/${pathName.reports}/${pathName.clinicalReports}/${getObjectKeyByValue(
  //       groupedReports[0].options[0],
  //
  //     )}`,
  //   );
  // });

  describe('ReportsLayout all reports page', () => {
    it('should apply correct background-color on main container', () => {
      const { getByTestId } = render(<ReportsLayout />);
      expect(getByTestId(mainContainerId)).toHaveStyle(`background-color: ${theme.palette.background.default}`);
    });

    it('should not display back arrow icon button', () => {
      const { queryByTestId } = render(<ReportsLayout />);
      expect(queryByTestId(goBackButtonId)).not.toBeInTheDocument();
    });

    it('should render correct title', () => {
      const { getByText } = render(<ReportsLayout />);
      expect(getByText('allReports')).toBeTruthy();
    });
  });

  describe('ReportsLayout report page', () => {
    beforeAll(() => {
      mockReportParameter = 'vascular-access';
    });

    it('should apply correct background-color on main container', () => {
      const { getByTestId } = render(<ReportsLayout />);
      expect(getByTestId(mainContainerId)).toHaveStyle(`background-color: ${theme.palette.surface.default}`);
    });

    it('should display back arrow icon button, and navigate when click on it', async () => {
      const { getByTestId } = render(<ReportsLayout />);
      const backButton = getByTestId(goBackButtonId);

      expect(backButton).toBeInTheDocument();

      await userEvent.click(backButton);

      expect(mockedNavigation).toHaveBeenCalledWith(`/${ROUTES.reports}`);
    });

    it('should render correct title', () => {
      const { getByText } = render(<ReportsLayout />);
      expect(getByText('vascular-access')).toBeTruthy();
    });
  });
});
