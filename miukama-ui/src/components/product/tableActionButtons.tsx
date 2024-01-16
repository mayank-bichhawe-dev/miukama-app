/* eslint-disable no-unused-vars */
import { Edit, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
import { UserLoginContext } from '@/app/[lng]/layout';

import React, { useContext } from 'react';

function TableActionButtons({
  params,
  removeFromWishlist,
  addToWishlist,
  setDeleteId,
  setDeleteModel,
}: {
  params: GridRenderCellParams;
  removeFromWishlist: (productId: number, id: number) => void;
  addToWishlist: (id: number) => void;
  setDeleteId: (id: number) => void;
  setDeleteModel: (val: boolean) => void;
}) {
  const userDetails = loginLocalStorageHelper.getUserDetails();
  const { langugeRoute } = useContext(UserLoginContext);
  const router = useRouter();

  return (
    <>
      <Button
        disabled={userDetails?.id === params.row.User.id ? false : true}
        onClick={() => router.push(`${langugeRoute}/dashboard/product/edit/${params.id}`)}
        sx={{
          padding: '.125rem .125rem',
          minWidth: '.625rem',
          borderRadius: '.125rem',
          backgroundColor: '#465e76',
        }}>
        <Edit sx={{ padding: '.125rem' }} />
      </Button>
      <Button
        onClick={() => {
          params.row.Wishlists && params.row.Wishlists.length
            ? removeFromWishlist(
              Number(params.id),
              Number(params.row.Wishlists[0].id),
            )
            : addToWishlist(Number(params.id));
        }}
        sx={{
          padding: '.125rem .125rem',
          minWidth: '.625rem',
          borderRadius: '.125rem',
          ml: '.563rem',
          backgroundColor: params.row.wishlist
            ? 'rgb(255, 255, 255,.5)'
            : '#42D78699',
        }}>
        <FavoriteIcon
          sx={{
            padding: '.125rem',
            color: params.row.wishlist ? '#B20000' : '#FFFFFF',
          }}
        />
      </Button>
      <Button
        disabled={userDetails?.id === params.row.User.id ? false : true}
        sx={{
          padding: '.125rem .125rem',
          minWidth: '.625rem',
          borderRadius: '.125rem',
          ml: '.563rem',
        }}
        onClick={() => {
          setDeleteId(params.id as number);
          setDeleteModel(true);
        }}>
        <Delete sx={{ padding: '.125rem' }} />
      </Button>
    </>
  );
}

export default TableActionButtons;
