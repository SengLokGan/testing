import { selectUserPermissions } from '@store/slices/userSlice';
import { UserPermissions, ViewPermissions } from '@enums';

export const getRoutePermissions = () => {
  const permissions = selectUserPermissions();
  const showRoute = {
    todayPatients: false,
    labOrders: false,
    clinicalNotes: false,
    patientsOverview: false,
    schedule: false,
    billing: false,
    reports: false,
    dashboard: false,
    patientProfile: false,
    patientDashboard: false,
    patientClinicalNotes: false,
    patientHdPrescription: false,
    patientLabResults: false,
    patientMedication: false,
    patientVaccination: false,
    accessManagement: false,
    patientSchedule: false,
    patientServicesHistory: false,
    patientInvoices: false,
    patientInsurances: false,
    administration: false,
    userManagement: false,
    dialysisMachines: false,
    staffProfile: false,
    staffManagement: false,
    vascularAccessReport: false,
    patientCensusReport: false,
    mortalityReport: false,
    hospitalizationReport: false,
    injectionReport: false,
    patientStationHistoryReport: false,
  };
  permissions.forEach((permission) => {
    switch (permission) {
      case ViewPermissions.ViewAnalysesOrders:
        showRoute.labOrders = true;
        break;
      case ViewPermissions.ViewTodayPatients:
        showRoute.todayPatients = true;
        break;
      case UserPermissions.DialysisViewPrescriptions:
        showRoute.patientHdPrescription = true;
        break;
      case UserPermissions.MedicationView:
        showRoute.patientMedication = true;
        break;
      case ViewPermissions.ViewVaccination:
        showRoute.patientVaccination = true;
        break;
      case UserPermissions.PatientViewAccess:
        showRoute.accessManagement = true;
        break;
      case ViewPermissions.ViewBillingOrder:
      case ViewPermissions.ViewBillingPatient:
        showRoute.billing = true;
        break;
      case ViewPermissions.ViewAllPatientsFull:
      case ViewPermissions.ViewAllPatientsShort:
        showRoute.patientsOverview = true;
        break;
      case ViewPermissions.ViewSchedule:
        showRoute.schedule = true;
        break;
      case ViewPermissions.ViewClinicalNotes:
        showRoute.clinicalNotes = true;
        break;
      case ViewPermissions.ViewFinancialReports:
        showRoute.reports = true;
        break;
      case ViewPermissions.ViewAdministrationMachinesManagement:
        showRoute.administration = true;
        break;
      case ViewPermissions.ViewAdministrationStaffManagement:
        showRoute.administration = true;
        break;
      case ViewPermissions.ViewDialysisMachines:
        showRoute.dialysisMachines = true;
        break;
      case ViewPermissions.ViewAdministrationUsersList:
        showRoute.userManagement = true;
        break;
      case ViewPermissions.ViewAdministrationStaffList:
        showRoute.staffManagement = true;
        break;
      case ViewPermissions.StaffView:
        showRoute.staffProfile = true;
        break;
      case ViewPermissions.ViewClinicalReports:
        showRoute.reports = true;
        showRoute.vascularAccessReport = true;
        break;
      case ViewPermissions.ViewManagementReports:
        showRoute.reports = true;
        showRoute.patientCensusReport = true;
        showRoute.mortalityReport = true;
        showRoute.hospitalizationReport = true;
        showRoute.patientStationHistoryReport = true;
        break;
      case UserPermissions.ViewInjectionHistoryReports:
        showRoute.reports = true;
        showRoute.injectionReport = true;
        break;
    }
  });

  return { showRoute };
};
