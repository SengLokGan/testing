/// <reference types="react" />
import { TempPhotoResponse } from '@types';
export type CurrentPhotoState = {
  localPhotoPath: string | null;
} & TempPhotoResponse;
export declare const usePhotoManagement: (photo?: string) => {
  readonly currentPhoto: CurrentPhotoState;
  readonly setCurrentPhoto: import('react').Dispatch<import('react').SetStateAction<CurrentPhotoState>>;
};
