import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from '@utils/capitalize';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FormAutocompleteFreeSoloAsync, FormDatePicker, FormInputText } from '@components';
import { InputTextType, DoctorTypes } from '@enums';
import type { Medication, DiscontinueMedicationForm } from '@types';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useDoctor } from '@hooks';
import { format, startOfDay } from 'date-fns';
import { discontinueMedication, selectMedications, selectMedicationsLoading } from '@store';
import { useParams } from 'react-router-dom';
import {
  validatorMinDate,
  validatorMaxLength,
  validatorRequired,
  validatorLatinLettersNumberCharacters,
  validatorAutocompletePattern,
  validatorAutocompleteMinLength,
  validatorAutocompleteMaxLength,
  validatorAutocompleteRequired,
  validatorLatinLettersSpecialCharacters,
  validatorIsValidDate,
} from '@validators';

type DiscontinueMedicationModalProps = {
  onClose: () => void;
  medication: Medication;
  medicationId: string;
  prescriptionDate: Date | string;
};
export const DiscontinueMedicationModal = ({
  onClose,
  medication,
  medicationId,
  prescriptionDate,
}: DiscontinueMedicationModalProps) => {
  const { t } = useTranslation('medications');
  const { t: tCommon } = useTranslation('common');
  const isSubmitting = selectMedicationsLoading();
  const medications = selectMedications();
  const { id } = useParams();
  const selectedDoctor = medications.find((medication) => medicationId === medication.id)?.doctor;

  const dispatch = useAppDispatch();

  const defaultValues = {
    orderedBy: '',
    date: new Date(),
    reason: '',
  };

  const { handleSubmit, control, watch, trigger } = useForm<DiscontinueMedicationForm>({
    mode: 'onBlur',
    defaultValues,
    shouldFocusError: true,
  });

  const { isExternalDoctor } = useDoctor(null, watch('orderedBy'), selectedDoctor);

  const onSubmit = (data) => {
    dispatch(
      discontinueMedication({
        orderedBy: {
          source: isExternalDoctor ? DoctorTypes.External : DoctorTypes.Internal,
          internalDoctorId: !isExternalDoctor ? data.orderedBy.specialities[0].id : undefined,
          name: isExternalDoctor ? capitalizeFirstLetter(data.orderedBy.label) : undefined,
        },
        date: format(data.date, 'yyyy-MM-dd'),
        reason: data.reason,
        medicationId,
        patientId: id!,
      }),
    );
  };

  return (
    <Dialog open onClose={onClose} data-testid="discontinueMedicationModal" maxWidth="xs">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="labelL">{`${t('button.discontinue')} ${capitalizeFirstLetter(
            medication.name,
          )}`}</Typography>
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
      <DialogContent dividers>
        <Stack direction="column" spacing={4}>
          <Stack direction="column" spacing={2}>
            <FormAutocompleteFreeSoloAsync
              required
              capitalizedLabel
              name="orderedBy"
              trigger={trigger}
              control={control}
              label={t('form.orderedBy')}
              textType={InputTextType.Capitalize}
              getOptionsUrl="/pm/doctors?name="
              optionsTransform={(doctors) => [
                ...doctors
                  .reduce((map, doctor) => {
                    if (doctor.deleted) return map;
                    map.set(doctor.id, {
                      label: doctor.name,
                      value: undefined,
                      specialities: doctor.specialities,
                    });
                    return map;
                  }, new Map())
                  .values(),
              ]}
              rules={{
                required: validatorAutocompleteRequired(),
                pattern: validatorAutocompletePattern(validatorLatinLettersSpecialCharacters()),
                minLength: validatorAutocompleteMinLength(1, 100, 'label'),
                maxLength: validatorAutocompleteMaxLength(1, 100, 'label'),
              }}
            />
            <FormDatePicker
              control={control}
              name="date"
              label={t('form.discontinueDate')}
              required
              minDate={startOfDay(new Date(prescriptionDate))}
              rules={{
                required: validatorRequired(),
                validate: {
                  isValid: validatorIsValidDate,
                  minDate: validatorMinDate(
                    startOfDay(new Date(prescriptionDate)),
                    tCommon(`validation.enteredDateShouldNotBeEarlyThan`, { date: t('prescribedDate') }),
                  ),
                },
              }}
            />
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
              <Button onClick={onClose} variant="outlined" data-testid="cancelDiscontinueMedicationModalButton">
                {tCommon('button.cancel')}
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                disabled={isSubmitting}
                data-testid="saveDiscontinueMedicationModalButton"
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
