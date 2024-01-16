import { Grid } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import { DisplayCardProps } from '@/interfaces/displayCard';

export const DisplayCard = ({ handelEditCard, data }: DisplayCardProps) => {
  return (
    <Grid container spacing={2}>
      {data.map((value) => (
        <Grid item key={value.id} xs={12} sm={6} md={4}>
          <ProductCard
            title={value.name}
            subTitle={value.description}
            avatar={value.userImagePath}
            image={value.imagePath}
            id={value.id.toString()}
            price={66}
            size={'medium'}
            handelEditCard={handelEditCard}
            userId={value.userId}
          />
        </Grid>
      ))}
    </Grid>
  );
};
