/* eslint-disable max-lines */
'use client';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  OutlinedInput,
  Select,
  Button,
  IconButton,
} from '@mui/material';
import React, { MutableRefObject, useContext, useEffect, useState } from 'react';
import FieldLayout from '../formLayouts/FieldLayout';
import { useFormik } from 'formik';
import { addGallerySchemas } from './schemas/AddGallerySchemas';
import { Inter } from 'next/font/google';
import {
  addGallery,
  getGalleryById,
  updateGallery,
} from '@/api/galleriesAPI/gallery';
import { AddGalleryItem } from '@/interfaces/galleries';
import { useRouter } from 'next/navigation';
import AlertBox from '../alertBox/alertBox';
import { KeyPrefix, TFunction } from 'i18next';
import { CloudUploadOutlined } from '@mui/icons-material';
import { UserLoginContext } from '@/app/[lng]/layout';
const inter = Inter({ weight: '400', subsets: ['latin'], style: 'normal' });

const initialValues: AddGalleryItem = {
  id: 0,
  name: '',
  description: '',
  visibility: false,
};

interface addGalleryProps {
  id?: number;
  preferredLng: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}

const AddGallery: React.FC<addGalleryProps> = ({ id, t }) => {
  const { langugeRoute } = useContext(UserLoginContext);
  const router = useRouter();
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const inputFileRef = React.useRef() as MutableRefObject<HTMLInputElement>;
  const [galleryAvatarPreview, setGalleryAvatarPreview] = useState<string>('');
  const [uploadGalleryImage, setUploadGalleryImage] = useState('');
  const [data, setData] = useState<AddGalleryItem>(initialValues);

  const createGallery = async (
    values: AddGalleryItem,
    id: number | undefined,
  ) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('visibility', values.visibility.toString());
    formData.append('file', uploadGalleryImage);

    if (id) {
      const { data } = await updateGallery(formData, id);
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
      if (data.success) {
        setTimeout(() => {
          setAlertMessages([]);
          router.push(`${langugeRoute}/dashboard/gallery`);
        }, 3000);
      }
    } else {
      const { data } = await addGallery(formData);
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
      if (data.success) {
        handleReset(initialValues);
        setGalleryAvatarPreview('');
        setUploadGalleryImage('');
        setTimeout(() => {
          setAlertMessages([]);
        }, 3000);
      }
    }
  };

  const handleFieldUpdateRequest = async () => {
    const { data } = await getGalleryById(id);
    if (data.success) {
      setData(data.data);
      if (data.data.imagePath) {
        setGalleryAvatarPreview(
          `${process.env.NEXT_PUBLIC_S3_IMAGE_BASE_URL}${data.data.imagePath}`,
        );
      }
      data.data.imagePath && setUploadGalleryImage(data.data.imagePath);
    }
  };

  useEffect(() => {
    if (id && !isNaN(id)) {
      handleFieldUpdateRequest();
    }
  }, [id]);

  const { values, errors, touched, handleChange, handleReset, handleSubmit } =
    useFormik({
      initialValues: data,
      validationSchema: addGallerySchemas(t),
      enableReinitialize: true,
      onSubmit: async (values: AddGalleryItem) => {
        await createGallery(values, id);
      },
    });

  const onFileChangeCapture = (e: any) => {
    setGalleryAvatarPreview(URL.createObjectURL(e.target.files[0]));
    setUploadGalleryImage(e.target.files[0]);
  };

  return (
    <Box paddingBottom={'42px'}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        textAlign={'center'}
        sx={{
          fontSize: '34px',
          fontWeight: 600,
          fontFamily: inter.style,
          paddingTop: { xs: '30px', sm: '30px', md: '63px' },
          paddingBottom: { xs: '30px', sm: '30px', md: '30px' },
        }}>
        {id
          ? t('gallery.editGallery.editGallery')
          : t('gallery.button.addGallery')}
      </Box>

      <Box component={'form'} onSubmit={handleSubmit} noValidate>
        <Grid container justifyContent={'center'}>
          <Grid item xs={12} sm={6} md={6}>
            <Box display="flex" justifyContent="center">
              <Box
                display="flex"
                justifyContent="center"
                width="8rem"
                height="8rem"
                borderRadius="100px"
                marginTop=".5rem"
                marginBottom="30px"
                border="1px dashed #FFFFFF"
                className="addproduct-box-test"
                onClick={() => inputFileRef.current.click()}>
                {galleryAvatarPreview ? (
                  <img
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: '100px',
                    }}
                    src={galleryAvatarPreview}
                    alt=""
                  />
                ) : (
                  <IconButton
                    aria-label="upload image"
                    color="secondary"
                    sx={{
                      height: '5rem',
                      width: '5rem',
                      m: '1.3rem 1.3rem',
                      '&:hover': { background: 'none' },
                    }}>
                    <CloudUploadOutlined
                      sx={{ width: '80px', height: '80px', borderRadius: 0 }}
                    />
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
            </Box>

            <FieldLayout
              label={t('gallery.button.addGallery')}
              error={errors.name}
              showError={touched.name}>
              <TextField
                size="small"
                type="text"
                placeholder={t('gallery.addGallery.categoryName') as string}
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </FieldLayout>
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'}>
          <Grid item xs={12} md={6}>
            <FieldLayout label={t('gallery.addGallery.description')}>
              <TextField
                placeholder={t('gallery.addGallery.type') as string}
                multiline
                rows={2}
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </FieldLayout>

            <FieldLayout
              label={t('gallery.addGallery.visibility')}
              error={errors.visibility}
              showError={touched.visibility}>
              <Select
                input={<OutlinedInput size="small" />}
                name="visibility"
                value={values.visibility}
                onChange={handleChange}>
                <MenuItem value={'false'}>
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
                handleAlertClose={() => setAlertMessages([])}
              />
            </Box>
            <Box display={'flex'} justifyContent={'end'} columnGap={5}>
              <Button
                onClick={() => router.push(`${langugeRoute}/dashboard/gallery`)}
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

export default AddGallery;
