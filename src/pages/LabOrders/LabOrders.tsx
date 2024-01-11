import { MainContentContainer } from '@containers';
import { Stack } from '@mui/material';
import { useAppDispatch } from '@hooks/storeHooks';
import { PermissionGuard } from '@guards';
import { GlobalAddButtonWithChips, GlobalLoader, LaboratoriesViewTable } from '@components';
import {
  DrawerType,
  FormType,
  LabOrderEventPlace,
  LabOrdersPlace,
  LabOrderStatus,
  LabOrderType,
  LabSpecimenType,
  ServiceModalName,
  UserPermissions,
} from '@enums';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { ControlButtons, LabOrdersFiltersBlock } from '@components/pages/LabOrders';
import { useEffect, useMemo } from 'react';
import {
  addDrawer,
  addServiceModal,
  clearLabOrderFilters,
  getFilteredLabOrdersList,
  removeDrawer,
  resetLabOrdersList,
  selectHasActiveDrawers,
  selectLabOrdersIsFileLoading,
  selectLabOrdersIsLoading,
  selectLabOrdersIsSubmitting,
  selectLabOrderStatusFilters,
  submitLabOrders,
} from '@store';
import { getLabOrdersTableColumns, ROUTES } from '@constants';
import { LabOrderStatusCellCallbackProps } from '@types';
import UseIgnoreFirstRenderEffect from '@hooks/useIgnoreFirstRenderEffect';

export const LabOrders = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('labOrders');
  const { t: tCommon } = useTranslation('common');
  const isFileLoading = selectLabOrdersIsFileLoading();
  const hasActiveDrawers = selectHasActiveDrawers();
  const isSubmitting = selectLabOrdersIsSubmitting();
  const isLoading = selectLabOrdersIsLoading();
  const filters = selectLabOrderStatusFilters();
  const labOrdersTableColumns = useMemo(
    () =>
      getLabOrdersTableColumns().map((column) =>
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
    dispatch(clearLabOrderFilters());
    dispatch(removeDrawer(DrawerType.LabOrdersFilters));
  }, []);

  UseIgnoreFirstRenderEffect(() => {
    dispatch(getFilteredLabOrdersList());
  }, [filters]);

  const handleChipClick = (labTestType: LabOrderType) => {
    const setFormInitValues = () => {
      switch (labTestType) {
        case LabOrderType.INDIVIDUAL:
          return {
            patient: null,
            procedure: null,
            laboratory: null,
            specimenType: null,
            dialysisDay: true,
            planeDates: [{ date: null, status: LabOrderStatus.TO_PERFORM }],
          };
        case LabOrderType.QUARTERLY:
          return {
            patient: null,
            firstQuarterProcedure: null,
            secondQuarterProcedure: null,
            thirdQuarterProcedure: null,
            fourthQuarterProcedure: null,
          };
        case LabOrderType.URGENT:
          return {
            patient: null,
            procedure: null,
            laboratory: null,
            specimenType: LabSpecimenType.BLOOD,
          };
        default:
          return null;
      }
    };

    dispatch(
      labTestType === LabOrderType.URGENT
        ? addServiceModal({
            name: ServiceModalName.UrgentLabTest,
            payload: {
              mode: FormType.Add,
              place: LabOrderEventPlace.LabOrders,
              formInitialValues: setFormInitValues(),
            },
          })
        : addDrawer({
            type:
              labTestType === LabOrderType.INDIVIDUAL ? DrawerType.IndividualLabTestPlanForm : DrawerType.QuarterlyBT,
            payload: {
              place: LabOrderEventPlace.LabOrders,
              mode: FormType.Add,
              formInitialValues: setFormInitValues(),
            },
            allowedPathsToShowDrawer: [ROUTES.labOrders],
          }),
    );
  };

  return (
    <MainContentContainer
      fullHeight
      sx={(theme) => ({
        bgcolor: theme.palette.surface.default,
        width: 1,
      })}
    >
      {isFileLoading && <GlobalLoader />}
      <PermissionGuard permissions={[UserPermissions.AnalysesModifyOrder]}>
        {!hasActiveDrawers && (
          <GlobalAddButtonWithChips
            chips={[
              { label: t(`labTestTypes.${LabOrderType.INDIVIDUAL}`), value: LabOrderType.INDIVIDUAL },
              { label: t(`labTestTypes.${LabOrderType.QUARTERLY}`), value: LabOrderType.QUARTERLY },
              { label: t(`labTestTypes.${LabOrderType.URGENT}`), value: LabOrderType.URGENT },
            ]}
            onChipClick={handleChipClick}
          />
        )}
      </PermissionGuard>
      <Stack direction="column" sx={{ width: 1, p: 0 }} spacing={3}>
        <Stack direction="column" spacing={2} sx={{ px: 3, mt: 2 }}>
          <Typography variant="headerL">{t('labOrders')}</Typography>
          <LabOrdersFiltersBlock place={LabOrdersPlace.Header} />
          <ControlButtons />
          <LaboratoriesViewTable columns={labOrdersTableColumns} />
        </Stack>
      </Stack>
    </MainContentContainer>
  );
};
