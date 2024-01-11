/// <reference types="react" />
import type { Notification } from '@types';
type NotificationItemProps = {
  notification: Notification;
  onClose: (_: unknown, reason?: string) => void;
};
export declare const NotificationItem: ({ notification, onClose }: NotificationItemProps) => JSX.Element;
export {};
