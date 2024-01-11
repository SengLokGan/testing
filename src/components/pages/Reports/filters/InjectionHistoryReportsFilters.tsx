import { useTranslation } from 'react-i18next';
import { subDays } from 'date-fns';
import i18n from 'i18next';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getTenantEndCurrentDay } from '@utils';
import { useAppDispatch, useShiftOptionsList } from '@hooks';
import {
  clearInjectionReportsFilters,
  getInjectionReport,
  injectionReportsInitialState,
  selectCouldGenerateInjectionReport,
  selectInjectionReportFilters,
  selectInjectionReportFiltersError,
  setInjectionReportFilters,
  setInjectionReportFiltersError,
} from '@store/slices';
import {
  validatorAutocompletePattern,
  validatorFutureDate,
  validatorIsValidDate,
  validatorLatinLettersNumbersAllSpecialCharacters,
  validatorMaxLength,
  validatorMinDate,
  validatorMinLength,
  validatorMinYearAgo,
  validatorNotTodayDate,
  validatorTimeNotLaterThan,
} from '@validators';
import { DatePickerInput } from '@components/DatePickerInput/DatePickerInput';
import { AutocompleteAsync, AutocompleteMultiple } from '@components/autocompletes';
import Grid from '@mui/material/Grid';
import { InputText } from '@components/InputText/InputText';

export const InjectionHistoryReportsFilters = () => {
  const { t } = useTranslation('reports');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const filters = selectInjectionReportFilters();
  const errors = selectInjectionReportFiltersError();
  const couldGenerateReports = selectCouldGenerateInjectionReport();
  const { shiftOptions } = useShiftOptionsList();
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
        ? dispatch(setInjectionReportFiltersError({ ...errors, [name]: errorMessage as string }))
        : dispatch(setInjectionReportFiltersError({ ...errors, toDate: null, fromDate: null }));
      dispatch(setInjectionReportFilters({ ...filters, [name]: value }));
    } else {
      dispatch(setInjectionReportFilters({ ...filters, [name]: null }));
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
        ? dispatch(setInjectionReportFiltersError({ ...errors, patient: errorMessage as string }))
        : dispatch(setInjectionReportFiltersError({ ...errors, patient: null }));
      dispatch(setInjectionReportFilters({ ...filters, patient: value }));
    } else {
      dispatch(setInjectionReportFilters({ ...filters, patient: null }));
      dispatch(setInjectionReportFiltersError({ ...errors, patient: null }));
    }
  };

  return (
    <Stack
      direction="column"
      spacing={3}
      sx={{
        px: 3,
        py: 2,
        position: 'sticky',
        left: 0,
      }}
    >
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={6} md={3}>
          <DatePickerInput
            label={t('filters.fromDate')}
            value={filters.fromDate}
            onChange={(value) => setDateFilter('fromDate', value)}
            name="fromDate"
            error={errors.fromDate}
            maxDate={subDays(getTenantEndCurrentDay(), 1)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <DatePickerInput
            label={t('filters.toDate')}
            value={filters.toDate}
            onChange={(value) => setDateFilter('toDate', value)}
            name="toDate"
            error={errors.toDate}
            maxDate={subDays(getTenantEndCurrentDay(), 1)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <InputText name="injection" label={t('filters.injection')} isDisabled onChange={() => {}} value="" />
        </Grid>
        <Grid item xs={6} md={3}>
          <AutocompleteAsync
            name="patient"
            label={t('filters.patientName')}
            onChange={(value) => setPatientFilter(value)}
            value={{ label: filters.patient?.label ?? '', id: filters.patient?.id ?? '' }}
            getOptionsUrl="/pm/patients/names?name="
            optionsTransform={(options) => options.map((option) => ({ id: option.id, label: option.name }))}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <AutocompleteMultiple
            placeholder={t('filters.shift')}
            options={shiftOptions}
            value={filters.shifts}
            onChange={(e, value) => dispatch(setInjectionReportFilters({ ...filters, shifts: value }))}
            fullWidth
            name="shifts"
          />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2}>
        {couldGenerateReports && (
          <Button
            data-testid="generateInjectionHistoryReportsButtonId"
            onClick={() => dispatch(getInjectionReport({ currentPage: 0 }))}
            disabled={!!errors.fromDate && !!errors.toDate}
            sx={{ alignSelf: 'flex-start', textTransform: 'unset' }}
            variant="contained"
            size="large"
          >
            {t('generateReports')}
          </Button>
        )}
        {filters !== injectionReportsInitialState.reports.filters && (
          <Button
            data-testid="clearInjectionHistoryReportsButtonId"
            onClick={() => dispatch(clearInjectionReportsFilters())}
            sx={{ alignSelf: 'flex-start', textTransform: 'unset' }}
            variant="outlined"
            size="large"
          >
            {t('clearFilters')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
