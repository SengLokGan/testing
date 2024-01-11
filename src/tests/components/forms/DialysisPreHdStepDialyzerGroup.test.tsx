import { render } from '@src/tests';
import { PreHDForm } from '@types';
import { SterilantVe } from '@enums';
import DialysisPreHdStepDialyzerGroup from '../../../components/modals/ServiceModal/components/DialysisProcedureModal/components/steps/components/DialysisPreHdStepDialyzerGroup';
import { useForm } from 'react-hook-form';

const defaultValues = {
  dialyzerBrand: { label: 'dialyzerBrand', value: 'dialyzerBrand' },
  dialyzerSurfaceArea: 'dialyzerSurfaceArea',
  dialyzerPrimedBy: { label: 'dialyzerPrimedBy', value: '1' },
  dialyzerReuseNum: '1',
  dialyzerSterilantVe: SterilantVe.POS_VE,
  dialyzerSterilantVeComment: 'dialyzerSterilantVeComment',
  dialyzerTestedBy: { label: 'dialyzerTestedBy', value: '1' },
  residualTestedBy: { label: 'residualTestedBy', value: '1' },
  residualVe: false,
};

describe('DialysisPreHdStepDialyzerGroup', () => {
  const TestComponent = ({ nursesOptions = [] }) => {
    const { control, watch, setValue } = useForm<PreHDForm>({ mode: 'onBlur', defaultValues, shouldUnregister: true });
    return (
      <DialysisPreHdStepDialyzerGroup
        control={control}
        watch={watch}
        setValue={setValue}
        nursesOptions={nursesOptions}
      />
    );
  };

  it('should show shor form with default values if useType = SINGLE_USE', async () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('dialyzerBrandAutocompleteFreeSolo')).toHaveAttribute('value', 'DialyzerBrand');
    expect(getByTestId('dialyzerSurfaceAreaTextInput')).toHaveAttribute('value', 'dialyzerSurfaceArea');
    expect(getByTestId('dialyzerPrimedByFormAutocomplete')).toHaveAttribute('value', 'DialyzerPrimedBy');
  });

  it('should show full form with default values if useType = REUSE', async () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('dialyzerBrandAutocompleteFreeSolo')).toHaveAttribute('value', 'DialyzerBrand');
    expect(getByTestId('dialyzerSurfaceAreaTextInput')).toHaveAttribute('value', 'dialyzerSurfaceArea');
    expect(getByTestId('dialyzerReuseNumTextInput')).toHaveAttribute('value', '');
    expect(getByTestId('newDialyzerCheckbox')).not.toBeChecked();
    expect(getByTestId('sterilantVeCheckbox')).not.toBeChecked();
    expect(getByTestId('residualVeCheckbox')).not.toBeChecked();
    expect(getByTestId('dialyzerSterilantVeCommentTextInput')).toHaveAttribute('value', 'dialyzerSterilantVeComment');
    expect(getByTestId('dialyzerPrimedByFormAutocomplete')).toHaveAttribute('value', 'DialyzerPrimedBy');
  });

  it('should show dialyzerSterilantVeComment field if defaultSterilantVe = SterilantVe.NEG_VE', async () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('dialyzerSterilantVeCommentTextInput')).toHaveAttribute('value', 'dialyzerSterilantVeComment');
  });
});
