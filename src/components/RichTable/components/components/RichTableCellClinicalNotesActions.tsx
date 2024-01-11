import { IconButton, Stack } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useAppDispatch } from '@hooks/storeHooks';
import {
  addServiceModal,
  ClinicalNoteTableDataItem,
  deleteClinicalNote,
  selectUser,
  selectUserPermissions,
  setClinicalNoteFormData,
  setSelectedClinicalNoteId,
} from '@store/slices';
import { useParams } from 'react-router-dom';
import { ServiceModalName } from '@enums/components';
import { useTranslation } from 'react-i18next';
import { UserPermissions } from '@enums/store';

type RichTableCellClinicalNotesActionsPropsType = {
  data: ClinicalNoteTableDataItem;
};

const RichTableCellClinicalNotesActions = ({ data }: RichTableCellClinicalNotesActionsPropsType) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('clinicalNotes');
  const user = selectUser();
  const userPermissions = selectUserPermissions();
  // TODO temporary solution (!data.details) waiting for back-end
  const showActionButtons = user.id === data.enteredById && !data.details;
  const permissionsToDeleteNote = [
    UserPermissions.ClinicalNoteDoctorDelete,
    UserPermissions.ClinicalNoteNurseDelete,
    UserPermissions.IssueDelete,
    UserPermissions.PICReviewDelete,
    UserPermissions.NephrologistReviewDelete,
  ];
  const showDeleteButton = permissionsToDeleteNote.some((permission) => userPermissions.includes(permission));

  const editHandler = () => {
    dispatch(
      setClinicalNoteFormData({
        type: data.type,
        note: data.note,
      }),
    );
    dispatch(setSelectedClinicalNoteId(data.id));
  };

  const deleteClinicalNoteHandler = () => {
    dispatch(setSelectedClinicalNoteId(data.id));
    dispatch(
      addServiceModal({
        name: ServiceModalName.ConfirmModal,
        payload: {
          closeCallback: () => {
            if (id) {
              dispatch(deleteClinicalNote({ patientId: +id }));
            }
          },
          title: t('form.areYouSureDelete'),
          confirmButton: tCommon('button.delete'),
          cancelButton: tCommon('button.cancel'),
        },
      }),
    );
  };

  return showActionButtons ? (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton onClick={editHandler}>
        <EditOutlinedIcon />
      </IconButton>
      {showDeleteButton && (
        <IconButton onClick={deleteClinicalNoteHandler}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      )}
    </Stack>
  ) : null;
};

export default RichTableCellClinicalNotesActions;
