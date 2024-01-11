import { Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { DiscontinueHdPrescriptionForm } from '@types';
import { FormDatePicker, FormInputText } from '@components/FormComponents';
import { validatorMaxLength } from '@validators/validatorMaxLength';
import { validatorLatinLettersNumberCharacters } from '@validators/validatorLatinLettersNumbersCharacters';
import { useAppDispatch } from '@hooks/storeHooks';
import { discontinueHdPrescription, selectHdPrescriptionSubmitting } from '@store/slices';
import { dateToServerFormat } from '@utils/dateFormat';
import { useParams } from 'react-router-dom';
import { getTenantDate } from '@utils/getTenantDate';

type DiscontinueHdPrescriptionModalProps = {
  onClose: () => void;
  prescriptionId: string;
};

const DIALOG_WIDTH = '346px';
export const DiscontinueHdPrescriptionModal = ({ onClose, prescriptionId }: DiscontinueHdPrescriptionModalProps) => {
  const { t } = useTranslation('hdPrescription');
  const { t: tCommon } = useTranslation('common');
  const isSubmitting = selectHdPrescriptionSubmitting();
  const { id: patientId } = useParams();
  const dispatch = useAppDispatch();

  const defaultValues = {
    date: getTenantDate(),
    reason: '',
  };

  const { handleSubmit, control } = useForm<DiscontinueHdPrescriptionForm>({
    mode: 'onBlur',
    defaultValues,
    shouldFocusError: true,
  });
  const onSubmit = (data) => {
    dispatch(
      discontinueHdPrescription({
        date: dateToServerFormat(data.date),
        reason: data.reason,
        patientId: patientId!,
        prescriptionId,
      }),
    );
  };
  return (
    <Dialog open onClose={onClose} data-testid="discontinueHdPrescriptionModal" maxWidth="xs">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="labelL">{`${t('modals.discontinue.discontinueHd')}`}</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            data-testid="closeButton"
            sx={{
              color: (theme) => theme.palette.icon.main,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ width: DIALOG_WIDTH }}>
        <Stack direction="column" spacing={4}>
          <Stack direction="column" spacing={2}>
            <FormDatePicker control={control} name="date" label={t('form.discontinueDate')} required isDisabled />
            <FormInputText
              control={control}
              name="reason"
              label={t('form.reason')}
              multiline
              rules={{
                maxLength: validatorMaxLength(0, 500),
                pattern: validatorLatinLettersNumberCharacters(),
              }}
            />
          </Stack>
          <Stack direction="column" spacing={2}>
            <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={onClose} variant="outlined" data-testid="cancelDiscontinueHdPrescriptionModalButton">
                {tCommon('button.cancel')}
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                disabled={isSubmitting}
                data-testid="saveDiscontinueHdPrescriptionModalButton"
              >
                {tCommon('button.discontinue')}
                {isSubmitting && <CircularProgress size="20px" color="inherit" sx={{ ml: 1 }} />}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
