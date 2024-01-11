import { useEffect, useState } from 'react';
import { CardWithIcon } from '@components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@hooks/storeHooks';
import { useParams } from 'react-router-dom';
import { TreatmentInfoView } from './TreatmentInfoView';
import { UserPermissions } from '@enums';
import { selectUserPermissions, getTreatmentInfo, selectTreatmentInfo } from '@store';
import { TreatmentInfoModal } from '@components/pages/PatientProfile';
import uniqid from 'uniqid';

export const TreatmentInfoBlock = () => {
  const { t } = useTranslation('patient');
  const treatmentInfo = selectTreatmentInfo();
  const userPermissions = selectUserPermissions();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isTreatmentInfoModalOpen, setIsTreatmentInfoModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getTreatmentInfo(id));
    }
  }, [id]);

  return (
    <>
      {isTreatmentInfoModalOpen && (
        <TreatmentInfoModal
          key={uniqid()}
          isOpen={isTreatmentInfoModalOpen}
          onClose={() => setIsTreatmentInfoModalOpen(false)}
        />
      )}
      <CardWithIcon
        icon={userPermissions.includes(UserPermissions.PatientEditClinicalInfo) ? EditOutlinedIcon : null}
        addContentPermission={userPermissions.includes(UserPermissions.PatientAddClinicalInfo)}
        title={t('profile.treatmentInfo')}
        onIconClick={() => setIsTreatmentInfoModalOpen(true)}
        onAddContent={() => setIsTreatmentInfoModalOpen(true)}
      >
        {treatmentInfo && <TreatmentInfoView treatmentInfo={treatmentInfo} />}
      </CardWithIcon>
    </>
  );
};
