import { useEffect, useState } from 'react';
import { TempPhotoResponse } from '@types';

export type CurrentPhotoState = {
  localPhotoPath: string | null;
} & TempPhotoResponse;

export const usePhotoManagement = (photo?: string) => {
  const [currentPhoto, setCurrentPhoto] = useState<CurrentPhotoState>({
    name: '',
    photoPath: '',
    localPhotoPath: null,
  });

  useEffect(() => {
    if (photo) {
      setCurrentPhoto((prevState) => ({ ...prevState, localPhotoPath: photo }));
    }
  }, []);

  return { currentPhoto, setCurrentPhoto } as const;
};
