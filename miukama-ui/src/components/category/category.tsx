/* eslint-disable max-lines */
'use client';
import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { DisplayList } from './DisplayList';
import { getCategory } from '@/api/categoryAPI/category';
import { Category, FetchCategoryItem } from '@/interfaces/categories';
import { paginationModelProps } from '@/interfaces/dataTable';
import { UserLoginContext } from '@/app/[lng]/layout';
import Breadcrumb from '../breadcrumbs/breadcrumbs';
import SearchRow from '../galleries/components/searchRow';
import SearchFilter from '../galleries/components/searchFilter';
import CategoryTypeButtons from '../galleries/components/galleryTypeButtons';

const GetCategories: React.FC<Category> = ({
  searchCategory,
  isShowAllData,
  isSearchFilter,
  showButton,
  t,
  setApiChanges,
}) => {
  const { toggleView, langugeRoute } = useContext(UserLoginContext);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<FetchCategoryItem[]>([]);
  const [paginationModel, setPaginationModel] =
    React.useState<paginationModelProps>({
      page: 0,
      pageSize: 10,
    });
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const alertCloseHandler = () => {
    setAlertMessages([]);
  };
  const router = useRouter();

  const getData = async () => {
    const categoryType = isShowAllData
      ? null
      : isPrivate
        ? 'private'
        : 'public';
    const { page, pageSize } = paginationModel;
    const response = await getCategory(
      page + 1,
      pageSize,
      searchQuery,
      categoryType,
    );
    if (response.data.success) {
      const {
        data: {
          data: { rows, count },
        },
      } = response;
      setCategoryData(rows);
      setCount(count);
    } else {
      setCategoryData([]);
      setAlertMessages([
        ...alertMessages,
        { type: response.data.success, message: response.data.message },
      ]);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setIsPrivate(toggleView.visibility === 'private');
  }, [toggleView]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsLoading(true);
    }
    searchCategory && setSearchQuery(searchCategory);
    const delayTime = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(delayTime);
  }, [searchQuery, searchCategory, paginationModel, isPrivate]);

  useEffect(() => {
    setIsLoading(true);
    setPaginationModel({
      page: 0,
      pageSize: 10,
    });
  }, [isPrivate]);

  return (
    <>
      {isSearchFilter === false ? null : (
        <>
          <Breadcrumb
            title={t('category.title.my_categories1') as string}
            data={[
              { title: t('category.title.dashboard'), link: `${langugeRoute}/dashboard` },
            ]}
          />
          <SearchRow
            buttonLink="/dashboard/category/add"
            buttonTitle={t('category.title.add_Category') as string}
            onClickAdd={(value) => router.push(`${langugeRoute}${value}`)}>
            <SearchFilter
              t={t}
              setSearchQuery={setSearchQuery}
              isLoading={isLoading}
            />
          </SearchRow>
          <Box
            display={{ md: 'flex', sm: 'flex', xs: 'block' }}
            justifyContent="space-between"
            alignItems="center">
            <Grid container spacing={3} mt="0px">
              <CategoryTypeButtons
                t={t}
                isPrivate={isPrivate}
                setIsPrivate={setIsPrivate}
              />
            </Grid>
            <Box sx={{ whiteSpace: 'nowrap' }}>
              {t('category.title.total_category')}:{count}
            </Box>
          </Box>
        </>
      )}
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <DisplayList
          t={t}
          categoryData={categoryData}
          getData={getData}
          alertMessages={alertMessages}
          alertCloseHandler={alertCloseHandler}
          setAlertMessages={setAlertMessages}
          isPrivate={isPrivate}
          isShowAllData={isShowAllData}
          showButton={showButton}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          totalCount={count}
          setApiChanges={setApiChanges}
        />
      )}
    </>
  );
};
export default GetCategories;
