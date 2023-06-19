import { PUBLIC_BACKEND_API_BASE_URL } from '$env/static/public';

const OAuthPath = PUBLIC_BACKEND_API_BASE_URL + '/api/v1/sso/';

export const OAuthProviderInfo: {
  [key: string]: {
    name: string;
    icon: string;
    href: string;
  };
} = {
  discord: { name: 'Discord', icon: 'fa-discord', href: OAuthPath + 'discord' },
  github: { name: 'Github', icon: 'fa-github', href: OAuthPath + 'github' },
  twitter: { name: 'Twitter', icon: 'fa-twitter', href: OAuthPath + 'twitter' },
  google: { name: 'Google', icon: 'fa-google', href: OAuthPath + 'google' },
};
