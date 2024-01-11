import { VascularAccessFilters, VascularAccessFiltersErrors } from '@types';
import { VascularAccessFilterNames } from '@enums';
import { render } from '@src/tests/utils';
import { VascularAccessReportsFilters } from '@components/pages/Reports';
import { format } from 'date-fns';
import userEvent from '@testing-library/user-event';
import theme from '@src/styles/theme';
import { store, vascularAccessInitialState } from '@store';
import { getTenantYesterdayDate } from '@utils';

const filtersInitialState = vascularAccessInitialState.reports.filters;

const filtersMock: VascularAccessFilters = {
  date: null,
  accessTypes: filtersInitialState.accessTypes,
  categories: filtersInitialState.categories,
};

const filterErrorMock: VascularAccessFiltersErrors = {
  date: null,
};

const dateFilterId = `${VascularAccessFilterNames.date}DatePicker`;
const generateReportsButtonId = 'generateVascularAccessReportsButtonId';
const clearFiltersButtonId = 'clearVascularAccessReportsButtonId';

describe('VascularAccessReportsFilters', () => {
  it('should render date filter', () => {
    const { getByTestId } = render(<VascularAccessReportsFilters />);
    expect(getByTestId(dateFilterId)).toBeInTheDocument();
  });

  it('should render selected date', () => {
    const { getByTestId } = render(<VascularAccessReportsFilters />, {
      preloadedState: {
        vascularAccessReports: {
          reports: {
            filters: { ...filtersMock, date: getTenantYesterdayDate() },
            filtersError: filterErrorMock,
          },
        },
      },
    });

    expect(getByTestId(dateFilterId)).toHaveValue(format(getTenantYesterdayDate(), 'dd/MM/yyyy'));
  });

  const checkRenderChipFilter = (filterLabel: string): void => {
    it(`should render ${filterLabel} filter`, () => {
      const { getByTestId } = render(<VascularAccessReportsFilters />);
      expect(getByTestId(`${filterLabel}Id`)).toBeInTheDocument();
    });
  };

  [...filtersMock.accessTypes, ...filtersMock.categories].forEach((item) => {
    checkRenderChipFilter(item.name);
  });

  it('should select all access type filters, when click on "Vascular" filter chip', async () => {
    const { getByTestId } = render(<VascularAccessReportsFilters />);

    await userEvent.click(getByTestId(`${filtersMock.accessTypes[0].name}Id`));

    filtersMock.accessTypes.forEach((item) => {
      expect(getByTestId(`${item.name}Id`)).toHaveStyle(`background-color: ${theme.palette.primary.light}`);
    });
  });

  it('should select all access type filters, when click on "CVC" filter chip', async () => {
    const { getByTestId } = render(<VascularAccessReportsFilters />);

    await userEvent.click(getByTestId(`${filtersMock.categories[0].name}Id`));

    filtersMock.categories.forEach((item) => {
      expect(getByTestId(`${item.name}Id`)).toHaveStyle('background-color: #FFD6FF');
    });
  });

  it('should show "Generate reports" button', () => {
    const { getByTestId } = render(<VascularAccessReportsFilters />);
    expect(getByTestId(generateReportsButtonId)).toBeInTheDocument();
  });

  it('should show "Clear filters" button', async () => {
    const { getByTestId } = render(<VascularAccessReportsFilters />);

    await userEvent.click(getByTestId(`${filtersMock.accessTypes[0].name}Id`));
    expect(getByTestId(clearFiltersButtonId)).toBeInTheDocument();
  });

  it('should clear filters, when click on "Clear filters" button', async () => {
    const { getByTestId } = render(<VascularAccessReportsFilters />);

    await userEvent.click(getByTestId(`${filtersMock.accessTypes[0].name}Id`));
    await userEvent.click(getByTestId(clearFiltersButtonId));

    expect(store.getState().vascularAccessReports.reports.filters).toEqual(filtersInitialState);
  });

  it('should show error', () => {
    const { getByText } = render(<VascularAccessReportsFilters />, {
      preloadedState: {
        vascularAccessReports: {
          reports: {
            filters: filtersMock,
            filtersError: {
              date: 'Test error',
            },
          },
          couldGenerateReport: true,
        },
      },
    });

    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('should automatically set yesterday date when click on "Generate reports" button', async () => {
    const { getByTestId } = render(<VascularAccessReportsFilters />);

    await userEvent.click(getByTestId(generateReportsButtonId));

    expect(getByTestId(dateFilterId)).toHaveValue(format(getTenantYesterdayDate(), 'dd/MM/yyyy'));
  });
});
