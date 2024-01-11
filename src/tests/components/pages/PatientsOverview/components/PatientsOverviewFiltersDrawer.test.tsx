import PatientsOverviewDrawerFilters from '@containers/layouts/Drawer/components/PatientsOverviewDrawerFilters/PatientsOverviewDrawerFilters';
import userEvent from '@testing-library/user-event';
import { render } from '@src/tests/utils';

const patientsIsolationFilterId = 'patientsIsolationFilter';

describe('PatientsOverviewFiltersDrawer', () => {
  it('should render isolation filters', () => {
    const { getByText, getAllByTestId } = render(<PatientsOverviewDrawerFilters />);
    expect(getByText(`filter.isolation`)).toBeTruthy();
    expect(getAllByTestId(patientsIsolationFilterId)).toHaveLength(4);
  });

  it('should mark filter as checked, when click on it', async () => {
    const { getAllByTestId } = render(<PatientsOverviewDrawerFilters />);
    const filters = getAllByTestId(patientsIsolationFilterId);

    await userEvent.click(filters[1]);

    expect(filters[1].querySelector('input[type="checkbox"]')).toHaveProperty('checked', true);
  });

  it('should uncheck all filters on "Clear all" click', async () => {
    const { getAllByTestId, getByTestId } = render(<PatientsOverviewDrawerFilters />);
    const filters = getAllByTestId(patientsIsolationFilterId);

    await userEvent.click(filters[0]);
    await userEvent.click(filters[2]);
    expect(filters[0].querySelector('input[type="checkbox"]')).toHaveProperty('checked', true);
    expect(filters[2].querySelector('input[type="checkbox"]')).toHaveProperty('checked', true);

    await userEvent.click(getByTestId('clearPatientsOverviewFiltersButton'));
    expect(filters[0].querySelector('input[type="checkbox"]')).not.toHaveProperty('checked', false);
    expect(filters[2].querySelector('input[type="checkbox"]')).not.toHaveProperty('checked', false);
  });
});
