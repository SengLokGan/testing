import { render } from '@src/tests/utils';
import { ClinicalNotesFilters } from '@components/pages/PatientProfile/subPages';
import { format } from 'date-fns';
import { screen } from '@testing-library/dom';
import { clinicalNotesInitialState } from '@store/slices';
import userEvent from '@testing-library/user-event';

const { noteTypes } = clinicalNotesInitialState.filters;

describe('ClinicalNotesFilters', () => {
  it('should render "from date" and "to date" filters with default values', () => {
    render(<ClinicalNotesFilters />);

    expect(screen.getByTestId('fromDatePicker')).toHaveValue('');
    expect(screen.getByTestId('toDatePicker')).toHaveValue(format(new Date(), 'dd/MM/yyyy'));
  });

  it('should render chip filters', () => {
    render(<ClinicalNotesFilters />);

    noteTypes.forEach((item) => {
      expect(screen.getByTestId(`${item.name}Chip`)).toBeInTheDocument();
    });
  });

  it('should render "clear all" chip, if 2 or more chips selected', async () => {
    render(<ClinicalNotesFilters />);

    await userEvent.click(screen.getByTestId(`${noteTypes[0].name}Chip`));
    await userEvent.click(screen.getByTestId(`${noteTypes[1].name}Chip`));

    expect(screen.getByTestId('filters.clearAllChip')).toBeInTheDocument();
  });
});
