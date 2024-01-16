/* eslint-disable no-unused-vars */
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { DataTableProps, rowsProps } from '@/interfaces/dataTable';
import { useRouter } from 'next/navigation';
import { UserLoginContext } from '@/app/[lng]/layout';
import { useContext } from 'react';
const DataTable = <C, R extends rowsProps>({
  t,
  columns,
  rows,
  rowCount,
  paginationModel,
  setPaginationModel,
  hidePagination,
  itemCardSelectedId = 0,
}: DataTableProps<C, R>) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const indexColumn: GridColDef = {
    field: 'sno',
    headerName: t('gallery.dataTable.sno') as string,
    minWidth: 150,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ id }) => {
      const sNumber = rows.findIndex((row) => row.id === id) + 1;
      const data = (paginationModel.page + 1) * paginationModel.pageSize;
      const serialNumber = data - paginationModel.pageSize + sNumber;
      return serialNumber < 10 ? `0${serialNumber}` : serialNumber;
    },
  };

  const columnsfield = {
    hideable: false,
    sortable: false,
    minWidth: 150,
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  };

  const columnList = [indexColumn, ...columns].map((column) => {
    if ((column as GridColDef).field !== 'sno') {
      return {
        ...column,
        ...columnsfield,
      };
    } else {
      return column;
    }
  });

  const handleChange = () => {
    if ([1, 2, 3].includes(itemCardSelectedId)) {
      router.push(`${langugeRoute}/dashboard/my-items`);
    } else if (itemCardSelectedId === 5) {
      router.push(`${langugeRoute}/dashboard/wishlist`);
    }
  };

  return (
    <Box
      sx={{
        height: 450,
        width: '100%',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#093629',
        },
        '& .MuiDataGrid-row': {
          backgroundColor: '#474342',
          marginTop: '5px',
          marginBottom: '5px',
        },
        '& .MuiDataGrid-virtualScrollerRenderZone': {
          padding: '15px 0',
        },
      }}>
      <DataGrid
        rows={rows}
        columns={columnList as GridColDef[]}
        initialState={{
          pagination: {
            paginationModel: paginationModel,
          },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        onPaginationModelChange={setPaginationModel}
        rowCount={Number(rowCount) || 0}
        paginationMode="server"
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooterPagination={hidePagination}
      />
      {hidePagination && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ color: 'white' }} variant="text" onClick={handleChange}>
            {t('product.viewAll')} ↗
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DataTable;
