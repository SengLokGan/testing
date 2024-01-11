import { render } from '@src/tests';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { AccessCondition, DialysisStatus } from '@src/enums';
import { dialysisFixture } from '@src/tests/fixtures';
import { DialysisAccessConditionGroup } from '@components/modals/ServiceModal/components/DialysisProcedureModal/components/steps/components/DialysisAccessConditionGroup';

describe('DialysisAccessConditionGroup', () => {
  let form;
  const name = 'accessCondition';
  const user = userEvent.setup();
  const TestComponent = () => {
    form = useForm({
      defaultValues: {
        [name]: AccessCondition.NoProblemsPreHd,
      },
    });
    return <DialysisAccessConditionGroup control={form.control} watch={form.watch} />;
  };

  it('should render acceptable access condition by default', async () => {
    await render(<TestComponent />, {
      preloadedState: dialysisFixture(DialysisStatus.PreDialysis),
    });

    expect(screen.getByLabelText('NO_ACCESS_PROBLEMS_PRE_HDRadioButton')).toHaveAttribute('checked');
    expect(screen.getByLabelText('SOME_ACCESS_ISSUESRadioButton')).not.toHaveAttribute('checked');
    expect(screen.queryByTestId('accessConditionExtValueTextInput')).not.toBeInTheDocument();
  });

  it('should render access condition with issues on selecting some issues radio button', async () => {
    render(<TestComponent />, {
      preloadedState: dialysisFixture(DialysisStatus.PreDialysis, [], true, {}),
    });
    await user.click(screen.getByTestId('SOME_ACCESS_ISSUESRadioButton'));

    expect(screen.getByTestId('accessConditionExtValueTextInput')).toBeInTheDocument();
  });
});
