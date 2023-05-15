import { isString } from "$lib/typeGuards";

function ensureRelativePath(value: string | URL): string {
  if (!isString(value)) {
    return value.pathname + value.search;
  }

  if (!value.startsWith('/') || value.startsWith('//')) {
    throw new Error('Cross-site scripting detected');
  }

  return value;
}

function GetSearchParam(url: string | URL, key: string): string | null {
  if (!isString(url)) {
    return url.searchParams.get(key);
  }

  // Get query string
  const urlParts = url.split('?');
  const queryString = urlParts.length > 1 ? urlParts[1] : '';

  // Get the query params
  const params = new URLSearchParams(queryString);

  // Return the value
  return params.get(key);
}

function SetSearchParam(url: string | URL, key: string, value: string): string {
  // Transform to string
  url = ensureRelativePath(url);

  // Get query string
  const urlParts = url.split('?');
  const queryString = urlParts.length > 1 ? urlParts[1] : '';

  // Get the query params
  const params = new URLSearchParams(queryString);

  // Set the value
  params.set(key, value);

  // Return the new url
  return urlParts[0] + '?' + params.toString();
}

export function BuildRedirectURL(
  url: string | URL,
  redirect: string | URL,
  redirectQueryKey = 'redirect'
): string {
  return SetSearchParam(url, redirectQueryKey, ensureRelativePath(redirect));
}

export function GetRedirectURL(
  url: string | URL,
  fallback: string,
  redirectQueryKey = 'redirect'
): string {
  // Get the redirect url
  let redirect = GetSearchParam(url, redirectQueryKey);

  // If there is no redirect, assign fallback
  if (!redirect) {
    redirect = fallback;
  }

  // Cross-site scripting protection
  return ensureRelativePath(redirect);
}

export function ForwardRedirectURL(
  url: string | URL,
  nextUrl: string | URL,
  redirectQueryKey = 'redirect'
): string {
  // Get the redirect url
  const redirect = GetSearchParam(url, redirectQueryKey);

  // Assign the redirect to the next url
  if (redirect) {
    nextUrl = SetSearchParam(
      nextUrl,
      redirectQueryKey,
      ensureRelativePath(redirect)
    );
  }

  // Return the next url
  return ensureRelativePath(nextUrl);
}
