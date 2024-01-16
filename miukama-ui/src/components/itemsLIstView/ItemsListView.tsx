import React, { useEffect, useState } from 'react';
import Product from '../product/product';
import { itemProps } from '@/interfaces/itemList';
import { Wishlist } from '@/components/wishList/WishList';
import GetCategories from '@/components/category/category';

function ItemsListView({
  t,
  searchQuery,
  itemCardSelectedId = 0,
  displayType,
  setApiChanges,
}: itemProps) {
  const [componentToRender, setComponentToRender] =
    useState<React.ReactNode | null>(null);

  useEffect(() => {
    let component = null;

    if ([1, 2, 3].includes(itemCardSelectedId)) {
      component = (
        <Product
          t={t}
          searchQuery={searchQuery}
          itemCardSelectedId={itemCardSelectedId}
          displayType={displayType}
          hidePagination={true}
          setApiChanges={setApiChanges}
        />
      );
    } else if (itemCardSelectedId === 4) {
      component = (
        <GetCategories
          t={t}
          searchCategory={searchQuery}
          isShowAllData={true}
          isSearchFilter={false}
          showButton={true}
          preferredLng={''}
          setApiChanges={setApiChanges}
        />
      );
    } else if (itemCardSelectedId === 5) {
      component = (
        <Wishlist
          t={t}
          DisplayView={displayType}
          SearchWishlist={searchQuery}
          isSearchFilter={false}
          hidePagination={true}
          itemCardSelectedId={itemCardSelectedId}
          preferredLng={''}
          setApiChanges={setApiChanges}
        />
      );
    }

    setComponentToRender(component);
  }, [itemCardSelectedId, searchQuery, displayType, setApiChanges, t]);

  return <>{componentToRender}</>;
}
export { ItemsListView };
