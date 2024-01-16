/* eslint-disable max-lines */
'use client';

import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ItemCard from './itemCard';
import ProductContainer from '../ProductContainer';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { getCountProduct } from '@/api/countProductApi/countProduct';
import { itemcardprops } from '@/interfaces/product';
import { ItemsListView } from '../itemsLIstView/ItemsListView';
import CopyrightFooter from '../footer/copyright';
import { KeyPrefix, TFunction } from 'i18next';
interface ViewProductsListProps {
  preferredLng?: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}
function ViewProductsList({ t, preferredLng }: ViewProductsListProps) {
  const [displayType, setDisplayType] = useState<'list' | 'column'>('list');
  const [itemCardSelectedId, setItemCardSelectedId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiChanges, setApiChanges] = useState<string>('');
  const [isFilterBox, setIsFilterBox] = useState<boolean>(true);
  const [itemCardProps, setItemCardProps] = useState<itemcardprops[]>([
    {
      id: 1,
      cardName: t('product.productCardName.myItem'),
      cardValue: 0,
      cardToday: 0,
      cardPercent: 0,
    },
    {
      id: 2,
      cardName: t('product.productCardName.publicItems'),
      cardValue: 0,
      cardToday: 0,
      cardPercent: 0,
    },
    {
      id: 3,
      cardName: t('product.productCardName.privateItems'),
      cardValue: 0,
      cardToday: 0,
      cardPercent: 0,
    },
    {
      id: 4,
      cardName: t('product.productCardName.myCategories'),
      cardValue: 0,
      cardToday: 0,
      cardPercent: 0,
    },
    {
      id: 5,
      cardName: t('product.productCardName.myWishlist'),
      cardValue: 0,
      cardToday: 0,
      cardPercent: 0,
    },
  ]);

  const getAllItems = async () => {
    try {
      const data = await getCountProduct();
      const updatedItemCardProps = itemCardProps.map((itemCard) => {
        switch (itemCard.id) {
          case 1:
            return {
              ...itemCard,
              cardValue: data.data.data.userProductCount.totalProductCount,
              cardToday: data.data.data.userProductCount.todayProductCount,
              cardPercent: data.data.data.userProductCount.percentageProduct,
            };
          case 2:
            return {
              ...itemCard,
              cardValue:
                data.data.data.publicProductCount.totalPublicProductCount,
              cardToday:
                data.data.data.publicProductCount.todayPublicProductCount,
              cardPercent:
                data.data.data.publicProductCount.percentagePublicProducts,
            };
          case 3:
            return {
              ...itemCard,
              cardValue:
                data.data.data.privateProductCount.totalPrivateProductCount,
              cardToday:
                data.data.data.privateProductCount.todayPrivateProductCount,
              cardPercent:
                data.data.data.privateProductCount.percentagePrivateProducts,
            };
          case 4:
            return {
              ...itemCard,
              cardValue: data.data.data.categoryCount.totalCategoryCount,
              cardToday: data.data.data.categoryCount.todayCategoryCount,
              cardPercent: data.data.data.categoryCount.percentageCategory,
            };
          case 5:
            return {
              ...itemCard,
              cardValue: data.data.data.wishlistCount.totalWishlistCount,
              cardToday: data.data.data.wishlistCount.todayWishlistCount,
              cardPercent: data.data.data.wishlistCount.percentageWishlists,
            };
          default:
            return itemCard;
        }
      });
      setItemCardProps(updatedItemCardProps);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const handleItemCard = (id: number) => {
    setItemCardSelectedId(id);
    id === 4 ? setIsFilterBox(false) : setIsFilterBox(true);
  };

  useEffect(() => {
    if (searchQuery.length > 0) setIsLoading(true);
    const delayTime = setTimeout(() => {
      setSearchData(searchQuery);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delayTime);
  }, [searchQuery]);

  useEffect(() => {
    if (itemCardSelectedId) {
      setIsLoading(true);
    }
    getAllItems();
  }, [itemCardSelectedId]);

  useEffect(() => {
    if (apiChanges) {
      getAllItems();
    }
  }, [apiChanges]);

  const handleSeachQuery = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Grid
        container
        columnGap={1}
        rowGap={2}
        sx={{ padding: '1.93rem 0rem' }}
        justifyContent="space-between">
        <Grid item xs={8} md={7}>
          <Typography variant="h4">
            {t('gallery.dashboards.dashboard')}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'var(--text-normal, #ADB3CC)' }}>
            {t('product.welcomeBack')}
            <span style={{ marginLeft: '.3rem' }}>🎉</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={4}>
          <TextField
            placeholder={t('product.search') as string}
            variant="outlined"
            value={searchQuery}
            onChange={(e) => handleSeachQuery(e)}
            InputProps={{
              sx: {
                ...{
                  fontSize: '1rem',
                  fontStyle: 'normal',
                  px: '1rem',
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  {searchQuery.length > 0 && isLoading ? (
                    <CircularProgress
                      sx={{
                        '& .MuiCircularProgress-circle': {
                          r: 10,
                          strokeWidth: 2,
                        },
                      }}
                    />
                  ) : (
                    <SearchIcon sx={{ mr: '1rem' }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {itemCardProps.map((value) => (
          <Grid item key={value.id}>
            <ItemCard
              itemCardSelectedId={itemCardSelectedId}
              handleItemCard={handleItemCard}
              id={value.id}
              cardName={value.cardName}
              cardValue={value.cardValue}
              cardPercent={value.cardPercent}
              cardToday={value.cardToday}
              t={t}
            />
          </Grid>
        ))}
        <Grid item md={12} xs={12}>
          <ProductContainer
            displayType={displayType}
            setDisplayType={setDisplayType}
            title={itemCardProps[itemCardSelectedId - 1].cardName}
            isFilterBox={isFilterBox}>
            {isLoading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <ItemsListView
                preferredLng={preferredLng}
                t={t}
                searchQuery={searchData}
                itemCardSelectedId={itemCardSelectedId}
                displayType={displayType}
                setApiChanges={setApiChanges}
              />
            )}
          </ProductContainer>
        </Grid>
      </Grid>
      <>
        <Box paddingY="1rem">
          <CopyrightFooter t={t} />
        </Box>
      </>
    </>
  );
}

export default ViewProductsList;
