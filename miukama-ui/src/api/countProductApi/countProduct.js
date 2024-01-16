import api_routes from '../config/routes.json';
import { getRequest } from '..';

export const getCountProduct = () => {
  return getRequest(api_routes.countProductRoutes.countProduct);
};
