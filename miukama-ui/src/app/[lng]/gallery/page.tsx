'use client';
import { largestGallery } from '@/api/homePageApi/publicApi';
import { useEffect, useState } from 'react';
import { DisplayCard } from '@/components/galleries/DisplayCard';
import { Box, Button, Pagination, PaginationItem } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import React from 'react';
import { Container } from '@mui/material';
import { gallery } from '@/interfaces/gallery';

const Galleries = () => {
  const [data, setData] = useState<gallery[]>([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 12,
    totalItems: 0,
  });
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    getAllGallery();
  }, [flag]);

  const getAllGallery = async () => {
    const { page, pageSize } = paginationModel;
    const { data } = await largestGallery(page + 1, pageSize);
    if (data.success) {
      setData(data.data.rows);
      setPaginationModel((prevModel) => ({
        ...prevModel,
        totalItems: data.data.count,
      }));
    } else {
      setData([]);
      setPaginationModel((prevModel) => ({
        ...prevModel,
        totalItems: 0,
      }));
    }
  };

  const rows =
    data.length > 0
      ? data.map((item) => ({
          totalItem: item.totalItem,
          ownerName: item.ownerName,
          id: item.id,
          name: item.name,
          description: item.description,
          visibility: item.visibility,
          updatedAt: item.updatedAt,
          userImagePath: item.User.imagePath,
        }))
      : [];

  return (
    <Container maxWidth="xl">
      <Box pt="50px">
        <DisplayCard data={rows || []} />
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          paddingBottom="20px">
          <Pagination
            count={Math.ceil(
              paginationModel.totalItems / paginationModel.pageSize,
            )}
            page={paginationModel.page + 1}
            onChange={(event, value) => {
              setPaginationModel((prevModel) => ({
                ...prevModel,
                page: value - 1,
              }));
              setFlag(!flag);
            }}
            color="primary"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
            renderItem={(item) => (
              <PaginationItem
                component={Button}
                startIcon={item.type === 'previous' ? <NavigateBefore /> : null}
                endIcon={item.type === 'next' ? <NavigateNext /> : null}
                {...item}
              />
            )}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default Galleries;
