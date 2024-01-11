import { useCallback, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAppDispatch } from '@hooks/storeHooks';
import { selectServiceModal } from '@store/slices/serviceModalSlice';
import { GlobalLoader } from '@components/GlobalLoader/GlobalLoader';
import { getInitDialysisData, selectDialysisPatient, selectDialysisStatus } from '@store/slices/dialysisSlice';
import { Header } from './components/Header';
import { DialysisServicesStep } from './components/steps/DialysisServicesStep';
import { DialysisPreHdStep } from './components/steps/DialysisPreHdStep';
import { DialysisHdReadingStep } from './components/steps/DialysisHdReadingStep';
import { DialysisPostHdStep } from './components/steps/DialysisPostHdStep';
import { ServiceModalProps } from '@types';
import { ServiceModalName, DialysisStatus } from '@enums';
import { footerHeight } from '@constants';

const DialysisProcedureModal = ({ index }: ServiceModalProps) => {
  const { appointmentId, openOnStep } = selectServiceModal(ServiceModalName.DialysisProcedureModal);
  const patient = selectDialysisPatient();
  const status = selectDialysisStatus();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appointmentId) {
      dispatch(getInitDialysisData({ appointmentId, openOnStep }));
    }
  }, [appointmentId, openOnStep]);

  const CurrentStep = useCallback(() => {
    switch (status.currentStep) {
      case DialysisStatus.Cancelled:
      case DialysisStatus.CheckIn:
        return <DialysisServicesStep />;
      case DialysisStatus.PreDialysis:
        return <DialysisPreHdStep />;
      case DialysisStatus.HDReading:
        return <DialysisHdReadingStep />;
      case DialysisStatus.PostDialysis:
        return <DialysisPostHdStep />;
      default:
        return null;
    }
  }, [status.currentStep]);

  return (
    <Modal disableEnforceFocus open hideBackdrop data-testid="dialysisProcedureModal" sx={{ zIndex: index }}>
      <Paper
        square
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: { xs: 0, sm: theme.spacing(footerHeight) },
          backgroundColor: theme.palette.background.default,
        })}
      >
        {patient && status ? (
          <Box sx={{ height: 1 }}>
            <Header patient={patient} status={status} />
            <Box
              sx={(theme) => ({
                width: 1,
                height: `calc(100% - ${theme.spacing(13.75)})`,
                overflow: 'auto',
              })}
              data-testid="dialysisProcedureModalStep"
            >
              <CurrentStep />
            </Box>
          </Box>
        ) : (
          <GlobalLoader />
        )}
      </Paper>
    </Modal>
  );
};

export default DialysisProcedureModal;
