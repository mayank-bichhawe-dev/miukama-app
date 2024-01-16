/* eslint-disable max-lines */
import React, { ChangeEvent, useContext } from 'react';
import styles from '../category/addCategory.module.css';
import { formSchema } from './schemas/Schemas';
import { getGallery } from '../../api/galleriesAPI/gallery';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { KeyboardArrowDown } from '@mui/icons-material';
import {
  addCategory,
  getCategoryById,
  updateCategory,
} from '@/api/categoryAPI/category';
import { useState, useEffect } from 'react';
import { categoryItem, subCategories } from '@/interfaces/categories';
import { gallery } from '@/interfaces/galleries';
import AlertBox from '../alertBox/alertBox';
import FieldLayout from '../formLayouts/FieldLayout';
import { useRouter } from 'next/navigation';
import AddSubCategoryField from './addSubCategoryField';
import { KeyPrefix, TFunction } from 'i18next';
import Breadcrumb from '../breadcrumbs/breadcrumbs';
import { UserLoginContext } from '@/app/[lng]/layout';

const initialValues: categoryItem = {
  id: 0,
  categoryName: '',
  subCategories: [],
  galleryId: 0,
  description: '',
  visibility: false,
};

interface AddCategoryProps {
  id?: number;
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

const AddCategory: React.FC<AddCategoryProps> = ({ id, t }) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryloading, setIsCategoryLoading] = useState(false);
  const [categoryItemData, setCategoryItemData] =
    useState<categoryItem>(initialValues);
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const [data, setData] = useState<gallery[]>([]);
  const getAllGallery = async () => {
    const { data } = await getGallery(null, null, searchQuery, null);
    if (data.success) {
      setData(data.data.rows);
    } else {
      setData([]);
    }
    setIsCategoryLoading(false);
  };
  useEffect(() => {
    setIsCategoryLoading(true);
    const delayTime = setTimeout(() => {
      getAllGallery();
    }, 1000);

    return () => clearTimeout(delayTime);
  }, [searchQuery]);

  const categoryAdd = async (value: categoryItem, id: number | undefined) => {
    if (id) {
      const response = await updateCategory(value, id);
      if (response.data.success) {
        setAlertMessages([
          ...alertMessages,
          { type: response.data.success, message: response.data.message },
        ]);
        router.push(`${langugeRoute}/dashboard/category`);
      }
    } else {
      const { data } = await addCategory(value);
      if (data.success) {
        handleReset({
          categoryName: '',
          subCategories: [],
          galleryId: 0,
          description: '',
          visibility: false,
        });
      }
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);

      setTimeout(() => {
        setAlertMessages([]);
      }, 3000);
    }
  };
  const alertCloseHandler = () => {
    setAlertMessages([]);
  };
  const {
    values,
    errors,
    touched,
    handleChange,
    handleReset,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: categoryItemData,
    validationSchema: formSchema(t),
    enableReinitialize: true,
    onSubmit: (values: categoryItem) => {
      values.subCategories = id
        ? (values.subCategories as subCategories[])?.filter(
          (value) => value.name !== '',
        )
        : (values.subCategories as string[]).filter((value) => value !== '');
      categoryAdd(values, id);
    },
  });
  const getCategory = async (id: number) => {
    const { data } = await getCategoryById(id);

    if (data.success) {
      setCategoryItemData({
        categoryName: data.data.categoryName,
        galleryId: data.data.galleryId,
        subCategories: data.data.SubCategories,
        description: data.data.description,
        visibility: data.data.visibility,
      });
    } else {
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
    }
  };
  useEffect(() => {
    if (id && !isNaN(id)) {
      getAllGallery();
      getCategory(id);
    }
  }, [id]);
  const handleSearchCategory = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Box>
      <Breadcrumb
        title={
          id
            ? (t('category.edit_category.edit_category_title1') as string)
            : (t('category.add_category.add_category_title1') as string)
        }
        data={[
          { title: t('category.edit_category.dashboard'), link: `${langugeRoute}/dashboard` },
          {
            title: t('category.edit_category.categories'),
            link: `${langugeRoute}/dashboard/category`,
          },
        ]}></Breadcrumb>
      <Box className={styles.galleryBox}>
        <Box
          style={{
            margin: 'auto',
            width: ' 65%',
            padding: '3rem',
            textAlign: 'center',
          }}>
          <Typography variant="h5" className={styles.headingCategory}>
            {id
              ? t('category.edit_category.edit_category_title2')
              : t('category.add_category.title')}
          </Typography>
        </Box>

        <Box component={'form'} onSubmit={handleSubmit} noValidate>
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={6} md={5}>
              <FieldLayout
                label={t('category.add_category.category_name')}
                showError={touched.categoryName}
                error={errors.categoryName}>
                <TextField
                  size="small"
                  type="text"
                  placeholder={
                    t('category.add_category.enter_category_name') as string
                  }
                  name="categoryName"
                  value={values.categoryName}
                  onChange={handleChange}
                />
              </FieldLayout>
              <FieldLayout
                label={t('category.add_category.sub_category_(optional)')}>
                <AddSubCategoryField
                  id={id}
                  subCategory={values.subCategories}
                  setSubCategory={(val) => setFieldValue('subCategories', val)}
                  t={t}
                />
              </FieldLayout>
              <FieldLayout label={t('category.add_category.gallery')}>
                <Autocomplete
                  options={data ?? []}
                  getOptionLabel={(item) => item.name}
                  value={
                    data.find((item) => item.id === values.galleryId) || null
                  }
                  onChange={(_, newValue) => {
                    setFieldValue('galleryId', newValue?.id || 0);
                  }}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={
                        t('gallery.searchGallery.selectGallery') as string
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
                        onChange: (e) => handleSearchCategory(e),
                        endAdornment: (
                          <React.Fragment>
                            {searchQuery.length > 0 && isCategoryloading ? (
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

                {errors.galleryId !== null && (touched.galleryId ?? false) ? (
                  <Box className={styles.form_error}>{errors.galleryId}</Box>
                ) : null}
              </FieldLayout>

              <FieldLayout label={t('category.add_category.description')}>
                <TextField
                  size="small"
                  multiline
                  rows={3}
                  placeholder={t('category.add_category.type_here') as string}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
              </FieldLayout>
              <FieldLayout label={t('category.add_category.visibility')}>
                <FormControl fullWidth>
                  <Select
                    IconComponent={KeyboardArrowDown}
                    name="visibility"
                    value={values.visibility}
                    onChange={handleChange}
                    size="small">
                    <MenuItem value={true as any}>
                      {t('category.add_category.private')}
                    </MenuItem>
                    <MenuItem value={false as any}>
                      {t('category.add_category.public')}
                    </MenuItem>
                  </Select>
                </FormControl>
              </FieldLayout>
              <Box sx={{ my: '1' }}>
                <AlertBox
                  alertMessages={alertMessages}
                  handleAlertClose={alertCloseHandler}></AlertBox>
              </Box>
              <Box
                display="flex"
                paddingY="3.5rem"
                justifyContent="end"
                columnGap={5}>
                <Button
                  onClick={() => router.push(`${langugeRoute}/dashboard/category`)}
                  style={{
                    background: '#827E7E',
                  }}>
                  {t('category.add_category.cancel')}
                </Button>
                <Button
                  type="submit"
                  style={{
                    background: '#014F04',
                  }}>
                  {t('category.add_category.save')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default AddCategory;
