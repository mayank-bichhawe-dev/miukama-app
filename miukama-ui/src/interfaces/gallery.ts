import { KeyPrefix, TFunction } from 'i18next';

export interface gallery {
  totalItem: number;
  ownerName: string;
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  updatedAt: string;
  User: {
    imagePath: string;
  };
}

export interface galleryProps {
  galleryCount: number;
  ownerName: string;
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  updatedAt: string;
  imagePath: string | null;
  userImagePath: string;
  userId: number;
}

export interface galleriesProps {
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}
