'use client';
import * as React from 'react';
import { deleteCategory } from '@/api/categoryAPI/category';
import { useState } from 'react';
import ConfirmBox from '../confirmBox/confirmBox';
import AlertBox from '../alertBox/alertBox';
import CustomDataTable from '../datatable/customDataTable';
import { displayListCatergory } from '@/interfaces/displayListInterface';
import { FetchCategoryItem } from '@/interfaces/categories';

export const DisplayList = ({
  categoryData,
  getData,
  alertMessages,
  alertCloseHandler,
  setAlertMessages,
  isPrivate,
  t,
  isShowAllData,
  showButton,
  paginationModel,
  setPaginationModel,
  totalCount,
  setApiChanges,
}: displayListCatergory) => {
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const categorydelete = async (id: number) => {
    const response = await deleteCategory(id);
    if (response.data.success) {
      getData();
    }
    setAlertMessages([
      ...alertMessages,
      { type: response.data.success, message: response.data.message },
    ]);
    setTimeout(() => {
      setAlertMessages([]);
    }, 3000);
    setDeleteId(undefined);
    setDeleteModel(false);
    setApiChanges && setApiChanges(response.data);
  };

  const filterData =
    isShowAllData === true
      ? categoryData.filter((item: FetchCategoryItem) => item)
      : categoryData.filter(
          (item: FetchCategoryItem) => item.visibility === isPrivate,
        );

  const onDeleteHanldle = (id: number) => {
    setDeleteId(id);
    setDeleteModel(true);
    getData();
  };

  return (
    <>
      <AlertBox
        alertMessages={alertMessages}
        handleAlertClose={alertCloseHandler}></AlertBox>

      <CustomDataTable
        rows={filterData}
        onDeleteHanldle={onDeleteHanldle}
        t={t}
        showButton={showButton}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        totalCount={totalCount}
      />
      {deleteModel && deleteId && (
        <ConfirmBox
          open={deleteModel}
          onClose={() => {
            setDeleteModel(false);
            setDeleteId(undefined);
          }}
          onSubmit={() => {
            categorydelete(deleteId);
          }}
        />
      )}
    </>
  );
};
