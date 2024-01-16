/* eslint-disable max-lines */
'use client';

import FieldLayout from '@/components/formLayouts/FieldLayout';
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined';
import { addUserProduct } from '@/interfaces/addUserProduct';
import { addProduct } from '@/validationSchemas/ProductSchemas/addProduct';
import { MutableRefObject, useContext, useEffect, useState } from 'react';
import React from 'react';
import CategorySearch from './CategorySearch';
import AlertBox from '../alertBox/alertBox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MuiColorInput } from 'mui-color-input';
import {
  addUserItem,
  getProductById,
  updateUserProduct,
} from '@/api/productAPI/products';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import Breadcrumb from '../breadcrumbs/breadcrumbs';
import { KeyPrefix, TFunction } from 'i18next';
import { UserLoginContext } from '@/app/[lng]/layout';

const initialValues: addUserProduct = {
  categoryId: 0,
  subCategoryId: 0,
  itemName: '',
  description: '',
  itemManufacturer: '',
  condition: 'new',
  yearOfOrigin: dayjs(new Date()),
  priceOfPurchase: '',
  priceOfCurrent: '',
  priceOfOrigin: '',
  itemProductionNumber: '',
  owner: '',
  color: '#B2008B',
  itemModel: '',
  givenBy: '',
  loanedBy: '',
  visibility: false,
  imagePath: '',
};

interface addProductProps {
  id?: number;
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}
const AddProduct: React.FC<addProductProps> = ({ id, t }) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const inputFileRef = React.useRef() as MutableRefObject<HTMLInputElement>;
  const [productData, setProductData] = useState<addUserProduct>(initialValues);

  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);

  const [productAvatarPreview, setProductAvatarPreview] = useState<string>('');
  const [uploadProductImage, setUploadProductImage] = useState('');
  const [categoryName, setCategoryName] = useState<any | null>();

  const alertCloseHandler = () => {
    setAlertMessages([]);
  };

  const createProduct = async (
    values: addUserProduct,
    id: number | undefined,
  ) => {
    const formData = new FormData();
    formData.append('categoryId', values.categoryId.toString());
    formData.append('itemName', values.itemName);
    formData.append('description', values.description);
    formData.append('itemManufacturer', values.itemManufacturer);
    formData.append('condition', values.condition);
    formData.append('yearOfOrigin', String(values.yearOfOrigin));
    formData.append('priceOfPurchase', values.priceOfPurchase);
    formData.append('priceOfCurrent', values.priceOfCurrent);
    formData.append('priceOfOrigin', values.priceOfOrigin);
    formData.append('itemProductionNumber', values.itemProductionNumber);
    formData.append('owner', values.owner);
    formData.append('color', values.color);
    formData.append('itemModel', values.itemModel);
    formData.append('givenBy', values.givenBy);
    formData.append('loanedBy', values.loanedBy);
    formData.append('visibility', values.visibility.toString());
    formData.append('file', uploadProductImage);
    formData.append('subCategoryId', values.subCategoryId.toString());

    if (id) {
      const { data } = await updateUserProduct(formData, id);
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
      if (data.success) {
        setTimeout(() => {
          setAlertMessages([]);
          router.push(`${langugeRoute}/dashboard/product`);
        }, 3000);
      }
    } else {
      const { data } = await addUserItem(formData);
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
      if (data.success) {
        handleReset(initialValues);
        setProductAvatarPreview('');
        setUploadProductImage('');
        setTimeout(() => {
          setAlertMessages([]);
        }, 3000);
      }
    }
  };

  const handleFieldUpdateRequest = async () => {
    const { data } = await getProductById(id);
    if (data.success) {
      setProductData(data.data);
      setCategoryName({
        label: data.data.Category.categoryName,
        value: data.data.categoryId,
      });
      if (data.data.imagePath) {
        setProductAvatarPreview(
          `${process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL}${data.data.imagePath}`,
        );
      }
      data.data.imagePath && setUploadProductImage(data.data.imagePath);
    }
  };

  useEffect(() => {
    if (id && !isNaN(id)) {
      handleFieldUpdateRequest();
    }
  }, [id]);

  const {
    values,
    errors,
    handleChange,
    handleReset,
    handleSubmit,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: productData,
    validationSchema: addProduct(t),
    enableReinitialize: true,
    onSubmit: async (values) => {
      await createProduct(values, id);
    },
  });

  const onFileChangeCapture = (e: any) => {
    setProductAvatarPreview(URL.createObjectURL(e.target.files[0]));
    setUploadProductImage(e.target.files[0]);
  };
  return (
    <Box paddingBottom="5.125rem">
      <Breadcrumb
        title={
          id
            ? (t('product.addProduct.editItem') as string)
            : (t('product.addProduct.addNewItem') as string)
        }
        data={[
          { title: t('product.addProduct.dashboard'), link: `${langugeRoute}/dashboard` },
          { title: t('product.addProduct.myItem'), link: `${langugeRoute}/dashboard/my-item` },
        ]}></Breadcrumb>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        marginTop="2.37rem"
        sx={{
          paddingTop: { xs: 'none', sm: 'none', md: '4.563rem' },
          paddingBottom: { xs: 'none', sm: 'none', md: '2.375rem' },
        }}>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          padding="0px 3rem">
          <Grid item xs={8} sm={10} md={8} lg={2} justifyItems="center">
            <Box
              display="flex"
              justifyContent="center"
              width="11rem"
              height="11rem"
              borderRadius="9px"
              marginTop=".5rem"
              marginBottom="30px"
              border="1px dashed #FFFFFF"
              className="addproduct-box-test"
              onClick={() => inputFileRef.current.click()}>
              {productAvatarPreview ? (
                <img
                  alt=""
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '9px',
                  }}
                  src={productAvatarPreview}
                />
              ) : (
                <IconButton aria-label="upload image" color="secondary">
                  <CloudUploadOutlined sx={{ width: '80px', height: '80px' }} />
                </IconButton>
              )}
              <input
                type="file"
                hidden={true}
                ref={inputFileRef}
                onChangeCapture={onFileChangeCapture}
                accept="image/*"
              />
            </Box>
            <Box>
              <Typography variant="body2">
                {t('product.addProduct.image')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} sm={5} md={5} lg={4}>
            <FieldLayout
              label={t('product.addProduct.productForm.itemName')}
              showError={touched.itemName}
              error={errors.itemName}>
              <TextField
                size="small"
                placeholder={
                  t('product.addProduct.productForm.enterItemName') as string
                }
                name="itemName"
                value={values.itemName}
                onChange={handleChange}
              />
            </FieldLayout>
            <FieldLayout
              label={t('product.addProduct.productForm.description')}
              showError={touched.description}
              error={errors.description}>
              <TextField
                multiline
                rows={2.55}
                type="text"
                placeholder={
                  t('product.addProduct.productForm.typeHere') as string
                }
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </FieldLayout>
            <FieldLayout
              label={t('product.addProduct.productForm.itemManufacturer')}
              showError={touched.itemManufacturer}
              error={errors.itemManufacturer}>
              <TextField
                size="small"
                type="text"
                placeholder={
                  t(
                    'product.addProduct.productForm.enterManufacturer',
                  ) as string
                }
                name="itemManufacturer"
                value={values.itemManufacturer}
                onChange={handleChange}
              />
            </FieldLayout>
            <FieldLayout label={t('product.addProduct.productForm.condition')}>
              <Select
                input={<OutlinedInput size="small" />}
                name="condition"
                value={values.condition}
                onChange={handleChange}>
                <MenuItem value={'new'}>
                  {t('product.addProduct.productForm.new')}
                </MenuItem>
                <MenuItem value={'old'}>
                  {t('product.addProduct.productForm.old')}
                </MenuItem>
              </Select>
            </FieldLayout>
            <FieldLayout
              label={t('product.addProduct.productForm.productionDate')}
              showError={touched.yearOfOrigin}
              error={errors.yearOfOrigin}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(values.yearOfOrigin)}
                  onChange={(e: Dayjs | null) =>
                    setFieldValue('yearOfOrigin', e)
                  }
                  format="DD-MM-YYYY"
                />
              </LocalizationProvider>
            </FieldLayout>

            <FieldLayout
              label={t('product.addProduct.productForm.priceOfOrigin')}
              showError={touched.priceOfOrigin}
              error={errors.priceOfOrigin}>
              <TextField
                size="small"
                type="text"
                placeholder={
                  t(
                    'product.addProduct.productForm.enterPriceOfOrigin',
                  ) as string
                }
                name="priceOfOrigin"
                value={values.priceOfOrigin}
                onChange={handleChange}
              />
            </FieldLayout>
            <FieldLayout
              label={t('product.addProduct.productForm.priceOfPurchase')}
              showError={touched.priceOfPurchase}
              error={errors.priceOfPurchase}>
              <TextField
                size="small"
                type="text"
                placeholder={
                  t(
                    'product.addProduct.productForm.enterPriceOfPurchase',
                  ) as string
                }
                name="priceOfPurchase"
                value={values.priceOfPurchase}
                onChange={handleChange}
              />
            </FieldLayout>
            <FieldLayout
              label={t('product.addProduct.productForm.priceOfCurrent')}
              showError={touched.priceOfCurrent}
              error={errors.priceOfCurrent}>
              <TextField
                size="small"
                type="text"
                placeholder={
                  t(
                    'product.addProduct.productForm.enterPriceOfCurrent',
                  ) as string
                }
                name="priceOfCurrent"
                value={values.priceOfCurrent}
                onChange={handleChange}
              />
            </FieldLayout>
          </Grid>

          <Grid item xs={8} sm={5} md={5} lg={4}>
            <FieldLayout
              label={t('product.addProduct.productForm.productNumber')}
              showError={touched.itemProductionNumber}
              error={errors.itemProductionNumber}>
              <TextField
                size="small"
                type="text"
                placeholder={
                  t(
                    'product.addProduct.productForm.enterProductionNumber',
                  ) as string
                }
                name="itemProductionNumber"
                value={values.itemProductionNumber}
                onChange={handleChange}
              />
            </FieldLayout>
            <CategorySearch
              setFieldValue={setFieldValue}
              setCategoryName={setCategoryName}
              categoryName={categoryName}
              values={values}
              t={t}
            />
            <FieldLayout
              label={t('product.addProduct.productForm.owner')}
              showError={touched.owner}
              error={errors.owner}>
              <TextField
                size="small"
                type="text"
                placeholder={
                  t('product.addProduct.productForm.enterOwnerName') as string
                }
                name="owner"
                value={values.owner}
                onChange={handleChange}
              />
            </FieldLayout>

            <FieldLayout label={t('product.addProduct.productForm.color')}>
              <MuiColorInput
                value={values.color}
                onChange={(e: string) => setFieldValue('color', e)}
                sx={{
                  '& .MuiButtonBase-root': {
                    padding: '.625rem .625px',
                    margin: '.625rem',
                  },
                  '& .MuiInputBase-input': {
                    padding: '14px 0px !important',
                  },
                }}
              />
            </FieldLayout>
            <FieldLayout
              label={t('product.addProduct.productForm.productModel')}
              showError={touched.itemModel}
              error={errors.itemModel}>
              <TextField
                size="small"
                type="text"
                placeholder={
                  t(
                    'product.addProduct.productForm.enterProductModel',
                  ) as string
                }
                name="itemModel"
                value={values.itemModel}
                onChange={handleChange}
              />
            </FieldLayout>
            <FieldLayout
              label={t('product.addProduct.productForm.givenBy')}
              showError={touched.givenBy}
              error={errors.givenBy}>
              <TextField
                size="small"
                type="text"
                placeholder={
                  t('product.addProduct.productForm.enterGivenByName') as string
                }
                name="givenBy"
                value={values.givenBy}
                onChange={handleChange}
              />
            </FieldLayout>

            <FieldLayout
              label={t('product.addProduct.productForm.loaner')}
              showError={touched.loanedBy}
              error={errors.loanedBy}>
              <TextField
                size="small"
                type="text"
                placeholder={
                  t('product.addProduct.productForm.enterLoaner') as string
                }
                name="loanedBy"
                value={values.loanedBy}
                onChange={handleChange}
              />
            </FieldLayout>

            <FieldLayout label={t('product.addProduct.productForm.visibility')}>
              <Select
                input={<OutlinedInput size="small" />}
                onChange={(e: SelectChangeEvent<boolean>) =>
                  setFieldValue(
                    'visibility',
                    e.target.value === 'true' ? true : false,
                  )
                }
                value={values.visibility}
                name="visibility">
                <MenuItem value={'false'}>
                  {' '}
                  {t('gallery.addGallery.public')}
                </MenuItem>
                <MenuItem value={'true'}>
                  {t('gallery.addGallery.private')}
                </MenuItem>
              </Select>
            </FieldLayout>
            <Box paddingY="1.25rem">
              <AlertBox
                alertMessages={alertMessages}
                handleAlertClose={alertCloseHandler}></AlertBox>
            </Box>
            <Box
              display={{ xs: 'block', md: 'flex', sm: 'flex' }}
              justifyContent="end"
              columnGap={5}
              sx={{ marginTop: { xs: '1rem', sm: '4rem', md: '4rem' } }}>
              <Button
                onClick={() => router.push(`${langugeRoute}/dashboard/my-items`)}
                size="medium"
                sx={{ textTransform: 'none' }}
                color="warning">
                {t('gallery.button.cancel')}
              </Button>
              <Button
                type="submit"
                size="medium"
                style={{
                  background: '#014F04',
                }}>
                {t('gallery.button.save')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default AddProduct;
