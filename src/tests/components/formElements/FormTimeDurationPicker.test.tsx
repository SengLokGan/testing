import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { render } from '../../utils';
import { FormTimeDurationPicker } from '../../../components/FormComponents/FormTimeDurationPicker';

describe('FormTimeDurationPicker', () => {
  const label = 'Test';
  const name = 'testName';
  const user = userEvent.setup();

  it('should render the component and open popup', async () => {
    let timeData;
    const defaultValue = 120;
    const TestComponent = () => {
      const { handleSubmit, trigger, watch, ...rest } = useForm({
        defaultValues: {
          testName: defaultValue,
        },
      });
      return (
        <div data-testid="wrapper">
          <form data-testid="form" onSubmit={handleSubmit((data) => (timeData = data[name]))}>
            <FormTimeDurationPicker {...rest} trigger={trigger} watch={watch} name={name} label={label} />
            <button data-testid="formSubmit">Submit</button>
          </form>
        </div>
      );
    };

    const { container, getByTestId } = render(<TestComponent />);
    expect(getByTestId(`wrapper`)).toBeVisible();
    expect(getByTestId(`${name}TimeDurationPicker`)).toBeVisible();
    expect(getByTestId(`${name}TimeDurationPickerIconButton`)).toBeVisible();
    await user.click(getByTestId('formSubmit'));
    await user.click(getByTestId(`${name}TimeDurationPickerIconButton`));
    expect(getByTestId('popover-testName-duration-timepicker')).toBeVisible();
    await user.click(getByTestId('popover-testName-duration-timepicker'));
    expect(container.querySelector('#popover-durationMin-duration-timepicker')).toBeFalsy();
    expect(timeData).toEqual(defaultValue);
  });
});
