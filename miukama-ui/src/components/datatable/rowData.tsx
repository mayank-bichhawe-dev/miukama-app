import { Edit, Delete } from '@mui/icons-material';
import React, { useContext } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Box,
  Button,
  Collapse,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import { UserLoginContext } from '@/app/[lng]/layout';

interface rowDataProps {
  row: any;
  index: number;
  // eslint-disable-next-line no-unused-vars
  onDeleteHanldle: (id: number) => void;
}

const RowData = ({ row, index, onDeleteHanldle }: rowDataProps) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const userDetails = loginLocalStorageHelper.getUserDetails();
  const [open, setOpen] = React.useState(false);
  const globalDateFormate = process.env.NEXT_PUBLIC_DATE_FORMAT || 'dd/MM/yyyy';

  return (
    <React.Fragment>
      <TableRow
        sx={{
          p: 0,
          background: '#474342',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        }}>
        <TableCell sx={{ background: '#B20000', padding: 0 }} width="30px">
          <IconButton
            disabled={!row.SubCategories.length ? true : false}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ mr: 0, padding: '3px' }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" width="98px" sx={{ minWidth: '80px' }}>
          {index + 1}
        </TableCell>
        <TableCell
          align="center"
          width="180"
          sx={{
            minWidth: '150px',
            maxWidth: '180px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
          {row.categoryName}
        </TableCell>
        <TableCell align="center" width="150px" sx={{ minWidth: '150px' }}>
          {row.publicCount}
        </TableCell>
        <TableCell align="center" width="150px" sx={{ minWidth: '150px' }}>
          {row.privateCount}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: '200px',
            maxWidth: { xs: '350px', l: '450px' },
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
          {row.description ? row.description : '-----'}
        </TableCell>
        <TableCell align="center" width="120px">
          {format(new Date(row.createdAt), globalDateFormate)}
        </TableCell>
        <TableCell align="center" width="100px" sx={{ padding: '12px 16px' }}>
          <Box display="flex" flexDirection="row">
            <Button
              disabled={userDetails?.id === row.userId ? false : true}
              onClick={() => router.push(`${langugeRoute}/dashboard/category/edit/${row.id}`)}
              sx={{
                padding: '2px 2px',
                minWidth: '10px',
                borderRadius: '2px',
                backgroundColor: '#465e76',
              }}>
              <Edit sx={{ padding: '2px' }} />
            </Button>

            <Button
              disabled={userDetails?.id === row.userId ? false : true}
              sx={{
                padding: '2px 2px',
                minWidth: '10px',
                borderRadius: '2px',
                ml: '9px',
              }}
              onClick={() => {
                onDeleteHanldle(row.id as number);
              }}>
              <Delete sx={{ padding: '2px' }} />
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: '8px 0 0 0' }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.SubCategories.map((subCategory: any) => (
              <TableRow
                key={subCategory.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns:
                    '0px 113px 148px 151px 146px auto 104px 100px',

                  p: 0,
                }}>
                <TableCell />
                <TableCell sx={{ minWidth: '80px' }} />
                <TableCell
                  align="center"
                  sx={{
                    minWidth: '150px',
                    maxWidth: '180px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}>
                  {subCategory.name}
                </TableCell>
                <TableCell align="center" sx={{ minWidth: '150px' }}>
                  {subCategory.publicCount}
                </TableCell>
                <TableCell align="center" sx={{ minWidth: '150px' }}>
                  {subCategory.privateCount}
                </TableCell>
                <TableCell align="center" sx={{ minWidth: '200px' }}>
                  -----
                </TableCell>
                <TableCell align="center">
                  {format(
                    new Date(row.createdAt),
                    globalDateFormate || 'dd/MM/yyyy',
                  )}
                </TableCell>
                <TableCell align="center" />
              </TableRow>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default RowData;
