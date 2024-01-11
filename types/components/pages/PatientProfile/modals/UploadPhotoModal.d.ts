import { Dispatch, SetStateAction } from 'react';
import { InfoModalProps } from '@components';
import { WithSx } from '@types';
import { CurrentPhotoState } from '@hooks';
export type UploadPhotoModalProps = WithSx<{
  step: UploadPhotoModalStep;
  currentPhoto?: string | null;
  setCurrentPhoto: Dispatch<SetStateAction<CurrentPhotoState>>;
  changePhotoUrl?: string;
}> &
  Omit<InfoModalProps, 'title' | 'children' | 'onBackButtonClick'>;
export declare enum UploadPhotoModalStep {
  AddPhoto = 0,
  ChangePhoto = 1,
  DeletePhoto = 2,
  ProcessingPhoto = 3,
}
export declare const UploadPhotoModal: ({
  step,
  currentPhoto,
  setCurrentPhoto,
  onClose,
  isOpen,
  changePhotoUrl,
  sx,
}: UploadPhotoModalProps) => JSX.Element;
