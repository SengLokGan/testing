import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';

export const DialysisMachineWarrantyColumn = ({ warrantyFinished }: { warrantyFinished: boolean }) => {
  return (
    <Stack justifyContent="flex-start">
      {warrantyFinished ? (
        <CancelIcon sx={{ fill: ({ palette }) => palette.error.main }} />
      ) : (
        <CheckCircleIcon sx={{ fill: '#006D3C' }} />
      )}
    </Stack>
  );
};
