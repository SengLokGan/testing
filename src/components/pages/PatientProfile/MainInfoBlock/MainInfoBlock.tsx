import { useState } from 'react';
import { CardWithIcon, CardWithIconProps } from '@components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useTranslation } from 'react-i18next';
import { selectPatient } from '@store/slices/patientSlice';
import { MainInfoView } from './MainInfoView';
import { MainInfoSkeleton } from './MainInfoSkeleton';
import { MainInfoModal } from '@components/pages/PatientProfile';
import { selectUserPermissions } from '@store';
import { UserPermissions } from '@enums';
import uniqid from 'uniqid';

type MainInfoBlockProps = Omit<CardWithIconProps, 'title'>;

export const MainInfoBlock = ({ ...props }: MainInfoBlockProps) => {
  const patient = selectPatient();
  const userPermissions = selectUserPermissions();
  const [isMainInfoModalOpen, setIsMainInfoModalOpen] = useState(false);
  const { t } = useTranslation('patient');

  return (
    <>
      {isMainInfoModalOpen && (
        <MainInfoModal key={uniqid()} isOpen={isMainInfoModalOpen} onClose={() => setIsMainInfoModalOpen(false)} />
      )}
      <CardWithIcon
        icon={userPermissions.includes(UserPermissions.PatientEditProfile) ? EditOutlinedIcon : null}
        title={t('profile.mainInfo')}
        onIconClick={() => setIsMainInfoModalOpen(true)}
        onAddContent={() => setIsMainInfoModalOpen(true)}
        {...props}
      >
        {patient?.id ? <MainInfoView patient={patient} /> : <MainInfoSkeleton />}
      </CardWithIcon>
    </>
  );
};
