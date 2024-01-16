/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from 'react';

export interface INotificationModel {
  id: number;
  read: boolean;
  title: string;
  description: string;
  updatedAt: string;
}

export interface INotificationComponentProps {
  allNotifications: INotificationModel[];
  deleteItem: (id: number) => void;
  markAsRead: (id: number, read: boolean) => void;
  fullPage?: boolean;
}

export interface INotificationModelProps {
  setAnchorElNotification?: Dispatch<SetStateAction<HTMLButtonElement | null>>;
  notificationCounts?: number;
  fullPage?: boolean;
  getNotificationCount?: () => Promise<void>;
}
