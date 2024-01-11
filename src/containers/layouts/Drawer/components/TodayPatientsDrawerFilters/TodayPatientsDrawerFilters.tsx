import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useAppDispatch } from '@hooks/index';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { removeDrawer } from '@store/slices/drawerSlice';
import { DrawerType } from '@enums';
import IsolationFieldsGroup from '@containers/layouts/Drawer/components/PatientsOverviewDrawerFilters/IsolationFieldsGroup';
import {
  changeTodayPatientsFilters,
  clearAllTodayPatientsFilters,
  selectTodayPatientFilter,
  selectTodayPatientsIsolatorFilters,
  setTodayPatientsPatientFilter,
} from '@store/slices/todayPatientsSlice';
import Divider from '@mui/material/Divider';
import { AutocompleteAsync } from '@src/components/autocompletes/AutocompleteAsync/AutocompleteAsync';

const TodayPatientsDrawerFilters = () => {
  const { t } = useTranslation('patient');
  const dispatch = useAppDispatch();
  const isolationFilters = selectTodayPatientsIsolatorFilters();
  const patientFilter = selectTodayPatientFilter();
  const [isolationFiltersLocalState, setIsolationFiltersLocalState] = useState(isolationFilters);

  return (
    <Stack direction="column" spacing={1} sx={{ '& .MuiDivider-root': { mt: 2, mb: 1 } }}>
      <AutocompleteAsync
        fullWidth
        name="patient"
        onChange={(option) => {
          dispatch(
            setTodayPatientsPatientFilter(
              option?.label && option?.value ? { name: option.label, id: option.value } : null,
            ),
          );
        }}
        value={{ label: patientFilter?.name ?? '', id: patientFilter?.id ?? '' }}
        label={t('filter.patientName')}
        getOptionsUrl="/pm/patients/names?name="
        optionsTransform={(options) => options.map((option) => ({ value: option.id, label: option.name }))}
      />
      <Divider />
      <IsolationFieldsGroup
        isolationFilters={isolationFilters}
        setIsolationFiltersLocalState={setIsolationFiltersLocalState}
        isolationFiltersLocalState={isolationFiltersLocalState}
      />
      <Box
        sx={(theme) => ({
          px: 1,
          py: 1,
          borderTop: `solid 1px ${theme.palette.border.default}`,
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 1,
          zIndex: theme.zIndex.drawer,
        })}
      >
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            data-testid="clearAppointmentsFiltersButton"
            onClick={() => dispatch(clearAllTodayPatientsFilters())}
            variant={'outlined'}
            sx={{ flexGrow: 1, width: 1 }}
          >
            {t('filter.clearAll')}
          </Button>
          <Button
            onClick={() => {
              dispatch(removeDrawer(DrawerType.TodayPatientsFilters));
              dispatch(changeTodayPatientsFilters({ isolations: isolationFiltersLocalState, patient: patientFilter }));
            }}
            variant={'contained'}
            sx={{ flexGrow: 1, width: 1 }}
          >
            {t('filter.show')}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default TodayPatientsDrawerFilters;
