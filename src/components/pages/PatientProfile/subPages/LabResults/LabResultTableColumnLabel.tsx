import { IconButton, Typography } from '@mui/material';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Stack from '@mui/material/Stack';
import React from 'react';
import { Event } from '@services/Event/Event';
import { EventsName } from '@enums/global/EventsName';
import { PermissionGuard } from '@guards/PermissionGuard';
import { UserPermissions } from '@enums/store';

type LabResultTableColumnLabelProps = {
  procedureName: string;
  labOrderId: number;
  filePresent: boolean;
};
export const LabResultTableColumnLabel = ({
  procedureName,
  labOrderId,
  filePresent,
}: LabResultTableColumnLabelProps) => {
  //TODO: change to dispatch action exportLabResult dispatch(exportLabResult(orderNumber))
  const exportLabResultHandler = () => Event.fire(EventsName.ExportLabResult, labOrderId);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="labelM">{procedureName}</Typography>
      {filePresent && (
        <PermissionGuard permissions={UserPermissions.AnalysesViewResults}>
          <IconButton onClick={exportLabResultHandler}>
            <PictureAsPdfOutlinedIcon />
          </IconButton>
        </PermissionGuard>
      )}
    </Stack>
  );
};
