import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GlobalAddButton } from '@components';
import {
  changePatientsOverviewFilters,
  clearPatientsOverviewChipsFilters,
  getFilteredPatientsOverviewList,
  selectOverviewPatientsIsolatorFilters,
  selectOverviewPatientsPagination,
  selectOverviewPatientsPatientFilter,
  selectPatientId,
  selectPatientSaveDataSuccess,
  selectHasActiveDrawers,
} from '@store';
import { MainContentContainer } from '@containers';
import { useTranslation } from 'react-i18next';
import {
  PatientsTable,
  PatientsGrid,
  PatientsOverviewFiltersBlock,
  PatientsFilterChips,
} from '@components/pages/PatientsOverview';
import { useAppDispatch } from '@hooks/storeHooks';
import { UserPermissions, PatientListViewMode } from '@enums';
import { RegisterPatientModal } from '@components/pages/TodayPatients';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@constants';
import { PermissionGuard } from '@guards';

export const PatientsOverview = () => {
  const { t } = useTranslation('patient');
  const dispatch = useAppDispatch();
  const pagination = selectOverviewPatientsPagination();
  const [viewMode, setViewMode] = useState<PatientListViewMode>(PatientListViewMode.Table);
  const patientId = selectPatientId();
  const [isRegisterPatientModalOpen, setIsRegisterPatientModalOpen] = useState(false);
  const saveSuccess = selectPatientSaveDataSuccess();
  const hasActiveDrawers = selectHasActiveDrawers();
  const allIsolatorFilters = selectOverviewPatientsIsolatorFilters();
  const patientNameFilter = selectOverviewPatientsPatientFilter();

  const handleCloseModal = () => {
    setIsRegisterPatientModalOpen(false);
  };

  const changeViewMode = () => {
    if (viewMode === PatientListViewMode.Table) {
      setViewMode(PatientListViewMode.Grid);
    } else {
      setViewMode(PatientListViewMode.Table);
    }
  };

  const onChipFilterClick = (name: string, filterType: 'isolations' | 'patient') => {
    dispatch(
      filterType === 'isolations'
        ? changePatientsOverviewFilters({
            isolations: {
              items: allIsolatorFilters.items.map((item) => {
                return name === item.name ? { ...item, checked: !item.checked } : item;
              }),
            },
          })
        : changePatientsOverviewFilters({
            patient: null,
          }),
    );
  };

  useEffect(() => {
    dispatch(getFilteredPatientsOverviewList());
  }, []);

  if (saveSuccess && patientId) {
    return <Navigate to={`/${ROUTES.patientsOverview}/${patientId}`} />;
  }

  return (
    <MainContentContainer
      fullHeight
      sx={(theme) => ({
        bgcolor: theme.palette.surface.default,
        width: 1,
        overflow: 'auto',
      })}
    >
      {isRegisterPatientModalOpen && (
        <RegisterPatientModal isOpen={isRegisterPatientModalOpen} onClose={handleCloseModal} />
      )}
      {!hasActiveDrawers && (
        <PermissionGuard permissions={[UserPermissions.PatientAdd]}>
          <GlobalAddButton onClick={() => setIsRegisterPatientModalOpen(true)} />
        </PermissionGuard>
      )}
      {viewMode === PatientListViewMode.Table ? (
        <Stack direction="column" sx={{ width: 1, p: 0 }} spacing={3}>
          <Stack direction="column" sx={{ px: 3, mt: 2 }}>
            <Typography variant="headerL" sx={{ mb: 2 }}>
              {t('patientList')}
            </Typography>
            <PatientsOverviewFiltersBlock changeViewMode={changeViewMode} />
          </Stack>
          <PatientsFilterChips
            allIsolatorFilters={allIsolatorFilters}
            patientNameFilter={patientNameFilter}
            onChipFilterClick={onChipFilterClick}
            onClearAllClick={() => dispatch(clearPatientsOverviewChipsFilters())}
            sx={{ px: 3 }}
          />
          <PatientsTable pagination={pagination} />
        </Stack>
      ) : (
        <Stack spacing={3} direction="column" sx={{ width: 1 }}>
          <Box sx={{ mt: 2, mx: 3 }}>
            <Typography variant="headerL" sx={{ mb: 2 }}>
              {t('patientList')}
            </Typography>
            <PatientsOverviewFiltersBlock isGridView changeViewMode={changeViewMode} />
          </Box>
          <PatientsFilterChips
            allIsolatorFilters={allIsolatorFilters}
            patientNameFilter={patientNameFilter}
            onChipFilterClick={onChipFilterClick}
            onClearAllClick={() => dispatch(clearPatientsOverviewChipsFilters())}
            sx={{ px: 3 }}
          />
          <PatientsGrid pagination={pagination} />
        </Stack>
      )}
    </MainContentContainer>
  );
};
