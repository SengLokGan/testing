import type { TodayPatientPlannedPatientWithInjections } from '@types';
import { Chip } from '@components';
import { ChipColors, ChipVariants } from '@enums';
import { Stack } from '@mui/material';
import { useMemo } from 'react';

type TodayInjectionsShiftFiltersProps = {
  shiftId: number;
  shiftData: TodayPatientPlannedPatientWithInjections[];
  selectedFilters: string[];
  onSelect: (shiftId: number, injectionLabel: string) => void;
};

export const TodayInjectionsShiftFilters = ({
  shiftId,
  shiftData,
  selectedFilters,
  onSelect,
}: TodayInjectionsShiftFiltersProps) => {
  const filters = useMemo(() => {
    return shiftData.reduce((acc, item) => {
      const accClone = { ...acc };
      item.injections.forEach((injection) => {
        if (!accClone[injection.name]) {
          accClone[injection.name] = {
            totalAmount: 0,
            preparedAmount: 0,
          };
        }
        accClone[injection.name].totalAmount += injection.amount;
        accClone[injection.name].preparedAmount += injection.prepared ? injection.amount : 0;
      });
      return accClone;
    }, {});
  }, [shiftData]);

  return (
    <Stack direction="row" flexWrap="wrap" sx={{ width: 1, p: (theme) => theme.spacing(1.5, 3, 0.5, 3) }}>
      {Object.keys(filters).map((injectionName) => {
        const filterData = filters[injectionName];
        return (
          <Chip
            onClick={() => onSelect(shiftId, injectionName)}
            key={`${shiftId}-${injectionName}`}
            label={injectionName}
            badge={`${filterData.preparedAmount}/${filterData.totalAmount}`}
            variant={selectedFilters.includes(injectionName) ? ChipVariants.fill : ChipVariants.outlined}
            color={ChipColors.pink}
            sx={{ mr: 1, mb: 1 }}
          />
        );
      })}
    </Stack>
  );
};
