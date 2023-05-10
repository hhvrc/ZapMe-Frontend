export interface SupportedOAuthProviders<T> {
  discord: T;
  github: T;
  google: T;
  twitter: T;
  [key: string]: T;
}
