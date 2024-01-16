import { postRequest } from '..';
import api_routes from '../config/routes.json';
export const registerUser = (data: any) => {
  return postRequest(api_routes.userRoute.signUp, data);
};
