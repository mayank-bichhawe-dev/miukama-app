import { DisplayCard } from '@/components/galleries/DisplayCard';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { DisplayList } from '@/components/galleries/DisplayList';
import Breadcrumb from '@/components/breadcrumbs/breadcrumbs';
import SearchFilter from './components/searchFilter';
import SearchRow from './components/searchRow';
import GalleryTypeButtons from './components/galleryTypeButtons';
import { deleteGallery, getGallery } from '@/api/galleriesAPI/gallery';
import React from 'react';
import { format } from 'date-fns';
import { Debounce } from '@/utils/debounce';
import { galleryProps, galleriesProps } from '@/interfaces/gallery';
import { UserLoginContext } from '@/app/[lng]/layout';
import { useRouter } from 'next/navigation';
import { paginationModelProps } from '@/interfaces/dataTable';
import CopyrightFooter from '../footer/copyright';

const Galleries: React.FC<galleriesProps> = ({ t }) => {
  const { toggleView, setToggleView, langugeRoute } = useContext(UserLoginContext);
  const router = useRouter();
  const [displayType, setDisplayType] = useState<'list' | 'column'>('list');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [data, setData] = useState<galleryProps[]>([]);
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] =
    React.useState<paginationModelProps>({
      page: 0,
      pageSize: 10,
    });

  const getAllGallery = async () => {
    const { page, pageSize } = paginationModel;
    const galleryType = isPrivate ? 'private' : 'public';
    const { data } = await getGallery(
      page + 1,
      pageSize,
      searchQuery,
      galleryType,
    );
    if (data.success) {
      const { rows, count } = data.data;
      setData(rows);
      setTotalCount(count);
    } else {
      setData([]);
      setAlertMessages([
        ...alertMessages,
        { type: data.success, message: data.message },
      ]);
    }
    setIsLoading(false);
  };
  const isSearchLoader = (isInputLoading: boolean) => {
    if (searchQuery.length > 0) {
      return setIsLoading(isInputLoading);
    }
  };
  const delayedFetchData = Debounce(getAllGallery, isSearchLoader);

  useEffect(() => {
    delayedFetchData();
  }, [searchQuery, paginationModel, isPrivate]);

  useEffect(() => {
    setDisplayType(toggleView.view);
    setIsPrivate(toggleView.visibility === 'private');
  }, [toggleView]);
  const galleryDelete = async (id: number) => {
    const { data } = await deleteGallery(id);
    setAlertMessages([
      ...alertMessages,
      { type: data.success, message: data.message },
    ]);
    if (data.success) {
      getAllGallery();
      setTimeout(() => {
        setAlertMessages([]);
      }, 3000);
    }
  };
  useEffect(() => {
    setAlertMessages([]);
    setIsLoading(true);
  }, [isPrivate]);

  const galleryEdit = (id: number) => {
    router.push(`${langugeRoute}/dashboard/gallery/edit/${id}`);

    // Routes(`/dashboard/gallery/edit/${id}`);
    setToggleView({
      view: 'list',
      visibility: isPrivate ? 'private' : 'public',
    });
  };

  const filterdData =
    data.length > 0 ? data.filter((item) => item.visibility === isPrivate) : [];

  const rows =
    data.length > 0
      ? data.map((item) => ({
        id: item.id,
        product: item?.name,
        ownerName: item?.ownerName,
        totalItems: item?.galleryCount,
        visibility: item.visibility,
        imagePath: item?.imagePath,
        updatedAt: format(new Date(item.updatedAt), 'dd-MM-yyyy'),
        userId: item?.userId,
      }))
      : [];
  const onClickAdd = (value: string) => {
    router.push(`${langugeRoute}${value}`);
    setToggleView({
      view: displayType,
      visibility: isPrivate ? 'private' : 'public',
    });
  };

  const handelEditCard = (id: number) => {
    router.push(`${langugeRoute}/dashboard/gallery/edit/${id}`);
  };

  return (
    <>
      <Breadcrumb
        title={t('gallery.dashboards.galleries') as string}
        data={[
          { title: t('gallery.dashboards.dashboard'), link: `${langugeRoute}/dashboard` },
        ]}
      />
      <SearchRow
        displayType={displayType}
        setDisplayType={setDisplayType}
        buttonLink="/dashboard/gallery/add"
        buttonTitle={t('gallery.button.addGallery') as string}
        onClickAdd={(value) => onClickAdd(value)}>
        <SearchFilter
          t={t}
          setSearchQuery={setSearchQuery}
          isLoading={isLoading}
        />
      </SearchRow>
      <Grid container spacing={3} mt="0px">
        <GalleryTypeButtons
          t={t}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
        />
      </Grid>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {displayType === 'column' ? (
            <DisplayCard data={filterdData} handelEditCard={handelEditCard} />
          ) : (
            <DisplayList
              t={t}
              rows={rows}
              totalCount={totalCount}
              alertMessage={alertMessages}
              onItemEdit={galleryEdit}
              onItemDelete={galleryDelete}
              setAlertMessage={setAlertMessages}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              showTotalItems={true}
            />
          )}
          <Box paddingY="1rem">
            <CopyrightFooter t={t} />
          </Box>
        </Box>
      )}
    </>
  );
};
export default Galleries;
