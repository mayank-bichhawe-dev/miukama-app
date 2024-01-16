import { getRequest } from '..';
import api_routes from '../config/routes.json';

export const getFaqData = () => {
  return getRequest(api_routes.faqRoutes.faq);
};
