export interface AddGalleryItem {
  id: number;
  name: string;
  description: string;
  visibility: boolean | string;
}
export interface gallery {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  updatedAt?: string;
}
