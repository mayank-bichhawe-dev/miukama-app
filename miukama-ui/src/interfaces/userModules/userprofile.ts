import { KeyPrefix, TFunction } from 'i18next';
import React from 'react';

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
  authProvider: string;
  userType?: string;
  fileSystemId?: number;
  imagePath?: string;
  confirmPassword?: string;
  password?: string;
}

export interface ProfileFormProps {
  preferredLng?: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  id?: number;
  add?: boolean;
  edit?: boolean;
}

export interface UserFormProps {
  profilePicture: string;
  t: TFunction<'translation', KeyPrefix<'translation'>, 'translation'>;
  id: number | undefined;
  add: boolean;
  setAvatarPreview: React.Dispatch<React.SetStateAction<string>>;
  edit?: boolean;
}
