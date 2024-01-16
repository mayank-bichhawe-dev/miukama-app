import { useContext } from 'react';
import { UserLoginContext } from '../../app/[lng]/layout';
import { loginLocalStorageHelper } from '@/utils/loginLocalStorageHelper';
const MenuItems = () => {
  const { isUserLogin, langugeRoute } = useContext(UserLoginContext);
  const isUserAdmin = loginLocalStorageHelper.isUserAdmin();
  console.log(isUserAdmin, 'navigation page');
  const verifyUser = (link: string) => {
    if (!isUserLogin) {
      return '/login';
    }
    return link;
  };
  const staticMenu = [
    {
      key: 'dashboard',
      imageSrc: '/dashboardImage.png',
      link: verifyUser(`${langugeRoute}/dashboard`),
      name: 'Dashboard',
      menuType: 'main',
    },
    {
      key: 'gallery',
      imageSrc: '/dashboardImage.png',
      link: verifyUser(`${langugeRoute}/dashboard/gallery`),
      name: 'Gallery',
      menuType: 'main',
    },
    {
      key: 'category',
      imageSrc: '/dashboardImage.png',
      link: `${langugeRoute}/dashboard/category`,
      name: 'Category',
      menuType: 'main',
    },
    {
      key: 'wishlist',
      imageSrc: '/dashboardImage.png',
      link: verifyUser(`${langugeRoute}/dashboard/wishlist`),
      name: 'Wishlist',
      menuType: 'main',
    },
    {
      key: 'Settings',
      imageSrc: '/setting.png',
      link: verifyUser(`${langugeRoute}/dashboard/settings`),
      name: 'Settings',
      menuType: 'options',
    },
    {
      key: 'myItems',
      imageSrc: '/dashboardImage.png',
      link: verifyUser(`${langugeRoute}/dashboard/my-items`),
      name: 'My Items',
      menuType: 'main',
    },
    {
      key: 'notifications',
      imageSrc: '/dashboardImage.png',
      link: verifyUser(`${langugeRoute}/dashboard/notifications`),
      name: 'Notifications',
      menuType: 'main',
    },
  ];
  if (isUserAdmin) {
    staticMenu.push({
      key: 'users',
      imageSrc: '/dashboardImage.png',
      link: verifyUser(`${langugeRoute}/admin/user`),
      name: 'Users',
      menuType: 'main',
    });
  }
  return staticMenu;
};

export default MenuItems;
export interface menuItemsProps {
  key: string;
  link: string;
  name: string;
  menuType: string;
  iconName?: string;
  displayChip?: boolean;
  imageSrc?: string;
}
