/* eslint-disable max-lines */
'use client';
import * as React from 'react';
import DataTable from '../datatable/dataTable';
import { useContext, useEffect, useState } from 'react';
import ConfirmBox from '../confirmBox/confirmBox';
import { deleteProduct, getProduct } from '@/api/productAPI/products';
import { ProductList } from '@/interfaces/product';
import AlertBox from '../alertBox/alertBox';
import { format } from 'date-fns';
import { userWishlistItem } from '@/interfaces/userWishlist';
import { Box, Grid } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import { deleteWishlistItem, addWishlistItem } from '@/api/wishlist/wishlist';
import { productData } from './productData';
import { KeyPrefix, TFunction } from 'i18next';
import { useRouter } from 'next/navigation';
import { UserLoginContext } from '@/app/[lng]/layout';

const globalDateFormat = process.env.NEXT_PUBLIC_DATE_FORMAT;
const Product = ({
  t,
  searchQuery = '',
  itemCardSelectedId,
  displayType,
  hidePagination,
  setApiChanges,
}: {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  itemCardSelectedId: number;
  searchQuery: string;
  displayType: 'list' | 'column';
  hidePagination: boolean;
  setApiChanges: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
}) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const [productList, setProductList] = useState<ProductList[]>([]);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const productType =
    itemCardSelectedId === 1
      ? null
      : itemCardSelectedId === 2
      ? 'public'
      : itemCardSelectedId === 3
      ? 'private'
      : null;

  const alertCloseHandler = () => {
    setAlertMessages([]);
  };
  const getProductList = async () => {
    const { page, pageSize } = paginationModel;
    const { data } = await getProduct(
      searchQuery,
      '',
      page + 1,
      pageSize,
      productType,
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
  };

  const productDelete = async (id: number) => {
    const { data } = await deleteProduct(id);
    if (data.success) {
      setApiChanges(data);
      getProductList();
    }
    setAlertMessages([
      ...alertMessages,
      { type: data.success, message: data.message },
    ]);
    setDeleteId(undefined);
    setDeleteModel(false);
  };
  const filteredProductList =
    itemCardSelectedId === 1
      ? productList
      : itemCardSelectedId === 2
      ? productList.filter((item) => !item.visibility)
      : itemCardSelectedId === 3
      ? productList.filter((item) => item.visibility)
      : [];

  const rows = filteredProductList.map((item) => ({
    ...item,
    wishlist: !!item.Wishlists.length,
    updatedAt: format(
      new Date(item.updatedAt),
      globalDateFormat || 'dd/MM/yyyy',
    ),
  }));

  const addToWishlist = async (id: number) => {
    const favouriteItem = productList.find((value) => value.id === id);
    if (favouriteItem) {
      const wishListItem: userWishlistItem = {
        productId: favouriteItem.id,
        ownerName: favouriteItem.owner,
        totalItem: 1,
      };
      const { data } = await addWishlistItem(wishListItem);
      setApiChanges(data);
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
    setApiChanges(response.data);
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
  useEffect(() => {
    getProductList();
  }, [searchQuery, paginationModel, productType]);

  const productEdit = (id: number) => {
    router.push(`${langugeRoute}/dashboard/product/edit/${id}`);
  };
  return (
    <>
      {displayType === 'list' ? (
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
            hidePagination={hidePagination}
            itemCardSelectedId={itemCardSelectedId}
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
      ) : (
        <Grid container columnGap={2}>
          {filteredProductList.map((value) => (
            <Grid item xs={12} sm={8} md={3.8} key={value.id}>
              <ProductCard
                title={value.itemName}
                subTitle={value.description}
                avatar={value.User.imagePath}
                image={value.imagePath}
                id={value.id.toString()}
                price={value.priceOfCurrent}
                size={'medium'}
                handelEditCard={productEdit}
                userId={value.User.id}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
export default Product;
