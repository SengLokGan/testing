import i18n from 'i18next';
import { AllergiesInfo, Answer, Treatment, CellType } from '@enums';
import { collapseColumn } from '@src/constants';
import { format } from 'date-fns';
import { dateFormat } from '@utils/dateFormat';
import { Column } from '@types';
import { capitalize as capitalizeFirstLetter } from '@utils/capitalize';
import { getCodeValueFromCatalog } from '@utils/getOptionsListFormCatalog';
import { getDeletedSyfix } from '@utils/getDoctorName';

export const mainInfoFields = [
  'photo',
  'name',
  'document',
  'birthdate',
  'gender',
  'educationLevel',
  'occupation',
  'race',
  'nationality',
  'language',
  'religion',
  'phone',
  'address',
  'comment',
];

export const mobileMainInfoFields = [
  'document',
  'birthdate',
  'gender',
  'educationLevel',
  'occupation',
  'race',
  'nationality',
  'language',
  'religion',
  'phone',
  'address',
  'comment',
];

export const familyInfoFields = ['maritalStatus', 'childCount'];

export const clinicalInfoFields = [
  'diagnosis',
  'medicalHistory',
  'currentTreatment',
  'bloodType',
  'drugAllergy',
  'virology',
  'hbsab',
];

export const documentsFields = [
  'documentCopy',
  'virologyStatus',
  'medicalReport',
  'consultation',
  'bloodTest',
  'hdPrescription',
  'otherFiles',
];

export const treatmentInfoFields = [
  'ambulant',
  'personInCharge',
  'nephrologist',
  'primaryNurse',
  'referralInfo',
  'firstDialysis',
  'firstCenterDialysis',
  'comments',
];

export const billingInformationFields = [
  'payor',
  'payorInformation',
  'paymentMethod',
  'payorInsurances',
  'depositAmount',
  'depositPaymentMethod',
  'comments',
];

export const treatmentOptions = () => [
  { label: 'hemodialysis', value: Treatment.Hemodialysis },
  { label: 'conservative', value: Treatment.Conservative, disabled: true },
  { label: 'ipd', value: Treatment.IPD, disabled: true },
  { label: 'card', value: Treatment.CAPD, disabled: true },
];

export const allergiesOptions = () => [
  { label: 'modal.noInfoAboutAllergy', value: AllergiesInfo.NoInfo },
  { label: 'modal.noKnownAllergies', value: AllergiesInfo.NoAllergy },
  { label: 'modal.drugAllergy', value: AllergiesInfo.Allergy },
];

export const booleanOptions = () => [
  { label: i18n.t('patient:modal.yes'), value: Answer.Yes },
  { label: i18n.t('patient:modal.no'), value: Answer.No },
];

export const captureSize = {
  width: 400,
  height: 300,
  captureOption: {
    audio: false,
    video: {
      width: 400,
      height: 300,
      facingMode: 'environment',
    },
  },
};

export const getHdPrescriptionsViewTableColumns = () => [
  collapseColumn,
  {
    id: 'enteredAt',
    label: i18n.t('hdPrescription:tableView.entered'),
    maxWidth: 160,
    minWidth: 100,
    format: (value) => (value ? format(new Date(value), 'dd/MM/yyyy hh:mm a') : '-'),
  },
  {
    id: 'enteredBy',
    label: i18n.t('hdPrescription:tableView.enteredBy'),
    maxWidth: 160,
    minWidth: 100,
    format: (value: any) => (value?.name ? `${value.name}${getDeletedSyfix(value)}` : '-'),
  },
  {
    id: 'prescriptionDate',
    label: i18n.t('hdPrescription:tableView.prescribed'),
    maxWidth: 160,
    minWidth: 100,
    format: (value) => (value ? dateFormat(value) : '-'),
  },
  {
    id: 'status',
    label: i18n.t('hdPrescription:tableView.status'),
    cellType: CellType.HdPrescriptionStatus,
    maxWidth: 160,
    minWidth: 100,
  },
];

export const getVaccinationViewTableColumns = () => [
  collapseColumn,
  {
    id: 'vaccineType',
    label: i18n.t('vaccination:tableView.vaccineType'),
    maxWidth: 280,
    minWidth: 100,
    format: (value) => (value?.code ? getCodeValueFromCatalog('vaccines', value.code) : value.name),
  },
  {
    id: 'dossingSchedule',
    label: i18n.t('vaccination:tableView.dosingSchedule'),
    maxWidth: 280,
    minWidth: 100,
    format: (value) => getCodeValueFromCatalog('dosingSchedule', value),
  },
  {
    id: 'administeredAt',
    label: i18n.t('vaccination:tableView.date'),
    maxWidth: 280,
    minWidth: 100,
    format: (value, fullData) => (value ? dateFormat(value) : dateFormat(fullData.dateToAdminister)),
  },
  {
    id: 'status',
    label: i18n.t('vaccination:tableView.status'),
    maxWidth: 280,
    minWidth: 100,
    cellType: CellType.VaccinationStatus,
  },
];

export const getMedicationsViewTableColumns = (): Column[] => [
  collapseColumn,
  {
    id: 'medicationName',
    label: i18n.t('medications:tableView.nameOfMedication'),
    maxWidth: 160,
    minWidth: 100,
    format: (value) => (value ? capitalizeFirstLetter(value) : value),
  },
  {
    id: 'place',
    label: i18n.t('medications:tableView.administering'),
    maxWidth: 160,
    minWidth: 100,
    format: (value) => (value ? i18n.t(`medications:form.places.${value}`) : value),
  },
  { id: 'medicationGroup', label: i18n.t('medications:tableView.medGroup'), maxWidth: 160, minWidth: 100 },
  {
    id: 'status',
    label: i18n.t('medications:tableView.status'),
    cellType: CellType.MedicationStatus,
    maxWidth: 160,
    minWidth: 100,
  },
];

export const getAccessManagementsViewTableColumns = (): Column[] => [
  collapseColumn,
  {
    id: 'accessCategory',
    label: i18n.t('accessManagement:tableView.accessCategory'),
    format: (value) => getCodeValueFromCatalog('accessCategories', value),
  },
  {
    id: 'creationDate',
    label: i18n.t('accessManagement:tableView.dateOfCreation'),
    format: (value) => (value ? dateFormat(value) : '—'),
  },
  {
    id: 'status',
    label: i18n.t('accessManagement:tableView.status'),
    cellType: CellType.HdPrescriptionStatus,
  },
];
