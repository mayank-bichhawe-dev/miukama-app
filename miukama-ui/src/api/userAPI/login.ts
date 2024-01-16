import { getRequest, postRequest } from '..';
import api_routes from '../config/routes.json';

export const loginUser = (data: any) => {
  return postRequest(api_routes.userRoute.login, data);
};

export const googleAuthLogin = (token: string) => {
  return getRequest(`${api_routes.socialLogin.googleLogin}/${token}`);
};

export const facebookAuthLogin = (token: string) => {
  return getRequest(`${api_routes.socialLogin.facebookLogin}/${token}`);
};
