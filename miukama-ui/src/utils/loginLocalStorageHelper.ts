import { IUserPlan, User, localStorageDataInterface } from '@/interfaces/user';
import Cookies from 'js-cookie';

const key = process.env.userDetailLocalStorageKey || 'userDetail';
const plankey = 'planDetail';

const setItem = (data: localStorageDataInterface): void => {
  localStorage.setItem(
    key,
    JSON.stringify({ user: data.user, token: data.token }),
  );
  if (data.token) {
    Cookies.set('token', data.token);
  }
};
const setPlan = (data: IUserPlan): void => {
  localStorage.setItem(plankey, JSON.stringify(data));
};
const getItem = () => {
  const storageData = localStorage.getItem(key);
  if (storageData) {
    return storageData;
  }
  return null;
};

const getplan = () => {
  const storageData = localStorage.getItem(plankey);
  if (storageData) {
    return storageData;
  }
  return null;
};

const getPlanDetail = (): IUserPlan | null => {
  try {
    const storageData = getplan();
    if (storageData) {
      return JSON.parse(storageData);
    } else {
      throw new Error();
    }
  } catch (error) {
    return null;
  }
};
const getToken = (): string | null => {
  try {
    const storageData = Cookies.get('token');
    if (storageData) {
      return storageData;
    } else {
      throw new Error();
    }
  } catch (error) {
    return null;
  }
};

const updateUserInLocalStorage = (data: User) => {
  const token = getToken();
  const updatedUserDetails: localStorageDataInterface = {
    user: data,
    token: token,
  };
  setItem(updatedUserDetails);
  if (token) {
    Cookies.set('token', token);
  }
};

const getUserDetails = (): User | null => {
  try {
    const storageData = getItem();
    if (storageData) {
      return JSON.parse(storageData).user;
    } else {
      throw new Error();
    }
  } catch (error) {
    return null;
  }
};

const isUserLoggedIn = (): boolean => {
  return !!getToken();
};

const clearAll = () => {
  localStorage.clear();
};

const isUserAdmin = (): boolean => {
  const planDetail = getPlanDetail();

  if (planDetail && planDetail.Plan) {
    for (
      let i = 0;
      i < (planDetail.Plan.PlanFeatureMappings || []).length;
      i++
    ) {
      const planFeature = planDetail.Plan.PlanFeatureMappings[i];
      if (planFeature.Feature.name === 'AdminUser' && planFeature.effect) {
        return true;
      }
    }
  }
  return false;
};
export const loginLocalStorageHelper = {
  setItem,
  isUserLoggedIn,
  getToken,
  getUserDetails,
  clearAll,
  updateUserInLocalStorage,
  setPlan,
  getPlanDetail,
  isUserAdmin,
};
