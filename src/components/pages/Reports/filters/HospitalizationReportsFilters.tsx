import { useTranslation } from 'react-i18next';
import { subDays } from 'date-fns';
import i18n from 'i18next';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  clearHospitalizationReports,
  getHospitalizationReports,
  hospitalizationReportsInitialState,
  selectCouldGenerateHospitalizationReportsFilters,
  selectHospitalizationReportsFilters,
  selectHospitalizationReportsFiltersErrors,
  setHospitalizationFilterErrors,
  setHospitalizationFilters,
} from '@store/slices';
import { DatePickerInput, AutocompleteAsync, Chip } from '@components';
import { getTenantEndCurrentDay } from '@utils';
import {
  validatorIsValidDate,
  validatorMinYearAgo,
  validatorNotTodayDate,
  validatorFutureDate,
  validatorAutocompletePattern,
  validatorLatinLettersNumbersAllSpecialCharacters,
  validatorMinLength,
  validatorMaxLength,
} from '@validators';
import { ChipColors, ChipVariants, PatientHospitalizationReason } from '@enums';
import Grid from '@mui/material/Grid';

export const HospitalizationReportsFilters = () => {
  const { t } = useTranslation('reports');
  const dispatch = useAppDispatch();
  const filters = selectHospitalizationReportsFilters();
  const errors = selectHospitalizationReportsFiltersErrors();
  const couldGenerateReport = selectCouldGenerateHospitalizationReportsFilters();

  const validationCheck = (validationRules: (string | boolean)[]) => {
    const isValid = validationRules.every((rule) => rule === true);
    const errorMessage = !isValid ? validationRules.find((rule) => rule !== true) : '';

    return { isValid, errorMessage };
  };

  const setDateFilter = (value: Date | null) => {
    if (value) {
      const { isValid, errorMessage } = validationCheck([
        validatorIsValidDate(value),
        validatorMinYearAgo(100, i18n.t(`common:validation.noEarlierThanYearsAgoFromTodayDate`, { years: 100 }))(value),
        validatorNotTodayDate()(value),
        validatorFutureDate()(value),
      ]);
      !isValid
        ? dispatch(setHospitalizationFilterErrors({ ...errors, date: errorMessage as string }))
        : dispatch(setHospitalizationFilterErrors({ ...errors, date: null }));
      dispatch(setHospitalizationFilters({ ...filters, date: value }));
    } else {
      dispatch(setHospitalizationFilters({ ...filters, date: null }));
      dispatch(setHospitalizationFilterErrors({ ...errors, date: null }));
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
        ? dispatch(setHospitalizationFilterErrors({ ...errors, patient: errorMessage as string }))
        : dispatch(setHospitalizationFilterErrors({ ...errors, patient: null }));
      dispatch(setHospitalizationFilters({ ...filters, patient: value }));
    } else {
      dispatch(setHospitalizationFilters({ ...filters, patient: null }));
      dispatch(setHospitalizationFilterErrors({ ...errors, patient: null }));
    }
  };

  const setChipFilter = (value: PatientHospitalizationReason) => {
    dispatch(
      setHospitalizationFilters({
        ...filters,
        reasons: filters.reasons.map((item) => {
          return item.name === value ? { ...item, selected: !item.selected } : item;
        }),
      }),
    );
  };

  const generateReportHandler = () => {
    const isSomeChipSelected = filters.reasons.some((chip) => chip.selected);
    !isSomeChipSelected &&
      dispatch(
        setHospitalizationFilters({
          ...filters,
          reasons: filters.reasons.map((chip) => ({ ...chip, selected: true })),
        }),
      );
    dispatch(getHospitalizationReports({ currentPage: 0 }));
  };

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
            label={t('filters.date')}
            value={filters.date}
            onChange={setDateFilter}
            name="date"
            error={errors.date}
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
      <Stack direction="column" spacing={2}>
        <Typography variant="headerS">{t('filters.hospitalizationReasons')}</Typography>
        <Stack direction="row" flexWrap="wrap">
          {filters.reasons.map(({ name, selected, badge }) => (
            <Chip
              key={name}
              dataTestId={`${name}HospitalizationReasonFilterChip`}
              label={t(`filters.${name}`)}
              badge={badge}
              variant={selected ? ChipVariants.fill : ChipVariants.outlined}
              color={ChipColors.blue}
              onClick={() => setChipFilter(name)}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        {couldGenerateReport && (
          <Button
            data-testid="generatePatientCensusReportsButtonId"
            onClick={generateReportHandler}
            disabled={!!errors.date}
            sx={{ alignSelf: 'flex-start', textTransform: 'unset' }}
            variant="contained"
          >
            {t('generateReports')}
          </Button>
        )}
        {filters !== hospitalizationReportsInitialState.reports.filters && (
          <Button
            data-testid="clearPatientCensusReportsButtonId"
            onClick={() => dispatch(clearHospitalizationReports())}
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
