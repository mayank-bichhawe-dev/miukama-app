import { KeyPrefix, TFunction } from 'i18next';
import React from 'react';
export interface GetAllWishlist {
  Product: {
    itemName: string;
    visibility: boolean;
    description: string;
    imagePath: string | null;
  };
  User: {
    imagePath: string;
  };
  id: number;
  ownerName: string;
  productId: number;
  totalItem: number;
  userId: number;
  updatedAt: string;
}

export interface wishlistProps {
  DisplayView?: 'list' | 'column';
  SearchWishlist?: string;
  isSearchFilter?: boolean;
  hidePagination?: boolean;
  itemCardSelectedId?: number;
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  setApiChanges?: React.Dispatch<React.SetStateAction<string>>;
}
