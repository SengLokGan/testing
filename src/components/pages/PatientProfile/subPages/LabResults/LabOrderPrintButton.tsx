import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { PermissionGuard } from '@guards/PermissionGuard';
import { UserPermissions } from '@enums/store';
import IconButton from '@mui/material/IconButton';
import { exportLabOrder } from '@store/slices';
import { useAppDispatch } from '@hooks/storeHooks';

type LabOrderPrintButtonProps = {
  orderId: number;
};
export const LabOrderPrintButton = ({ orderId }: LabOrderPrintButtonProps) => {
  const dispatch = useAppDispatch();
  const printLabOrder = () => dispatch(exportLabOrder(orderId));

  return (
    <PermissionGuard permissions={UserPermissions.AnalysesPrintForm}>
      <IconButton data-testid="labOrderPrintButton" onClick={printLabOrder}>
        <LocalPrintshopOutlinedIcon />
      </IconButton>
    </PermissionGuard>
  );
};
