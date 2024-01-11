import { HorizontalScrollContainer } from '@components/HorizontalScrollContainer/HorizontalScrollContainer';
import { StatusMenuItem } from '@components/pages/TodayPatients/components/StatusMenuItem/StatusMenuItem';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { FilterDatepicker } from '@components/pages/TodayPatients';
import { TextToggleButton } from '@components/TextToggleButton/TextToggleButton';
import { PermissionGuard } from '@guards/PermissionGuard';
import { UserPermissions } from '@enums/store';
import { AppointmentsStatusesFilters, DrawerStatus, TodayPatientsTabs, TodayPatientsViewMode } from '@enums/components';
import {
  addDrawer,
  changeTodayPatientsActiveTab,
  changeTodayPatientsFilters,
  changeTodayPatientsStatusesFilters,
  changeTodayPatientsViewMode,
  clearAllTodayPatientsFilters,
  selectTodayPatientFilter,
  selectTodayPatientsActiveTab,
  selectTodayPatientsIsolatorFilters,
  selectTodayPatientsStatusesFilters,
  selectTodayPatientsViewMode,
  setTodayPatientsFilterDate,
} from '@store/slices';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { PatientsFilterChips } from '@components/pages/PatientsOverview';
import { DrawerType } from '@enums/containers';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks/storeHooks';
import TableRowsIcon from '@mui/icons-material/TableRowsOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const TodayPatientsFilters = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('todayPatients');
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const activeTab = selectTodayPatientsActiveTab();
  const viewMode = selectTodayPatientsViewMode();
  const allIsolatorFilters = selectTodayPatientsIsolatorFilters();
  const statusesFilters = selectTodayPatientsStatusesFilters();
  const patientNameFilter = selectTodayPatientFilter();
  const isInjectionsTab = activeTab === TodayPatientsTabs.Injections;
  const isPatientsTab = activeTab === TodayPatientsTabs.Patients;
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const openDrawer = () => {
    dispatch(
      addDrawer({
        type: DrawerType.TodayPatientsFilters,
        payload: {
          status: DrawerStatus.Showed,
          collapsable: false,
        },
      }),
    );
  };

  const changeViewMode = () => {
    dispatch(
      changeTodayPatientsViewMode(
        viewMode === TodayPatientsViewMode.Table ? TodayPatientsViewMode.Grid : TodayPatientsViewMode.Table,
      ),
    );
  };

  const onChipFilterClick = useCallback(
    (name: string, filterType: 'isolations' | 'patient') => {
      dispatch(changeTodayPatientsActiveTab(TodayPatientsTabs.Patients));
      dispatch(
        filterType === 'isolations'
          ? changeTodayPatientsFilters({
              isolations: {
                items: allIsolatorFilters.items.map((item) => {
                  return name === item.name ? { ...item, checked: !item.checked } : item;
                }),
              },
            })
          : changeTodayPatientsFilters({
              patient: null,
            }),
      );
    },
    [allIsolatorFilters],
  );

  const patientsFilterStatusesChangeHandler = useCallback(
    (name: AppointmentsStatusesFilters | null) => {
      dispatch(changeTodayPatientsViewMode(isXs ? TodayPatientsViewMode.Grid : TodayPatientsViewMode.Table));
      dispatch(changeTodayPatientsActiveTab(TodayPatientsTabs.Patients));
      dispatch(
        changeTodayPatientsStatusesFilters({
          items: statusesFilters.map((item) => ({ ...item, selected: name === item.name })),
        }),
      );
    },
    [statusesFilters],
  );

  const onInjectionViewHandler = useCallback(() => {
    dispatch(changeTodayPatientsActiveTab(TodayPatientsTabs.Injections));
    dispatch(changeTodayPatientsViewMode(TodayPatientsViewMode.Table));
  }, []);

  useEffect(() => {
    filterDate && dispatch(setTodayPatientsFilterDate(filterDate));
  }, [filterDate]);

  useEffect(() => {
    isXs &&
      !isInjectionsTab &&
      viewMode === TodayPatientsViewMode.Table &&
      dispatch(changeTodayPatientsViewMode(TodayPatientsViewMode.Grid));
  }, [isXs, viewMode]);

  return (
    <>
      <Stack
        sx={[
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          isXs && {
            flexDirection: 'column',
            alignItems: 'flex-start',
            px: 2,
          },
          !isXs && {
            alignItems: 'center',
          },
        ]}
      >
        <Typography variant="headerL" sx={{ mb: isXs ? 2 : 0 }}>
          {t('todayPatients')}
        </Typography>

        <FilterDatepicker date={filterDate} onChange={setFilterDate} />
      </Stack>

      {isXs && (
        <HorizontalScrollContainer
          nowrap
          sx={() => ({
            mt: '0 !important',
            px: 2,
          })}
        >
          {statusesFilters.map(({ name, badge, selected }) => (
            <StatusMenuItem
              key={`StatusMenuItem-${name}`}
              isSelected={isPatientsTab && selected}
              value={name}
              badge={badge}
              onClick={(value) => patientsFilterStatusesChangeHandler(value)}
            >
              {t(`filter.${name}`)}
            </StatusMenuItem>
          ))}
          <PermissionGuard permissions={UserPermissions.DialysisViewAppointments}>
            <StatusMenuItem
              value={TodayPatientsTabs.Injections}
              isSelected={isInjectionsTab}
              onClick={onInjectionViewHandler}
            >
              {t(`injections.injections`)}
            </StatusMenuItem>
          </PermissionGuard>
        </HorizontalScrollContainer>
      )}

      <Stack
        direction="column"
        spacing={3}
        sx={[
          isXs && {
            mt: '-2px !important',
            px: ({ spacing }) => spacing(2),
            borderTop: ({ palette }) => `solid 1px ${palette.border.default}`,
          },
          !isXs && {
            mt: 2,
          },
        ]}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
          {!isXs && (
            <Stack direction="row" flexWrap="wrap" sx={{ width: 1 }}>
              {statusesFilters.map(({ name, badge, selected }) => (
                <TextToggleButton
                  key={name}
                  value={name}
                  title={t(`filter.${name}`)}
                  badge={badge}
                  isSelected={isPatientsTab && selected}
                  onChange={() => patientsFilterStatusesChangeHandler(name)}
                  sx={({ spacing }) => ({
                    margin: spacing(0, 1, 1, 0),
                  })}
                />
              ))}
              <PermissionGuard permissions={UserPermissions.DialysisViewAppointments}>
                <TextToggleButton
                  value={TodayPatientsTabs.Injections}
                  title={t(`injections.injections`)}
                  isSelected={isInjectionsTab}
                  onChange={onInjectionViewHandler}
                  sx={({ spacing }) => ({
                    margin: spacing(0, 1, 1, 0),
                  })}
                />
              </PermissionGuard>
            </Stack>
          )}

          <Stack
            direction="row"
            spacing={{ xs: 0, md: 1 }}
            justifyContent="space-between"
            sx={(theme) => ({
              width: { xs: 'unset', sm: `calc(100% + ${theme.spacing(6)})`, md: 'unset' },
              borderTop: { sm: `solid 1px ${theme.palette.border.default}`, md: 'unset' },
              ml: { xs: 0, sm: theme.spacing(-3), md: 0 },
            })}
          >
            <IconButton
              data-testid="filtersButton"
              disableRipple
              sx={(theme) => ({
                p: { xs: theme.spacing(1.5, 3), md: 1 },
                '&:hover': { backgroundColor: { xs: 'unset', md: 'inherit' } },
                width: { xs: 'unset', md: theme.spacing(6.25) },
                flex: { xs: 1, md: 'unset' },
              })}
              onClick={openDrawer}
            >
              <FilterListIcon />
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: isInjectionsTab ? 'none' : { xs: 'none', sm: 'flex', md: 'none' } }}
            />
            <IconButton
              data-testid="changeViewModeButton"
              disableRipple
              sx={(theme) => ({
                display: isInjectionsTab ? 'none' : { xs: 'none', sm: 'flex' },
                p: { xs: theme.spacing(1.5, 3), md: 1 },
                '&:hover': { backgroundColor: { xs: 'unset', md: 'inherit' } },
                width: { xs: 'unset', md: theme.spacing(6.25) },
                flex: { xs: 1, md: 'unset' },
              })}
              onClick={changeViewMode}
            >
              {viewMode === TodayPatientsViewMode.Grid ? (
                <TableRowsIcon data-testid="todayPatientsTableViewIcon" />
              ) : (
                <GridViewIcon data-testid="todayPatientsGridViewIcon" />
              )}
            </IconButton>
          </Stack>
        </Stack>
        <PatientsFilterChips
          allIsolatorFilters={allIsolatorFilters}
          patientNameFilter={patientNameFilter}
          onChipFilterClick={onChipFilterClick}
          onClearAllClick={() => dispatch(clearAllTodayPatientsFilters())}
          sx={[
            {
              flexWrap: 'wrap',
              whiteSpace: 'nowrap',
              mt: '0 !important',
              pb: isXs ? 0.5 : 0,
            },
            isXs && {
              '& .chip': {
                mb: 1,
                ml: 0,
                mr: 1,
              },
            },
          ]}
        />
      </Stack>
    </>
  );
};
