import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { CardData, DisplayCardProps } from '@/interfaces/displayCard';

export const DisplayCard = ({ data }: DisplayCardProps) => {
  return (
    <Grid container spacing={2}>
      {data.map((value: CardData) => (
        <Grid item key={value.id} xs={12} sm={6} md={4}>
          <ProductCard
            title={value.name}
            subTitle={value.description}
            avatar={value.userImagePath}
            image={value.imagePath}
            id={value.id.toString()}
            price={66}
            size={'medium'}
          />
        </Grid>
      ))}
    </Grid>
  );
};
