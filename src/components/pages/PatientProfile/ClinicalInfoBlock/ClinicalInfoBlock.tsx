import { useState, useEffect } from 'react';
import { CardWithIcon } from '@components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { WithSx } from '@types';
import { useTranslation } from 'react-i18next';
import { selectClinicalInfo, getPatientClinicalInfo, selectUserPermissions } from '@store';
import { ClinicalInfoModal } from '@components/pages/PatientProfile/modals/ClinicalInfoModal';
import { ClinicalInfoView } from './ClinicalInfoView';
import { useAppDispatch } from '@hooks/storeHooks';
import { useParams } from 'react-router-dom';
import { UserPermissions } from '@enums';
import uniqid from 'uniqid';

type ClinicalInfoBlockProps = WithSx<{}>;

export const ClinicalInfoBlock = ({ sx = [] }: ClinicalInfoBlockProps) => {
  const { t } = useTranslation('patient');
  const [isClinicalInfoModalOpen, setIsClinicalInfoModalOpen] = useState(false);
  const userPermissions = selectUserPermissions();
  const clinicalInfo = selectClinicalInfo();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPatientClinicalInfo(id));
    }
  }, [id]);

  return (
    <>
      {isClinicalInfoModalOpen && (
        <ClinicalInfoModal
          key={uniqid()}
          isOpen={isClinicalInfoModalOpen}
          onClose={() => setIsClinicalInfoModalOpen(false)}
        />
      )}
      <CardWithIcon
        icon={userPermissions.includes(UserPermissions.PatientEditClinicalInfo) ? EditOutlinedIcon : null}
        addContentPermission={userPermissions.includes(UserPermissions.PatientAddClinicalInfo)}
        title={t('profile.clinicalInfo')}
        onIconClick={() => setIsClinicalInfoModalOpen(true)}
        onAddContent={() => setIsClinicalInfoModalOpen(true)}
      >
        {clinicalInfo && <ClinicalInfoView clinicalInfo={clinicalInfo} />}
      </CardWithIcon>
    </>
  );
};
