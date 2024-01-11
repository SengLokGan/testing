import { CardWithIcon } from '@components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { WithSx } from '@types';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { selectUserPermissions, selectPatientDocuments } from '@store';
import { DocumentsView } from './DocumentsView';
import { UserPermissions } from '@enums';
import { DocumentsModal } from '@components/pages/PatientProfile';
import uniqid from 'uniqid';

type DocumentsBlockProps = WithSx<{}>;

export const DocumentsBlock = ({ sx = [] }: DocumentsBlockProps) => {
  const { t } = useTranslation('patient');
  const userPermissions = selectUserPermissions();
  const documents = selectPatientDocuments();
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);

  return (
    <>
      {isDocumentsModalOpen && (
        <DocumentsModal key={uniqid()} isOpen={isDocumentsModalOpen} onClose={() => setIsDocumentsModalOpen(false)} />
      )}
      <CardWithIcon
        title={t('profile.documents')}
        icon={userPermissions.includes(UserPermissions.PatientEditProfile) ? EditOutlinedIcon : null}
        addContentPermission={userPermissions.includes(UserPermissions.PatientAddDocuments)}
        onIconClick={() => setIsDocumentsModalOpen(true)}
        onAddContent={() => setIsDocumentsModalOpen(true)}
      >
        {documents && <DocumentsView documents={documents} />}
      </CardWithIcon>
    </>
  );
};
