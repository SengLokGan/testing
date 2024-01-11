import { ROUTES } from '@constants';

export const getAllowedPath = (patientId) => {
  return [
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.patientHdPrescription}`,
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.patientMedication}`,
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.patientProfile}`,
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.patientClinicalNotes}`,
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.patientLabResults}`,
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.schedule}`,
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.patientServicesHistory}`,
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.patientInvoices}`,
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.patientInsurances}`,
    `/${ROUTES.patientsOverview}/${patientId}/${ROUTES.accessManagement}`,
  ];
};
