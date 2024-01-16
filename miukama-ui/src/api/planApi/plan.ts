import api_routes from '../config/routes.json';
import { getRequest, postRequest } from '..';

export const getPlan = () => {
  return getRequest(api_routes.planRoutes.plan);
};

export const selectBuyPlan = (planId: number, planType: string) => {
  return postRequest(api_routes.planRoutes.userPlan, {
    planId: planId,
    planType: planType,
  });
};
