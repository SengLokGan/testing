import { patientPermanentFixture } from '@src/tests/fixtures';
import { runSagaHandler } from '@src/tests/utils';
import {
  addSnack,
  changePatientStatus,
  changePatientStatusSuccess,
  changeTreatmentInfo,
  changeTreatmentInfoSuccess,
  getDialysisProcessInfo,
  getDialysisProcessInfoSuccess,
  getPatientClinicalInfoSuccess,
  getPatientDemographics,
  getPatientDemographicsSuccess,
  getPatientIsolationStatus,
  getPatientIsolationStatusSuccess,
  getPatientStatusHistory,
  getPatientStatusHistorySuccess,
  getTreatmentInfo,
  getTreatmentInfoSuccess,
  removeServiceModal,
  setIsServiceEncountered,
} from '@store/slices';
import { ServiceModalName, SnackType } from '@enums/components';
import {
  changePatientStatusSaga,
  changeTreatmentInfoSaga,
  getDialysisProcessInfoSaga,
  getPatientClinicalInfoSaga,
  getPatientDemographicsSaga,
  getPatientIsolationStatusSaga,
  getPatientStatusHistorySaga,
  getTreatmentInfoSaga,
} from '@sagas/patientSaga';
import { PatientHospitalizationReason, PatientStatuses } from '@enums';
import i18n from 'i18next';
import { format } from 'date-fns';
import type { ClinicalInfoResponse } from '@types';
import {
  defaultChangeTreatmentResponse,
  defaultClinicalInfoResponse,
  defaultIsolationGroupsDetectResponse,
  defaultPatientsAppointmentsSummaryResponse,
  defaultPatientsStatusesResponse,
  defaultTreatmentInfoResponse,
} from '@src/tests/server/responses';
import { server } from '@src/tests/server/serverMock';
import { rest } from 'msw';

describe('PatientSaga', () => {
  let dispatched;

  beforeEach(() => {
    dispatched = [];
  });

  describe('PatientSaga.changeTreatmentInfoSaga', () => {
    it("should change patient's treatment info", async () => {
      await runSagaHandler(dispatched, {}, changeTreatmentInfoSaga, {
        type: changeTreatmentInfo.type,
        payload: defaultChangeTreatmentResponse,
      });

      expect(dispatched).toEqual([
        changeTreatmentInfoSuccess({ treatmentInfo: defaultChangeTreatmentResponse } as any),
        {
          type: addSnack.type,
          payload: { type: SnackType.Success, message: i18n.t('patient:modal.patientUpdated') },
        },
      ]);
    });
  });

  describe('PatientSaga.getPatientDemographicsSaga', () => {
    it("should get patient's demographics info", async () => {
      await runSagaHandler(dispatched, {}, getPatientDemographicsSaga, {
        type: getPatientDemographics.type,
        payload: '1',
      });

      expect(dispatched).toEqual([getPatientDemographicsSuccess(patientPermanentFixture({ id: '1' }))]);
    });
  });

  describe('PatientSaga.getPatientClinicalInfoSaga', () => {
    it("should get patient's clinical info", async () => {
      await runSagaHandler(dispatched, {}, getPatientClinicalInfoSaga, {
        type: getPatientClinicalInfoSuccess.type,
        payload: 1,
      });

      expect(dispatched).toEqual([getPatientClinicalInfoSuccess(defaultClinicalInfoResponse)]);
    });

    it("should get patient's clinical info with medical history and format it", async () => {
      server.use(
        rest.get<any, { patientId: string }, ClinicalInfoResponse | {}>(
          `${process.env.DEVELOPMENT_API_TARGET}/pm/patients/:patientId/clinical-info`,
          (req, res, ctx) => {
            return res.once(
              ctx.status(200),
              ctx.json({
                ...defaultClinicalInfoResponse,
                medicalHistory: 'test \\n test',
              }),
            );
          },
        ),
      );
      await runSagaHandler(dispatched, {}, getPatientClinicalInfoSaga, {
        type: getPatientClinicalInfoSuccess.type,
        payload: 1,
      });

      expect(dispatched).toEqual([
        getPatientClinicalInfoSuccess({ ...defaultClinicalInfoResponse, medicalHistory: 'test \n test' }),
      ]);
    });

    it("should get patient's nullable clinical info", async () => {
      server.use(
        rest.get<any, { patientId: string }, ClinicalInfoResponse | {}>(
          `${process.env.DEVELOPMENT_API_TARGET}/pm/patients/:patientId/clinical-info`,
          (req, res, ctx) => {
            return res.once(ctx.status(200), ctx.json({}));
          },
        ),
      );
      await runSagaHandler(dispatched, {}, getPatientClinicalInfoSaga, {
        type: getPatientClinicalInfoSuccess.type,
        payload: 1,
      });

      expect(dispatched).toEqual([getPatientClinicalInfoSuccess(null)]);
    });
  });

  describe('PatientSaga.getTreatmentInfoSaga', () => {
    it("should get patient's treatment info", async () => {
      await runSagaHandler(dispatched, {}, getTreatmentInfoSaga, {
        type: getTreatmentInfo.type,
        payload: 1,
      });

      expect(dispatched).toEqual([getTreatmentInfoSuccess(defaultTreatmentInfoResponse)]);
    });
  });

  describe('PatientSaga.getDialysisProcessInfoSaga', () => {
    it("should get patient's dialysis process info", async () => {
      await runSagaHandler(dispatched, {}, getDialysisProcessInfoSaga, {
        type: getDialysisProcessInfo.type,
        payload: 1,
      });

      expect(dispatched).toEqual([
        setIsServiceEncountered(false),
        getDialysisProcessInfoSuccess(defaultPatientsAppointmentsSummaryResponse),
      ]);
    });
  });

  describe('PatientSaga.getPatientIsolationStatusSaga', () => {
    it('should get patient isolation status', async () => {
      await runSagaHandler(dispatched, {}, getPatientIsolationStatusSaga, {
        type: getPatientIsolationStatus.type,
        payload: 1,
      });

      expect(dispatched).toEqual([getPatientIsolationStatusSuccess(defaultIsolationGroupsDetectResponse)]);
    });
  });

  describe('PatientSaga.getPatientStatusHistorySaga', () => {
    it('should get patient statuses history', async () => {
      await runSagaHandler(dispatched, {}, getPatientStatusHistorySaga, {
        type: getPatientStatusHistory.type,
        payload: 1,
      });

      expect(dispatched).toEqual([getPatientStatusHistorySuccess(defaultPatientsStatusesResponse)]);
    });
  });

  describe('PatientSaga.changePatientStatusSaga', () => {
    const date = format(new Date(), 'yyyy-MM-dd');
    const mockRequestBody = {
      patientId: 1,
      isHistory: true,
      statusId: 1,
      status: PatientStatuses.Hospitalized,
      files: [],
      reason: PatientHospitalizationReason.UNKNOWN,
    };

    it('should change patient history status', async () => {
      await runSagaHandler(dispatched, {}, changePatientStatusSaga, {
        type: changePatientStatus.type,
        payload: mockRequestBody,
      });

      expect(dispatched).toEqual([
        removeServiceModal(ServiceModalName.PatientStatusModal),
        getPatientDemographics(mockRequestBody.patientId.toString()),
        getPatientStatusHistory(mockRequestBody.patientId.toString()),
        changePatientStatusSuccess({
          status: mockRequestBody.status,
          statusId: mockRequestBody.statusId,
          files: mockRequestBody.files,
          reason: mockRequestBody.reason,
          createdAt: date,
          updatedAt: date,
        }),
        addSnack({
          type: SnackType.Success,
          message: i18n.t('patient:snacks.statusHasBeenChanged'),
        }),
      ]);
    });

    it('should change patient first status', async () => {
      await runSagaHandler(dispatched, {}, changePatientStatusSaga, {
        type: changePatientStatus.type,
        payload: { ...mockRequestBody, isHistory: false },
      });

      expect(dispatched).toEqual([
        removeServiceModal(ServiceModalName.PatientStatusModal),
        getPatientDemographics(mockRequestBody.patientId.toString()),
        getPatientStatusHistory(mockRequestBody.patientId.toString()),
        changePatientStatusSuccess({
          status: mockRequestBody.status,
          statusId: 1,
          files: mockRequestBody.files,
          reason: mockRequestBody.reason,
          createdAt: date,
          updatedAt: date,
        }),
        addSnack({
          type: SnackType.Success,
          message: i18n.t('patient:snacks.statusHasBeenChanged'),
        }),
      ]);
    });
  });
});
