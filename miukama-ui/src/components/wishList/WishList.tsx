'use client';

import { DisplayCard } from '@/components/galleries/DisplayCard';
import { useContext, useEffect, useState } from 'react';
import { DisplayList } from '@/components/galleries/DisplayList';
import Breadcrumb from '@/components/breadcrumbs/breadcrumbs';
import SearchFilter from '@/components/galleries/components/searchFilter';
import SearchRow from '@/components/galleries/components/searchRow';
import { getAllWishlist, deleteWishlistItem } from '@/api/wishlist/wishlist';
import { Box, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import { Debounce } from '@/utils/debounce';
import { GetAllWishlist, wishlistProps } from '@/interfaces/wishList';
import { UserLoginContext } from '@/app/[lng]/layout';

export const Wishlist = ({
  t,
  DisplayView,
  SearchWishlist,
  isSearchFilter,
  hidePagination,
  itemCardSelectedId,
  setApiChanges,
}: wishlistProps) => {
  const { langugeRoute } = useContext(UserLoginContext);
  const [displayType, setDisplayType] = useState<'list' | 'column'>('list');
  const [data, setData] = useState<GetAllWishlist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategryId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const getAllWishlistData = async () => {
    try {
      const { page, pageSize } = paginationModel;
      const { data } = await getAllWishlist(
        page + 1,
        pageSize,
        searchQuery,
        selectedCategoryId,
      );
      if (data.success) {
        const { rows, count } = data.data;
        setData(rows);
        setTotalCount(count);
      } else {
        setAlertMessages([
          ...alertMessages,
          { type: data.success, message: data.message },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const delayedFetchData = Debounce(getAllWishlistData, setIsLoading);

  useEffect(() => {
    delayedFetchData();
    DisplayView && setDisplayType(DisplayView);
    SearchWishlist && setSearchQuery(SearchWishlist);
  }, [
    paginationModel,
    searchQuery,
    selectedCategoryId,
    DisplayView,
    SearchWishlist,
  ]);

  const onWishListUpdate = async (id: any) => {
    const { data } = await deleteWishlistItem(id);
    setAlertMessages([
      ...alertMessages,
      { type: data.success, message: data.message },
    ]);
    if (data.success) {
      getAllWishlistData();
      setTimeout(() => {
        setAlertMessages([]);
      }, 3000);
    }
    setApiChanges && setApiChanges(data);
  };

  const rows =
    data.length > 0
      ? data.map((item) => ({
        id: item.id,
        product: item.Product?.itemName,
        name: item.Product?.itemName || '',
        ownerName: item?.ownerName,
        description: item?.Product?.description || '',
        totalItems: item.totalItem,
        visibility: item.Product?.visibility,
        imagePath: item?.Product?.imagePath,
        userImagePath: item?.User?.imagePath,
        userId: item?.userId,
        updatedAt: item.updatedAt
          ? format(new Date(item.updatedAt), 'dd-MM-yyyy')
          : '',
      }))
      : [];

  return (
    <Box>
      {isSearchFilter === false ? null : (
        <Box paddingBottom="4rem">
          <Breadcrumb
            title={t('wishlist.myWishlist') as string}
            data={[{ title: t('wishlist.dashboard'), link: `${langugeRoute}/dashboard` }]}
          />
          <SearchRow
            displayType={displayType}
            setDisplayType={setDisplayType}
            hideButton>
            <SearchFilter
              t={t}
              isLoading={isLoading}
              displayDropDown
              setSearchQuery={setSearchQuery}
              setSelectedCategryId={setSelectedCategryId}
            />
          </SearchRow>
        </Box>
      )}
      <Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {displayType === 'column' ? (
              <DisplayCard data={rows} />
            ) : (
              <DisplayList
                t={t}
                rows={rows}
                alertMessage={alertMessages}
                setAlertMessage={setAlertMessages}
                onUpdateWishList={onWishListUpdate}
                totalCount={totalCount}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                hidePagination={hidePagination}
                itemCardSelectedId={itemCardSelectedId}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
