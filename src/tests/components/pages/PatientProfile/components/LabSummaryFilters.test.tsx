import { render } from '../../../../utils';
import { LabSummaryFilters } from '@components/pages/PatientProfile/subPages';

const filters = {
  from: new Date(),
  to: new Date(),
  procedures: [
    { label: 'rd-1', value: '1' },
    { label: 'rd-2', value: '2' },
  ],
  labName: ['1'],
};

const filtersError = {
  from: null,
  to: null,
};

describe('LabSummaryFilters', () => {
  it('should show filter block with fields', async () => {
    const { getByTestId } = render(<LabSummaryFilters dataLength={1} />, {
      preloadedState: { labOrders: { filters, filtersError } },
    });

    expect(getByTestId('fromDatePicker')).toBeInTheDocument();
    expect(getByTestId('toDatePicker')).toBeInTheDocument();
    expect(getByTestId('proceduresAutocompleteMultiple')).toBeInTheDocument();
    expect(getByTestId('labNameSelectInput')).toBeInTheDocument();
  });
});
