import { NoticeBlockType, AllergiesInfo } from '@enums';
import { useEffect, useState } from 'react';
import type { Allergy, PatientAllergiesResponse } from '@types';
import { AxiosResponse } from 'axios';
import { API } from '@utils/api';
import { useTranslation } from 'react-i18next';

export const useGetAllergyNoticeInfo = (id: number) => {
  const { t } = useTranslation('common');
  const [noticeInfo, setNoticeInfo] = useState<{ type: NoticeBlockType; title?: string; text: string }>({
    type: NoticeBlockType.Warning,
    text: t('noticeInfo.noInfoAboutAllergy'),
  });
  const [noticeLoading, setNoticeLoading] = useState(true);

  const getPatientAllergies = async (id: number) => {
    try {
      const { data }: AxiosResponse<PatientAllergiesResponse> = await API.get(`/pm/patients/${id}/allergies`);
      getAllergyNotice(data.allergy);
      setNoticeLoading(false);
    } catch (error) {
      setNoticeLoading(false);
      console.error(error);
    }
  };

  const getAllergyNotice = (allergy?: Allergy) => {
    switch (allergy?.type) {
      case AllergiesInfo.NoAllergy:
        setNoticeInfo({ type: NoticeBlockType.Success, text: t('noticeInfo.noKnownAllergy') });
        break;
      case AllergiesInfo.Allergy:
        setNoticeInfo({
          type: NoticeBlockType.Error,
          text: allergy?.values?.map((allergy) => allergy.name).join(', '),
          title: t('noticeInfo.drugAllergy'),
        });
        break;
      default:
        setNoticeInfo({ type: NoticeBlockType.Warning, text: t('noticeInfo.noInfoAboutAllergy') });
    }
  };

  useEffect(() => {
    if (id) {
      getPatientAllergies(id);
    }
  }, []);

  return { noticeInfo, noticeLoading };
};
