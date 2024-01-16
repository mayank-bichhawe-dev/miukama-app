import GetCategories from '@/components/category/category';
import { KeyPrefix, TFunction } from 'i18next';
interface HomeCategoryProps {
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

export const HomeCategory = ({ preferredLng, t }: HomeCategoryProps) => {
  return (
    <>
      <GetCategories preferredLng={preferredLng} t={t} />
    </>
  );
};
