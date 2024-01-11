import { RichTableCell } from '@components/RichTable/components/RichTableCell';
import userEvent from '@testing-library/user-event';
import { render } from '../../../utils';
import { UserPermissions, CellType } from '@enums';

describe('RichTableCell', () => {
  const user = userEvent.setup();

  it('should render cell with checkbox and value', () => {
    const { getByTestId, getByText } = render(
      <RichTableCell cellType={CellType.Checkbox} data={'Patient name'} fullData={{ id: 123 }} />,
    );
    expect(getByTestId('TableCellCheckbox-123')).toBeInTheDocument();
    expect(getByText(/Patient name/i)).toBeInTheDocument();
  });

  it('should render cell with checked checkbox', () => {
    const { getByTestId } = render(
      <RichTableCell checked={true} cellType={CellType.Checkbox} data={'Patient name'} fullData={{ id: 123 }} />,
    );
    expect(getByTestId('TableCellCheckbox-123')).toHaveAttribute('checked');
  });

  it('should change checkbox state after click', async () => {
    const onCheckboxClick = jest.fn();
    const { getByTestId } = render(
      <RichTableCell
        onRowSelect={onCheckboxClick}
        cellType={CellType.Checkbox}
        data={'Patient name'}
        fullData={{ id: 123 }}
      />,
    );
    await user.click(getByTestId('TableCellCheckbox-123'));
    expect(onCheckboxClick).toBeCalledTimes(1);
  });

  it('should render cell with submit button if labOrder status is NEW', () => {
    const { getByTestId } = render(
      <RichTableCell cellType={CellType.LabOrderStatus} data={'TO_PERFORM'} fullData={{ id: 123 }} />,
    );
    expect(getByTestId('LabOrderTO_PERFORMButton-123')).toBeInTheDocument();
  });

  it('should call cellCallback on submit order click if user has permission', async () => {
    const cellCallback = jest.fn();
    const { getByTestId } = render(
      <RichTableCell
        cellCallback={cellCallback}
        cellType={CellType.LabOrderStatus}
        data={'TO_PERFORM'}
        fullData={{ id: 123 }}
      />,
      { preloadedState: { user: { user: { permissions: [UserPermissions.AnalysesSubmitOrder] } } } },
    );
    await user.click(getByTestId('LabOrderTO_PERFORMButton-123'));
    expect(cellCallback).toBeCalledWith({ data: { id: 123 }, id: 123, status: 'TO_PERFORM' });
  });

  it('should render cell with pending status if labOrder status is PENDING', () => {
    const { getByText } = render(
      <RichTableCell cellType={CellType.LabOrderStatus} data={'PENDING'} fullData={{ id: 123 }} />,
    );
    expect(getByText(/statuses.PENDING/i)).toBeInTheDocument();
  });

  it('should render cell with received status if labOrder status is COMPLETED', () => {
    const { getByText } = render(
      <RichTableCell cellType={CellType.LabOrderStatus} data={'COMPLETED'} fullData={{ id: 123 }} />,
    );
    expect(getByText(/statuses.COMPLETED/i)).toBeInTheDocument();
  });
});
