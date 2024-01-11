import { TodayInjectionsTableAmountColumn } from '@components/pages/TodayPatients/components/TodayInjections/components/TodayInjectionsTable/components/TodayInjectionsTableAmountColumn';
import { screen } from '@testing-library/react';
import { injectionFixture } from '@src/tests/fixtures';
import { render } from '@src/tests';

const injections = [injectionFixture(), injectionFixture(), injectionFixture()];

describe('TodayInjectionsTableAmountColumn', () => {
  it('renders the correct number of injections', () => {
    render(<TodayInjectionsTableAmountColumn injections={injections} />);

    injections.forEach((injection) => {
      const element = screen.getByTestId(`injection-amount-${injection.id}`);
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent(injection.amount.toString());
    });
  });
});
