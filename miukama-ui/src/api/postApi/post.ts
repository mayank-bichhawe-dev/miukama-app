import { deleteRequest, getRequest, postRequest, patchRequest } from '..';
import api_routes from '../config/routes.json';
export const getPostById = (id: number) => {
  return getRequest(`${api_routes.postRoutes.post}/${id}`);
};
export const deletePost = (id: number) => {
  return deleteRequest(api_routes.postRoutes.post, {}, id);
};
export const updatePost = (data: any, id: number) => {
  return patchRequest(api_routes.postRoutes.post, data, {}, id);
};
export const getPost = (page: number, pageSize: number) => {
  const urlQueryParam = {
    page: page || 1,
    pageSize: pageSize || 10,
  };
  return getRequest(api_routes.postRoutes.post, urlQueryParam);
};
export const addPost = (data: any) => {
  return postRequest(api_routes.postRoutes.post, data);
};
