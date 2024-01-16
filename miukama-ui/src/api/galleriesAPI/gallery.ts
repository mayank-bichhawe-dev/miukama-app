import { deleteRequest, getRequest, postRequest, patchRequest } from '..';
import api_routes from '../config/routes.json';
export const getGalleryById = (id: number | undefined) => {
  return getRequest(`${api_routes.galleryRoutes.gallery}/${id}`);
};
export const deleteGallery = (id: number) => {
  return deleteRequest(api_routes.galleryRoutes.gallery, {}, id);
};
export const updateGallery = (data: FormData, id: number) => {
  return patchRequest(api_routes.galleryRoutes.gallery, data, {}, id);
};
export const getGallery = (
  page?: number | null,
  pageSize?: number | null,
  searchQuery?: string,
  visibility?: 'private' | 'public' | null,
) => {
  const urlQueryParam = {
    page: page || 1,
    pageSize: pageSize || 10,
    name: searchQuery || '',
    visibility: visibility || null,
  };
  return getRequest(api_routes.galleryRoutes.gallery, urlQueryParam);
};

export const addGallery = (data: FormData) => {
  return postRequest(api_routes.galleryRoutes.gallery, data);
};
