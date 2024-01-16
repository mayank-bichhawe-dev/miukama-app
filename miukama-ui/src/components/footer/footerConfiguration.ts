export const marketPlaceNavLinks: NavLinks[] = [
  {
    title: 'home.footer.marketplace.allArts',
    path: '#',
  },
  {
    title: 'home.footer.marketplace.new',
    path: '#',
  },
  {
    title: 'home.footer.marketplace.art',
    path: '#',
  },
  {
    title: 'home.footer.marketplace.music',
    path: '#',
  },
  {
    title: 'home.footer.marketplace.domainNames',
    path: '#',
  },
  {
    title: 'home.footer.marketplace.virtualWorlds',
    path: '#',
  },
];

export const myAccountNavLinks: NavLinks[] = [
  {
    title: 'home.footer.myAccount.profile',
    path: '#',
  },
  {
    title: 'home.footer.myAccount.collections',
    path: '#',
  },
  {
    title: 'home.footer.myAccount.favourites',
    path: '#',
  },
];

export const resourcesNavList = [
  {
    title: 'home.footer.resources.helpCenter',
    path: '#',
  },
  {
    title: 'home.footer.resources.platformStatus',
    path: '#',
  },
  {
    title: 'home.footer.resources.partners',
    path: '#',
  },
  {
    title: 'home.footer.resources.suggestions',
    path: '#',
  },
  {
    title: 'home.footer.resources.discordCommunity',
    path: '#',
  },
  {
    title: 'home.footer.resources.privacyPolicy',
    path: '/privacy-policy',
  },
  {
    title: 'home.footer.resources.termsAndCondition',
    path: '/terms-and-conditions',
  },
];

export interface NavLinks {
  title: string;
  path: string;
}
