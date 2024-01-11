/// <reference types="react" />
import { WithSx } from '@types';
export type NotificationsProps = WithSx<{
  isOpen: boolean;
  onClose: (_: unknown, reason?: string) => void;
}>;
export declare const Notifications: ({ isOpen, sx, onClose }: NotificationsProps) => JSX.Element;
