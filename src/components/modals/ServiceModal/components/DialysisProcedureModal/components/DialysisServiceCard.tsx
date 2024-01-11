import { Skeleton, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type DialysisServiceCardProps = PropsWithChildren<{
  title: string;
}>;

const DialysisServiceCard = ({ title, children }: DialysisServiceCardProps) => {
  return (
    <>
      <Stack
        direction="column"
        sx={({ spacing, palette }) => ({
          width: '100%',
          maxWidth: spacing(87),
          backgroundColor: palette.surface.default,
          padding: spacing(3),
          borderRadius: spacing(2),
          '& .MuiPaper-root': {
            backgroundColor: 'initial',
            padding: 0,
            borderRadius: 0,
          },
        })}
      >
        <Typography
          variant="headerM"
          sx={({ spacing }) => ({
            marginBottom: spacing(3),
          })}
        >
          {title}
        </Typography>
        {children || (
          <>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
          </>
        )}
      </Stack>
    </>
  );
};

export default DialysisServiceCard;
