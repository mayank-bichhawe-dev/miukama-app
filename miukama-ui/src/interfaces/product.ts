import React from 'react';
import { paginationModelProps } from './dataTable';
import { KeyPrefix, TFunction } from 'i18next';
export interface ProductList {
  id: number;
  itemName: string;
  owner: string;
  total: string;
  updatedAt: string;
  Wishlists: [];
  visibility: boolean;
  description: string;
  priceOfCurrent: number;
  imagePath: string;
  User: {
    id: number;
    imagePath: string;
    firstName: string;
    lastName: string;
  };
}

export interface productCardListProps {
  id: number;
  itemName: string;
  description: string;
  priceOfCurrent: number;
  visibility: boolean;
  imagePath: string;
  User: {
    imagePath: string;
    id: number;
  };
}

export interface ProductCardProps {
  id: string;
  title: string;
  image: string | null | undefined;
  subTitle: string;
  avatar?: string;
  price?: number;
  size?: 'small' | 'medium' | 'large';
  // eslint-disable-next-line no-unused-vars
  handelEditCard?: (id: number) => void;
  userId?: number;
}

export interface CardProduct {
  searchQuery?: string;
  categoryId?: string;
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (val: boolean) => void;
  isLoading?: Boolean;
}

export interface itemcardprops {
  cardName: string;
  cardValue: number;
  id: number;
  cardToday: number;
  cardPercent: number;
}
export interface ProductListViewProps {
  searchQuery: string;
  categoryId?: string;
  // eslint-disable-next-line no-unused-vars
  totalCount: number;
  // eslint-disable-next-line no-unused-vars
  setTotalCount: (val: number) => void;
  paginationModel: paginationModelProps;
  setPaginationModel: React.Dispatch<
    React.SetStateAction<{
      page: number;
      pageSize: number;
    }>
  >;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  productList: ProductList[];
  setProductList: React.Dispatch<React.SetStateAction<ProductList[]>>;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  isLoading?: Boolean;
}
