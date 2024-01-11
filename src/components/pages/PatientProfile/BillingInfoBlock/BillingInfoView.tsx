import Stack from '@mui/material/Stack';
import type { BillingInformation } from '@types';
import { useTranslation } from 'react-i18next';
import { billingInformationFields } from '@constants';
import { StyledPatientRowStack } from '@components';
import Typography from '@mui/material/Typography';
import { currencyFormatter, dateFormat } from '@utils';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { sub, isAfter } from 'date-fns';
import ErrorIcon from '@mui/icons-material/Error';

const checkExpDate = (date) => {
  return isAfter(Date.now(), sub(new Date(date), { months: 6 }));
};

type BillingInfoProps = {
  billingInformation: BillingInformation;
};

export const BillingInfoView = ({ billingInformation }: BillingInfoProps) => {
  const { t } = useTranslation('patient');

  const showFieldValue = (field: string) => {
    switch (field) {
      case 'payorInsurances':
        return (
          <div key={field}>
            {billingInformation?.payorInsurances &&
              billingInformation.payorInsurances.map((item, index) => (
                <StyledPatientRowStack direction="row" spacing={2} key={`${field}${index}`}>
                  <Typography variant="labelM" sx={{ whiteSpace: 'pre' }}>{`${t(`profile.${field}`)} ${
                    index + 1
                  }`}</Typography>
                  <Stack spacing={2} sx={{ flex: 1 }}>
                    <Typography variant="labelM" sx={{ flex: 1 }}>
                      {item?.name ? item.name : '—'}
                    </Typography>
                    {item?.files.map((file) => (
                      <Stack spacing={2} direction="row" justifyContent="space-between" key={file.link}>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <AttachFileIcon sx={(theme) => ({ color: theme.palette.text.secondary })} color="action" />
                          <a href={file.link}>{file.name}</a>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          {checkExpDate(file.expDate) && <ErrorIcon color="error" />}
                          <Typography
                            variant="labelS"
                            sx={(theme) => ({
                              color: checkExpDate(file.expDate)
                                ? theme.palette.error.main
                                : theme.palette.text.secondary,
                              whiteSpace: 'nowrap',
                            })}
                          >
                            {`Exp. ${dateFormat(file.expDate)}`}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                    <Typography variant="labelM" sx={{ flex: 1, whiteSpace: 'pre-wrap' }}>
                      {item?.comments ? item.comments : '—'}
                    </Typography>
                  </Stack>
                </StyledPatientRowStack>
              ))}
          </div>
        );
      case 'depositAmount':
        return (
          <StyledPatientRowStack direction="row" spacing={2} key={field}>
            <Typography variant="labelM">{t(`profile.${field}`)}</Typography>
            <Typography variant="labelM" sx={{ flex: 1 }}>
              {billingInformation?.[field] ? `$ ${currencyFormatter(billingInformation[field])}` : '—'}
            </Typography>
          </StyledPatientRowStack>
        );
      default:
        return (
          <StyledPatientRowStack direction="row" spacing={2} key={field}>
            <Typography variant="labelM">{t(`profile.${field}`)}</Typography>
            <Typography variant="labelM" sx={{ flex: 1 }}>
              {billingInformation?.[field] ? billingInformation[field] : '—'}
            </Typography>
          </StyledPatientRowStack>
        );
    }
  };

  return (
    <Stack direction="column" spacing={1}>
      {billingInformationFields.map((field) => showFieldValue(field))}
    </Stack>
  );
};
