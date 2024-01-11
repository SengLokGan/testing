import { CardWithIcon } from '@components';
import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { WithSx } from '@types';
import { useTranslation } from 'react-i18next';
import { selectPatientId, selectPatientStatus, selectPatientStatusesHistory } from '@store/slices/patientSlice';
import { addServiceModal, selectUserPermissions } from '@store';
import { ChangeStatusButton } from '@components/pages/PatientProfile/PatientStatusBlock/components/ChangeStatusButton';
import { useCallback, useMemo, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import { CollapseControl } from '@components/pages/PatientProfile/PatientStatusBlock/components/CollapseControl';
import { useAppDispatch } from '@hooks/storeHooks';
import { Dictionaries } from '@utils';
import { PatientStatuses, ServiceModalName, UserPermissions } from '@enums';
import { PatientStatusData } from '@components/pages/PatientProfile/PatientStatusBlock/components/PatientStatusData';
import type { PatientChangeStatusModalPayload, PatientStatus } from '@types';
import { PatientStatusBlockSkeleton } from '@components/pages/PatientProfile/PatientStatusBlock/components/PatientStatusBlockSkeleton';

type PatientStatusBlockProps = WithSx<{}>;

export const PatientStatusBlock = ({ ...props }: PatientStatusBlockProps) => {
  const dispatch = useAppDispatch();
  const patientId = selectPatientId();
  const patientStatus = selectPatientStatus();
  const patientStatusesHistory = selectPatientStatusesHistory();
  const permissions = selectUserPermissions();
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [expandStatus, setExpandStatus] = useState(false);

  const { t } = useTranslation('patient');
  const { t: tPatientStatuses } = useTranslation(Dictionaries.PatientStatuses);

  const hasStatusHistory = patientStatusesHistory && patientStatusesHistory.length > 1;

  const openPatientStatusModal = (payload: PatientChangeStatusModalPayload) => {
    dispatch(
      addServiceModal({
        name: ServiceModalName.PatientStatusModal,
        payload,
      }),
    );
  };

  const onChangePatientHistoryStatus = useCallback((statusData: PatientStatus) => {
    openPatientStatusModal({
      isHistory: true,
      statusData,
    });
  }, []);

  const onChangePatientStatus = useCallback(() => {
    openPatientStatusModal({
      isHistory: false,
    });
  }, []);

  const patientStatusTitle = useMemo(() => {
    return `${tPatientStatuses(patientStatus) || tPatientStatuses(PatientStatuses.Permanent)} ${t('patient')}`;
  }, [patientStatus]);

  const changeStatusIsUnavailable =
    !permissions.includes(UserPermissions.PatientEditProfile) ||
    (patientStatus && patientStatus === PatientStatuses.Dead);

  const cardAction = useMemo(() => {
    if (changeStatusIsUnavailable) return null;
    if (isXs) return undefined;
    return ChangeStatusButton;
  }, [isXs, changeStatusIsUnavailable]);

  const cardIcon = useMemo(() => {
    if (changeStatusIsUnavailable) return null;
    if (!isXs) return undefined;
    return EditOutlinedIcon;
  }, [isXs, changeStatusIsUnavailable]);

  return (
    <CardWithIcon
      title={patientStatusTitle}
      action={cardAction}
      icon={cardIcon}
      onActionClick={onChangePatientStatus}
      onIconClick={onChangePatientStatus}
      sx={[
        isXs && {
          px: 0,
          '& .cardWithIconTitleWrapper': {
            px: 2,
          },
        },
      ]}
      {...props}
    >
      {!patientId && !patientStatusesHistory.length ? (
        <PatientStatusBlockSkeleton />
      ) : (
        <Stack
          direction="column"
          sx={{
            overflow: 'hidden',
          }}
        >
          {patientStatusesHistory && patientStatusesHistory.length === 1 ? (
            <PatientStatusData
              isFirstStatus
              isCurrentStatus
              patientId={patientId}
              patientStatusData={patientStatusesHistory[0]}
              onChangePatientStatus={onChangePatientHistoryStatus}
            />
          ) : null}
          {hasStatusHistory ? (
            <>
              <Collapse
                data-testid="patientStatusCollapse"
                in={isXs ? true : expandStatus}
                sx={{
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                <Stack
                  direction="column"
                  sx={({ spacing }) => ({ width: 1, maxHeight: { md: spacing(50) }, overflowY: { md: 'auto' } })}
                >
                  {patientStatusesHistory.map((patientStatus, index) => (
                    <PatientStatusData
                      key={patientStatus.statusId}
                      patientId={patientId}
                      patientStatusData={patientStatus}
                      isCurrentStatus={index === 0}
                      isFirstStatus={index === patientStatusesHistory.length - 1}
                      onChangePatientStatus={onChangePatientHistoryStatus}
                    />
                  ))}
                </Stack>
              </Collapse>
              {!isXs && <CollapseControl status={expandStatus} onClick={() => setExpandStatus(!expandStatus)} />}
            </>
          ) : null}
        </Stack>
      )}
    </CardWithIcon>
  );
};
