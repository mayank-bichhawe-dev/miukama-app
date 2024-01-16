import React from 'react';
import { FetchCategoryItem } from './categories';
import { paginationModelProps } from './dataTable';
import { KeyPrefix, TFunction } from 'i18next';
export interface DisplayListProps {
  rows: any;
  showTotalItems?: boolean;
  alertMessage: { type: 'success' | 'error'; message: string }[];
  // eslint-disable-next-line no-unused-vars
  onItemDelete?: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  onItemEdit?: (id: any) => void;
  // eslint-disable-next-line no-unused-vars
  onUpdateWishList?: (id: any) => void;
  setAlertMessage: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'error'; message: string }[]>
  >;
  totalCount: number;
  paginationModel: paginationModelProps;
  setPaginationModel: React.Dispatch<
    React.SetStateAction<paginationModelProps>
  >;
  hidePagination?: boolean;
  itemCardSelectedId?: number;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

export interface displayListCatergory {
  // eslint-disable-next-line no-unused-vars
  setApiChanges?: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
  isShowAllData?: boolean;
  showButton?: boolean;
  categoryData: FetchCategoryItem[];
  paginationModel: paginationModelProps;
  totalCount: number;
  setPaginationModel: React.Dispatch<
    React.SetStateAction<paginationModelProps>
  >;
  getData: () => void;
  alertCloseHandler: () => void;
  alertMessages: { type: 'success' | 'error'; message: string }[];
  setAlertMessages: React.Dispatch<
    React.SetStateAction<
      {
        type: 'success' | 'error';
        message: string;
      }[]
    >
  >;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}
