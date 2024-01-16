import { getRequest } from '..';
import api_routes from '../config/routes.json';

export const largestGallery = (
  page?: number,
  pageSize?: number,
  searchQuery?: string,
) => {
  const urlQueryParam = {
    page: page || 1,
    pageSize: pageSize || 10,
    name: searchQuery || '',
  };

  return getRequest(api_routes.publicRoutes.gallery, urlQueryParam);
};
export const PopularItem = (
  page?: number,
  pageSize?: number,
  searchQuery?: string,
) => {
  const urlQueryParam = {
    page: page || 1,
    pageSize: pageSize || 10,
    itemName: searchQuery || '',
  };

  return getRequest(api_routes.publicRoutes.product, urlQueryParam);
};
