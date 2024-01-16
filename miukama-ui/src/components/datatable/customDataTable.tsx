import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RowData from './rowData';
import { KeyPrefix, TFunction } from 'i18next';
import { useRouter } from 'next/navigation';
import { paginationModelProps } from '@/interfaces/dataTable';
import { Box, Button, Stack, TablePagination } from '@mui/material';
import { UserLoginContext } from '@/app/[lng]/layout';
import { useContext } from 'react';

interface CustomDataTableProps<R> {
  rows: R[];
  showButton?: boolean;
  // eslint-disable-next-line no-unused-vars
  onDeleteHanldle: (id: number) => void;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  paginationModel: paginationModelProps;
  totalCount: number;
  setPaginationModel: React.Dispatch<
    React.SetStateAction<paginationModelProps>
  >;
}
const CustomDataTable = <R extends { id: number }>({
  rows,
  onDeleteHanldle,
  t,
  showButton,
  paginationModel,
  setPaginationModel,
  totalCount,
}: CustomDataTableProps<R>) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPaginationModel((prevPaginationModel) => ({
      ...prevPaginationModel,
      page: newPage,
    }));
  };

  const calculateSerialNumber = (index: number) => {
    const { page, pageSize } = paginationModel;
    return page * pageSize + index;
  };
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer
          sx={{ maxHeight: 440, '&::-webkit-scrollbar': { display: 'none' } }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ border: '1px solid rgb(81, 81, 81)' }}>
            <TableHead sx={{ margin: 1 }}>
              <TableRow>
                <TableCell
                  align="center"
                  width="30px"
                  sx={{ background: '#093629' }}
                />
                <TableCell
                  align="center"
                  width="98px"
                  sx={{ background: '#093629', minWidth: '80px' }}>
                  {t('category.table_head.sr_no.')}
                </TableCell>
                <TableCell
                  align="center"
                  width="180px"
                  sx={{ background: '#093629', minWidth: '150px' }}>
                  {t('category.table_head.category_name')}
                </TableCell>
                <TableCell
                  align="center"
                  width="150px"
                  sx={{ background: '#093629', minWidth: '150px' }}>
                  {t('category.table_head.public_item')}
                </TableCell>
                <TableCell
                  align="center"
                  width="150px"
                  sx={{ background: '#093629', minWidth: '150px' }}>
                  {t('category.table_head.private_item')}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ background: '#093629', minWidth: '200px' }}>
                  {t('category.table_head.description')}
                </TableCell>
                <TableCell
                  align="center"
                  width="120px"
                  sx={{ background: '#093629' }}>
                  {t('category.table_head.created_at')}
                </TableCell>
                <TableCell
                  align="center"
                  width="100px"
                  sx={{ background: '#093629' }}>
                  {t('category.table_head.action')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <tr style={{ height: '1rem' }}></tr>
              {rows.length > 0 ? (
                rows.map((row: R, index: number) => (
                  <RowData
                    key={row.id}
                    row={row}
                    index={calculateSerialNumber(index)}
                    onDeleteHanldle={onDeleteHanldle}
                  />
                ))
              ) : (
                <TableRow sx={{ height: 300 }}>
                  <TableCell colSpan={8}>
                    <Stack
                      sx={{ width: '100%', textAlign: 'center' }}
                      spacing={2}>
                      No rows
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!showButton && (
          <TablePagination
            component="div"
            count={totalCount}
            page={paginationModel.page}
            onPageChange={handleChangePage}
            rowsPerPage={paginationModel.pageSize}
            rowsPerPageOptions={[10]}
          />
        )}
      </Paper>
      {showButton && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            sx={{ color: 'white' }}
            variant="text"
            onClick={() => router.push(`${langugeRoute}/dashboard/category`)}>
            {t('category.table_head.view_all')}
          </Button>
        </Box>
      )}
    </>
  );
};
export default CustomDataTable;
