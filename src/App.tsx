import './i18n';
import React, { lazy, Suspense, useEffect } from 'react';
import useNavigatorOnline from 'use-navigator-online';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import { globalStyles } from './styles';
import { PatientProfile, PatientsOverview, Reports, TodayPatients } from './pages';
import { useAppDispatch, useCheckPageActivity, useCheckTokenStorage, useCheckUserActivity } from './hooks';
import { appInit, selectInitLoading } from '@store/slices/initSlice';
import { GlobalLoader, ProtectedRoute, ServiceModal, Snacks } from './components';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DialysisMachineLayout,
  MainLayout,
  PatientContentContainer,
  ReportsLayout,
  StaffContentContainer,
} from './containers';
import { MINUTE, ROUTES } from '@constants';
import { getRoutePermissions } from '@utils';
import { HdPrescription } from '@pages/PatientProfile/subPages/HdPrescription/HdPrescription';
import { UserProfileSettings } from '@pages/UserProfileSettings/UserProfileSettings';
import { DrawerWrapper as Drawer } from './containers/layouts/Drawer/DrawerWrapper';
import { Medications } from '@pages/PatientProfile/subPages/Medications/Medications';
import { Vaccination } from '@pages/PatientProfile/subPages/Vaccination/Vaccination';
import { systemDispatch, systemUpdateNetworkConnection } from '@store/slices/systemSlice';
import { LabResults } from '@pages/PatientProfile/subPages/LabResults/LabResults';
import { LabOrders } from '@pages/LabOrders/LabOrders';
import { Administration } from '@pages/Administration/Administration';
import { ClinicalNotes } from '@pages/PatientProfile/subPages/ClinicalNotes/ClinicalNotes';
import { AccessManagement } from '@pages/PatientProfile/subPages/AccessManagement/AccessManagement';
import { Event } from '@services/Event/Event';
import { PayloadAction } from '@reduxjs/toolkit';
import { AdministrationLayout } from '@containers/layouts/Admnistration/AdministrationLayout';
import { Schedule } from '@pages/Schedule/Schedule';
import { RemoteWrapper } from '@components/RemoteWrapper/RemoteWrapper';
import { runSaga, store } from '@store';
import { ScheduleLayout } from '@containers/layouts/ScheduleLayout/ScheduleLayout';
import { PatientsSchedule } from '@pages/Schedule/subPages/PatientsSchedule';
import { ClinicalSchedule } from '@pages/Schedule/subPages/ClinicalSchedule';
import { EventsName } from '@enums/global/EventsName';
import { DialysisMachines } from '@pages/Administration/subPages/DialysisMachines/DialysisMachines';
import { DialysisMachineInformation } from '@pages/Administration/subPages/DialysisMachines/subPages/DialysisMachineInformation';
import { DialysisMachineHistoryLog } from '@pages/Administration/subPages/DialysisMachines/subPages/DialysisMachineHistoryLog';
import { StaffManagement } from '@pages/Administration/subPages/StaffManagemet/StaffManagement';
import rootSaga from '@sagas';
import type { RemoteModule, RemoteModuleProps } from '@types';
import { StaffProfile } from '@pages/Administration/subPages/StaffProfile/StaffProfile';
import { VascularAccessReports } from '@pages/Reports/subPages/clinicalReports/VascularAccessReports';
import { PatientCensusReports } from '@pages/Reports/subPages/administrativeReports/PatientCensusReports';
import { MortalityReports } from '@pages/Reports/subPages/administrativeReports/MortalityReports';
import { InjectionHistoryReports } from '@pages/Reports/subPages/clinicalReports/InjectionHistoryReports';
import { HospitalizationReports } from '@pages/Reports/subPages/administrativeReports/HospitalizationReports';
import { PatientStationHistoryReport } from '@pages/Reports/subPages/administrativeReports/PatientStationHistoryReport';


const App = () => {
  const dispatch = useAppDispatch();
  const isInitLoading = selectInitLoading();
  const { showRoute } = getRoutePermissions();
  const { isOnline, isOffline, backOnline, backOffline } = useNavigatorOnline();

  useCheckUserActivity();
  useCheckPageActivity();
  useCheckTokenStorage();

  useEffect(() => {
    runSaga(rootSaga);
    dispatch(appInit());
  }, []);

  useEffect(() => {
    const onSystemDispatch = (action: PayloadAction<any>) => {
      if (action && action.type) dispatch(action);
    };
    Event.subscribe(systemDispatch.type, onSystemDispatch);

    let tickCount = 1;
    let timerId = setInterval(() => {
      Event.fire(EventsName.TimerTick, tickCount);
      tickCount = tickCount === 59 ? 1 : tickCount + 1;
    }, MINUTE);

    return () => {
      Event.unsubscribe(systemDispatch.type, onSystemDispatch);
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (backOnline || backOffline) {
      if (backOffline) {
        localStorage.setItem('lastPageActivityTimeStamp', JSON.stringify(new Date().getTime()));
      }
      dispatch({
        type: systemUpdateNetworkConnection.type,
        payload: {
          isOnline,
          isOffline,
          backOnline,
          backOffline,
        },
      });
    }
  }, [backOnline, backOffline]);

  if (isInitLoading)
    return (
      <ThemeProvider theme={theme}>
        {globalStyles}
        <GlobalLoader invisible />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>

          <Suspense fallback={<GlobalLoader />}>
            <MainLayout>
              <Snacks />
              <Drawer />
              <ServiceModal />
              <Routes>
                <Route
                  path={ROUTES.main}
                  element={
                    <ProtectedRoute isAllowed={showRoute.todayPatients}>
                      <TodayPatients />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.labOrders}
                  element={
                    <ProtectedRoute isAllowed={showRoute.labOrders}>
                      <LabOrders />
                    </ProtectedRoute>
                  }
                />
                <Route path={ROUTES.patientsOverview}>
                  <Route
                    index
                    element={
                      <ProtectedRoute isAllowed={showRoute.patientsOverview}>
                        <PatientsOverview />
                      </ProtectedRoute>
                    }
                  />
                  <Route path=":id" element={<PatientContentContainer fullHeight sx={{ width: 1 }} />}>
                    <Route index element={<Navigate to={ROUTES.patientProfile} replace />} />
                    <Route path={ROUTES.patientProfile} element={<PatientProfile />} />
                    <Route
                      path={ROUTES.patientClinicalNotes}
                      element={
                        <ProtectedRoute isAllowed={showRoute.clinicalNotes}>
                          <ClinicalNotes />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.patientHdPrescription}
                      element={
                        <ProtectedRoute isAllowed={showRoute.patientHdPrescription}>
                          <HdPrescription />
                        </ProtectedRoute>
                      }
                    />
                    <Route path={ROUTES.patientLabResults} element={<LabResults />} />
                    <Route
                      path={ROUTES.patientMedication}
                      element={
                        <ProtectedRoute isAllowed={showRoute.patientMedication}>
                          <Medications />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.patientVaccination}
                      element={
                        <ProtectedRoute isAllowed={showRoute.patientVaccination}>
                          <Vaccination />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.accessManagement}
                      element={
                        <ProtectedRoute isAllowed={showRoute.accessManagement}>
                          <AccessManagement />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<Navigate to="." replace />} />
                  </Route>
                </Route>
                <Route path={ROUTES.reports} element={<ReportsLayout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoute isAllowed={showRoute.reports}>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route path={ROUTES.clinicalReports}>
                    <Route
                      path={ROUTES.vascularAccessReport}
                      element={
                        <ProtectedRoute isAllowed={showRoute.vascularAccessReport}>
                          <VascularAccessReports />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.injectionHistoryReport}
                      element={
                        <ProtectedRoute isAllowed={showRoute.injectionReport}>
                          <InjectionHistoryReports />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                  <Route path={ROUTES.administrativeReports}>
                    <Route
                      path={ROUTES.patientCensusReport}
                      element={
                        <ProtectedRoute isAllowed={showRoute.patientCensusReport}>
                          <PatientCensusReports />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.mortalityReport}
                      element={
                        <ProtectedRoute isAllowed={showRoute.mortalityReport}>
                          <MortalityReports />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.hospitalizationReport}
                      element={
                        <ProtectedRoute isAllowed={showRoute.hospitalizationReport}>
                          <HospitalizationReports />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={ROUTES.patientStationHistoryReport}
                      element={
                        <ProtectedRoute isAllowed={showRoute.patientStationHistoryReport}>
                          <PatientStationHistoryReport />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                </Route>
                <Route path={ROUTES.userProfileSettings} element={<UserProfileSettings />} />
                <Route path={ROUTES.administration}>
                  <Route
                    index
                    element={
                      <ProtectedRoute isAllowed={showRoute.administration}>
                        <AdministrationLayout>
                          <Administration />
                        </AdministrationLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route path={ROUTES.dialysisMachines}>
                    <Route
                      index
                      element={
                        <ProtectedRoute isAllowed={showRoute.dialysisMachines}>
                          <DialysisMachines />
                        </ProtectedRoute>
                      }
                    />
                    <Route path=":id" element={<DialysisMachineLayout />}>
                      <Route path={ROUTES.dialysisMachineInformation} element={<DialysisMachineInformation />} />
                      <Route path={ROUTES.dialysisMachineHistoryLog} element={<DialysisMachineHistoryLog />} />
                    </Route>
                  </Route>
                  <Route path={ROUTES.staffManagement}>
                    <Route
                      index
                      element={
                        <ProtectedRoute isAllowed={showRoute.staffManagement}>
                          <StaffManagement />
                        </ProtectedRoute>
                      }
                    />
                    <Route path=":id" element={<StaffContentContainer fullHeight />}>
                      <Route index element={<Navigate to={ROUTES.staffProfile} replace />} />
                      <Route
                        path={ROUTES.staffProfile}
                        element={
                          <ProtectedRoute isAllowed={showRoute.staffProfile}>
                            <StaffProfile />
                          </ProtectedRoute>
                        }
                      />
                    </Route>
                    <Route path="*" element={<Navigate to={'.'} />} />
                  </Route>
                </Route>
                <Route path={ROUTES.schedule}>
                  <Route
                    index
                    element={
                      <ProtectedRoute isAllowed={showRoute.schedule}>
                        <ScheduleLayout>
                          <Schedule />
                        </ScheduleLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.patients}
                    element={
                      <ProtectedRoute isAllowed={showRoute.schedule}>
                        <PatientsSchedule />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.clinical}
                    element={
                      <ProtectedRoute isAllowed={showRoute.schedule}>
                        <ClinicalSchedule />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Routes>
            </MainLayout>
          </Suspense>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
