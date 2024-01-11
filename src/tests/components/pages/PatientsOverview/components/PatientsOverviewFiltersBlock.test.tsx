import { screen } from '@testing-library/dom';
import { getTestStore, render } from '@src/tests';
import { PatientsOverviewFiltersBlock } from '@src/components/pages/PatientsOverview';
import { DrawerType, PatientOverviewStatusesFilters, UserPermissions } from '@enums';
import { addDrawer, changePatientsOverviewStatusesFilters, patientsOverviewInitialState } from '@store/slices';
import * as storeHooks from '@hooks/storeHooks';
import userEvent from '@testing-library/user-event';

const dispatch = jest.fn();
const store = getTestStore({});
store.dispatch = dispatch;

describe('PatientsOverviewFiltersBlock', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render status filters without "My patients" chip', () => {
    const statusFilters = patientsOverviewInitialState.filters.statuses.items;
    const filteredStatusFilters = statusFilters.filter(
      (item) => item.name !== PatientOverviewStatusesFilters.MyPatients,
    );

    render(<PatientsOverviewFiltersBlock changeViewMode={() => {}} />);

    filteredStatusFilters.forEach((item) => {
      expect(screen.getByTestId(`${item.name}TextToggleButton`)).toBeInTheDocument();
    });
  });

  it('should render status filters with "My patients" chip', () => {
    const statusFilters = patientsOverviewInitialState.filters.statuses.items;

    render(<PatientsOverviewFiltersBlock changeViewMode={() => {}} />, {
      preloadedState: { user: { user: { permissions: [UserPermissions.PatientsSeeOwn] } } },
    });

    statusFilters.forEach((item) => {
      expect(screen.getByTestId(`${item.name}TextToggleButton`)).toBeInTheDocument();
    });
  });

  it('handles patientsFilterStatusesChangeHandler correctly', async () => {
    const useAppDispatchSpy = jest.spyOn(storeHooks, 'useAppDispatch');
    useAppDispatchSpy.mockReturnValue(dispatch);
    const statusFilters = patientsOverviewInitialState.filters.statuses.items;

    render(<PatientsOverviewFiltersBlock changeViewMode={() => {}} />, {
      preloadedState: { user: { user: { permissions: [UserPermissions.PatientsSeeOwn] } } },
    });

    await userEvent.click(screen.getByTestId(`${statusFilters[3].name}TextToggleButton`));

    expect(dispatch).toHaveBeenCalledWith({
      type: changePatientsOverviewStatusesFilters.type,
      payload: {
        items: statusFilters.map((item, index) => {
          if (index === 0) {
            return { ...item, selected: false };
          }
          if (index === 3) {
            return { ...item, selected: true };
          }
          return item;
        }),
      },
    });
  });

  it('handles openDrawer correctly', async () => {
    const useAppDispatchSpy = jest.spyOn(storeHooks, 'useAppDispatch');
    useAppDispatchSpy.mockReturnValue(dispatch);

    render(<PatientsOverviewFiltersBlock changeViewMode={() => {}} />);
    await userEvent.click(screen.getByTestId('openDrawerWithOverviewPatientsFilterButton'));
    expect(dispatch).toHaveBeenCalledWith(
      addDrawer({
        type: DrawerType.PatientsOverviewFilters,
        collapsable: false,
      }),
    );
  });

  it('handles changeViewMode correctly', async () => {
    const changeViewModeMock = jest.fn();
    render(<PatientsOverviewFiltersBlock changeViewMode={changeViewModeMock} />);
    await userEvent.click(screen.getByTestId('changeViewModeOverviewPatientsFilterButton'));
    expect(changeViewModeMock).toHaveBeenCalled();
  });

  const checkTableViewIcons = (descriptionUniqPart: string, isGridView: boolean, expectedIdName: string) => {
    it(`should render ${descriptionUniqPart}`, () => {
      render(<PatientsOverviewFiltersBlock changeViewMode={() => {}} isGridView={isGridView} />);

      expect(screen.getByTestId(expectedIdName)).toBeInTheDocument();
    });
  };

  checkTableViewIcons('grid view icon', false, 'patientsOverviewGridViewIcon');
  checkTableViewIcons('table rows icon', true, 'patientsOverviewTableRowIcon');
});
