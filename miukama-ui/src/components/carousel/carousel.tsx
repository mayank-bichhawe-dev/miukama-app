'use client';

import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import CarouselItem from './CarouselItem';
import { useEffect, useState } from 'react';
import { getPost } from '@/api/postApi/post';
import { PostProps } from '@/interfaces/carousel';
import CarouselMaps from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './carousel.module.css';
import { KeyPrefix, TFunction } from 'i18next';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function Carousel({
  t,
}: {
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}) {
  const [postData, setPostData] = useState<PostProps[]>([]);
  const [postPagination, setPostPagination] = useState<{
    page: number;
    pageSize: number;
    count?: number;
  }>({ page: 1, pageSize: 25 });

  useEffect(() => {
    getAllPost();
  }, [postPagination.page]);

  const getAllPost = async () => {
    const { data } = await getPost(
      postPagination.page,
      postPagination.pageSize,
    );
    if (data.success) {
      setPostData((prev) => [...prev, ...data.data.rows]);
      setPostPagination({ ...postPagination, count: data.data.count });
    } else {
      setPostData([]);
    }
  };

  return (
    <Grid container>
      {postData.length > 0 && (
        <>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="h4"
              align="center"
              justifyContent="center"
              style={{ margin: 'auto' }}>
              {t('home.carousel')}
            </Typography>
          </Grid>
          <Box
            sx={{
              display: { xs: 'block', sm: 'block', md: 'block' },
              margin: {
                xs: '4rem 0rem 10rem 0rem',
                sm: '4rem 8rem 10rem 8rem',
              },
              width: { xs: '100%', sm: 'calc( 100% - 16rem )' },
            }}
            gap={2}
            alignItems="center">
            <CarouselMaps
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              infinite={true}
              keyBoardControl={true}
              customTransition="all .5"
              customLeftArrow={
                <Button
                  variant="text"
                  className={styles.home_carousel_left_icon}>
                  <Avatar alt="previous" src="left-hand.png" />
                </Button>
              }
              customRightArrow={
                <Button
                  variant="text"
                  className={styles.home_carousel_right_icon}>
                  <Avatar alt="next" src="right-hand.png" />
                </Button>
              }
              containerClass={styles.carousel_container}
              beforeChange={(next) => {
                if (postPagination.page * postPagination.pageSize === next) {
                  if (postData.length !== postPagination.count) {
                    setPostPagination({
                      ...postPagination,
                      page: postPagination.page + 1,
                    });
                  }
                }
              }}>
              {postData.map((data, index) => {
                return (
                  <CarouselItem
                    imgName={
                      data.imagePath
                        ? `${process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL}${data.imagePath}`
                        : 'img1.png'
                    }
                    title={data?.title || ''}
                    description={data?.description || ''}
                    externalLink={data?.externalLink || ''}
                    key={index}
                  />
                );
              })}
            </CarouselMaps>
          </Box>
        </>
      )}
    </Grid>
  );
}
