import { KeyPrefix, TFunction } from 'i18next';
import { addUserProduct } from './addUserProduct';
import React from 'react';

export interface categoryItem {
  id?: number;
  categoryName: string;
  subCategories: string[] | subCategories[];
  galleryId: number;
  description: string;
  visibility: boolean;
}

export interface category {
  id: number;
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

export interface subCategories {
  id: number | undefined;
  name: string;
}
export interface Categories {
  value: number;
  label: string;
}

export interface productProps {
  // eslint-disable-next-line no-unused-vars
  setFieldValue: (label: string, value: any) => void;
  setCategoryName: any;
  categoryName: {
    label: string;
    value: number;
  };
  values: addUserProduct;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}
export interface FetchCategoryItem {
  id: number;
  categoryName: string;
  description: string;
  visibility: boolean;
  createdAt: string;
  User: {
    id: number;
  };
}

export interface Category {
  isShowAllData?: boolean;
  isSearchFilter?: boolean;
  showButton?: boolean;
  searchCategory?: string;
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  setApiChanges?: React.Dispatch<React.SetStateAction<string>>;
}
