import { patchRequest } from '..';
import api_routes from '../config/routes.json';
export const resetUserPassword = (data: any, routeParams: string) => {
  return patchRequest(
    api_routes.userRoute.resetPassword,
    data,
    {},
    routeParams,
  );
};
