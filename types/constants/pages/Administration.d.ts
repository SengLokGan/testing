import { UserPermissions } from '@enums';
export declare const administrationStaffManagement: () => (
  | {
      id: number;
      title: string;
      label: string;
      icon: import('@mui/material/OverridableComponent').OverridableComponent<
        import('@mui/material').SvgIconTypeMap<{}, 'svg'>
      > & {
        muiName: string;
      };
      link: string;
      permission: UserPermissions;
      active: boolean;
    }
  | {
      id: number;
      title: string;
      label: string;
      icon: import('@mui/material/OverridableComponent').OverridableComponent<
        import('@mui/material').SvgIconTypeMap<{}, 'svg'>
      > & {
        muiName: string;
      };
      link: string;
      permission: UserPermissions;
      active?: undefined;
    }
)[];
export declare const administrationDialysisMachinesManagement: () => {
  id: number;
  title: string;
  label: string;
  icon: import('@mui/material/OverridableComponent').OverridableComponent<
    import('@mui/material').SvgIconTypeMap<{}, 'svg'>
  > & {
    muiName: string;
  };
  link: string;
  permission: UserPermissions;
}[];
