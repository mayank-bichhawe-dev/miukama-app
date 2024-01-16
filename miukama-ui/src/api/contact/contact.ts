import api_routes from '../config/routes.json';
import { getRequest } from '..';

export const getContact = () => {
  return getRequest(api_routes.contactRoutes.contact);
};
