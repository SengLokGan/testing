import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { DialysisHdReadingStepForm } from './components/DialysisHdReadingStepForm';
import { DialysisProgressInfoBlockVariants, ServiceModalName, SnackType } from '@enums';
import { DialysisProgressInfoBlock } from '@components/DialysisProgressInfoBlock/DialysisProgressInfoBlock';
import DialysisHdReadingTable from '../tables/DialysisHdReadingTable';
import { HdReadingDataRequest } from '@types';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  addDialysisHdReadingToStorage,
  closeDialysisModal,
  EditHdReadingPayload,
  finishHdClick,
  selectDialysisHdReadingRecords,
  selectDialysisInfoForProgress,
  selectDialysisLoading,
  selectIsDisableInterface,
} from '@store/slices/dialysisSlice';
import { FinishHdModal } from './components/FinishHdModal';
import { GlobalLoader } from '@components/GlobalLoader/GlobalLoader';
import Backdrop from '@mui/material/Backdrop';
import { CannotSaveModal } from './components/CannotSaveModal';
import { Event } from '@services/Event/Event';
import { selectSystemNetworkConnection } from '@store/slices/systemSlice';
import { addSnack, clearAllSnacks } from '@store/slices/snackSlice';
import { removeServiceModal } from '@store/slices';

export const DialysisHdReadingStep = () => {
  const { t: tCommon } = useTranslation('common');
  const [openFinishHdModal, setOpenFinishHdModal] = useState(false);
  const [openCannotSaveModal, setOpenCannotSaveModal] = useState(false);
  const dispatch = useAppDispatch();
  const progressInfo = selectDialysisInfoForProgress();
  const isLoading = selectDialysisLoading();
  const records = selectDialysisHdReadingRecords();
  const isDisabledInterface = selectIsDisableInterface();
  const { backOffline } = selectSystemNetworkConnection();

  const onSubmitHdReadingHandler = (payload: HdReadingDataRequest | EditHdReadingPayload) => {
    dispatch({ type: addDialysisHdReadingToStorage.type, payload });
  };

  useEffect(() => {
    const onCloseDialysisModal = () => {
      if (isDisabledInterface) dispatch(removeServiceModal(ServiceModalName.DialysisProcedureModal));
    };

    Event.subscribe(closeDialysisModal.type, onCloseDialysisModal);
    return () => Event.unsubscribe(closeDialysisModal.type, onCloseDialysisModal);
  }, [isDisabledInterface]);

  useEffect(() => {
    if (backOffline) {
      dispatch(clearAllSnacks());
      dispatch(
        addSnack({
          type: SnackType.Error,
          message: tCommon('saveAfterRestoreConnection'),
          timeout: null,
        }),
      );
    }
  }, [backOffline]);

  useEffect(() => {
    const onFinishHdClick = () => {
      records.length ? setOpenFinishHdModal(true) : setOpenCannotSaveModal(true);
    };
    Event.subscribe(finishHdClick.type, onFinishHdClick);
    return () => Event.unsubscribe(finishHdClick.type, onFinishHdClick);
  }, [records]);

  return (
    <>
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <GlobalLoader />
        </Backdrop>
      )}
      <CannotSaveModal open={openCannotSaveModal} onClose={() => setOpenCannotSaveModal(false)} />
      <FinishHdModal open={openFinishHdModal} onClose={() => setOpenFinishHdModal(false)} />
      <Stack direction={'column'} data-testid="dialysisHdReadingStep">
        {!isDisabledInterface && (
          <Stack direction={'column'} spacing={2} mb={2} mt={2} alignItems="center">
            <DialysisProgressInfoBlock
              variant={DialysisProgressInfoBlockVariants.Standard}
              dialysisProcessInfo={progressInfo}
              sx={{ width: 1, maxWidth: (theme) => theme.spacing(87.125) }}
            />
            <DialysisHdReadingStepForm
              onSubmit={onSubmitHdReadingHandler}
              sx={{ width: 1, maxWidth: (theme) => theme.spacing(87.125) }}
            />
          </Stack>
        )}
        <DialysisHdReadingTable />
      </Stack>
    </>
  );
};
