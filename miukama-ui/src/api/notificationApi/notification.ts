import { deleteRequest, getRequest, putRequest, patchRequest } from '..';
import api_routes from '../config/routes.json';

export const getAllNotifications = () => {
  return getRequest(api_routes.notificationRoutes.notification);
};

export const deleteNotification = (id: number) => {
  return deleteRequest(api_routes.notificationRoutes.notification, {}, id);
};

export const fetchNotificationCount = () => {
  return getRequest(api_routes.notificationRoutes.notificationCount);
};

export const markAllAsRead = () => {
  return putRequest(api_routes.notificationRoutes.readAll);
};

export const markNotificationAsRead = (id: number) => {
  return patchRequest(api_routes.notificationRoutes.read, {}, {}, id);
};

export const deleteNotifications = () => {
  return deleteRequest(api_routes.notificationRoutes.notification);
};
