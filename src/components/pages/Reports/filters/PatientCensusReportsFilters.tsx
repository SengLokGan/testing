import { useEffect } from 'react';
import { subDays } from 'date-fns';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import { DatePickerInput } from '@components/DatePickerInput/DatePickerInput';
import { useAppDispatch } from '@hooks/storeHooks';
import Stack from '@mui/material/Stack';
import { Chip } from '@components';
import { ChipColors, ChipVariants, PatientCensusIsolationFilter, PatientCensusStatusFilter } from '@enums';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  clearPatientCensusFilters,
  getPatientCensusReport,
  patientCensusInitialState,
  selectCouldGeneratePatientCensusReports,
  selectPatientCensusFilterErrors,
  selectPatientCensusFilters,
  setCouldGeneratePatientCensusReport,
  setPatientCensusFilters,
  setPatientCensusFiltersError,
} from '@store';
import { validatorMinYearAgo, validatorFutureDate, validatorIsValidDate, validatorNotTodayDate } from '@validators';
import { PatientCensusFilters } from '@types';
import Typography from '@mui/material/Typography';
import { getTenantEndCurrentDay, getTenantYesterdayDate } from '@utils';
import i18n from 'i18next';

export const PatientCensusReportsFilters = () => {
  const { t } = useTranslation('reports');
  const dispatch = useAppDispatch();
  const filters = selectPatientCensusFilters();
  const errors = selectPatientCensusFilterErrors();
  const couldGenerateReports = selectCouldGeneratePatientCensusReports();

  const setDateFilter = (value: Date | null) => {
    const validationCheck = (validationRules: (string | boolean)[]) => {
      const isValid = validationRules.every((rule) => rule === true);
      const errorMessage = !isValid ? validationRules.find((rule) => rule !== true) : '';

      return { isValid, errorMessage };
    };
    if (value) {
      const { isValid, errorMessage } = validationCheck([
        validatorIsValidDate(value),
        validatorMinYearAgo(100, i18n.t(`common:validation.noEarlierThanYearsAgoFromTodayDate`, { years: 100 }))(value),
        validatorNotTodayDate()(value),
        validatorFutureDate()(value),
      ]);
      !isValid
        ? dispatch(setPatientCensusFiltersError({ date: errorMessage as string }))
        : dispatch(setPatientCensusFiltersError({ date: null }));
      dispatch(setPatientCensusFilters({ ...filters, date: value }));
    } else {
      dispatch(setPatientCensusFilters({ ...filters, date: null }));
      dispatch(setPatientCensusFiltersError({ date: null }));
    }
  };

  const onChipClick = (
    filterName: 'statuses' | 'isolations',
    value: PatientCensusIsolationFilter | PatientCensusStatusFilter,
  ) => {
    const isolatedIndex = filters.isolations.findIndex(
      (isolation) => isolation.name === PatientCensusIsolationFilter.Isolated,
    );
    let newFilters: PatientCensusFilters | undefined;
    const commonFiltersChanging = {
      ...filters,
      [filterName]: filters[filterName].map((filter) =>
        filter.name === value ? { ...filter, selected: !filter.selected } : filter,
      ),
    };
    if (value === PatientCensusIsolationFilter.Isolated && filterName === 'isolations') {
      newFilters = {
        ...filters,
        isolations: filters.isolations[isolatedIndex].selected
          ? filters.isolations.map((isolation) =>
              isolation.name !== PatientCensusIsolationFilter.NonInfectious
                ? { ...isolation, selected: false }
                : isolation,
            )
          : filters.isolations.map((isolation) =>
              isolation.name !== PatientCensusIsolationFilter.NonInfectious
                ? { ...isolation, selected: true }
                : isolation,
            ),
      };
    } else if (filterName === 'isolations' && value !== PatientCensusIsolationFilter.Isolated) {
      newFilters = commonFiltersChanging;
      newFilters!.isolations[isolatedIndex] = {
        ...newFilters!.isolations[isolatedIndex],
        selected:
          newFilters!.isolations.filter(
            (isolation) =>
              (isolation.name === PatientCensusIsolationFilter.HepC ||
                isolation.name === PatientCensusIsolationFilter.HepB ||
                isolation.name === PatientCensusIsolationFilter.Hiv) &&
              isolation.selected,
          ).length === 3,
      };
    } else {
      newFilters = commonFiltersChanging;
    }
    if (newFilters) {
      dispatch(setPatientCensusFilters(newFilters));
    }
  };

  const generateReportsHandler = () => {
    const isIsolationFiltersInitial = filters.isolations === patientCensusInitialState.reports.filters.isolations;
    const isStatusesFiltersInitial = filters.statuses === patientCensusInitialState.reports.filters.statuses;
    const selectedAllIsolationFilters = filters.isolations.map((item) => ({ ...item, selected: true }));
    const selectedAllStatusesFilters = filters.statuses.map((item) => ({ ...item, selected: true }));
    const isAllChipsInitial = isIsolationFiltersInitial && isStatusesFiltersInitial;
    dispatch(
      setPatientCensusFilters({
        ...filters,
        date: !filters.date ? getTenantYesterdayDate() : filters.date,
        isolations: isAllChipsInitial ? selectedAllIsolationFilters : filters.isolations,
        statuses: isAllChipsInitial ? selectedAllStatusesFilters : filters.statuses,
      }),
    );
    dispatch(getPatientCensusReport({ currentPage: 0 }));
  };

  useEffect(() => {
    if (!filters.date) {
      dispatch(setCouldGeneratePatientCensusReport(true));
    }
  }, [filters]);

  return (
    <Stack
      direction="column"
      sx={{
        px: 3,
        position: 'sticky',
        left: 0,
      }}
      mb={3}
    >
      <Box sx={{ width: ({ spacing }) => spacing(56), mb: 3 }}>
        <DatePickerInput
          label={t('filters.date')}
          value={filters.date}
          onChange={setDateFilter}
          name="PatientCensusReportDate"
          error={errors.date}
          maxDate={subDays(getTenantEndCurrentDay(), 1)}
          fullWidth
        />
      </Box>
      <Stack direction="column" spacing={2} mb={2}>
        <Typography variant="headerS">{t('filters.infectionCategory')}</Typography>
        <Stack direction="row" flexWrap="wrap">
          {filters.isolations.map(({ name, selected, badge }) => (
            <Chip
              key={name}
              dataTestId={`${name}IsolationFilterChip`}
              label={t(`filters.${name}`)}
              badge={badge}
              variant={selected ? ChipVariants.fill : ChipVariants.outlined}
              color={ChipColors.blue}
              onClick={() => onChipClick('isolations', name)}
              LeftIcon={selected ? CheckIcon : null}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Stack>
        <Typography variant="headerS">{t('filters.therapyCategory')}</Typography>
        <Stack direction="row" flexWrap="wrap">
          {filters.statuses.map(({ name, selected, badge }) => (
            <Chip
              key={name}
              dataTestId={`${name}IsolationFilterChip`}
              label={t(`filters.${name}`)}
              badge={badge}
              variant={selected ? ChipVariants.fill : ChipVariants.outlined}
              color={ChipColors.blue}
              onClick={() => onChipClick('statuses', name)}
              LeftIcon={selected ? CheckIcon : null}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        {couldGenerateReports && (
          <Button
            data-testid="generatePatientCensusReportsButtonId"
            onClick={generateReportsHandler}
            disabled={!!errors.date}
            sx={{ alignSelf: 'flex-start', textTransform: 'unset' }}
            variant="contained"
          >
            {t('generateReports')}
          </Button>
        )}
        {filters !== patientCensusInitialState.reports.filters && (
          <Button
            data-testid="clearPatientCensusReportsButtonId"
            onClick={() => dispatch(clearPatientCensusFilters())}
            sx={{ alignSelf: 'flex-start', textTransform: 'unset' }}
            variant="outlined"
          >
            {t('clearFilters')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
