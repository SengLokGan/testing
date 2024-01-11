import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { subDays } from 'date-fns';
import CheckIcon from '@mui/icons-material/Check';
import { DatePickerInput, Chip } from '@components';
import {
  clearVascularAccessFilters,
  getVascularAccessReports,
  selectCouldGenerateVascularAccessReport,
  selectVascularAccessFilterErrors,
  selectVascularAccessFilters,
  setCouldGenerateVascularAccessReport,
  setVascularAccessFilterErrors,
  setVascularAccessFilters,
  vascularAccessInitialState,
} from '@store';
import { useAppDispatch } from '@hooks/storeHooks';
import Stack from '@mui/material/Stack';
import { ChipColors, ChipVariants, ChipsCountersSumNames, VascularAccessFilterNames } from '@enums';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { validatorNotTodayDate, validatorMinYearAgo, validatorIsValidDate, validatorFutureDate } from '@validators';
import i18n from 'i18next';
import { getTenantEndCurrentDay, getTenantYesterdayDate } from '@utils';

export const VascularAccessReportsFilters = () => {
  const { t } = useTranslation('vascularAccessReports');
  const { t: tReports } = useTranslation('reports');
  const dispatch = useAppDispatch();
  const filters = selectVascularAccessFilters();
  const errors = selectVascularAccessFilterErrors();
  const couldGenerateReports = selectCouldGenerateVascularAccessReport();

  const setDateFilter = (value) => {
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
        ? dispatch(setVascularAccessFilterErrors({ date: errorMessage as string }))
        : dispatch(setVascularAccessFilterErrors({ date: null }));
      dispatch(setVascularAccessFilters({ ...filters, date: value }));
    } else {
      dispatch(setVascularAccessFilters({ ...filters, date: null }));
      dispatch(setVascularAccessFilterErrors({ date: null }));
    }
  };

  const onChipClick = (filterName, value) => {
    const setOpposite = (selectedValue: boolean) => {
      return !selectedValue;
    };
    const setSelectedChips = (chipsSumName: ChipsCountersSumNames) => {
      if (value === chipsSumName) {
        const variantToSet = setOpposite(filters[filterName].find((item) => item.name === value)!.selected);
        dispatch(
          setVascularAccessFilters({
            ...filters,
            [filterName]: filters[filterName].map((filter) => {
              return {
                ...filter,
                selected: variantToSet,
              };
            }),
          }),
        );
      } else {
        dispatch(
          setVascularAccessFilters({
            ...filters,
            [filterName]: filters[filterName].map((filter) => {
              const { name, selected } = filter;
              const chipsWithoutSumChip = filters[filterName].filter((chip) => chip.name !== chipsSumName);
              const alreadySelected = chipsWithoutSumChip.filter((chip) => chip.selected);
              const shouldSelectAll =
                chipsWithoutSumChip.length - alreadySelected.length === 1 &&
                !alreadySelected.find((chip) => chip.name === value);
              if (shouldSelectAll) {
                return {
                  ...filter,
                  selected: true,
                };
              }
              if (name === chipsSumName) {
                return {
                  ...filter,
                  selected: false,
                };
              }
              if (value === name) {
                return {
                  ...filter,
                  selected: setOpposite(selected),
                };
              }
              return filter;
            }),
          }),
        );
      }
    };

    filterName === VascularAccessFilterNames.accessTypes
      ? setSelectedChips(ChipsCountersSumNames.vascular)
      : setSelectedChips(ChipsCountersSumNames.cvc);
  };

  const generateReportsHandler = () => {
    const isAccessTypesChipsInitial = filters.accessTypes === vascularAccessInitialState.reports.filters.accessTypes;
    const isCategoriesChipsInitial = filters.categories === vascularAccessInitialState.reports.filters.categories;
    const selectedAllAccessTypesFilters = filters.accessTypes.map((item) => ({ ...item, selected: true }));
    const selectedAllCategoriesFilters = filters.categories.map((item) => ({ ...item, selected: true }));
    const isAllChipsInitial = isAccessTypesChipsInitial && isCategoriesChipsInitial;
    dispatch(
      setVascularAccessFilters({
        ...filters,
        date: !filters.date ? getTenantYesterdayDate() : filters.date,
        accessTypes: isAllChipsInitial ? selectedAllAccessTypesFilters : filters.accessTypes,
        categories: isAllChipsInitial ? selectedAllCategoriesFilters : filters.categories,
      }),
    );
    dispatch(getVascularAccessReports({ currentPage: 0 }));
  };

  useEffect(() => {
    if (!filters.date) {
      dispatch(setCouldGenerateVascularAccessReport(true));
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
      <Box sx={{ width: ({ spacing }) => spacing(56) }} mb={3}>
        <DatePickerInput
          label={t('filters.date')}
          value={filters.date}
          onChange={setDateFilter}
          name={VascularAccessFilterNames.date}
          error={errors.date}
          maxDate={subDays(getTenantEndCurrentDay(), 1)}
          fullWidth
        />
      </Box>
      <Stack direction="row" flexWrap="wrap" mb={2}>
        <Stack direction="row" pb={1}>
          {filters.accessTypes.map(({ name, selected, badge }) => (
            <Chip
              key={name}
              dataTestId={`${name}Id`}
              label={t(`filters.${name}`)}
              badge={badge}
              variant={selected ? ChipVariants.fill : ChipVariants.outlined}
              color={ChipColors.blue}
              onClick={() => onChipClick(VascularAccessFilterNames.accessTypes, name)}
              LeftIcon={selected ? CheckIcon : null}
              sx={{ mr: 1 }}
            />
          ))}
        </Stack>
        <Stack direction="row" pb={1}>
          {filters.categories.map(({ name, selected, badge }) => (
            <Chip
              key={name}
              dataTestId={`${name}Id`}
              label={t(`filters.${name}`)}
              badge={badge}
              variant={selected ? ChipVariants.fill : ChipVariants.outlined}
              color={ChipColors.pink}
              onClick={() => onChipClick(VascularAccessFilterNames.categories, name)}
              LeftIcon={selected ? CheckIcon : null}
              sx={{ mr: 1 }}
            />
          ))}
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        {couldGenerateReports && (
          <Button
            data-testid="generateVascularAccessReportsButtonId"
            onClick={generateReportsHandler}
            sx={{ alignSelf: 'flex-start', textTransform: 'unset' }}
            variant="contained"
            disabled={!!errors.date}
          >
            {tReports('generateReports')}
          </Button>
        )}
        {filters !== vascularAccessInitialState.reports.filters && (
          <Button
            data-testid="clearVascularAccessReportsButtonId"
            onClick={() => dispatch(clearVascularAccessFilters())}
            sx={{ alignSelf: 'flex-start', textTransform: 'unset' }}
            variant="outlined"
          >
            {tReports('clearFilters')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
