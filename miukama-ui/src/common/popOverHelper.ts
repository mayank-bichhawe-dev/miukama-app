interface Messages {
  [key: string]: string;
}

export const messages: Messages = {
  deleteAll: 'All your notifications have been successfully deleted.',
  delete: 'The selected notification has been deleted.',
  readAll: 'You have marked all notifications as read.',
  read: 'The selected notification has been marked as read.',
  unread: 'The selected notification has been marked as unread.',
  success: 'Your action has been completed successfully.',
  info: 'information',
  warning: 'Something went wrong. Please try again later',
  noDataRead: 'You have no notifications to read',
  noDataDelete: 'You have no notifications to delete',
  serverError: 'failed to get server response',
};
