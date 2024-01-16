import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { KeyPrefix, TFunction } from 'i18next';
export interface DataTableProps<C, R> {
  columns: GridColDef[] | C[];
  rows: R[];
  rowCount: number;
  paginationModel: paginationModelProps;
  setPaginationModel: React.Dispatch<
    React.SetStateAction<paginationModelProps>
  >;
  hidePagination?: boolean;
  itemCardSelectedId?: number;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

export interface paginationModelProps {
  page: number;
  pageSize: number;
}

export interface rowsProps {
  id: number;
}
