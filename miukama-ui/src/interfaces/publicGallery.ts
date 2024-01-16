import { KeyPrefix, TFunction } from 'i18next';

export interface publicGalleryProps {
  totalItem: number;
  ownerName: string;
  id: number;
  name: string;
  itemName: string;
  description: string;
  visibility: boolean;
  imagePath: string;
  updatedAt: string;
  User: {
    imagePath: string;
  };
}

export interface HomeComponentProps {
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}
