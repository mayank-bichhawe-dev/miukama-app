export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
  authProvider: string;
  imagePath: string | null;
}

export interface localStorageDataInterface {
  user: User | null;
  token: string | null;
}

export interface Feature {
  id: number | null;
  name: string;
}
export interface PlanFeatureMapping {
  id: number | null;
  effect: boolean | null;
  limit: number | null;
  Feature: Feature
}
export interface Plan {
  id: number;
  planName: string;
  PlanFeatureMappings: PlanFeatureMapping[];
}

export interface IUserPlan {
  id: number;
  createdAt: string;
  Plan: Plan;
}


