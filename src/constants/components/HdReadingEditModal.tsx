import { WithSx } from '@types';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { convertSxToArray } from '@utils/converters/mui';
import { DialysisHdReadingStepForm } from '@components/modals/ServiceModal/components/DialysisProcedureModal/components/steps/components/DialysisHdReadingStepForm';
import {
  changeHdReadingRecordStatus,
  editDialysisHdReading,
  EditHdReadingPayload,
  selectDialysisHdReadingRecords,
} from '@store/slices';
import { useAppDispatch } from '@hooks/storeHooks';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { useIgnoreFirstRenderEffect } from '@hooks';

export type HdReadingEditModalProps = WithSx<{
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  id: number;
}>;

export const HdReadingEditModal = ({ isOpen, onClose, id, sx = [] }: HdReadingEditModalProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('dialysis');
  const records = selectDialysisHdReadingRecords();
  const recordData = useMemo(() => {
    const rowData = records.find((record) => record.id === id);
    return rowData ? { ...rowData, signedBy: { label: rowData.signedBy, value: rowData.signedById } } : null;
  }, [records]);

  const onSaveEditHdReadingHandler = (payload) => {
    dispatch(editDialysisHdReading(payload as EditHdReadingPayload));
    onClose();
  };

  useIgnoreFirstRenderEffect(() => {
    dispatch(changeHdReadingRecordStatus(isOpen));
  }, [isOpen]);

  return (
    <Modal disableEnforceFocus={true} open={isOpen} data-testid="HdReadingEditModal">
      <Paper
        sx={[
          (theme) => ({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: theme.spacing(89.5),
            maxWidth: theme.spacing(89.5),
            maxHeight: '90%',
            borderRadius: theme.spacing(3),
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.16)',
            overflow: 'hidden',
          }),
          ...convertSxToArray(sx),
        ]}
      >
        <Box
          sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'space-between',
            p: (theme) => theme.spacing(2, 2, 1, 2),
            borderBottom: (theme) => `1px solid ${theme.palette.border.default}`,
          }}
        >
          <Typography variant="headerS">{t('form.editRecording')}</Typography>
          <IconButton onClick={onClose} sx={{ mr: -1, mt: -1 }} data-testid="confirmModalCloseButton">
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: 1,
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DialysisHdReadingStepForm
            onSubmit={onSaveEditHdReadingHandler}
            id={id}
            data={recordData}
            sx={{ p: 0 }}
            onClose={onClose}
          />
        </Box>
      </Paper>
    </Modal>
  );
};

export default HdReadingEditModal;
