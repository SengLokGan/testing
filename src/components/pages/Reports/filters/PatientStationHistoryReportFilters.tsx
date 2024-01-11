import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks';
import { subDays } from 'date-fns';
import { isEqual } from 'lodash';
import i18n from 'i18next';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DatePickerInput, AutocompleteAsync, AutocompleteBasic, SelectOptionProps, TimePickerInput } from '@components';
import {
  addSnack,
  clearPatientStationHistoryReportsFilters,
  getPatientStationHistoryReport,
  patientStationHistoryInitialState,
  selectCouldGeneratePatientStationHistoryReport,
  selectPatientStationHistoryReportFilters,
  selectPatientStationHistoryReportFiltersError,
  setPatientStationHistoryReportFilters,
  setPatientStationHistoryReportFiltersError,
} from '@store/slices';
import {
  validatorIsValidDate,
  validatorMinYearAgo,
  validatorNotTodayDate,
  validatorFutureDate,
  validatorTimeNotLaterThan,
  validatorMinDate,
  validatorAutocompletePattern,
  validatorLatinLettersNumbersAllSpecialCharacters,
  validatorMinLength,
  validatorMaxLength,
  validatorFutureTime,
  validatorPastTime,
} from '@validators';
import { API, getTenantEndCurrentDay } from '@utils';
import { useEffect, useState } from 'react';
import { SnackType } from '@enums';

export const PatientStationHistoryReportFilters = () => {
  const { t } = useTranslation('reports');
  const { t: tCommon } = useTranslation('common');
  const dispatch = useAppDispatch();
  const filters = selectPatientStationHistoryReportFilters();
  const errors = selectPatientStationHistoryReportFiltersError();
  const couldGenerateReport = selectCouldGeneratePatientStationHistoryReport();
  const [locationsOptions, setLocationsOptions] = useState<SelectOptionProps[]>([]);
  const [locationsOptionsLoading, setLocationsOptionsLoading] = useState(false);
  const [showClearFiltersButton, setShowClearFiltersButton] = useState(false);

  useEffect(() => {
    if (!isEqual(filters, patientStationHistoryInitialState.reports.filters)) {
      setShowClearFiltersButton(true);
    } else {
      setShowClearFiltersButton(false);
    }
  }, [filters]);

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
        ? dispatch(setPatientStationHistoryReportFiltersError({ ...errors, [name]: errorMessage as string }))
        : dispatch(setPatientStationHistoryReportFiltersError({ ...errors, toDate: null, fromDate: null }));
      dispatch(setPatientStationHistoryReportFilters({ ...filters, [name]: value }));
    } else {
      dispatch(setPatientStationHistoryReportFilters({ ...filters, [name]: null }));
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
        ? dispatch(setPatientStationHistoryReportFiltersError({ ...errors, patient: errorMessage as string }))
        : dispatch(setPatientStationHistoryReportFiltersError({ ...errors, patient: null }));
      dispatch(setPatientStationHistoryReportFilters({ ...filters, patient: value }));
    } else {
      dispatch(setPatientStationHistoryReportFilters({ ...filters, patient: null }));
      dispatch(setPatientStationHistoryReportFiltersError({ ...errors, patient: null }));
    }
  };

  const setTimeFilter = (value: Date | null, name: 'startTime' | 'endTime') => {
    if (value) {
      const validationRules = [validatorIsValidDate(value)];
      const startTimeUniqValidationRules = [
        validatorFutureTime(
          filters.endTime,
          tCommon('validation.timeShouldNotBeMoreThan', { time: t('filters.endTime') }),
        )(value),
      ];
      const endTimeUniqValidationRules = [
        validatorPastTime(
          filters.startTime,
          tCommon('validation.timeShouldNotBeLessThan', { time: t('filters.startTime') }),
        )(value),
      ];

      if (name === 'startTime' && filters.endTime) validationRules.push(...startTimeUniqValidationRules);
      if (name === 'endTime' && filters.startTime) validationRules.push(...endTimeUniqValidationRules);

      const { isValid, errorMessage } = validationCheck(validationRules);
      !isValid
        ? dispatch(setPatientStationHistoryReportFiltersError({ ...errors, [name]: errorMessage as string }))
        : dispatch(setPatientStationHistoryReportFiltersError({ ...errors, startTime: null, endTime: null }));
      dispatch(setPatientStationHistoryReportFilters({ ...filters, [name]: value }));
    } else {
      dispatch(setPatientStationHistoryReportFilters({ ...filters, [name]: null }));
      dispatch(setPatientStationHistoryReportFiltersError({ ...errors, [name]: null }));
    }
  };

  useEffect(() => {
    setLocationsOptionsLoading(true);
    API.get('pm/locations')
      .then(({ data }) => {
        setLocationsOptions(data.map((item) => ({ value: item.id, label: item.name })));
      })
      .catch(() => dispatch(addSnack({ type: SnackType.Error, message: tCommon('systemError') })))
      .finally(() => {
        setLocationsOptionsLoading(false);
      });
  }, []);

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
          <AutocompleteAsync
            name="patient"
            label={t('filters.patientName')}
            onChange={(value) => setPatientFilter(value)}
            value={filters.patient ? { label: filters.patient.label, id: filters.patient.id } : null}
            getOptionsUrl="/pm/patients/names?name="
            optionsTransform={(options) => options.map((option) => ({ id: option.id, label: option.name }))}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <AutocompleteBasic
            name="locations"
            label={t('filters.bay')}
            options={locationsOptions}
            loading={locationsOptionsLoading}
            value={filters.locations}
            onChange={({ value, label }) => {
              dispatch(
                setPatientStationHistoryReportFilters({
                  ...filters,
                  locations: { value, label },
                }),
              );
            }}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TimePickerInput
            label={t('filters.startTime')}
            value={filters.startTime}
            onChange={(value) => {
              setTimeFilter(value, 'startTime');
            }}
            name="startTime"
            error={errors.startTime}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TimePickerInput
            label={t('filters.endTime')}
            value={filters.endTime}
            onChange={(value) => {
              setTimeFilter(value, 'endTime');
            }}
            name="endTime"
            error={errors.endTime}
          />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2}>
        {couldGenerateReport && (
          <Button
            data-testid="generateInjectionHistoryReportsButtonId"
            onClick={() => dispatch(getPatientStationHistoryReport())}
            disabled={!!errors.fromDate && !!errors.toDate}
            sx={{ alignSelf: 'flex-start', textTransform: 'unset' }}
            variant="contained"
            size="large"
          >
            {t('generateReports')}
          </Button>
        )}
        {showClearFiltersButton && (
          <Button
            data-testid="clearInjectionHistoryReportsButtonId"
            onClick={() => dispatch(clearPatientStationHistoryReportsFilters())}
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
