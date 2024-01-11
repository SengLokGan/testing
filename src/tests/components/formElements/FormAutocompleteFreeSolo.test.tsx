import { useForm } from 'react-hook-form';
import { render } from '../../utils';
import { Dictionaries, getOptionListFromCatalog } from '@utils';
import { FormAutocompleteFreeSolo } from '@components/FormComponents/FormAutocompleteFreeSolo';
import { DialyzerUseType } from '@enums';
import userEvent from '@testing-library/user-event';

describe('FormAutoCompleteFreeSolo', () => {
  const label = 'Test';
  const name = 'testName';
  const optionsExample = [
    ...getOptionListFromCatalog(Dictionaries.ReuseDialyzerBrand).map((option) => ({
      ...option,
      group: DialyzerUseType.Reuse,
    })),
    ...getOptionListFromCatalog(Dictionaries.SingleDialyzerBrand).map((option) => ({
      ...option,
      group: DialyzerUseType.Single,
    })),
  ];
  const user = userEvent.setup();

  it('should render autocomplete with grouped options', async () => {
    const TestComponent = () => {
      const { handleSubmit, ...rest } = useForm({
        defaultValues: {
          [name]: true,
        },
      });
      return (
        <FormAutocompleteFreeSolo
          options={optionsExample}
          {...rest}
          groupBy={(option) => option?.group || ''}
          name={name}
          label={label}
        />
      );
    };
    const { getByTestId, getAllByRole, getByText } = render(<TestComponent />);
    expect(getByTestId(`${name}AutocompleteFreeSolo`)).toBeInTheDocument();
    await user.click(getByTestId(`${name}AutocompleteFreeSolo`));
    expect(getByText('REUSE')).toBeInTheDocument();
    expect(getByText('SINGLE_USE')).toBeInTheDocument();
    expect(getAllByRole('option')).toHaveLength(14);
    expect(getAllByRole('option')[12]).toHaveTextContent('SINGLE_DIALYZER_BRAND:Revaclear 300');
    expect(getAllByRole('option')[13]).toHaveTextContent('SINGLE_DIALYZER_BRAND:Theranova 400 1.7 m2');
  });

  it('should render autocomplete without grouped options', async () => {
    const TestComponent = () => {
      const { handleSubmit, ...rest } = useForm({
        defaultValues: {
          [name]: true,
        },
      });
      return <FormAutocompleteFreeSolo options={optionsExample} {...rest} name={name} label={label} />;
    };

    const { getByTestId, queryByText } = render(<TestComponent />);
    expect(getByTestId(`${name}AutocompleteFreeSolo`)).toBeInTheDocument();
    await user.click(getByTestId(`${name}AutocompleteFreeSolo`));
    expect(queryByText('REUSE')).toBeNull();
    expect(queryByText('SINGLE_USE')).toBeNull();
  });
});
