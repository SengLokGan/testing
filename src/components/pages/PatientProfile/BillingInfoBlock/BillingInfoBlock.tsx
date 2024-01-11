import { useEffect } from 'react';
import { CardWithIcon, CardWithIconProps } from '@components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { WithSx } from '@types';
import { useTranslation } from 'react-i18next';
import { getBillingInfo, selectBillingInformation } from '@store/slices/patientSlice';
import { useAppDispatch } from '@hooks/storeHooks';
import { useParams } from 'react-router-dom';
import { BillingInfoView } from './BillingInfoView';

type BillingInfoBlockProps = WithSx<{}> & Pick<CardWithIconProps, 'onIconClick' | 'onAddContent'>;

export const BillingInfoBlock = ({ sx = [], ...props }: BillingInfoBlockProps) => {
  const { t } = useTranslation('patient');
  const billingInformation = selectBillingInformation();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getBillingInfo(id));
    }
  }, [id]);

  return (
    <CardWithIcon icon={EditOutlinedIcon} title={t('profile.billingInfo')} {...props}>
      {billingInformation && <BillingInfoView billingInformation={billingInformation} />}
    </CardWithIcon>
  );
};
