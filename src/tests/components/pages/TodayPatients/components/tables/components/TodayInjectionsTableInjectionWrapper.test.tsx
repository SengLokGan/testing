import { TodayInjectionsTableInjectionWrapper } from '@src/components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTableInjectionWrapper';
import { render } from '@src/tests';

describe('TodayInjectionsTableInjectionWrapper', () => {
  it('renders with expected styles', () => {
    const { container } = render(
      <TodayInjectionsTableInjectionWrapper sx={{ backgroundColor: 'red' }}>
        <div>Test</div>
      </TodayInjectionsTableInjectionWrapper>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
