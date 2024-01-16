import * as Yup from 'yup';
export const formSchema = (t: any) =>
  Yup.object({
    categoryName: Yup.string().required(
      t('category.add_category.validation.enter_category'),
    ),
    galleryId: Yup.string().matches(
      /^([^0]+)$/g,
      t('category.add_category.validation.select_gallery'),
    ),
    visibility: Yup.boolean().required(
      t('category.add_category.validation.select_visibility'),
    ),
  });
