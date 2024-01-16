import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import DataTable from '../datatable/dataTable';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ConfirmBox from '../confirmBox/confirmBox';
import AlertBox from '../alertBox/alertBox';
import { DisplayListProps } from '@/interfaces/displayListInterface';
import ImageRowItem from '../imageRowItem/ImageRowItem';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
export const DisplayList = ({
  t,
  rows,
  alertMessage,
  onItemDelete,
  onItemEdit,
  onUpdateWishList,
  setAlertMessage,
  totalCount,
  paginationModel,
  setPaginationModel,
  hidePagination,
  itemCardSelectedId,
  showTotalItems,
}: DisplayListProps) => {
  const userDetails = loginLocalStorageHelper.getUserDetails();

  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Sr no.',
      width: 100,
    },
    {
      field: 'product',
      headerName: t('gallery.dataTable.product') as string,
      renderCell: (params: GridRenderCellParams) => {
        return <ImageRowItem params={params} />;
      },
    },
    {
      field: 'ownerName',
      headerName: t('gallery.dataTable.ownerName') as string,
    },
    ...(showTotalItems
      ? [
          {
            field: 'totalItems',
            headerName: t('gallery.dataTable.totalItems') as string,
            renderCell: (params: GridRenderCellParams) => (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  height: '1.875rem',
                  width: '3.813rem',
                  border: '.063rem solid #FFF',
                }}>
                {params.value || 0}
              </Box>
            ),
          },
        ]
      : []),
    {
      field: 'updatedAt',
      headerName: t('gallery.dataTable.updatedAt') as string,
    },
    {
      field: 'Action',
      headerName: t('gallery.dataTable.action') as string,
      headerAlign: 'left',
      align: 'left',
      renderCell: ({ id, row }) => (
        <>
          {onItemEdit && (
            <Button
              disabled={userDetails?.id === row.userId ? false : true}
              sx={{
                padding: '.125rem .125rem',
                minWidth: '.625rem',
                borderRadius: '.125rem',
                backgroundColor: '#465e76',
              }}
              onClick={() => {
                onItemEdit(id);
              }}>
              <EditRoundedIcon sx={{ padding: '4px' }} />
            </Button>
          )}
          {onUpdateWishList && (
            <Button
              sx={{
                padding: '.125rem .125rem',
                minWidth: '.625rem',
                borderRadius: '.125rem',
                backgroundColor: 'rgb(255, 255, 255,.5)',
                ml: '.563rem',
              }}
              onClick={() => {
                onUpdateWishList(id);
              }}>
              <FavoriteIcon sx={{ padding: '.125rem', color: '#B20000' }} />
            </Button>
          )}
          {onItemDelete && (
            <Button
              disabled={userDetails?.id === row.userId ? false : true}
              sx={{
                padding: '.125rem .125rem',
                minWidth: '.625rem',
                borderRadius: '.125rem',
                ml: '.563rem',
              }}
              onClick={() => {
                setDeleteId(id as number);
                setDeleteModel(true);
              }}>
              <DeleteIcon sx={{ padding: '4px' }} />
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <AlertBox
        alertMessages={alertMessage}
        handleAlertClose={() => setAlertMessage([])}
      />
      <DataTable
        t={t}
        rows={rows}
        columns={columns}
        key={rows.length}
        rowCount={totalCount || 0}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        hidePagination={hidePagination}
        itemCardSelectedId={itemCardSelectedId}
      />
      <ConfirmBox
        open={deleteModel}
        onClose={() => {
          setDeleteModel(false);
          setDeleteId(undefined);
        }}
        onSubmit={() => {
          onItemDelete && onItemDelete(deleteId as number);
          setDeleteModel(false);
          setDeleteId(undefined);
        }}
      />
    </>
  );
};
