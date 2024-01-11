import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { subDays } from 'date-fns';
import i18n from 'i18next';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { getTenantEndCurrentDay } from '@utils';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  clearMortalityReports,
  getMortalityReport,
  mortalityReportsInitialState,
  selectCouldGenerateMortalityReport,
  selectMortalityReportFilters,
  selectMortalityReportFiltersError,
  selectMortalityReports,
  setMortalityReportFilters,
  setMortalityReportFiltersError,
} from '@store/slices';
import {
  validatorIsValidDate,
  validatorNotTodayDate,
  validatorFutureDate,
  validatorMinYearAgo,
  validatorAutocompletePattern,
  validatorMinLength,
  validatorMaxLength,
  validatorTimeNotLaterThan,
  validatorMinDate,
  validatorLatinLettersNumbersAllSpecialCharacters,
} from '@validators';
import { DatePickerInput } from '@components/DatePickerInput/DatePickerInput';
import { AutocompleteAsync } from '@components/autocompletes';

export const MortalityReportsFilters = () => {
  const { t } = useTranslation('reports');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const filters = selectMortalityReportFilters();
  const reports = selectMortalityReports();
  const errors = selectMortalityReportFiltersError();
  const couldGenerateReports = selectCouldGenerateMortalityReport();

  const validationCheck = (validationRules: (string | boolean)[]) => {
    const isValid = validationRules.every((rule) => rule === true);
    const errorMessage = !isValid ? validationRules.find((rule) => rule !== true) : '';

    return { isValid, errorMessage };
  };

  const setDateFilter = (name: 'fromDate' | 'toDate', value: Date | null) => {
    if (value) {
      const validationRulesToCheck = [
        validatorIsValidDate(value),
        validatorMinYearAgo(100, i18n.t(`common:validation.noEarlierThanYearsAgoFromTodayDate`, { years: 100 }))(value),
        validatorNotTodayDate()(value),
        validatorFutureDate()(value),
      ];
      const fromDateUniqValidationRules = [
        validatorTimeNotLaterThan(
          filters.toDate,
          tCommon(`validation.enteredDateShouldNotBeLaterThan`, { date: t('filters.toDate') }),
        )(name === 'fromDate' ? value : filters.fromDate),
      ];
      const toDateUniqValidationRules = [
        validatorMinDate(
          filters.fromDate,
          tCommon(`validation.enteredDateShouldNotBeEarlyThan`, { date: t('filters.fromDate') }),
        )(name === 'toDate' ? value : filters.toDate),
      ];

      if (name === 'fromDate' && filters.toDate) validationRulesToCheck.push(...fromDateUniqValidationRules);
      if (name === 'toDate' && filters.fromDate) validationRulesToCheck.push(...toDateUniqValidationRules);

      const { isValid, errorMessage } = validationCheck(validationRulesToCheck);

      !isValid
        ? dispatch(setMortalityReportFiltersError({ ...errors, [name]: errorMessage as string }))
        : dispatch(setMortalityReportFiltersError({ ...errors, toDate: null, fromDate: null }));
      dispatch(setMortalityReportFilters({ ...filters, [name]: value }));
    } else {
      dispatch(setMortalityReportFilters({ ...filters, [name]: null }));
    }
  };

  const setPatientFilter = (value: { id: number; label: string } | null) => {
    if (value) {
      const { isValid, errorMessage } = validationCheck([
        validatorAutocompletePattern(validatorLatinLettersNumbersAllSpecialCharacters())(value),
        validatorAutocompletePattern(validatorMinLength(1, 256))(value),
        validatorAutocompletePattern(validatorMaxLength(1, 256))(value),
      ]);

      !isValid
        ? dispatch(setMortalityReportFiltersError({ ...errors, patient: errorMessage as string }))
        : dispatch(setMortalityReportFiltersError({ ...errors, patient: null }));
      dispatch(setMortalityReportFilters({ ...filters, patient: value }));
    } else {
      dispatch(setMortalityReportFilters({ ...filters, patient: null }));
      dispatch(setMortalityReportFiltersError({ ...errors, patient: null }));
    }
  };

  useEffect(() => {
    if (reports.length && !filters.fromDate) {
      const deathDates = reports.filter((report) => report.deathDate).map((report) => new Date(report.deathDate));
      const earliestDate = new Date(Math.min(...deathDates));
      setDateFilter('fromDate', new Date(earliestDate.setHours(0, 0, 0, 0)));
    }
  }, [reports]);

  return (
    <Stack
      direction="column"
      sx={{
        px: 3,
        position: 'sticky',
        left: 0,
      }}
      mb={2}
      spacing={3}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <DatePickerInput
            label={t('filters.fromDate')}
            value={filters.fromDate}
            onChange={(value) => setDateFilter('fromDate', value)}
            name="fromDate"
            error={errors?.fromDate}
            maxDate={subDays(getTenantEndCurrentDay(), 1)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DatePickerInput
            label={t('filters.toDate')}
            value={filters.toDate}
            onChange={(value) => setDateFilter('toDate', value)}
            name="toDate"
            error={errors?.toDate}
            maxDate={subDays(getTenantEndCurrentDay(), 1)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AutocompleteAsync
            name="patient"
            label={t('filters.patientName')}
            onChange={(value) => setPatientFilter(value)}
            value={{ label: filters.patient?.label ?? '', id: filters.patient?.id ?? '' }}
            getOptionsUrl="/pm/patients/names?name="
            optionsTransform={(options) => options.map((option) => ({ id: option.id, label: option.name }))}
          />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2}>
        {couldGenerateReports && (
          <Button
            data-testid="generatePatientCensusReportsButtonId"
            onClick={() => dispatch(getMortalityReport({ currentPage: 0 }))}
            disabled={!!errors.fromDate && !!errors.toDate}
            sx={{ alignSelf: 'flex-start', textTransform: 'unset' }}
            variant="contained"
          >
            {t('generateReports')}
          </Button>
        )}
        {filters !== mortalityReportsInitialState.reports.filters && (
          <Button
            data-testid="clearPatientCensusReportsButtonId"
            onClick={() => dispatch(clearMortalityReports())}
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
