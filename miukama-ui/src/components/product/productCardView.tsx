import { Box, CircularProgress, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getProduct } from '@/api/productAPI/products';
import { productCardListProps, CardProduct } from '@/interfaces/product';
import React from 'react';
import { Debounce } from '@/utils/debounce';
import { useRouter } from 'next/navigation';
import { UserLoginContext } from '@/app/[lng]/layout';

const ProductCardView = ({
  searchQuery = '',
  categoryId = '',
  setIsLoading,
  isLoading = false,
}: CardProduct) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const [data, setData] = useState<productCardListProps[]>([]);
  const getProductCardList = async () => {
    const { data } = await getProduct(searchQuery, categoryId);
    if (data.success) {
      setData(data.data.rows);
    } else {
      setData([]);
    }
    setIsLoading(false);
  };

  const delayedFetchData = Debounce(getProductCardList, setIsLoading);
  useEffect(() => {
    delayedFetchData();
  }, [searchQuery, categoryId]);

  const productEdit = (id: number) => {
    router.push(`${langugeRoute}/dashboard/product/edit/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container columnGap={2}>
          {data.map((value) => (
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
export default ProductCardView;
