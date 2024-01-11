import userEvent from '@testing-library/user-event';
import { render } from '@src/tests/utils';
import TodayPatientsDrawerFilters from '@containers/layouts/Drawer/components/TodayPatientsDrawerFilters/TodayPatientsDrawerFilters';

describe('TodayPatientsDrawerFilters', () => {
  it('should render isolation filters', () => {
    const { getByText, getAllByTestId } = render(<TodayPatientsDrawerFilters />);
    expect(getByText('filter.isolation')).toBeTruthy();
    expect(getAllByTestId('patientsIsolationFilter')).toHaveLength(4);
  });

  it('should mark filter as checked, when click on it', async () => {
    const { getAllByTestId } = render(<TodayPatientsDrawerFilters />);
    const filters = getAllByTestId('patientsIsolationFilter');
    await userEvent.click(filters[0]);
    expect(filters[0].querySelector('input[type="checkbox"]')).toHaveProperty('checked', true);
  });

  it('should uncheck all filters on "Clear all" click', async () => {
    const { getAllByTestId, getByTestId } = render(<TodayPatientsDrawerFilters />);
    const filters = getAllByTestId('patientsIsolationFilter');

    await userEvent.click(filters[1]);
    await userEvent.click(filters[2]);
    expect(filters[1].querySelector('input[type="checkbox"]')).toHaveProperty('checked', true);
    expect(filters[2].querySelector('input[type="checkbox"]')).toHaveProperty('checked', true);

    await userEvent.click(getByTestId('clearAppointmentsFiltersButton'));
    expect(filters[1].querySelector('input[type="checkbox"]')).not.toHaveProperty('checked', false);
    expect(filters[2].querySelector('input[type="checkbox"]')).not.toHaveProperty('checked', false);
  });
});
