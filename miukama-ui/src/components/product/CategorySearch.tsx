import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { getCategory, getCategoryById } from '@/api/categoryAPI/category';
import {
  categoryItem,
  Categories,
  subCategories,
} from '@/interfaces/categories';
import React, { useEffect, useState } from 'react';
import { productProps } from '@/interfaces/categories';
import { Debounce } from '@/utils/debounce';
import FieldLayout from '../formLayouts/FieldLayout';

export default function CategorySearch({
  t,
  setFieldValue,
  categoryName,
  setCategoryName,
  values,
}: productProps) {
  const [category, setCategories] = useState<Categories[]>([]);
  const [subCategory, setSubCategory] = useState<subCategories[]>([]);
  const [searchQuery, setSearchQuery] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<subCategories | null>(null);

  const getAllCategory = async () => {
    const response = await getCategory(null, null, searchQuery, null);
    if (response.data.success) {
      const rows = response.data.data.rows;
      const rowData = rows.map((item: categoryItem) => ({
        value: item?.id,
        label: item?.categoryName,
      }));
      setCategories(rowData);
    }
    return [];
  };

  const delayedFetchData = Debounce(getAllCategory, setLoading);

  useEffect(() => {
    delayedFetchData();
  }, [searchQuery]);

  const getSubCategories = async (categoryId: number) => {
    const response = await getCategoryById(categoryId);
    if (response.data.success) {
      const subCategoryData = response.data.data.SubCategories;
      setSubCategory(subCategoryData);
      const SubCategorys = subCategoryData.find(
        (item: subCategories) => item.id === values.subCategoryId,
      );
      setSelectedSubCategory(SubCategorys);
    }
  };

  useEffect(() => {
    if (categoryName) {
      getSubCategories(categoryName.value);
    }
  }, [category, categoryName]);

  return (
    <>
      <FieldLayout label={t('product.addProduct.productForm.category')}>
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.label === value.label}
          getOptionLabel={(option) => option.label}
          options={category}
          loading={loading}
          value={
            categoryName?.label
              ? categoryName
              : {
                  label: '',
                  value: 0,
                }
          }
          onChange={(event, newValue) => {
            newValue?.value && setFieldValue('categoryId', newValue?.value);
            setCategoryName({
              value: newValue?.value,
              label: newValue?.label,
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="categoryId"
              placeholder={
                t('product.addProduct.productForm.allCategory') as string
              }
              InputProps={{
                sx: {
                  ...{
                    height: '48px',
                    lineHeight: '48px',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    color: 'white',
                    '& .MuiInputBase-input': {
                      padding: '8px 20px!important',
                    },
                  },
                },
                ...params.InputProps,
                onChange: (e) => {
                  setSearchQuery(e.target.value);
                  setCategoryName({
                    value: 0,
                    label: e.target.value,
                  });
                },
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress
                        sx={{
                          '& .MuiCircularProgress-circle': {
                            r: 10,
                            strokeWidth: 2,
                          },
                        }}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </FieldLayout>
      <FieldLayout label={t('product.addProduct.productForm.subCategory')}>
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={subCategory}
          loading={loading}
          value={selectedSubCategory || null}
          onChange={(event, newValue) => {
            newValue?.id && setFieldValue('subCategoryId', newValue?.id);
            setSelectedSubCategory(
              newValue ? { name: newValue.name, id: newValue?.id } : null,
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                t('product.addProduct.productForm.selectSubCategory') as string
              }
              InputProps={{
                sx: {
                  ...{
                    height: '48px',
                    lineHeight: '48px',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    color: 'white',
                    '& .MuiInputBase-input': {
                      padding: '8px 20px!important',
                    },
                  },
                },
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress
                        sx={{
                          '& .MuiCircularProgress-circle': {
                            r: 10,
                            strokeWidth: 2,
                          },
                        }}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </FieldLayout>
    </>
  );
}
