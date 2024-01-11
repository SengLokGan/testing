import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { TextToggleButton } from '@components/TextToggleButton/TextToggleButton';
import { selectLabOrderStatusFilters, setStatusFilters } from '@store/slices';
import { LabOrdersStatusFilters } from '@enums';
import { useAppDispatch } from '@hooks';

export const LabOrdersQuickFilters = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('labOrders');
  const filters = selectLabOrderStatusFilters();

  const changeFilterStatus = (name: LabOrdersStatusFilters) => {
    dispatch(
      setStatusFilters(
        name === LabOrdersStatusFilters.All
          ? [
              {
                name,
                selected: true,
              },
              ...filters
                .filter((item) => item.name !== LabOrdersStatusFilters.All)
                .map((filter) => ({ ...filter, selected: false })),
            ]
          : filters.map((item) => {
              if (item.name === LabOrdersStatusFilters.All) {
                return { ...item, selected: false };
              }
              return name === item.name ? { ...item, selected: !item.selected } : { ...item };
            }),
      ),
    );
  };

  return (
    <Stack direction="row" spacing={1} alignItems="flex-start">
      {filters.map(({ name, selected, badge }) => {
        return (
          <TextToggleButton
            key={name}
            value={name}
            title={t(`filters.${name}`)}
            badge={badge}
            isSelected={selected}
            onChange={() => changeFilterStatus(name)}
          />
        );
      })}
    </Stack>
  );
};
