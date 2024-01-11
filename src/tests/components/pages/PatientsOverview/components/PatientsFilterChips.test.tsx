import userEvent from '@testing-library/user-event';
import { render } from '@src/tests/utils';
import { PatientsFilterChips } from '@components/pages/PatientsOverview';
import { PatientIsolationFilterNames } from '@enums';

const allIsolatorFilters = {
  items: [
    { name: PatientIsolationFilterNames.hiv, checked: true },
    { name: PatientIsolationFilterNames.hepB, checked: true },
    { name: PatientIsolationFilterNames.hepC, checked: true },
    { name: PatientIsolationFilterNames.normal, checked: true },
  ],
};

const emptyPatientNameFilter = null;
const patientNameFilter = { id: '1', name: 'Test Name' };

describe('PatientsFilterChips', () => {
  const onChipFilterClick = jest.fn();
  const onClearAllClick = jest.fn();
  const user = userEvent.setup();

  it('should render isolation filters chips if checked is true', () => {
    const { getByTestId } = render(
      <PatientsFilterChips
        patientNameFilter={emptyPatientNameFilter}
        allIsolatorFilters={allIsolatorFilters}
        onChipFilterClick={onChipFilterClick}
        onClearAllClick={onClearAllClick}
      />,
    );
    expect(getByTestId('HIV-filterChip')).toBeInTheDocument();
    expect(getByTestId('HEP_B-filterChip')).toBeInTheDocument();
    expect(getByTestId('HEP_C-filterChip')).toBeInTheDocument();
    expect(getByTestId('NORMAL-filterChip')).toBeInTheDocument();
    expect(getByTestId('clearAllFilterChip')).toBeInTheDocument();
  });

  it('should render patient name filter, if name is selected', () => {
    const { getByTestId } = render(
      <PatientsFilterChips
        patientNameFilter={patientNameFilter}
        allIsolatorFilters={allIsolatorFilters}
        onChipFilterClick={onChipFilterClick}
        onClearAllClick={onClearAllClick}
      />,
    );

    expect(getByTestId(`${patientNameFilter.name}-filterChip`)).toBeInTheDocument();
  });

  it('should not render patient name filter, if name is not selected', () => {
    const { queryByTestId } = render(
      <PatientsFilterChips
        patientNameFilter={emptyPatientNameFilter}
        allIsolatorFilters={allIsolatorFilters}
        onChipFilterClick={onChipFilterClick}
        onClearAllClick={onClearAllClick}
      />,
    );

    expect(queryByTestId(`${patientNameFilter.name}-filterChip`)).not.toBeInTheDocument();
  });

  it('should delete filter on chip click', async () => {
    const { getByTestId } = render(
      <PatientsFilterChips
        patientNameFilter={emptyPatientNameFilter}
        allIsolatorFilters={allIsolatorFilters}
        onChipFilterClick={onChipFilterClick}
        onClearAllClick={onClearAllClick}
      />,
    );
    await user.click(getByTestId('HIV-filterChip'));
    expect(onChipFilterClick).toBeCalledTimes(1);
  });

  it('should clear all filters on "Clear all" chip click', async () => {
    const { getByTestId } = render(
      <PatientsFilterChips
        patientNameFilter={emptyPatientNameFilter}
        allIsolatorFilters={allIsolatorFilters}
        onChipFilterClick={onChipFilterClick}
        onClearAllClick={onClearAllClick}
      />,
    );
    await user.click(getByTestId('clearAllFilterChip'));
    expect(onClearAllClick).toBeCalledTimes(1);
  });

  it('should hide ship if checked is false', async () => {
    allIsolatorFilters.items[0].checked = false;
    const { getByTestId, queryByTestId } = render(
      <PatientsFilterChips
        patientNameFilter={emptyPatientNameFilter}
        allIsolatorFilters={allIsolatorFilters}
        onChipFilterClick={onChipFilterClick}
        onClearAllClick={onClearAllClick}
      />,
    );
    expect(queryByTestId('HIV-filterChip')).toBeNull();
    expect(getByTestId('HEP_B-filterChip')).toBeInTheDocument();
    expect(getByTestId('HEP_C-filterChip')).toBeInTheDocument();
    expect(getByTestId('NORMAL-filterChip')).toBeInTheDocument();
    expect(getByTestId('clearAllFilterChip')).toBeInTheDocument();
  });
});
