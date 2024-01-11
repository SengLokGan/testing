import { selectStaffRolesFilter, selectStaffUserFilter, setRoleFilter, setUserFilter } from '@store/slices';
import { Grid, Stack } from '@mui/material';
import { AutocompleteAsync, TextToggleButton } from '@components';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useAppDispatch } from '@hooks/storeHooks';
import { UserRoles } from '@enums/global';
import { getCodeValueFromCatalog } from '@utils/getOptionsListFormCatalog';

export const Filters = () => {
  const { t } = useTranslation('staffManagement');
  const staffRolesFilter = selectStaffRolesFilter();
  const staffUserFilter = selectStaffUserFilter();
  const dispatch = useAppDispatch();

  const staffFilterStatusesChangeHandler = useCallback((roleName) => {
    dispatch(
      setRoleFilter(staffRolesFilter.map((roleFilter) => ({ ...roleFilter, selected: roleName === roleFilter.name }))),
    );
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" flexWrap="wrap">
        {staffRolesFilter.map(({ name, selected, badge }) => (
          <TextToggleButton
            sx={{ mb: 1, mr: 1 }}
            key={name}
            value={name}
            title={name in UserRoles ? getCodeValueFromCatalog('userRoles', name) : t(`filter.${name}`)}
            badge={badge}
            isSelected={selected}
            onChange={() => staffFilterStatusesChangeHandler(name)}
          />
        ))}
      </Stack>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <AutocompleteAsync
            name="user"
            label={t('filter.enterName')}
            onChange={(value) => dispatch(setUserFilter(value))}
            value={{ label: staffUserFilter?.label ?? '', id: staffUserFilter?.id ?? '' }}
            getOptionsUrl="pm/users?name="
            optionsTransform={(options) => options.map((option) => ({ id: option.id, label: option.name }))}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
