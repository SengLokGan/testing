import { DatePickerInput } from '@components/DatePickerInput/DatePickerInput';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import {
  clearNoteTypeFilters,
  selectClinicalNotesFilters,
  selectClinicalNotesFiltersError,
  setClinicalNotesFilters,
  setClinicalNotesFiltersError,
} from '@store';
import { useAppDispatch } from '@hooks/storeHooks';
import { checkIsDataValidToPeriod, getTenantEndCurrentDay } from '@utils';
import { Chip } from '@components/Chip/Chip';
import { ChipColors, ChipVariants } from '@enums/components';
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '@src/styles';
import { ClinicalNoteTypes, CustomClinicalNoteTypes } from '@enums/pages';

export const ClinicalNotesFilters = () => {
  const { t } = useTranslation('clinicalNotes');
  const dispatch = useAppDispatch();
  const filters = selectClinicalNotesFilters();
  const errors = selectClinicalNotesFiltersError();
  const selectedFiltersCount = filters ? filters.noteTypes.filter((item) => item.selected).length : 0;

  const setFilter = (value, name) => dispatch(setClinicalNotesFilters({ [name]: value }));

  const setFilterFrom = (value) => {
    const errorFrom = checkIsDataValidToPeriod(value, new Date('2022-12-01'));
    const errorTo = checkIsDataValidToPeriod(filters.to, value);
    dispatch(setClinicalNotesFiltersError({ from: errorFrom, to: errorTo }));
    setFilter(value, 'from');
  };

  const setFilterTo = (value) => {
    const errorFrom = checkIsDataValidToPeriod(filters.from, new Date('2022-12-01'));
    const errorTo = checkIsDataValidToPeriod(value, filters.from || new Date('2022-12-01'));
    dispatch(setClinicalNotesFiltersError({ from: errorFrom, to: errorTo }));
    setFilter(value, 'to');
  };

  const setChipFilter = (value) => {
    dispatch(
      setClinicalNotesFilters({
        ...filters,
        noteTypes: filters.noteTypes.map((filterItem) => {
          const { name, selected } = filterItem;
          if (value === name) {
            return {
              ...filterItem,
              selected: !selected,
            };
          }
          return filterItem;
        }),
      }),
    );
  };

  const chipStyles = { mr: 1, mb: 1, flexGrow: 1, whiteSpace: 'nowrap' };

  return (
    <Stack px={3} py={1.5} direction="column" spacing={2}>
      <Stack direction="row" spacing={2}>
        <DatePickerInput
          label={t('filters.fromDate')}
          value={filters.from}
          onChange={setFilterFrom}
          name="from"
          error={errors.from}
          maxDate={getTenantEndCurrentDay()}
        />
        <DatePickerInput
          label={t('filters.toDate')}
          value={filters.to}
          onChange={setFilterTo}
          name="to"
          error={errors.to}
          maxDate={getTenantEndCurrentDay()}
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-start" pb={1} sx={{ overflowX: 'scroll' }}>
        {filters.noteTypes.map(({ name, selected }) => (
          <Chip
            dataTestId={`${name}Chip`}
            key={name}
            onClick={() => setChipFilter(name)}
            variant={selected ? ChipVariants.fill : ChipVariants.outlined}
            color={selected ? ChipColors.blue : ChipColors.standard}
            label={t(`filters.noteTypes.${CustomClinicalNoteTypes[name] || ClinicalNoteTypes[name]}`)}
            RightIcon={selected ? CloseIcon : undefined}
            sx={chipStyles}
          />
        ))}
        {selectedFiltersCount >= 2 && (
          <Chip
            dataTestId={`${t('filters.clearAll')}Chip`}
            onClick={() => dispatch(clearNoteTypeFilters())}
            variant={ChipVariants.outlined}
            label={t('filters.clearAll')}
            RightIcon={CloseIcon}
            rightIconColor={theme.palette.error.main}
            sx={chipStyles}
          />
        )}
      </Stack>
    </Stack>
  );
};
