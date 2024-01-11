import Stack from '@mui/material/Stack';
import { Chip } from '@components/Chip/Chip';
import { ChipColors, ChipVariants } from '@enums';
import CloseIcon from '@mui/icons-material/Close';
import theme from '@src/styles/theme';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { WithSx, PatientIsolationFilterItem } from '@types';
import { convertSxToArray } from '@utils/converters/mui';

type IsolationFilterChipsProps = WithSx<{
  allIsolatorFilters: { items: PatientIsolationFilterItem[] };
  patientNameFilter: { name: string; id: string } | null;
  onChipFilterClick: (name: string, filterType: 'isolations' | 'patient') => void;
  onClearAllClick: () => void;
}>;
export const PatientsFilterChips = ({
  allIsolatorFilters,
  patientNameFilter,
  onChipFilterClick,
  onClearAllClick,
  sx = [],
}: IsolationFilterChipsProps) => {
  const { t } = useTranslation('patient');
  const [isolatorFiltersToShow, setIsolatorFilterToShow] = useState<PatientIsolationFilterItem[]>([]);

  useEffect(() => {
    setIsolatorFilterToShow(allIsolatorFilters.items.filter((item) => item.checked));
  }, [allIsolatorFilters]);

  return (
    <>
      {(!!isolatorFiltersToShow.length || patientNameFilter) && (
        <Stack sx={convertSxToArray(sx)} direction="row" spacing={1}>
          {patientNameFilter && (
            <Chip
              label={patientNameFilter.name}
              variant={ChipVariants.fill}
              color={ChipColors.blue}
              RightIcon={CloseIcon}
              dataTestId={`${patientNameFilter.name}-filterChip`}
              onClick={() => onChipFilterClick(patientNameFilter.name, 'patient')}
            />
          )}
          {isolatorFiltersToShow.map(({ name }) => (
            <Chip
              key={name}
              onClick={() => onChipFilterClick(name, 'isolations')}
              label={t(`filter.${name.toLowerCase()}`)}
              variant={ChipVariants.fill}
              color={ChipColors.blue}
              RightIcon={CloseIcon}
              dataTestId={`${name}-filterChip`}
            />
          ))}
          <Chip
            label={t('filter.clearAll')}
            RightIcon={CloseIcon}
            rightIconColor={theme.palette.error.main}
            onClick={onClearAllClick}
            dataTestId={'clearAllFilterChip'}
          />
        </Stack>
      )}
    </>
  );
};
