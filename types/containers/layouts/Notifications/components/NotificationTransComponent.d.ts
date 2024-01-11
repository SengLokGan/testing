/// <reference types="react" />
import type { Notification } from '@types';
import { TFunction } from 'react-i18next';
type NotificationTransComponentProps = {
  notification: Notification;
  t: TFunction<'notifications'>;
  onClose: (_: unknown, reason?: string) => void;
};
export declare const NotificationTransComponent: ({
  onClose,
  t,
  notification,
}: NotificationTransComponentProps) => JSX.Element | null;
export {};
