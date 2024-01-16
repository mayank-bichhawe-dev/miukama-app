import { patchRequest } from '..';
import API_ROUTES from '../config/routes.json';

export const updateUserProfile = (data: any) => {
  return patchRequest(API_ROUTES.userRoute.profileUpdate, data);
};
