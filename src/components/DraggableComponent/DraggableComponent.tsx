import Draggable from 'react-draggable';
import Paper, { PaperProps } from '@mui/material/Paper';

export const DraggableComponent = (props: PaperProps) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper
        data-testid="draggablePaper"
        {...props}
        sx={({ spacing }) => ({
          position: 'fixed !important',
          bottom: 0,
          right: 0,
          margin: `${spacing(3)} ${spacing(1)} !important`,
        })}
      />
    </Draggable>
  );
};
