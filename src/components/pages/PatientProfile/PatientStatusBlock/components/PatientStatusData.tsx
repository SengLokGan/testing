import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { DataRow } from '@components';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import type { PatientStatus } from '@types';
import { Dictionaries } from '@utils/getOptionsListFormCatalog';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { format } from 'date-fns';
import { PatientStatusFiles } from '@components/pages/PatientProfile/PatientStatusBlock/components/PatientStatusFiles';
import { PatientStatuses } from '@enums/global';
import ErrorIcon from '@mui/icons-material/Error';
import { ReactNode, useMemo } from 'react';
import { PermissionGuard } from '@guards';
import { UserPermissions } from '@enums';

type PatientStatusDataProps = {
  patientId: string | number;
  patientStatusData: PatientStatus;
  isCurrentStatus: boolean;
  isFirstStatus: boolean;
  onChangePatientStatus: (patientStatusData: PatientStatus) => void;
};

export const PatientStatusData = ({
  patientId,
  patientStatusData,
  isCurrentStatus,
  isFirstStatus,
  onChangePatientStatus,
}: PatientStatusDataProps) => {
  const { t: tPatientStatusResponses } = useTranslation(Dictionaries.PatientHospitalizationReasons);
  const { t: tPatientStatuses } = useTranslation(Dictionaries.PatientStatuses);
  const { t: tPatientHospitalizationDetails } = useTranslation(Dictionaries.HospitalizationDetails);
  const { t } = useTranslation('patient', { keyPrefix: 'patientStatusBlock' });
  const patientStatus = patientStatusData.status;

  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const patientStatusFilesTitle = useMemo(() => {
    if (patientStatusData.status === PatientStatuses.Permanent) return t('virologyStatus');
    else if (patientStatusData.status === PatientStatuses.Dead) return t('deathCertificateOrOtherProof');
    return t('dischargeNotes');
  }, [patientId, patientStatusData]);

  const noInfoIcon = useMemo(
    () => (
      <ErrorIcon
        sx={[
          { color: (theme) => theme.palette.error.main, pointerEvents: 'none' },
          isXs && { width: '13px', height: '13px', mb: '-2px' },
        ]}
      />
    ),
    [isXs],
  );

  const hospitalClinicValue = useMemo(() => {
    const value = patientStatus === PatientStatuses.Hospitalized && patientStatusData?.clinic;
    return isXs ? value : value || noInfoIcon;
  }, [isXs, patientStatus, patientStatusData]);

  return (
    <Box
      sx={({ palette }) => ({
        py: 1,
        px: isXs ? 2 : 3,
        borderTop: `solid 1px ${palette.border?.default}`,
        '& .dataRowFirstItem': {
          textAlign: isXs ? 'left' : 'right',
        },
        '& .dataRowThirdItem': {
          display: 'flex',
          justifyContent: 'flex-end',
        },
      })}
      data-testid={`patientStatusData${patientStatus}`}
    >
      <DataRow
        isCompact={isXs}
        title={t(isCurrentStatus ? 'currentStatus' : 'status')}
        value={tPatientStatuses(patientStatus)}
        additionalValue={
          !isFirstStatus ? (
            <PermissionGuard permissions={UserPermissions.PatientEditProfile}>
              <EditOutlinedIcon
                onClick={() => onChangePatientStatus(patientStatusData)}
                sx={[{ cursor: 'pointer' }, isXs && { position: 'absolute', right: 0, top: 0 }]}
              />
            </PermissionGuard>
          ) : null
        }
        sx={rowSx(isXs)}
      />
      <DataRow
        isCompact={isXs}
        skipEmpty
        title={t('reason')}
        value={
          !isFirstStatus &&
          patientStatusData?.reason &&
          patientStatus === PatientStatuses.Hospitalized &&
          tPatientStatusResponses(patientStatusData?.reason)
        }
        sx={rowSx(isXs)}
      />
      <DataRow
        isCompact={isXs}
        skipEmpty
        title={t('details')}
        value={
          !isFirstStatus &&
          patientStatusData?.details &&
          patientStatusData?.reason &&
          patientStatus === PatientStatuses.Hospitalized &&
          tPatientHospitalizationDetails(`${patientStatusData?.reason}.${patientStatusData?.details}`)
        }
        sx={rowSx(isXs)}
      />
      <DataRow
        isCompact={isXs}
        skipEmpty
        title={t('modified')}
        value={patientStatusData?.updatedAt ? format(new Date(patientStatusData.updatedAt), 'yyyy-MM-dd') : null}
        sx={rowSx(isXs)}
      />
      {!patientStatusData.updatedAt && (
        <DataRow
          isCompact={isXs}
          skipEmpty
          title={t('created')}
          value={patientStatusData?.createdAt ? format(new Date(patientStatusData.createdAt), 'yyyy-MM-dd') : null}
          sx={rowSx(isXs)}
        />
      )}

      {patientStatus === PatientStatuses.Dead && patientStatusData?.dateDeath && (
        <DataRow
          isCompact={isXs}
          skipEmpty
          title={t('dateOfDeath')}
          value={patientStatusData?.dateDeath ? format(new Date(patientStatusData.dateDeath), 'yyyy-MM-dd') : null}
          sx={rowSx(isXs)}
        />
      )}
      <DataRow
        isCompact={isXs}
        skipEmpty
        title={t('dateOfReturn')}
        value={
          !isFirstStatus && patientStatusData?.returningDate
            ? format(new Date(patientStatusData.returningDate), 'yyyy-MM-dd')
            : null
        }
        sx={rowSx(isXs)}
      />
      <DataRow
        isCompact={isXs}
        skipEmpty
        title={
          isXs ? (
            <>
              {t('hospitalClinic')} {noInfoIcon}
            </>
          ) : (
            t('hospitalClinic')
          )
        }
        value={hospitalClinicValue}
        sx={rowSx(isXs)}
      />
      <DataRow
        isCompact={isXs}
        title={patientStatus === PatientStatuses.Dead ? t('causeOfDeath') : t('comment')}
        skipEmpty={isFirstStatus}
        value={patientStatusData?.comment}
        sx={rowSx(isXs)}
      />

      {!isFirstStatus && patientStatus === PatientStatuses.Permanent && patientStatusData?.files?.length === 0 ? (
        <DataRowEmptyFiles title={t('virologyStatus')} isXs={isXs} noInfoIcon={noInfoIcon} />
      ) : null}
      {!isFirstStatus && patientStatus === PatientStatuses.Hospitalized && patientStatusData?.files?.length === 0 ? (
        <DataRowEmptyFiles title={t('dischargeNotes')} isXs={isXs} noInfoIcon={noInfoIcon} />
      ) : null}
      {!isFirstStatus && patientStatus === PatientStatuses.Dead && patientStatusData?.files?.length === 0 ? (
        <DataRowEmptyFiles title={t('deathCertificateOrOtherProof')} isXs={isXs} noInfoIcon={noInfoIcon} />
      ) : null}

      <PatientStatusFiles
        title={patientStatusFilesTitle}
        patientId={patientId}
        status={patientStatus}
        files={patientStatusData.files}
        sx={rowSx(isXs)}
      />
    </Box>
  );
};

const DataRowEmptyFiles = ({ title, noInfoIcon, isXs }: { title: string; noInfoIcon: ReactNode; isXs?: boolean }) => {
  return (
    <DataRow
      isCompact={isXs}
      title={
        isXs ? (
          <>
            {title} {noInfoIcon}
          </>
        ) : (
          title
        )
      }
      value={isXs ? <></> : noInfoIcon}
      sx={rowSx(isXs)}
    />
  );
};

const rowSx =
  (isXs?: boolean) =>
  ({ spacing }) => ({
    '& > :first-child': { minWidth: spacing(16), width: spacing(16) },
    '& > :not(:first-child)': { ml: isXs ? 0 : `${spacing(2)} !important` },
  });
