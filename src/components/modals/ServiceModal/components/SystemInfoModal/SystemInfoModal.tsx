import { useAppDispatch, useSystemVersion } from '@hooks';
import { removeServiceModal } from '@store';
import { ServiceModalName } from '@enums';
import { ServiceModalProps } from '@types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from 'react-i18next';
import { PropsWithChildren, useCallback } from 'react';
import { capitalize } from '@utils/capitalize';
import logo from '@assets/logo.svg';

const SystemInfoModal = ({ index }: ServiceModalProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const { t: tModal } = useTranslation('common', { keyPrefix: 'systemInfoModal' });

  const { mainVersion, hashVersion, buildVersion } = useSystemVersion();

  const InfoTitle = useCallback(
    (props: PropsWithChildren) => (
      <Typography variant="labelL" mb={0}>
        {props.children}:
      </Typography>
    ),
    [],
  );

  const InfoContent = useCallback(
    (props: PropsWithChildren) => (
      <Typography variant="paragraphM" sx={{ '&:not(:last-child)': { mb: 2 } }}>
        {props.children}
      </Typography>
    ),
    [],
  );

  const onCloseHandler = () => {
    dispatch(removeServiceModal(ServiceModalName.SystemInfoModal));
  };

  return (
    <Dialog
      open
      disableEnforceFocus
      onClose={onCloseHandler}
      data-testid="systemInfoModal"
      sx={{ zIndex: index, width: 1 }}
    >
      <Box
        sx={({ spacing }) => ({
          m: 0,
          p: 2,
          width: 1,
          maxWidth: spacing(87),
        })}
      >
        <Typography variant="headerS">{capitalize(`${t('about')} ${t('appName')}`)}</Typography>
        <IconButton
          onClick={onCloseHandler}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.icon.main,
          }}
          data-testid="closeIcon"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent
        dividers
        sx={{ p: 2, display: 'flex', flexDirection: 'column', maxHeight: (theme) => theme.spacing(60) }}
      >
        <InfoContent>
          <img src={logo} alt="logo" width={87} height={24} />
        </InfoContent>

        <InfoTitle>{tModal('productName')}</InfoTitle>
        <InfoContent>{t('appName')}</InfoContent>

        <InfoTitle>{tModal('udipi')}</InfoTitle>
        <InfoContent>{`${t('appName')}.${mainVersion}${
          buildVersion ? `.${buildVersion}` : ''
        } ${hashVersion}`}</InfoContent>

        <InfoTitle>{tModal('legalManufacturer')}</InfoTitle>
        <InfoContent>{tModal('renalWorksPteLtd')}</InfoContent>

        <InfoTitle>{tModal('legalAddress')}</InfoTitle>
        <InfoContent>{tModal('renalFullAddress')}</InfoContent>

        <InfoTitle>{tModal('arName')}</InfoTitle>
        <InfoContent>{tModal('renalWorksName')}</InfoContent>

        <InfoTitle>{tModal('arAddress')}</InfoTitle>
        <InfoContent>{tModal('renalWorksAddress')}</InfoContent>

        <InfoTitle>{tModal('establishmentLicenseNo')}</InfoTitle>
        <InfoContent>MDA-4587-W123</InfoContent>

        <InfoTitle>{tModal('medicalDeviceIndication')}</InfoTitle>
        <InfoContent>{tModal('rims2IsASoftware')}</InfoContent>

        <InfoContent>{tModal('2023RenalWorksPteLtdAllRightsReserved')}</InfoContent>
      </DialogContent>
    </Dialog>
  );
};

export default SystemInfoModal;
