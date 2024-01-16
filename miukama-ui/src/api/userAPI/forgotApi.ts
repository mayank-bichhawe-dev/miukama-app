import { postRequest } from '..';
import api_routes from '../config/routes.json';
export const forgotPassword = (data: any) => {
  return postRequest(api_routes.userRoute.forgotPassword, data);
};
