interface AuthProviders {
  local: string;
  google: string;
  facebook: string;
  twitter: string;
  apple: string;
}

const authProviders: AuthProviders = {
  local: 'local',
  google: 'google',
  facebook: 'facebook',
  twitter: 'twitter',
  apple: 'apple',
};

export default authProviders;
