import Stack from '@mui/material/Stack';
import { TextToggleButton } from '@components/TextToggleButton/TextToggleButton';
import IconButton from '@mui/material/IconButton';
import TableRowsIcon from '@mui/icons-material/TableRowsOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  addDrawer,
  changePatientsOverviewStatusesFilters,
  selectOverviewPatientsStatusesFilters,
  selectUserPermissions,
} from '@store';
import { useAppDispatch } from '@hooks/storeHooks';
import { DrawerType, PatientOverviewStatusesFilters, UserPermissions } from '@enums';
import { useTranslation } from 'react-i18next';

type PatientsOverviewFiltersBlockProps = {
  isGridView?: boolean;
  changeViewMode: () => void;
};

export const PatientsOverviewFiltersBlock = ({
  isGridView = false,
  changeViewMode,
}: PatientsOverviewFiltersBlockProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('patient');
  const statusesFilters = selectOverviewPatientsStatusesFilters();
  const permissions = selectUserPermissions();
  const couldShowMyPatientsChip = permissions.includes(UserPermissions.PatientsSeeOwn);

  const patientsFilterStatusesChangeHandler = (name: PatientOverviewStatusesFilters) => {
    dispatch(
      changePatientsOverviewStatusesFilters({
        items: statusesFilters.map((item) => {
          return name === item.name ? { ...item, selected: true } : { ...item, selected: false };
        }),
      }),
    );
  };

  const openDrawer = () => {
    dispatch(
      addDrawer({
        type: DrawerType.PatientsOverviewFilters,
        collapsable: false,
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
      <Stack direction="row" flexWrap="wrap">
        {statusesFilters.map(({ name, badge, selected }) => {
          // TODO: My Patients. Primary Nurse. Uncomment it after it's implemented on BKD side
          // if (name === PatientOverviewStatusesFilters.MyPatients && !couldShowMyPatientsChip) return null;
          if (name === PatientOverviewStatusesFilters.MyPatients) return null;
          return (
            <TextToggleButton
              key={name}
              value={name}
              title={t(`filter.${name}`)}
              badge={badge}
              isSelected={selected}
              onChange={() => patientsFilterStatusesChangeHandler(name)}
              sx={({ spacing }) => ({
                margin: spacing(0, 1, 1, 0),
              })}
            />
          );
        })}
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <IconButton
          data-testid="changeViewModeOverviewPatientsFilterButton"
          sx={{ width: (theme) => theme.spacing(6.25), maxHeight: (theme) => theme.spacing(6.25) }}
          onClick={changeViewMode}
        >
          {isGridView ? (
            <TableRowsIcon data-testid="patientsOverviewTableRowIcon" />
          ) : (
            <GridViewIcon data-testid="patientsOverviewGridViewIcon" />
          )}
        </IconButton>
        <IconButton
          data-testid="openDrawerWithOverviewPatientsFilterButton"
          sx={{ width: (theme) => theme.spacing(6.25), maxHeight: (theme) => theme.spacing(6.25) }}
          onClick={openDrawer}
        >
          <FilterListIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
