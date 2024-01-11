export declare enum Dictionaries {
  Countries = 'COUNTRIES',
  Educations = 'EDUCATIONS',
  Religions = 'RELIGIONS',
  Languages = 'LANGUAGES',
  Nationalities = 'NATIONALITIES',
  Races = 'RACES',
  Occupations = 'OCCUPATIONS',
  Genders = 'GENDERS',
  DocumentTypes = 'DOCUMENT_TYPES',
  MaritalStatuses = 'MARITAL_STATUSES',
  BloodTypes = 'BLOOD_TYPES',
  VirologyStatuses = 'VIROLOGY_STATUSES',
  PatientStatuses = 'STATUSES',
  AccessCategories = 'ACCESS_CATEGORIES',
  AccessTypes = 'ACCESS_TYPES',
  CvcCategories = 'CVC_CATEGORIES',
  Instillation = 'INSTILLATION',
  NeedleSizes = 'NEEDLE_SIZES',
  NeedleTypes = 'NEEDLE_TYPES',
  Sides = 'SIDES',
  Frequency = 'FREQUENCY',
  DaysOfWeek = 'DAYS_OF_WEEK',
  Dialyzer = 'DIALYZER',
  MedicationGroup = 'MEDICATION_GROUP',
  Route = 'ROUTE',
  MedicationFrequencyAtHome = 'MEDICATION_FREQUENCY_AT_HOME',
  MedicationFrequencyInCenter = 'MEDICATION_FREQUENCY_IN_CENTER',
  MedicationFrequencyAll = 'MEDICATION_FREQUENCY_ALL',
  DialysisDay = 'DIALYSIS_DAY',
  Meal = 'MEAL',
  ReuseDialyzerBrand = 'REUSE_DIALYZER_BRAND',
  SingleDialyzerBrand = 'SINGLE_DIALYZER_BRAND',
  AnticoagulantType = 'ANTICOAGULANT_TYPE',
  SterilantType = 'STERLIANT_TYPE',
  BayNumber = 'BAY_NUMBER',
  IsolationBayNumber = 'ISOLATION_BAY_NUMBER',
  LabOrdersSpecimenTypes = 'LAB_ORDERS_SPECIMEN_TYPES',
  LabOrderTypes = 'LAB_ORDER_TYPES',
  LabOrdersMealStatus = 'LAB_ORDERS_MEAL_STATUS',
  LabResultsTestValues = 'LAB_RESULTS_TEST_VALUES',
  LabResultsMeasurements = 'LAB_RESULTS_MEASUREMENTS',
  LabResultsTestSetName = 'LAB_RESULTS_TEST_SET_NAME',
  ProcedureType = 'PROCEDURE_TYPE',
  OrderStatus = 'OrderStatus',
  ClinicalNoteType = 'CLINICAL_NOTE_TYPE',
  Vaccines = 'VACCINES',
  DosingSchedule = 'DOSING_SCHEDULE',
  DoctorSpecialities = 'DOCTOR_SPECIALITIES',
  Isolations = 'ISOLATIONS',
  DialysisMachineCommunicationTypes = 'DIALYSIS_MACHINE_COMMUNICATION_TYPE',
  DialysisMachineStatuses = 'DIALYSIS_MACHINE_STATUSES',
  DialysisMachineInfectionStatuses = 'DIALYSIS_MACHINE_INFECTION_STATUSES',
  PatientHospitalizationReasons = 'PATIENT_HOSPITALIZATION_REASONS',
  SkippingReasons = 'APPOINTMENT_SKIPPING_REASONS',
  HospitalizationDetails = 'HOSPITALIZATION_DETAILS',
  StaffSpecialities = 'STAFF_SPECIALITIES',
  UserRoles = 'USER_ROLES',
  UserResponsibilities = 'USER_RESPONSIBILITIES',
  AddHocEventTypes = 'ADD_HOC_EVENT_TYPE',
  LabOrderTypeFilter = 'LAB_ORDER_TYPE_FILTER',
}
export declare const DictionariesTranslationsMap: {
  country: Dictionaries;
  educationLevel: Dictionaries;
  religion: Dictionaries;
  language: Dictionaries;
  nationality: Dictionaries;
  race: Dictionaries;
  occupation: Dictionaries;
  gender: Dictionaries;
  document: Dictionaries;
  maritalStatus: Dictionaries;
  bloodType: Dictionaries;
  virologyStatuses: Dictionaries;
  patientStatuses: Dictionaries;
  accessCategories: Dictionaries;
  accessTypes: Dictionaries;
  cvcCategories: Dictionaries;
  instillation: Dictionaries;
  needleSizes: Dictionaries;
  needleTypes: Dictionaries;
  sides: Dictionaries;
  frequency: Dictionaries;
  daysOfWeek: Dictionaries;
  dialyzer: Dictionaries;
  medicationGroup: Dictionaries;
  route: Dictionaries;
  medicationFrequencyAtHome: Dictionaries;
  medicationFrequencyInCenter: Dictionaries;
  medicationFrequencyAll: Dictionaries;
  dialysisDay: Dictionaries;
  meal: Dictionaries;
  anticoagulantType: Dictionaries;
  reuseDialyzerBrand: Dictionaries;
  singleDialyzerBrand: Dictionaries;
  sterilantType: Dictionaries;
  bayNumber: Dictionaries;
  isolationBayNumber: Dictionaries;
  LabOrdersSpecimenTypes: Dictionaries;
  LabOrderTypes: Dictionaries;
  LabOrdersMealStatus: Dictionaries;
  LabResultsTestValues: Dictionaries;
  LabResultsMeasurements: Dictionaries;
  LabResultsTestSetName: Dictionaries;
  procedureType: Dictionaries;
  orderStatus: Dictionaries;
  clinicalNoteType: Dictionaries;
  vaccines: Dictionaries;
  dosingSchedule: Dictionaries;
  doctorSpecialities: Dictionaries;
  Isolations: Dictionaries;
  dialysisMachineCommunicationTypes: Dictionaries;
  dialysisMachineStatuses: Dictionaries;
  dialysisMachineInfectionStatuses: Dictionaries;
  patientHospitalizationReasons: Dictionaries;
  skippingReasons: Dictionaries;
  hospitalizationDetails: Dictionaries;
  staffSpecialities: Dictionaries;
  userRoles: Dictionaries;
  userResponsibilities: Dictionaries;
  addHocEventTypes: Dictionaries;
  labOrderTypeFilter: Dictionaries;
};
export declare const getOptionListFromCatalog: (
  name: Dictionaries,
  disabledOptions?: number[],
) => (
  | {
      label: string;
      value: string;
      disabled: boolean;
    }
  | {
      label: string;
      value: string;
      disabled?: undefined;
    }
)[];
export declare const getCodeValueFromCatalog: (key: keyof typeof DictionariesTranslationsMap, value: string) => string;
