import { IconColors } from '@enums/components';
import { UserPermissions } from '@enums/store';
export declare const schedulePatients: {
  id: number;
  title: string;
  label: string;
  icon: import('@mui/material/OverridableComponent').OverridableComponent<
    import('@mui/material').SvgIconTypeMap<{}, 'svg'>
  > & {
    muiName: string;
  };
  link: string;
  iconColor: IconColors;
  permission: UserPermissions;
}[];
