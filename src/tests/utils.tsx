import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from '../styles/theme';
import createSagaMiddleware, { runSaga, Saga } from 'redux-saga';
import rootSaga from '@sagas/index';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render as rtlRender, RenderOptions, queries } from '@testing-library/react';
import { ServiceModal, Snacks } from '../components';
import systemReducer from '@store/slices/systemSlice';
import userReducer from '@store/slices/userSlice';
import patientReducer from '@store/slices/patientSlice';
import overviewPatientsReducer from '@store/slices/overviewPatientsSlice';
import hdPrescriptionsReducer from '@store/slices/hdPrescriptionSlice';
import todayPatientsReducer from '@store/slices/todayPatientsSlice';
import initReducer from '@store/slices/initSlice';
import snackReducer from '@store/slices/snackSlice';
import notificationReducer from '@store/slices/notificationSlice';
import drawerReducer from '@store/slices/drawerSlice';
import medicationsReducer from '@store/slices/medicationSlice';
import serviceModalReducer from '@store/slices/serviceModalSlice';
import dialysisReducer from '@store/slices/dialysisSlice';
import labOrdersReducer from '@store/slices/labOrdersSlice';
import vascularAccessReportsReducer from '@store/slices/reports/vascularAccessReportsSlice';
import patientCensusReportReducer from '@store/slices/reports/patientCensusReportsSlice';
import labResultsReducer from '@store/slices/labResultsSlice';
import clinicalNotesReducer from '@store/slices/clinicalNotesSlice';
import accessManagementReducer from '@store/slices/accessManagementSlice';
import vaccinationReducer from '@store/slices/vaccinationSlice';
import patientsScheduleReducer from '../store/slices/schedules/patientsScheduleSlice';
import dialysisMachinesReducer from '@store/slices/dialysisMachines';
import mortalityReportsReducer from '@store/slices/reports/mortalityReportsSlice';
import hospitalizationReportsReducer from '@store/slices/reports/hospitalizationReportsSlice';
import { waitFor } from '@testing-library/dom';
import { Action } from 'redux';
import injectionReportsReducer from '@src/store/slices/reports/injectionReportsSlice';
import patientStationHistoryReportReducer from '@store/slices/reports/patientStationHistorySlice';

type WrapperProps = {
  children?: ReactNode;
};

interface RenderTestsProps {
  preloadedState?: any;
  store?: any;
}

function render(
  ui: ReactElement,
  { preloadedState, store = getTestStore(preloadedState), ...renderOptions }: RenderTestsProps = {},
) {
  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Provider store={store}>
              <ServiceModal />
              <Snacks />
              {children}
            </Provider>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions } as RenderOptions<typeof queries>);
}

export { render };

const sagaMiddleware = createSagaMiddleware();

export function getTestStore(preloadedState) {
  const store = configureStore({
    reducer: combineReducers({
      system: systemReducer,
      user: userReducer,
      patient: patientReducer,
      overviewPatients: overviewPatientsReducer,
      hdPrescriptions: hdPrescriptionsReducer,
      todayPatients: todayPatientsReducer,
      init: initReducer,
      snack: snackReducer,
      notification: notificationReducer,
      drawer: drawerReducer,
      medications: medicationsReducer,
      vaccination: vaccinationReducer,
      serviceModal: serviceModalReducer,
      dialysis: dialysisReducer,
      labOrders: labOrdersReducer,
      vascularAccessReports: vascularAccessReportsReducer,
      patientCensusReport: patientCensusReportReducer,
      labResults: labResultsReducer,
      clinicalNotes: clinicalNotesReducer,
      accessManagement: accessManagementReducer,
      patientsSchedule: patientsScheduleReducer,
      dialysisMachines: dialysisMachinesReducer,
      mortalityReports: mortalityReportsReducer,
      injectionReports: injectionReportsReducer,
      hospitalizationReports: hospitalizationReportsReducer,
      patientStationHistoryReport: patientStationHistoryReportReducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: false,
      }).concat(sagaMiddleware),
    preloadedState,
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

export async function changeSelectValue(element: HTMLElement, value: string) {
  const select = await waitFor(() => element);
  fireEvent.change(select, { target: { value } });
}

export const RenderHookWrapper = ({ children, ...props }: PropsWithChildren<any>) => (
  <Provider {...props}>{children}</Provider>
);

export const runSagaHandler = (dispatched, state, saga, ...args) => {
  return runSaga(
    {
      dispatch: (action) => dispatched.push(action as Action),
      getState: () => state,
    },
    saga as Saga,
    ...args,
  ).toPromise();
};
