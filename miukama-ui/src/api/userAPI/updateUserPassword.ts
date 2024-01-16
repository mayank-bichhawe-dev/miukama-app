import { patchRequest } from '..';
import api_routes from '../config/routes.json';
export const changeUserPassword = (data: any) => {
  return patchRequest(api_routes.userRoute.updateUserPassword, data);
};
