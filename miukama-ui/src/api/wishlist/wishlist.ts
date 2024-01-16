import { getRequest, deleteRequest } from '..';
import api_routes from '../config/routes.json';
import { postRequest } from '..';

export const getAllWishlist = (
  page?: number,
  pageSize?: number,
  searchQuery?: string,
  selectedCategory?: string,
) => {
  const urlQueryParam = {
    page: page || 1,
    pageSize: pageSize || 10,
    itemName: searchQuery || '',
  };
  if (selectedCategory !== 'All Categories') {
    Object.assign(urlQueryParam, { categoryId: selectedCategory });
  }
  return getRequest(api_routes.wishlistRoutes.wishlist, urlQueryParam);
};

export const deleteWishlistItem = (id: number) => {
  return deleteRequest(api_routes.wishlistRoutes.wishlist, {}, id);
};

export const addWishlistItem = (data: any) => {
  return postRequest(api_routes.wishlistRoutes.wishlist, data);
};

export const getAllWishlistItem = () => {
  return getRequest(api_routes.wishlistRoutes.wishlist);
};
