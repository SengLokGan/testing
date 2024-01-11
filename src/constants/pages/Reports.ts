import { Column, InjectionEntity } from '@types';
import { CellType } from '@enums';
import i18n from 'i18next';
import { getColumnSizes } from '@utils/table';
import { dateFormat, toAmPmTimeString } from '@utils/dateFormat';
import { format } from 'date-fns';
import { getCodeValueFromCatalog } from '@utils/getOptionsListFormCatalog';

export const TRIANGLE_SIZE = 0.65;

export const getVascularAccessReportsTableColumns = (): Column[] => [
  {
    id: 'patient',
    cellType: CellType.WithoutAvatar,
    label: i18n.t('vascularAccessReports:tableView.patientName'),
    width: 200,
    minWidth: 150,
    withRightBorder: true,
    sticky: true,
  },
  {
    id: 'vaCreationDate',
    label: i18n.t('vascularAccessReports:tableView.dateOfCreation'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'category',
    label: i18n.t('vascularAccessReports:tableView.accessCategory'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'vaType',
    label: i18n.t('vascularAccessReports:tableView.typeOfAccess'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'cvcCategory',
    label: i18n.t('vascularAccessReports:tableView.category'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'side',
    label: i18n.t('vascularAccessReports:tableView.side'),
    width: 100,
    minWidth: 50,
  },
  {
    id: 'vaNeedleType',
    label: i18n.t('vascularAccessReports:tableView.needleType'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'vaNeedleSizeA',
    label: i18n.t('vascularAccessReports:tableView.needleSizeA'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'vaNeedleSizeV',
    label: i18n.t('vascularAccessReports:tableView.needleSizeV'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'cvcInstillation',
    label: i18n.t('vascularAccessReports:tableView.instillationCVC'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'vaCreationPerson',
    label: i18n.t('vascularAccessReports:tableView.createdBy'),
    width: 200,
    minWidth: 150,
  },
  {
    id: 'vaCreatedPlace',
    label: i18n.t('vascularAccessReports:tableView.createdAt'),
    width: 200,
    minWidth: 150,
  },
  {
    id: 'comments',
    label: i18n.t('vascularAccessReports:tableView.comments'),
    width: 200,
    minWidth: 150,
  },
];
export const getPatientCensusReportsTableColumns = (): Column[] => [
  {
    id: 'patient',
    cellType: CellType.WithoutAvatar,
    label: i18n.t('reports:table.patientName'),
    width: 200,
    minWidth: 150,
    withRightBorder: true,
    sticky: true,
  },
  {
    id: 'phone',
    cellType: CellType.Phone,
    label: i18n.t('reports:table.phone'),
    width: 160,
    minWidth: 100,
  },
  {
    id: 'documentNumber',
    label: i18n.t('reports:table.nricPass'),
    width: 160,
    minWidth: 100,
  },
  {
    id: 'address',
    label: i18n.t('reports:table.address'),
    width: 280,
    minWidth: 100,
  },
  {
    id: 'age',
    label: i18n.t('reports:table.age'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'gender',
    label: i18n.t('reports:table.gender'),
    width: 140,
    minWidth: 50,
  },
  {
    id: 'race',
    label: i18n.t('reports:table.race'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'religion',
    label: i18n.t('reports:table.religion'),
    width: 160,
    minWidth: 100,
  },
  {
    id: 'diagnosis',
    label: i18n.t('reports:table.diagnosis'),
    width: 280,
    minWidth: 100,
  },
  {
    id: 'virology',
    cellType: CellType.Virology,
    label: i18n.t('reports:table.virology'),
    width: 140,
    minWidth: 100,
  },
  {
    id: 'treatmentReferral',
    label: i18n.t('reports:table.drReferHospital'),
    width: 160,
    minWidth: 150,
  },
  {
    id: 'createdAt',
    label: i18n.t('reports:table.admissionDate'),
    width: 140,
    minWidth: 150,
  },
  {
    id: 'status',
    label: i18n.t('reports:table.therapyCategory'),
    width: 150,
    minWidth: 150,
  },
  {
    id: 'modifiedAt',
    label: i18n.t('reports:table.statusChanged'),
    width: 140,
    minWidth: 150,
  },
  {
    id: 'previousStatus',
    label: i18n.t('reports:table.previousStatus'),
    width: 300,
    minWidth: 150,
  },
];

export const getMortalityReportsTableColumns = (): Column[] => [
  {
    id: 'patient',
    cellType: CellType.WithoutAvatar,
    label: i18n.t('reports:table.patientName'),
    width: 200,
    minWidth: 150,
    withRightBorder: true,
    sticky: true,
  },
  {
    id: 'deathDate',
    label: i18n.t('reports:table.dateOfDeath'),
    width: 150,
    minWidth: 150,
    format: (value) => (value ? format(new Date(value), 'dd/MM/yyyy') : ''),
  },
  {
    id: 'comment',
    label: i18n.t('reports:table.causeOfDeath'),
    width: 300,
    minWidth: 150,
  },
  {
    id: 'previousStatus',
    label: i18n.t('reports:table.previousStatus'),
    format: (value) => getCodeValueFromCatalog('patientStatuses', value),
    width: 300,
    minWidth: 150,
  },
];
export const getInjectionReportsTableColumns = (): Column[] => [
  {
    id: 'patient',
    cellType: CellType.WithoutAvatar,
    label: i18n.t('reports:table.patientName'),
    withRightBorder: true,
    sticky: true,
    ...getColumnSizes(240),
  },
  {
    id: 'documentNumber',
    label: i18n.t('reports:table.nricPass'),
    ...getColumnSizes(240),
  },
  {
    id: 'injection',
    label: i18n.t('reports:table.injection'),
    format: (injection: InjectionEntity) => injection.name,
    ...getColumnSizes(240),
  },
  {
    id: 'amount',
    label: i18n.t('reports:table.amount'),
    format: (_, fullData) => fullData?.injection?.amount,
    ...getColumnSizes(240),
  },
  {
    id: 'administeredAt',
    label: i18n.t('reports:table.dateTime'),
    format: (administeredAt) => `${dateFormat(administeredAt)} ${toAmPmTimeString(new Date(administeredAt))}`,
    ...getColumnSizes(240),
  },
  {
    id: 'shiftName',
    label: i18n.t('reports:table.shift'),
    ...getColumnSizes(240),
  },
];

export const getHospitalizationReportsTableColumns = (): Column[] => [
  {
    id: 'patient',
    cellType: CellType.WithoutAvatar,
    label: i18n.t('reports:table.patientName'),
    width: 200,
    minWidth: 150,
    withRightBorder: true,
    sticky: true,
  },
  {
    id: 'date',
    label: i18n.t('reports:table.hospitalizationDate'),
    width: 150,
    minWidth: 150,
  },
  {
    id: 'returningDate',
    label: i18n.t('reports:table.dateOfReturn'),
    width: 150,
    minWidth: 150,
  },
  {
    id: 'reason',
    label: i18n.t('reports:table.hospitalizationReason'),
    width: 150,
    minWidth: 150,
  },
  {
    id: 'details',
    label: i18n.t('reports:table.hospitalizationType'),
    width: 150,
    minWidth: 150,
  },
  {
    id: 'clinic',
    label: i18n.t('reports:table.hospitalClinic'),
    width: 150,
    minWidth: 150,
  },
  {
    id: 'comment',
    label: i18n.t('reports:table.comments'),
    width: 300,
    minWidth: 150,
  },
];

export const getPatientStationHistoryReportsColumns = (): Column[] => [
  {
    id: 'patient',
    cellType: CellType.WithoutAvatar,
    label: i18n.t('reports:table.patientName'),
    withRightBorder: true,
    sticky: true,
    ...getColumnSizes(240),
  },
  {
    id: 'dialysisDate',
    label: i18n.t('reports:table.dialysisDate'),
    width: 150,
    minWidth: 150,
  },
  {
    id: 'location',
    label: i18n.t('reports:table.bay'),
    width: 150,
    minWidth: 150,
    format: (location) => location?.name || '',
  },
  {
    id: 'startTime',
    label: i18n.t('reports:table.startTime'),
    width: 150,
    minWidth: 150,
    format: (startTime) => (startTime ? format(new Date(startTime), 'hh:mm a') : ''),
  },
  {
    id: 'endTime',
    label: i18n.t('reports:table.endTime'),
    width: 150,
    minWidth: 150,
    format: (endTime) => (endTime ? format(new Date(endTime), 'hh:mm a') : ''),
  },
  {
    id: 'isolation',
    label: i18n.t('reports:table.virologyStatus'),
    width: 150,
    minWidth: 150,
    format: (isolation) => isolation?.name || '',
  },
];
