import Stack from '@mui/material/Stack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Typography from '@mui/material/Typography';
import { dotsTextOverflowStyles } from '@utils/styles';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import Button from '@mui/material/Button';
import { LabOrderStatus, LabOrderType, PatientStatuses, UserPermissions } from '@enums';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { selectPatientStatus, selectUserPermissions } from '@store/slices';
import Tooltip from '@mui/material/Tooltip';
import { LabOrderStatusCellCallbackProps } from '@types';
import { getTenantDate } from '@utils/getTenantDate';
import { dateToServerFormat } from '@utils/dateFormat';

interface RichTableCellLabOrderStatusProps {
  dotsTextOverflow: boolean;
  status: LabOrderStatus;
  data: any;
  cellCallback?: ({ status, id, data }: LabOrderStatusCellCallbackProps) => void;
  disabled?: boolean;
}

const RichTableCellLabOrderStatus = ({
  status,
  data,
  disabled,
  cellCallback = () => {},
  dotsTextOverflow,
}: RichTableCellLabOrderStatusProps) => {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('labOrders');
  const isToPerform = useMemo(() => LabOrderStatus.TO_PERFORM === status, [status]);
  const isPending = useMemo(() => LabOrderStatus.PENDING === status, [status]);
  const isCompleted = useMemo(() => LabOrderStatus.COMPLETED === status, [status]);
  const isToSubmit = useMemo(() => LabOrderStatus.TO_SUBMIT === status, [status]);
  const isDraft = useMemo(() => LabOrderStatus.DRAFT === status, [status]);
  const userPermissions = selectUserPermissions();
  const patientStatus = selectPatientStatus();
  const isUnavailableStatus =
    patientStatus === PatientStatuses.Walk_In ||
    patientStatus === PatientStatuses.Dead ||
    patientStatus === PatientStatuses.Discharged;

  const isDisablePerformButton = () => {
    if (isToPerform) {
      switch (data.type) {
        case LabOrderType.INDIVIDUAL:
        case LabOrderType.QUARTERLY:
          return data.appointmentDate !== dateToServerFormat(getTenantDate());
        case LabOrderType.URGENT:
          return (
            data.appointmentDate !== dateToServerFormat(getTenantDate(new Date(data.createdAt))) ||
            data.appointmentDate !== dateToServerFormat(getTenantDate())
          );
      }
    }
    return false;
  };

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {(isToPerform || isToSubmit) && (
        <Tooltip title={isUnavailableStatus ? tCommon('unavailableForPatients') : ''} enterTouchDelay={0}>
          <span>
            <Button
              variant="outlined"
              onClick={() => cellCallback({ id: data.id, status, data })}
              disabled={
                disabled ||
                isUnavailableStatus ||
                !userPermissions.includes(UserPermissions.AnalysesSubmitOrder) ||
                isDisablePerformButton()
              }
              data-testid={`LabOrder${status}Button-${data.id}`}
            >
              <Typography variant="labelM">{tCommon(isToSubmit ? 'submit' : 'perform')}</Typography>
            </Button>
          </span>
        </Tooltip>
      )}
      {(isPending || isCompleted) && (
        <Typography
          sx={[dotsTextOverflow && dotsTextOverflowStyles, { display: 'flex', alignItems: 'center' }]}
          variant="labelM"
        >
          {isPending && <ChangeCircleIcon fontSize="small" sx={{ mr: 0.5, fill: '#FFD600' }} />}
          {isCompleted && <CheckCircleIcon fontSize="small" sx={{ mr: 0.5, fill: '#006D3C' }} />}
          {t(`statuses.${status}`)}
        </Typography>
      )}
      {isDraft && (
        <Typography
          sx={[dotsTextOverflow && dotsTextOverflowStyles, { display: 'flex', alignItems: 'center' }]}
          variant="labelM"
        >
          <PendingIcon fontSize="small" sx={{ mr: 0.5, fill: '#F05674' }} />
          {t(`statuses.${status}`)}
        </Typography>
      )}
    </Stack>
  );
};

export default RichTableCellLabOrderStatus;
