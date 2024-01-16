'use client';

import * as Yup from 'yup';

export const addGallerySchemas = (t: any) =>
  Yup.object({
    name: Yup.string().required(
      t('gallery.addGallery.validation.categoryName'),
    ),
    description: Yup.string(),
    visibility: Yup.boolean().required(
      t('gallery.addGallery.validation.visibility'),
    ),
  });
