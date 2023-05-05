import type { SupportedOAuthProviders } from '$types';

export const OAuthProviderInfo: SupportedOAuthProviders<{
  name: string;
  icon: string;
  href: string;
}> = {
  discord: { name: 'Discord', icon: 'fa-discord', href: '/login/discord' },
  github: { name: 'GitHub', icon: 'fa-github', href: '/login/github' },
  google: { name: 'Twitter', icon: 'fa-twitter', href: '/login/twitter' },
  twitter: { name: 'Google', icon: 'fa-google', href: '/login/google' },
};
