'use client';

import * as Yup from 'yup';

export const addProduct = (t: any) =>
  Yup.object({
    categoryId: Yup.string().matches(
      /^([^0]+)$/g,
      t('product.addProduct.productForm.validation.categoryId'),
    ),
    itemName: Yup.string().required(
      t('product.addProduct.productForm.validation.itemName'),
    ),
    description: Yup.string().required(
      t('product.addProduct.productForm.validation.description'),
    ),
    itemManufacturer: Yup.string().required(
      t('product.addProduct.productForm.validation.itemManufacturer'),
    ),
    yearOfOrigin: Yup.string().required(
      t('product.addProduct.productForm.validation.yearOfOrigin'),
    ),
    priceOfPurchase: Yup.number().required(
      t('product.addProduct.productForm.validation.priceOfPurchase'),
    ),
    priceOfCurrent: Yup.number().required(
      t('product.addProduct.productForm.validation.priceOfCurrent'),
    ),
    priceOfOrigin: Yup.number().required(
      t('product.addProduct.productForm.validation.priceOfOrigin'),
    ),
    itemProductionNumber: Yup.string().required(
      t('product.addProduct.productForm.validation.itemProductionNumber'),
    ),
    owner: Yup.string().required(
      t('product.addProduct.productForm.validation.owner'),
    ),
    color: Yup.string().required(
      t('product.addProduct.productForm.validation.color'),
    ),
    itemModel: Yup.string().required(
      t('product.addProduct.productForm.validation.itemModel'),
    ),
    givenBy: Yup.string().required(
      t('product.addProduct.productForm.validation.givenBy'),
    ),
    loanedBy: Yup.string().required(
      t('product.addProduct.productForm.validation.loanedBy'),
    ),
  });
