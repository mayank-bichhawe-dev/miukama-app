import { KeyPrefix, TFunction } from 'i18next';
import React from 'react';
export interface itemProps {
  searchQuery: string;
  setApiChanges: React.Dispatch<React.SetStateAction<string>>;
  itemCardSelectedId: number;
  displayType: 'list' | 'column';
  preferredLng?: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
}
