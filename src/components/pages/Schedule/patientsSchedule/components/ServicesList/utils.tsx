import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { VaccinationMedicationResolution, VaccinationStatus, LabOrderStatus } from '@enums';
import VaccinesIcon from '@mui/icons-material/Vaccines';

export const getMedicationIcon = (status: VaccinationMedicationResolution | undefined, isServicePopup = false) => {
  switch (status) {
    case VaccinationMedicationResolution.Administered:
      return <CheckCircleIcon sx={isServicePopup ? { color: '#006D3C' } : {}} fontSize="small" />;
    case VaccinationMedicationResolution.Omitted:
    case VaccinationMedicationResolution.Rescheduled:
      return (
        <CancelIcon sx={({ palette }) => (isServicePopup ? { color: palette.error.main } : {})} fontSize="small" />
      );
    default:
      return <ChangeCircleIcon sx={isServicePopup ? { color: '#FFD600' } : {}} fontSize="small" />;
  }
};

export const getLabOrderIcon = (status: LabOrderStatus, isServicePopup = false) => {
  switch (status) {
    case LabOrderStatus.TO_PERFORM:
    case LabOrderStatus.TO_SUBMIT:
      return <ChangeCircleIcon sx={[isServicePopup && { color: '#FFD600' }]} fontSize="small" />;
    case LabOrderStatus.PENDING:
      return <ChangeCircleIcon sx={[isServicePopup && { color: '#FFD600' }]} fontSize="small" />;
    case LabOrderStatus.COMPLETED:
      return <CheckCircleIcon sx={[isServicePopup && { color: '#006D3C' }]} fontSize="small" />;
  }
};

export const getVaccineIcon = (status: VaccinationStatus, isServicePopup = false) => {
  switch (status) {
    case VaccinationStatus.NotDone:
      return (
        <VaccinesIcon sx={({ palette }) => (isServicePopup ? { color: palette.error.main } : {})} fontSize="small" />
      );
    case VaccinationStatus.Pending:
      return <ChangeCircleIcon sx={isServicePopup ? { color: '#FFD600' } : {}} fontSize="small" />;
    case VaccinationStatus.AdministeredExternal:
    case VaccinationStatus.AdministeredInternal:
      return <CheckCircleIcon sx={isServicePopup ? { color: '#006D3C' } : {}} fontSize="small" />;
    case VaccinationStatus.Omitted:
      return (
        <CancelIcon sx={({ palette }) => (isServicePopup ? { color: palette.error.main } : {})} fontSize="small" />
      );
  }
};
