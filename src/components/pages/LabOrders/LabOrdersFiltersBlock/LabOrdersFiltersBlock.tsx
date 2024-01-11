import Stack from '@mui/material/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '@hooks/storeHooks';
import { addDrawer } from '@store/slices';
import { DrawerType } from '@enums/containers';
import { LabOrdersQuickFilters } from '@components/pages/LabOrders/LabOrdersFiltersBlock/LabOrdersQuickFilters';
import { LabOrdersPlace } from '@enums/global';

type LabOrdersFiltersBlockProps = {
  place: LabOrdersPlace;
};

export const LabOrdersFiltersBlock = ({ place }: LabOrdersFiltersBlockProps) => {
  const dispatch = useAppDispatch();
  const openDrawer = () => {
    dispatch(
      addDrawer({
        type: DrawerType.LabOrdersFilters,
        collapsable: false,
        payload: { place },
      }),
    );
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={({ breakpoints }) => ({
        [breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
      })}
    >
      <LabOrdersQuickFilters />
      <IconButton
        data-testid="openDrawerWithOverviewPatientsFilterButton"
        sx={{ width: (theme) => theme.spacing(6.25), maxHeight: (theme) => theme.spacing(6.25) }}
        onClick={openDrawer}
      >
        <FilterListIcon />
      </IconButton>
    </Stack>
  );
};
