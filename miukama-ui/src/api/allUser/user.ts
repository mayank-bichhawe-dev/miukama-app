import api_routes from '../config/routes.json';
import { getRequest, deleteRequest, patchRequest, postRequest } from '..';

export const getAllUser = (
  page?: number | null,
  pageSize?: number | null,
  searchQuery?: string,
) => {
  const query = {
    page: page || 1,
    pageSize: pageSize || 10,
    name: searchQuery || '',
  };
  return getRequest(api_routes.allUserRoutes.user, query);
};

export const deleteUser = (id: number) => {
  return deleteRequest(api_routes.allUserRoutes.user, {}, id);
};

export const getUserById = (id: number) => {
  return getRequest(`${api_routes.allUserRoutes.user}/${id}`);
};

export const updateUser = (data: FormData, id: number) => {
  return patchRequest(api_routes.allUserRoutes.user, data, {}, id);
};

export const addUserByAdmin = (data: any) => {
  return postRequest(api_routes.allUserRoutes.user, data);
};
