import React from 'react';

export interface Userplan {
  id: number;
  planName: string;
  highlight: boolean;
  duration: number;
  priceInMonth: number;
  priceInYear: number;
  PlanFeatureMappings: {
    planId: number;
    featureId: number;
    data: string | boolean;
    Feature: {
      orderPriority: number;
      name: string;
      visibility: boolean;
    };
  }[];
}

export interface Featureprop {
  id: number;
  name: string;
  visibility: boolean;
  orderPriority: string;
  createdAt: string;
  updatedAt: string;
}
export interface PlansData {
  planData: Userplan[];
  masterFeature: Featureprop[];
  isYear: boolean;
}

export interface PlansContainerProps {
  planData: {
    property: string;
    values: (string | boolean)[];
  };
  highlightIndices?: number[];
  displayBorder?: boolean;
  firstRow?: boolean;
  lastRow?: boolean;
  // eslint-disable-next-line no-unused-vars
  setHighlightedIndex: (id: number) => void;
}

export interface CustomSwitchProp {
  setIsYear: React.Dispatch<React.SetStateAction<boolean>>;
  isYear: boolean;
}

export interface plansObject {
  title: string;
  planCost: string;
  buttonText: string;
  planType: string;
  planId: number;
}

export interface SelectPlanProps {
  plans: plansObject[];
}
