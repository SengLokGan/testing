import React from 'react';
import Stack from '@mui/material/Stack';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import Typography from '@mui/material/Typography';
import { convertSxToArray, formatFileSize, handleFileLinkClick } from '@utils';
import Box from '@mui/material/Box';
import type { FileDocument, WithSx } from '@types';

type FileLinkWithSizeProps = WithSx<{
  patientId?: string;
  file: FileDocument;
  withSize?: boolean;
  withIcon?: boolean;
  queryParams?: string;
  removeLink?: boolean;
}>;

export const FileLink = ({
  file,
  patientId,
  withSize = true,
  queryParams = '',
  removeLink = true,
  withIcon = true,
  sx = [],
}: FileLinkWithSizeProps) => {
  const handleLinkClick = async () => {
    await handleFileLinkClick(`/pm/patients/${patientId}/files/${file.id}${queryParams}`, file, removeLink);
  };

  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexWrap: 'no-wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 1,
        },
        ...convertSxToArray(sx),
      ]}
    >
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          maxWidth: ({ spacing }) => `calc(100% - ${spacing(5)})`,
        }}
      >
        {withIcon && <AttachFileOutlinedIcon fontSize="small" />}
        <Typography
          variant="labelM"
          sx={(theme) => ({
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
            color: theme.palette.primary.main,
          })}
          data-testid="fileLinkForDownload"
          onClick={handleLinkClick}
        >
          {file.name}
        </Typography>
      </Stack>
      {withSize && (
        <Typography
          variant="paragraphS"
          sx={(theme) => ({
            flexShrink: 1,
            color: theme.palette.text.secondary,
          })}
        >
          {formatFileSize(file.size)}
        </Typography>
      )}
    </Box>
  );
};
