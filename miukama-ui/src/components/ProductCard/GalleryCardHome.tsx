import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { getGallery } from '@/api/galleriesAPI/gallery';
import { gallery } from '@/interfaces/galleries';

export const GalleryCardHome = () => {
  const [data, setData] = useState<gallery[]>([]);
  useEffect(() => {
    getAllGallery();
  }, []);

  const getAllGallery = async () => {
    const { data } = await getGallery();
    if (data.success) {
      setData(data.data.rows);
    } else {
      setData([]);
    }
  };
  return (
    <Grid container spacing={2}>
      {data.map((value) =>
        value.visibility ? null : (
          <Grid item key={value.id} md={4}>
            <ProductCard
              title={value.name}
              subTitle={value.description}
              avatar="Ellipse 66.png"
              image="/avatar.png"
              id={value.id.toString()}
              size={'medium'}
            />
          </Grid>
        ),
      )}
    </Grid>
  );
};
