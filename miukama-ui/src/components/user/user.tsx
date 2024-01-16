import { Box, CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DisplayList } from './DisplayList';
import Breadcrumb from '@/components/breadcrumbs/breadcrumbs';
import SearchFilter from '../galleries/components/searchFilter';
import SearchRow from '../galleries/components/searchRow';
import React from 'react';
import { Debounce } from '@/utils/debounce';
import { galleriesProps } from '@/interfaces/gallery';
import { useRouter } from 'next/navigation';
import { paginationModelProps } from '@/interfaces/dataTable';
import CopyrightFooter from '../footer/copyright';
import { getAllUser, deleteUser } from '@/api/allUser/user';
import { userProps } from '@/interfaces/allUsers';
import { UserLoginContext } from '@/app/[lng]/layout';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';

const Users: React.FC<galleriesProps> = ({ t }) => {
  const router = useRouter();
  const { langugeRoute } = useContext(UserLoginContext);
  const [data, setData] = useState<userProps[]>([]);
  const [count, setCount] = useState<number>(0);
  const [alertMessages, setAlertMessages] = useState<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paginationModel, setPaginationModel] =
    React.useState<paginationModelProps>({
      page: 0,
      pageSize: 10,
    });

  const getAllUsers = async () => {
    const { page, pageSize } = paginationModel;
    setIsLoading(true);
    const { data } = await getAllUser(page + 1, pageSize, searchQuery);
    if (data.success) {
      const { rows, count } = data.data;
      setData(rows);
      setCount(count);
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
  const delayedFetchData = Debounce(getAllUsers, isSearchLoader);

  useEffect(() => {
    if (loginLocalStorageHelper.isUserAdmin()) {
      delayedFetchData();
    } else {
      router.push('/dashboard');
    }
  }, [searchQuery, paginationModel]);

  const userDelete = async (id: number) => {
    const { data } = await deleteUser(id);
    setAlertMessages([
      ...alertMessages,
      { type: data.success, message: data.message },
    ]);
    if (data.success) {
      getAllUsers();
      setTimeout(() => {
        setAlertMessages([]);
      }, 3000);
    }
  };

  const galleryEdit = (id: number) => {
    router.push(`${langugeRoute}/admin/user/edit/${id}`);
  };

  const rows =
    data.length > 0
      ? data.map((item) => ({
          id: item.id,
          firstName: item?.firstName,
          lastName: item?.lastName,
          email: item?.email,
          contact: item.contact,
          Address: item?.address,
        }))
      : [];

  const onClickAdd = (value: string) => {
    router.push(`${langugeRoute}${value}`);
  };

  return (
    <Box>
      {loginLocalStorageHelper.isUserAdmin() ? (
        <Box>
          <Breadcrumb
            title={t('user.title.users') as string}
            data={[
              {
                title: t('user.dataTitle.admin'),
                link: `${langugeRoute}/admin/user`,
              },
            ]}
          />
          <SearchRow
            buttonLink="/admin/user/add"
            buttonTitle={t('user.button.addUser') as string}
            onClickAdd={(value) => onClickAdd(value)}>
            <SearchFilter
              t={t}
              setSearchQuery={setSearchQuery}
              isLoading={isLoading}
            />
          </SearchRow>
          <Box>
            {isLoading ? (
              <Box paddingY={'2rem'} display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Box paddingY={'2rem'}>
                  <DisplayList
                    t={t}
                    rows={rows}
                    totalCount={count}
                    alertMessage={alertMessages}
                    onItemEdit={galleryEdit}
                    onItemDelete={userDelete}
                    setAlertMessage={setAlertMessages}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                    showTotalItems={true}
                  />
                </Box>
                <Box paddingY="1rem">
                  <CopyrightFooter t={t} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
export default Users;
