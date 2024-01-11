import { ROUTES } from '../global/route';
import type { ItemProps } from '@containers/layouts/Header/components/NavigationDrawer/components/MenuItem';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import type { NavigationTab } from '@types';

export const navTabs: NavigationTab[] = [
  { title: 'header.todayPatients', path: ROUTES.main, permission: 'todayPatients' },
  { title: 'header.schedule', path: `/${ROUTES.schedule}`, permission: 'schedule' },
  { title: 'header.patientsOverview', path: `/${ROUTES.patientsOverview}`, permission: 'patientsOverview' },
  { title: 'header.labOrders', path: `/${ROUTES.labOrders}`, permission: 'labOrders' },
  { title: 'header.reports', path: `/${ROUTES.reports}`, permission: 'reports' },
  { title: 'header.administration', path: `/${ROUTES.administration}`, permission: 'administration' },
];

export const drawerMenuItems: ItemProps[] = [
  {
    id: '1',
    name: 'header.todayPatients',
    isOpen: false,
    link: ROUTES.main,
    icon: PeopleOutlineOutlinedIcon,
    permission: 'todayPatients',
  },
  {
    id: '2',
    name: 'header.schedule',
    isOpen: false,
    link: `/${ROUTES.schedule}`,
    icon: CalendarMonthOutlinedIcon,
    permission: 'schedule',
  },
  {
    id: '3',
    name: 'header.patientsOverview',
    isOpen: false,
    link: `/${ROUTES.patientsOverview}`,
    icon: GroupsOutlinedIcon,
    permission: 'patientsOverview',
  },
  {
    id: '4',
    name: 'header.labOrders',
    isOpen: false,
    link: `/${ROUTES.labOrders}`,
    icon: ScienceOutlinedIcon,
    permission: 'labOrders',
  },
  {
    id: '5',
    name: 'header.reports',
    isOpen: false,
    link: `/${ROUTES.reports}`,
    icon: PrintOutlinedIcon,
    permission: 'reports',
  },
  {
    id: '6',
    name: 'header.administration',
    isOpen: false,
    link: `/${ROUTES.administration}`,
    icon: SettingsOutlinedIcon,
    permission: 'administration',
  },
];
