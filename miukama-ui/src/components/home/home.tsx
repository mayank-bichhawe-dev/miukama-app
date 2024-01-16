import React, { useContext } from 'react';
import { DisplayCard as ProductDisplayCard } from '@/components/ProductCard/DisplayCard';
import ProductContainer from '@/components/ProductContainer';
import Carousel from '@/components/carousel/carousel';
import SignupBanner from '@/components/signupbanner/SignupBanner';
import theme from '@/theme';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import { Inter } from 'next/font/google';
import style from './home.module.css';
import { useEffect, useState } from 'react';
import { DisplayCard } from '../galleries/DisplayCard';
import { PopularItem, largestGallery } from '@/api/homePageApi/publicApi';
import {
  publicGalleryProps,
  HomeComponentProps,
} from '@/interfaces/publicGallery';
const inter = Inter({ weight: '200', subsets: ['latin'] });
import { useRouter } from 'next/navigation';
import { UserLoginContext } from '@/app/[lng]/layout';

const HomeComponent: React.FC<HomeComponentProps> = ({ t }) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [publicGalleryItem, setPublicGalleryItem] = useState<
    publicGalleryProps[]
  >([]);
  const [popularItems, setPopularItems] = useState<publicGalleryProps[]>([]);
  const [remainingPopularItems, setRemainingPopularItems] = useState<
    publicGalleryProps[]
  >([]);

  const largestGalleryItems = async () => {
    const { data } = await largestGallery(1, 6, searchQuery);
    if (data.success) {
      const { rows } = data.data;
      setPublicGalleryItem(rows);
    } else {
      setPublicGalleryItem([]);
    }
  };

  const publicProductItem = async () => {
    const { data } = await PopularItem(1, 6, searchQuery);
    if (data.success) {
      const { rows } = data.data;
      const halfIndex = Math.ceil(rows.length / 2);
      const popularItems = rows.slice(0, halfIndex);
      const remainingPopularItem = rows.slice(halfIndex);
      setPopularItems(popularItems);
      setRemainingPopularItems(remainingPopularItem);
    } else {
      setPopularItems([]);
    }
  };

  useEffect(() => {
    const delayTime = setTimeout(() => {
      publicProductItem();
      largestGalleryItems();
    }, 1000);

    return () => clearTimeout(delayTime);
  }, [searchQuery]);

  const isDisplayCardFormat = (items: any) => {
    return items.map((item: publicGalleryProps) => ({
      totalItem: item.totalItem,
      ownerName: item.ownerName,
      id: item.id,
      name: item.name ? item.name : item.itemName,
      description: item.description,
      visibility: item.visibility,
      updatedAt: item.updatedAt,
      imagePath: item.imagePath,
      userImagePath: item.User.imagePath,
    }));
  };

  const popularItemsRows =
    popularItems.length > 0 ? isDisplayCardFormat(popularItems) : [];
  const rePopularItemRows =
    remainingPopularItems.length > 0
      ? isDisplayCardFormat(remainingPopularItems)
      : [];
  const galleryRows =
    publicGalleryItem.length > 0 ? isDisplayCardFormat(publicGalleryItem) : [];

  return (
    <>
      <Grid container className={style.bannerHeader}>
        <Grid item md={7} gap={5}>
          <Box
            sx={{
              padding: '5rem 0 0',
            }}>
            <Typography variant="h6">{t('home.title1')}</Typography>
            <Typography variant="h2">
              {t('home.title2')}
              <br />
              {t('home.title3')}&nbsp;
              <span
                style={{
                  color: theme.palette.primary.main,
                }}>
                {t('home.title4')}
              </span>
            </Typography>
            <Typography variant="h6">{t('home.description1')}</Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
              }}>
              {t('home.description2')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                paddingTop: '32px',
                paddingBottom: '100px',
              }}>
              <Box className={style.homeSearch}>
                <TextField
                  placeholder={t('home.search') as string}
                  variant="outlined"
                  onChange={(event) => setSearchQuery(event.target.value)}
                  InputProps={{
                    sx: {
                      ...{
                        height: '64px',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontFamily: inter.style,
                        px: '1rem',
                      },
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Button
                size="large"
                sx={{ height: '64px', width: '64px', ml: '22px' }}>
                <ListIcon />
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={5}
          sx={{
            textAlign: 'center',
          }}>
          <img src="/bannerImage.png" alt="Miukama" />
        </Grid>
      </Grid>
      <Typography variant="h4" className={style.contentDescription}>
        {t('home.description3')}
        <span style={{ color: theme.palette.primary.main }}>
          &nbsp;{t('home.description4')}
        </span>
        {t('home.description5')}
      </Typography>
      <Typography
        variant="h4"
        paddingTop={'30px'}
        className={style.contentDescription}>
        {t('home.description6')} &nbsp;
        <span style={{ color: theme.palette.primary.main }}>
          {t('home.description7')}
        </span>
        {t('home.description8')}
      </Typography>
      <ProductContainer
        ViewAllItem={true}
        title={t('home.largestGalleries')}
        handleViewall={() => router.push(`${langugeRoute}/gallery`)}>
        <DisplayCard data={galleryRows} />
      </ProductContainer>
      <ProductContainer
        ViewAllItem={true}
        title={t('home.popularItems')}
        handleViewall={() => router.push(`${langugeRoute}/dashboard/my-items`)}>
        <ProductDisplayCard data={popularItemsRows} />
      </ProductContainer>
      <SignupBanner t={t} />
      <ProductContainer
        ViewAllItem={true}
        title={t('home.popularItems')}
        handleViewall={() => router.push(`${langugeRoute}/dashboard/my-items`)}>
        <ProductDisplayCard data={rePopularItemRows} />
      </ProductContainer>
      <Carousel t={t} />
    </>
  );
};
export default HomeComponent;
