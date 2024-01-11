import Typography from '@mui/material/Typography';
import { WithSx } from '@types';
import { convertSxToArray } from '@utils/converters/mui';
import { NoticeBlockType } from '@enums';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export type NoticeBlockProps = WithSx<{
  title?: string;
  text?: string;
  type: NoticeBlockType;
}>;

export const NoticeBlock = ({ title, text, type, sx = [] }: NoticeBlockProps) => {
  const getBgColor = (theme: Theme) => {
    switch (type) {
      case NoticeBlockType.Error:
        return theme.palette.error[90];
      case NoticeBlockType.Warning:
        return '#FFE8DB';
      case NoticeBlockType.Info:
        return theme.palette.primary[90];
      default:
        return '#C2EBD1';
    }
  };

  const getIcon = () => {
    switch (type) {
      case NoticeBlockType.Error:
        return <ErrorOutlineOutlinedIcon sx={{ color: (theme) => theme.palette.error.main }} />;
      case NoticeBlockType.Warning:
        return <WarningAmberOutlinedIcon sx={{ color: '#FF9254' }} />;
      case NoticeBlockType.Info:
        return <InfoOutlinedIcon sx={{ color: '#006398' }} />;
      default:
        return <CheckCircleOutlineOutlinedIcon sx={{ color: '#006D3C' }} />;
    }
  };

  return (
    <Stack
      data-testid="noticeBlock"
      direction="row"
      spacing={2}
      alignItems="center"
      sx={[
        (theme) => ({ px: 2, py: 1.5, bgcolor: getBgColor(theme), borderRadius: theme.spacing(0.5) }),
        ...convertSxToArray(sx),
      ]}
    >
      {getIcon()}
      <Stack direction="column" spacing={0.5}>
        {title && <Typography variant="labelMSB">{title}</Typography>}
        {text && <Typography variant="labelM">{text}</Typography>}
      </Stack>
    </Stack>
  );
};
