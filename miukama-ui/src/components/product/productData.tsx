import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import ImageRowItem from '../imageRowItem/ImageRowItem';
import TableActionButtons from './tableActionButtons';
import { KeyPrefix, TFunction } from 'i18next';

interface columnsProps {
  // eslint-disable-next-line no-unused-vars
  removeFromWishlist: (productId: number, wishlistId: number) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  addToWishlist: (id: number) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  setDeleteId: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  setDeleteModel: (deleteModel: boolean) => void;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}
export const productData = ({
  t,
  removeFromWishlist,
  addToWishlist,
  setDeleteId,
  setDeleteModel,
}: columnsProps): GridColDef[] => {
  return [
    {
      field: 'id',
      headerName: 'S.no',
      width: 65,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'itemName',
      headerName: t('gallery.dataTable.product') as string,
      type: 'string',
      width: 160,
      hideable: false,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => {
        return <ImageRowItem params={params} />;
      },
    },
    {
      field: 'owner',
      headerName: t('gallery.dataTable.ownerName') as string,
      type: 'string',
      width: 160,
      hideable: false,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'total',
      headerName: t('gallery.dataTable.totalItems') as string,
      type: 'number',
      width: 160,
      hideable: false,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: () => (
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{
            height: '1.875rem',
            width: '3.813rem',
            border: '.063rem solid #FFF',
          }}>
          {43}
        </Box>
      ),
    },

    {
      field: 'updatedAt',
      headerName: t('gallery.dataTable.updatedAt') as string,
      type: 'text',
      width: 160,
      hideable: false,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actions',
      headerName: t('gallery.dataTable.action') as string,

      type: 'action',
      width: 160,
      hideable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <TableActionButtons
            params={params}
            removeFromWishlist={removeFromWishlist}
            addToWishlist={addToWishlist}
            setDeleteId={setDeleteId}
            setDeleteModel={setDeleteModel}
          />
        );
      },
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
    },
  ];
};
