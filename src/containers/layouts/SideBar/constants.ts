import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import SwapVerticalCircleOutlinedIcon from '@mui/icons-material/SwapVerticalCircleOutlined';
import { MenuItemProps } from './components/SidebarMenuItem';
import { ViewPermissions } from '@enums';
import { ROUTES } from '@constants';
import { EditNoteIcon, HDPrescriptionIcon } from '@assets/icons';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';

export const patientMenuItems: MenuItemProps[] = [
  { title: 'sidebar.profile', path: ROUTES.patientProfile, icon: PersonOutlineOutlinedIcon },
  {
    title: 'sidebar.clinicalNotes',
    path: ROUTES.patientClinicalNotes,
    icon: EditNoteIcon,
    viewPermissions: [ViewPermissions.ViewClinicalNotes],
  },
  { title: 'sidebar.prescription', path: ROUTES.patientHdPrescription, icon: HDPrescriptionIcon },
  { title: 'sidebar.medications', path: ROUTES.patientMedication, icon: MedicationOutlinedIcon },
  {
    title: 'sidebar.vaccination',
    path: ROUTES.patientVaccination,
    icon: VaccinesOutlinedIcon,
    viewPermissions: [ViewPermissions.ViewVaccination],
  },
  { title: 'sidebar.labResults', path: ROUTES.patientLabResults, icon: ScienceOutlinedIcon },
  { title: 'sidebar.accessManagement', path: ROUTES.accessManagement, icon: SwapVerticalCircleOutlinedIcon },
];

export const staffMenuItems: MenuItemProps[] = [
  {
    title: 'sidebar.profile',
    path: ROUTES.staffProfile,
    icon: PersonOutlineOutlinedIcon,
    basePath: `${ROUTES.administration}/${ROUTES.staffManagement}`,
    viewPermissions: [ViewPermissions.StaffView],
  },
];

export const dialysisMachineMenuItems: MenuItemProps[] = [
  {
    title: 'sidebar.information',
    basePath: `${ROUTES.administration}/${ROUTES.dialysisMachines}`,
    path: ROUTES.dialysisMachineInformation,
    icon: SettingsApplicationsOutlinedIcon,
    viewPermissions: [],
  },
];

export const patientMenuBackExceptions = {
  [ROUTES.patientProfile]: ROUTES.patientProfile,
  [ROUTES.patientClinicalNotes]: ROUTES.patientClinicalNotes,
  [ROUTES.patientHdPrescription]: ROUTES.patientHdPrescription,
  [ROUTES.patientMedication]: ROUTES.patientMedication,
  [ROUTES.patientVaccination]: ROUTES.patientVaccination,
  [ROUTES.patientLabResults]: ROUTES.patientLabResults,
  [ROUTES.accessManagement]: ROUTES.accessManagement,
};

export const staffMenuBackExceptions = {
  [ROUTES.staffProfile]: ROUTES.staffProfile,
};

export const dialysisMachineMenuBackExceptions = {
  [ROUTES.dialysisMachineInformation]: ROUTES.dialysisMachineInformation,
  [ROUTES.dialysisMachineHistoryLog]: ROUTES.dialysisMachineHistoryLog,
};
