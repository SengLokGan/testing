import { useTranslation } from 'react-i18next';

interface DialysisMachineConnectedBayColumnProps {
  location?: {
    id: number;
    name: string;
  };
}

export const DialysisMachineConnectedBayColumn = ({ location }: DialysisMachineConnectedBayColumnProps) => {
  const { t } = useTranslation('common');
  return <>{location?.name || t('NA')}</>;
};
