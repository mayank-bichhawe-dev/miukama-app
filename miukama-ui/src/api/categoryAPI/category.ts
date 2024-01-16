import { deleteRequest, getRequest, postRequest, patchRequest } from '..';
import api_routes from '../config/routes.json';
export const addCategory = (data: any) => {
  return postRequest(api_routes.categoryRoutes.category, data);
};
export const updateCategory = (data: any, id: number) => {
  return patchRequest(api_routes.categoryRoutes.category, data, {}, id);
};
export const getCategory = (
  page?: number | null,
  pageSize?: number | null,
  searchQuery?: string,
  visibility?: 'private' | 'public' | null,
) => {
  const query = {
    page: page || 1,
    pageSize: pageSize || 10,
    categoryName: searchQuery || '',
    visibility: visibility || null,
  };
  return getRequest(api_routes.categoryRoutes.category, query);
};
export const deleteCategory = (id: number) => {
  return deleteRequest(api_routes.categoryRoutes.category, {}, id);
};
export const getCategoryById = (id: number) => {
  return getRequest(`${api_routes.categoryRoutes.category}/${id}`);
};
