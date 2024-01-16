import { getRequest } from '..';
import api_routes from '../config/routes.json';

export const getUserDetail = () => {
  return getRequest(api_routes.userRoute.getUser);
};
