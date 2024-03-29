import { render } from '../utils';
import { Snacks } from '@components/Snacks/Snacks';
import theme from '../../styles/theme';
import { SnackType } from '@enums';

const snackMessage = 'Test snack message';

describe('Snack', () => {
  const checkSnackTextAndColor = (type: SnackType, expectedColor: string) => {
    it(`should render message and show correct color due to ${type} type`, () => {
      const { getAllByTestId } = render(<Snacks />, {
        preloadedState: { snack: { snacks: [{ type, message: snackMessage }] } },
      });

      expect(getAllByTestId(`${type}Snack`)[0]).toHaveStyle(`background-color: ${expectedColor}`);
    });
  };

  checkSnackTextAndColor(SnackType.Success, '#006D3C');
  checkSnackTextAndColor(SnackType.Delete, '#2F3032');
  checkSnackTextAndColor(SnackType.Error, theme.palette.error.main);
});
