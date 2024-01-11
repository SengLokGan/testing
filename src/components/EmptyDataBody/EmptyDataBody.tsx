import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type EmptyDataBodyProps = {
  bgcolor?: string;
};

export const EmptyDataBody = ({ bgcolor }: EmptyDataBodyProps) => {
  const { t } = useTranslation('common');
  return (
    <Box
      data-testid="richTableEmptyBodyContainer"
      className="emptyDataBody"
      sx={(theme) => ({
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: bgcolor || theme.palette.surface.default,
      })}
    >
      <Stack direction="column" spacing={3}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            borderRadius: '50%',
            bgcolor: 'rgba(26, 28, 30, 0.08)',
            p: 5,
            '& svg': {
              fontSize: theme.spacing(6),
            },
          })}
        >
          <ContentPasteSearchOutlinedIcon />
        </Box>
        <Typography variant="labelL">{t('noResultsFound')}</Typography>
      </Stack>
    </Box>
  );
};
