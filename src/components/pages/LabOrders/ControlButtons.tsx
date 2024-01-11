import { useMemo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  clearLabOrderFilters,
  exportLabOrders,
  selectLabOrderFilters,
  selectLabOrdersList,
  selectSelectedLabOrders,
  submitLabOrders,
  printSelectedOrders,
} from '@store/slices/labOrdersSlice';
import { LabOrdersFilters } from '@types';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { UserPermissions, ServiceModalName, LabOrderStatus } from '@enums';
import { PermissionGuard } from '@guards';
import { format, isValid } from 'date-fns';
import { addServiceModal } from '@store/slices/serviceModalSlice';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box } from '@mui/material';

type ControlButtonsProps = {
  notClearableFields?: (keyof LabOrdersFilters)[];
};

export const ControlButtons = ({ notClearableFields = [] }: ControlButtonsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('labOrders');
  const { t: tCommon } = useTranslation('common');
  const orders = selectLabOrdersList();
  const selectedLabOrders = selectSelectedLabOrders();
  const filters = selectLabOrderFilters();

  const ordersToSubmit = useMemo(() => {
    return orders.reduce(
      (ordersToSubmit, order) =>
        selectedLabOrders.includes(order.id) && order.status === LabOrderStatus.TO_SUBMIT
          ? [...ordersToSubmit, order.id]
          : ordersToSubmit,
      [] as number[],
    );
  }, [orders, selectedLabOrders]);

  const ordersToPrint = useMemo(() => {
    return orders.reduce(
      (ordersToPrint, order) => (selectedLabOrders.includes(order.id) ? [...ordersToPrint, order.id] : ordersToPrint),
      [] as number[],
    );
  }, [orders, selectedLabOrders]);

  const isClearFiltersDisabled =
    isValid(filters.to) &&
    format(filters.to, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') &&
    isValid(filters.from) &&
    format(filters.from, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') &&
    !filters.orderStatus.length &&
    !filters.order &&
    !filters.procedures.length &&
    !filters.shifts.length &&
    !filters.patient;

  const clearFiltersHandler = () => dispatch(clearLabOrderFilters(notClearableFields));

  const handleSubmitLabOrders = () => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => dispatch(submitLabOrders({ orderIds: ordersToSubmit })),
          title: t('modal.submitOrderConfirmation'),
          text: t('modal.makeSureAllNecessarySamplesAreReady'),
          confirmButton: tCommon('button.confirm'),
        },
      }),
    );
  };

  const exportLabOrdersHandler = () => dispatch(exportLabOrders());

  const printSelectedOrdersHandler = () => dispatch(printSelectedOrders(ordersToPrint));

  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={clearFiltersHandler}
        disabled={isClearFiltersDisabled}
        variant="outlined"
        data-testid="clearFiltersButton"
      >
        <Typography variant="labelL" sx={{ textTransform: 'none' }}>
          {t('filters.clearFilters')}
        </Typography>
      </Button>
      <PermissionGuard permissions={UserPermissions.AnalysesPrintLabSummary}>
        <Button
          onClick={exportLabOrdersHandler}
          disabled={!orders.length}
          variant="outlined"
          data-testid="exportButton"
        >
          <Stack direction="row" spacing={1}>
            <Typography variant="labelL">{tCommon('button.export')}</Typography>
            <SaveOutlinedIcon
              sx={({ palette }) => ({ color: !orders.length ? palette.action.disabled : palette.primary.main })}
            />
          </Stack>
        </Button>
      </PermissionGuard>
      <PermissionGuard permissions={UserPermissions.AnalysesPrintForm}>
        <Button
          onClick={printSelectedOrdersHandler}
          disabled={!ordersToPrint.length}
          variant="outlined"
          data-testid="printSelectedButton"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="labelL">{tCommon('button.print')}</Typography>
            <Box
              component="span"
              sx={({ palette }) => ({
                backgroundColor: !selectedLabOrders.length ? palette.action.disabled : palette.primary.main,
                width: '26px',
                height: '26px',
                color: 'text.white',
                borderRadius: '50%',
                lineHeight: '26px',
              })}
            >
              {ordersToPrint.length}
            </Box>
            <SaveOutlinedIcon
              sx={({ palette }) => ({
                color: !selectedLabOrders.length ? palette.action.disabled : palette.primary.main,
              })}
            />
          </Stack>
        </Button>
      </PermissionGuard>
      <PermissionGuard permissions={UserPermissions.AnalysesSubmitOrder}>
        {!!ordersToSubmit.length && (
          <Button onClick={handleSubmitLabOrders} variant="contained" data-testid="submitAllOrdersButton">
            <Typography variant="labelL">{t('filters.submit')}</Typography>
            <Typography variant="labelL" sx={{ mx: 1 }}>
              {ordersToSubmit.length}
            </Typography>
            <CheckIcon sx={{ color: 'text.white' }} />
          </Button>
        )}
      </PermissionGuard>
    </Stack>
  );
};
