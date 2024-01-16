import { getRequest, postRequest, deleteRequest, patchRequest } from '..';
import api_routes from '../config/routes.json';
export const getProduct = (
  searchQuery: string,
  categoryId?: string,
  page?: number,
  pageSize?: number,
  visibility?: 'private' | 'public' | null,
) => {
  const urlQueryParam = {
    page: page || 1,
    pageSize: pageSize || 10,
    itemName: searchQuery || '',
    categoryId: categoryId || '',
    visibility: visibility || null,
  };
  return getRequest(api_routes.productRoutes.product, urlQueryParam);
};

export const deleteProduct = (id: number) => {
  return deleteRequest(api_routes.productRoutes.product, {}, id);
};

export const addUserItem = (data: FormData) => {
  return postRequest(api_routes.productRoutes.product, data);
};

export const getProductById = (id: number | undefined) => {
  return getRequest(`${api_routes.productRoutes.product}/${id}`);
};
export const updateUserProduct = (data: FormData, id: number) => {
  return patchRequest(api_routes.productRoutes.product, data, {}, id);
};
