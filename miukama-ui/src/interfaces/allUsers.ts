import React from 'react';
import { paginationModelProps } from './dataTable';
import { KeyPrefix, TFunction } from 'i18next';

export interface userProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  contact: string;
  address: string;
  fileSystemId: number;
  imagePath: string;
  authProvider: string;
  confirmPassword: string;
  password: string;
}

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
