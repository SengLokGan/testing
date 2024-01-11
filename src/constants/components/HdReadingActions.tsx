import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { UserPermissions } from '@enums';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import { PermissionGuard } from '@guards';
import MenuItem from '@mui/material/MenuItem';
import HdReadingEditModal from '@constants/components/HdReadingEditModal';
import { useAppDispatch } from '@hooks/storeHooks';
import { deleteDialysisHdReading } from '@src/store';
import ConfirmModal from '../../components/modals/ConfirmModal/ConfirmModal';
import { WarningIcon } from '@assets/icons';

interface HdReadingActionsProps {
  id: number;
}

export const HdReadingActions = ({ id }: HdReadingActionsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const { t: tDialysis } = useTranslation('dialysis');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditHdReadingOpen, setIsEditHdReadingOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const onMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const onEdit = useCallback(() => {
    setAnchorEl(null);
    setIsEditHdReadingOpen(true);
  }, []);

  return (
    <>
      <HdReadingEditModal
        onClose={() => setIsEditHdReadingOpen(false)}
        isOpen={isEditHdReadingOpen}
        id={id}
        onSave={() => setIsEditHdReadingOpen(false)}
      />
      <ConfirmModal
        onClose={() => setIsConfirmModalOpen(false)}
        isOpen={isConfirmModalOpen}
        title={tDialysis('areYouSureToDeleteRecording')}
        confirmButton={{ children: t('button.delete'), onClick: () => dispatch(deleteDialysisHdReading(id)) }}
        cancelButton={{ children: t('button.cancel') }}
        icon={WarningIcon}
        dataTestId="ConfirmDeleteHdReadingRecordModal"
      />
      <IconButton data-testid="HdReadingViewTableExpandActionsButton" title="" onClick={onMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <PermissionGuard permissions={UserPermissions.DialysisAddMeasurement}>
          <MenuItem data-testid="HdReadingEditButton" onClick={onEdit}>
            {t('button.edit')}
          </MenuItem>
          <MenuItem data-testid="HdReadingDeleteButton" onClick={() => setIsConfirmModalOpen(true)}>
            {t('button.delete')}
          </MenuItem>
        </PermissionGuard>
      </Menu>
    </>
  );
};
