import { useState } from 'react';
import { CardWithIcon } from '@components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useTranslation } from 'react-i18next';
import { selectPatient } from '@store/slices/patientSlice';
import { FamilyInfoView } from './FamilyInfoView';
import { selectUserPermissions } from '@store/slices/userSlice';
import { UserPermissions } from '@enums';
import { FamilyInfoModal } from '@components/pages/PatientProfile';
import uniqid from 'uniqid';

export const FamilyInfoBlock = () => {
  const { t } = useTranslation('patient');
  const patient = selectPatient();
  const userPermissions = selectUserPermissions();
  const [isFamilyInfoModalOpen, setIsFamilyInfoModalOpen] = useState(false);

  return (
    <>
      {isFamilyInfoModalOpen && (
        <FamilyInfoModal
          key={uniqid()}
          isOpen={isFamilyInfoModalOpen}
          onClose={() => setIsFamilyInfoModalOpen(false)}
        />
      )}
      <CardWithIcon
        icon={userPermissions.includes(UserPermissions.PatientEditProfile) ? EditOutlinedIcon : null}
        title={t('profile.familyInfo')}
        onIconClick={() => setIsFamilyInfoModalOpen(true)}
        onAddContent={() => setIsFamilyInfoModalOpen(true)}
      >
        {patient && <FamilyInfoView patient={patient} />}
      </CardWithIcon>
    </>
  );
};
