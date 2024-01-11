import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { ControlButtons, LabOrdersFiltersBlock } from '@components/pages/LabOrders';
import { LaboratoriesViewTable } from '@components/laboratories/components/tables/LaboratoriesViewTable';
import { getLabOrdersTableColumns } from '@constants';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  addServiceModal,
  getFilteredLabOrdersList,
  resetLabOrdersList,
  selectLabOrdersIsLoading,
  selectLabOrdersIsSubmitting,
  selectLabOrderStatusFilters,
  setFilters,
  submitLabOrders,
} from '@store';
import { LabOrderEventPlace, LabOrdersPlace, LabOrderStatus, ServiceModalName } from '@enums';
import { LabOrderStatusCellCallbackProps } from '@types';
import Typography from '@mui/material/Typography';

export const LabOrders = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('labOrders');
  const { t: tCommon } = useTranslation('common');
  const isSubmitting = selectLabOrdersIsSubmitting();
  const isLoading = selectLabOrdersIsLoading();
  const filters = selectLabOrderStatusFilters();

  const labOrdersPatientProfileTableColumns = useMemo(
    () =>
      getLabOrdersTableColumns()
        .filter((column) => column.id !== 'patient' && column.id !== 'document')
        .map((column) =>
          column.id === 'status'
            ? {
                ...column,
                disabled: Boolean(isSubmitting) || Boolean(isLoading),
                cellCallback: ({ id, status, data }: LabOrderStatusCellCallbackProps) => {
                  const payload =
                    status === LabOrderStatus.TO_SUBMIT
                      ? {
                          closeCallback: () => dispatch(submitLabOrders({ orderIds: [id] })),
                          title: t('modal.submitOrderConfirmation'),
                          text: t('modal.makeSureAllNecessarySamplesAreReady'),
                          confirmButton: tCommon('button.submit'),
                        }
                      : {
                          defaultFormValues: data,
                          orderId: id,
                          place: LabOrderEventPlace.LabOrders,
                        };
                  dispatch(
                    addServiceModal({
                      name:
                        status === LabOrderStatus.TO_SUBMIT
                          ? ServiceModalName.ConfirmModal
                          : ServiceModalName.PerformLabTest,
                      payload,
                    }),
                  );
                },
              }
            : column,
        ),
    [],
  );

  useEffect(() => {
    dispatch(resetLabOrdersList());
    id && dispatch(setFilters({ patient: { id, label: '' } }));
  }, [id]);

  useEffect(() => {
    dispatch(getFilteredLabOrdersList());
  }, [filters]);

  return (
    <Stack direction="column" sx={{ width: 1, p: 0 }} spacing={3}>
      <Stack direction="column" spacing={2} sx={{ px: 3, mt: 2 }}>
        <Typography variant="headerL">{t('labOrders')}</Typography>
        <LabOrdersFiltersBlock place={LabOrdersPlace.Profile} />
        <ControlButtons />
        <LaboratoriesViewTable columns={labOrdersPatientProfileTableColumns} />
      </Stack>
    </Stack>
  );
};
