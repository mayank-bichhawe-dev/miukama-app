'use client';

import { Grid, Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../breadcrumbs/breadcrumbs';
import ProductListView from './productListView';
import ProductCardView from './productCardView';
import SearchRow from '../galleries/components/searchRow';
import SearchFilter from '../galleries/components/searchFilter';
import { useRouter } from 'next/navigation';
import { ProductList } from '@/interfaces/product';
import { KeyPrefix, TFunction } from 'i18next';
import { UserLoginContext } from '@/app/[lng]/layout';

interface productPageProps {
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

function ProductPage({ t }: productPageProps) {
  const { langugeRoute } = useContext(UserLoginContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayType, setDisplayType] = useState<'list' | 'column'>('list');
  const [selectedCategoryId, setSelectedCategryId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [productList, setProductList] = useState<ProductList[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (displayType) {
      setIsLoading(true);
    }
  }, [displayType]);

  return (
    <>
      <Breadcrumb
        title={t('myItem.myItems') as string}
        data={[{ title: t('myItem.dashboard'), link: `${langugeRoute}/dashboard` }]}
      />
      <Grid
        container
        columnGap={1}
        rowGap={2}
        sx={{ padding: '0.5rem 0rem' }}
        justifyContent="space-between"
        alignItems="center">
        <Grid md={12} justifyContent="space-between" alignItems="center">
          <SearchRow
            displayType={displayType}
            setDisplayType={setDisplayType}
            buttonLink="/dashboard/product/add"
            buttonTitle={t('myItem.button') as string}
            onClickAdd={(value: string) => router.push(`${langugeRoute}${value}`)}>
            <SearchFilter
              isLoading={isLoading}
              displayDropDown
              setSearchQuery={setSearchQuery}
              setSelectedCategryId={setSelectedCategryId}
              t={t}
            />
          </SearchRow>
        </Grid>

        <Grid item md={12} xs={12}>
          <Box
            sx={{
              padding: '3rem 0',
            }}>
            {displayType === 'list' ? (
              <ProductListView
                searchQuery={searchQuery}
                categoryId={
                  selectedCategoryId !== 'All Categories'
                    ? selectedCategoryId
                    : ''
                }
                totalCount={totalCount}
                setTotalCount={setTotalCount}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                productList={productList}
                setProductList={setProductList}
                t={t}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            ) : (
              <ProductCardView
                searchQuery={searchQuery}
                categoryId={
                  selectedCategoryId !== 'All Categories'
                    ? selectedCategoryId
                    : ''
                }
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductPage;
