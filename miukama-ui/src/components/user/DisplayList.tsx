import React, { useState } from 'react';
import { Button } from '@mui/material';
import DataTable from '../datatable/dataTable';
import { GridColDef } from '@mui/x-data-grid';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmBox from '../confirmBox/confirmBox';
import AlertBox from '../alertBox/alertBox';
import { DisplayListProps } from '@/interfaces/allUsers';
export const DisplayList = ({
  t,
  rows,
  alertMessage,
  onItemDelete,
  onItemEdit,
  setAlertMessage,
  totalCount,
  paginationModel,
  setPaginationModel,
  hidePagination,
  itemCardSelectedId,
}: DisplayListProps) => {
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Sr no.',
      width: 100,
    },
    {
      field: 'firstName',
      headerName: t('user.displayList.firstName') as string,
    },
    {
      field: 'lastName',
      headerName: t('user.displayList.lastName') as string,
    },
    {
      field: 'email',
      headerName: t('user.displayList.email') as string,
    },
    {
      field: 'contact',
      headerName: t('user.displayList.contact') as string,
    },
    {
      field: 'Address',
      headerName: t('user.displayList.address') as string,
    },
    {
      field: 'Action',
      headerName: t('user.displayList.action') as string,
      headerAlign: 'left',
      align: 'left',
      renderCell: ({ id }) => (
        <>
          {onItemEdit && (
            <Button
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
          {onItemDelete && (
            <Button
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
