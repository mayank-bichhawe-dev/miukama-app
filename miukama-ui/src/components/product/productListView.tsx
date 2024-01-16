/* eslint-disable max-lines */
'use client';
import * as React from 'react';
import DataTable from '../datatable/dataTable';
import { useEffect, useState } from 'react';
import ConfirmBox from '../confirmBox/confirmBox';
import { deleteProduct, getProduct } from '@/api/productAPI/products';
import { ProductListViewProps } from '@/interfaces/product';
import AlertBox from '../alertBox/alertBox';
import { format } from 'date-fns';
import { userWishlistItem } from '@/interfaces/userWishlist';
import { deleteWishlistItem, addWishlistItem } from '@/api/wishlist/wishlist';
import { productData } from './productData';
import { Debounce } from '@/utils/debounce';
import { Box, CircularProgress } from '@mui/material';

const globalDateFormat = process.env.NEXT_PUBLIC_DATE_FORMAT;
const ProductListView = ({
  t,
  searchQuery = '',
  categoryId = '',
  totalCount,
  setTotalCount,
  paginationModel,
  setPaginationModel,
  productList,
  setProductList,
  setIsLoading,
  isLoading = false,
}: ProductListViewProps) => {
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);

  const getProductList = async () => {
    const { page, pageSize } = paginationModel;
    const { data } = await getProduct(
      searchQuery,
      categoryId,
      page + 1,
      pageSize,
    );
    if (data.success) {
      const { rows, count } = data.data;
      setProductList(rows);
      setTotalCount(count);
    } else {
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
    }
    setIsLoading(false);
  };
  const delayedFetchData = Debounce(getProductList, setIsLoading);
  useEffect(() => {
    delayedFetchData();
  }, [paginationModel, searchQuery, categoryId]);

  const alertCloseHandler = () => {
    setAlertMessages([]);
  };

  const productDelete = async (id: number) => {
    const { data } = await deleteProduct(id);
    if (data.success) {
      getProductList();
    }
    setAlertMessages([
      ...alertMessages,
      { type: data.success, message: data.message },
    ]);
    setDeleteId(undefined);
    setDeleteModel(false);
  };
  const rows = productList.map((item) => {
    return {
      ...item,
      owner: `${item.User.firstName} ${item.User.lastName}`,
      wishlist: !!item.Wishlists.length,
      updatedAt: format(
        new Date(item.updatedAt),
        globalDateFormat || 'dd/MM/yyyy',
      ),
    };
  });
  const addToWishlist = async (id: number) => {
    const favouriteItem = productList.find((value) => value.id === id);
    if (favouriteItem) {
      const wishListItem: userWishlistItem = {
        productId: favouriteItem.id,
        ownerName: favouriteItem.owner,
        totalItem: 1,
      };
      const { data } = await addWishlistItem(wishListItem);
      getProductList();
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
      setTimeout(() => {
        setAlertMessages([]);
      }, 2000);
    }
  };

  const removeFromWishlist = async (productId: number, wishlistId: number) => {
    const response = await deleteWishlistItem(wishlistId);
    if (response.data.success) {
      const selectedItem = productList.find((item) => {
        return item.id === productId;
      });
      if (selectedItem) {
        Object.assign(selectedItem, { Wishlists: [] });
        setProductList([...productList]);
      }
      setAlertMessages([
        ...alertMessages,
        { type: response.data.success, message: response.data.message },
      ]);
    }
    setTimeout(() => {
      setAlertMessages([]);
    }, 2000);
  };

  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box paddingY="1.25rem">
            <AlertBox
              alertMessages={alertMessages}
              handleAlertClose={alertCloseHandler}
            />
          </Box>
          <DataTable
            key={rows.length}
            rowCount={totalCount || 0}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            rows={rows}
            columns={productData({
              t,
              removeFromWishlist,
              addToWishlist,
              setDeleteId,
              setDeleteModel,
            })}
            t={t}
          />
          {deleteModel && deleteId && (
            <ConfirmBox
              open={deleteModel}
              onClose={() => {
                setDeleteModel(false);
                setDeleteId(undefined);
              }}
              onSubmit={() => productDelete(deleteId)}
            />
          )}
        </>
      )}
    </>
  );
};
export default ProductListView;
