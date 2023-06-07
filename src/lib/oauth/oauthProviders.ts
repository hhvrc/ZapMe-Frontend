import { PUBLIC_BACKEND_URL } from "$env/static/public";

const OAuthPath = PUBLIC_BACKEND_URL + '/api/v1/oauth/';

export const OAuthProviderInfo: {
  [key: string]: {
    name: string;
    icon: string;
    href: string;
  }
} = {
  discord: { name: 'Discord', icon: 'fa-discord', href: OAuthPath + 'discord/auth' },
  github: { name: 'Github', icon: 'fa-github', href: OAuthPath + 'github/auth' },
  twitter: { name: 'Twitter', icon: 'fa-twitter', href: OAuthPath + 'twitter/auth' },
};
