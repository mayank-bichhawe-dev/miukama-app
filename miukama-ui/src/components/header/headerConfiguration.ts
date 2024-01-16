export const navLinks: NavLinks[] = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'FAQ',
    path: '/faq',
  },
  {
    title: 'Galleries',
    path: '/dashboard/gallery',
  },
  {
    title: 'Sell on Miukama',
    path: '/sell-on-miukama',
  },
  {
    title: 'Pricing',
    path: '/pricing',
  },
];

export const optionalNavLinks: NavLinks[] = [
  {
    title: 'Signup',
    path: '/signup',
  },
  {
    title: 'Login',
    path: '/login',
  },
];

export const currencyList = [
  {
    id: 1,
    currencyName: 'USD',
    imageUrl: '/usa.png',
  },
  {
    id: 2,
    currencyName: 'RS',
    imageUrl: '/indflag.jpg',
  },
  {
    id: 3,
    currencyName: 'Euro',
    imageUrl: '/Euro.png',
  },
];

export const languageList = [
  {
    id: 1,
    LangaueName: 'Eng',
    languageImgUrl: '/glob_img.jpg',
    code: 'en',
  },
  {
    id: 2,
    LangaueName: 'Deu',
    languageImgUrl: '/germany.png',
    code: 'de',
  },
];

export interface NavLinks {
  title: string;
  path: string;
}
