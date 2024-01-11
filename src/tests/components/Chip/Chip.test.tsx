import { render } from '../../utils';
import { Chip } from '@components/Chip/Chip';
import { ChipColors, ChipVariants } from '@enums';
import CheckIcon from '@mui/icons-material/Check';
import userEvent from '@testing-library/user-event';

const label = 'Test label';
const badge = '35';
const chipContainerId = 'chipContainer';
const chipLabelId = 'chipLabel';
const chipBadgeId = 'chipBadge';
const chipRightIconId = 'chipLeftIcon';
const chipLeftIconId = 'chipRightIcon';

describe('Chip', () => {
  it('should render label and badge', () => {
    const { getByText } = render(<Chip label={label} badge={badge} />);
    expect(getByText(label)).toBeTruthy();
    expect(getByText(badge)).toBeTruthy();
  });

  it('should render icons', () => {
    const { getByTestId } = render(<Chip label={label} LeftIcon={CheckIcon} RightIcon={CheckIcon} />);
    expect(getByTestId(chipRightIconId)).toBeInTheDocument();
    expect(getByTestId(chipLeftIconId)).toBeInTheDocument();
  });

  it('should call click handlers', async () => {
    const onChipClick = jest.fn();
    const onLeftIconClick = jest.fn();
    const onRightIconClick = jest.fn();
    const { getByTestId } = render(
      <Chip
        label={label}
        onClick={onChipClick}
        LeftIcon={CheckIcon}
        RightIcon={CheckIcon}
        onLeftIconClick={onLeftIconClick}
        onRightIconClick={onRightIconClick}
      />,
    );
    await userEvent.click(getByTestId(chipContainerId));
    await userEvent.click(getByTestId(chipLeftIconId));
    await userEvent.click(getByTestId(chipRightIconId));
    expect(onChipClick).toBeCalledTimes(1);
    expect(onLeftIconClick).toBeCalledTimes(1);
    expect(onRightIconClick).toBeCalledTimes(1);
  });

  const checkChipBGColorDueToVariantAndColorProps = (
    variant: ChipVariants,
    color: ChipColors,
    expectedColor: string,
  ) => {
    it(`background-color should look correct due to ${variant} variant and ${color} color`, () => {
      const { getByTestId } = render(<Chip label={label} badge={badge} variant={variant} color={color} />);
      expect(getByTestId(chipContainerId)).toHaveStyle(`background-color: ${expectedColor}`);
    });
  };
  checkChipBGColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.standard, 'transparent');
  checkChipBGColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.blue, 'transparent');
  checkChipBGColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.pink, 'transparent');
  checkChipBGColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.standard, '#E2E2E5');
  checkChipBGColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.pink, '#FFD6FF');
  checkChipBGColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.blue, '#CDE5FF');

  const checkChipBorderColorDueToVariantAndColorProps = (
    variant: ChipVariants,
    color: ChipColors,
    expectedColor: string,
  ) => {
    it(`border should look correct due to ${variant} variant and ${color} color`, () => {
      const { getByTestId } = render(<Chip label={label} badge={badge} variant={variant} color={color} />);
      expect(getByTestId(chipContainerId)).toHaveStyle(`border: 1px solid ${expectedColor}`);
    });
  };

  checkChipBorderColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.standard, '#73777D');
  checkChipBorderColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.blue, '#73777D');
  checkChipBorderColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.pink, '#73777D');
  checkChipBorderColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.standard, '#E2E2E5');
  checkChipBorderColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.pink, '#FFD6FF');
  checkChipBorderColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.blue, '#CDE5FF');

  const checkChipBadgeColorDueToVariantAndColorProps = (
    variant: ChipVariants,
    color: ChipColors,
    expectedColor: string,
  ) => {
    it(`badge should look correct due to ${variant} variant and ${color} color`, () => {
      const { getByTestId } = render(<Chip label={label} badge={badge} variant={variant} color={color} />);
      expect(getByTestId(chipBadgeId)).toHaveStyle(`background-color: ${expectedColor}`);
    });
  };

  checkChipBadgeColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.standard, '#73777D');
  checkChipBadgeColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.blue, '#006398');
  checkChipBadgeColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.pink, '#9036A2');
  checkChipBadgeColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.standard, '#73777D');
  checkChipBadgeColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.pink, '#9036A2');
  checkChipBadgeColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.blue, '#006398');

  const checkChipLabelColorDueToVariantAndColorProps = (
    variant: ChipVariants,
    color: ChipColors,
    expectedColor: string,
  ) => {
    it(`border should look correct due to ${variant} variant and ${color} color`, () => {
      const { getByTestId } = render(<Chip label={label} badge={badge} variant={variant} color={color} />);
      expect(getByTestId(chipLabelId)).toHaveStyle(`color: ${expectedColor}`);
    });
  };

  checkChipLabelColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.standard, '#1A1C1E');
  checkChipLabelColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.blue, '#1A1C1E');
  checkChipLabelColorDueToVariantAndColorProps(ChipVariants.outlined, ChipColors.pink, '#1A1C1E');
  checkChipLabelColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.standard, '#1A1C1E');
  checkChipLabelColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.pink, '#350040');
  checkChipLabelColorDueToVariantAndColorProps(ChipVariants.fill, ChipColors.blue, '#001D31');
});
