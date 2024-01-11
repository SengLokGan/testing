import Stack from '@mui/material/Stack';
import { ClinicalNote } from '@types';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { useTranslation } from 'react-i18next';
import { ClinicalNoteCardListItemTitle } from '@components/pages/PatientProfile/subPages/ClinicalNotes/ClinicalNoteCard/ClinicalNoteCardListItemTitle';
import { ClinicalNoteCardListItemUserInfo } from '@components/pages/PatientProfile/subPages/ClinicalNotes/ClinicalNoteCard/ClinicalNoteCardListItemUserInfo';
import theme from '@src/styles/theme';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Divider from '@mui/material/Divider';
import {
  addServiceModal,
  deleteClinicalNote,
  selectUserId,
  setClinicalNoteFormData,
  setSelectedClinicalNoteId,
} from '@store/slices';
import { useAppDispatch } from '@hooks/storeHooks';
import { ServiceModalName } from '@enums/components';
import { useParams } from 'react-router-dom';

type ClinicalNoteCardProps = {
  data: ClinicalNote;
};

export const ClinicalNoteCard = ({
  data: { id, type, details, enteredBy, enteredAt, editedBy, note },
}: ClinicalNoteCardProps) => {
  const { t } = useTranslation('clinicalNotes');
  const { t: tCommon } = useTranslation('common');
  const { id: patientId } = useParams();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const detailsToShow = details ? `— ${details}` : '';
  const typeToShow = t(`filters.noteTypes.${type}`);
  const userId = selectUserId();

  const onMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const editHandler = () => {
    setAnchorEl(null);
    dispatch(
      setClinicalNoteFormData({
        type,
        note,
      }),
    );
    dispatch(setSelectedClinicalNoteId(id));
  };

  const deleteClinicalNoteHandler = () => {
    setAnchorEl(null);
    dispatch(setSelectedClinicalNoteId(id));
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => {
            if (patientId) {
              dispatch(deleteClinicalNote({ patientId: +patientId }));
            }
          },
          title: t('form.areYouSureDelete'),
          confirmButton: tCommon('button.delete'),
          cancelButton: tCommon('button.cancel'),
        },
      }),
    );
  };

  return (
    <Stack direction="column" p={theme.spacing(2, 3)} sx={{ bgcolor: ({ palette }) => palette.primary[100] }}>
      <Stack direction="row">
        <ClinicalNoteCardListItemTitle text={t('tableView.type')} />
        <Typography variant="labelS">{`${typeToShow} ${detailsToShow}`}</Typography>
      </Stack>
      <Stack direction="row">
        <ClinicalNoteCardListItemTitle text={t('cardView.created')} />
        <ClinicalNoteCardListItemUserInfo user={enteredBy} date={enteredAt} />
      </Stack>
      {editedBy && (
        <Stack direction="row">
          <ClinicalNoteCardListItemTitle text={t('cardView.edited')} />
          <ClinicalNoteCardListItemUserInfo user={editedBy} date={enteredAt} />
        </Stack>
      )}
      <Paper
        elevation={0}
        sx={({ spacing, palette }) => ({
          bgcolor: palette.background.default,
          position: 'relative',
          padding: spacing(1, 5, 1.5, 1),
          marginTop: spacing(1),
        })}
      >
        <Typography variant="paragraphM">{note}</Typography>
        {userId === enteredBy.id && (
          <>
            <IconButton
              onClick={onMenuOpen}
              sx={({ spacing }) => ({ position: 'absolute', top: spacing(0), right: spacing(0) })}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem data-testid="clinicalNoteDeleteButton" onClick={deleteClinicalNoteHandler}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <DeleteOutlineOutlinedIcon />
                  <Box>{t('cardView.deleteNote')}</Box>
                </Stack>
              </MenuItem>
              <Divider />
              <MenuItem data-testid="clinicalNoteEditButton" onClick={editHandler}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EditOutlinedIcon />
                  <Box>{t('cardView.editNote')}</Box>
                </Stack>
              </MenuItem>
            </Menu>
          </>
        )}
      </Paper>
    </Stack>
  );
};
