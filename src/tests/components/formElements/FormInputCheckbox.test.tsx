import { useForm } from 'react-hook-form';
import { render } from '../../utils';
import { FormInputCheckbox } from '@components/FormComponents';

describe('FormInputCheckbox', () => {
  const label = 'Test';
  const name = 'testName';

  it('should render checkbox', async () => {
    const TestComponent = () => {
      const { handleSubmit, ...rest } = useForm({
        defaultValues: {
          [name]: true,
        },
      });
      return <FormInputCheckbox {...rest} name={name} label={label} />;
    };
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId(`${name}Checkbox`)).toHaveAttribute('checked');
  });

  it('should render disabled checkbox', async () => {
    const TestComponent = () => {
      const { handleSubmit, ...rest } = useForm({
        defaultValues: {
          [name]: true,
        },
      });
      return <FormInputCheckbox {...rest} name={name} label={label} isDisabled />;
    };
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId(`${name}Checkbox`)).toHaveAttribute('disabled');
  });
});
