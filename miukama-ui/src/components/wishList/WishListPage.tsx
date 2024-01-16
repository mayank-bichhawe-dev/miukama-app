import { Wishlist } from './WishList';
import { KeyPrefix, TFunction } from 'i18next';

interface wishListPageProps {
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

export const WishListPage = ({ preferredLng, t }: wishListPageProps) => {
  return (
    <>
      <Wishlist preferredLng={preferredLng} t={t} />
    </>
  );
};
