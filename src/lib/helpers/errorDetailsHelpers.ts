import { toastStore } from '@skeletonlabs/skeleton';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { SessionTokenStore } from '$lib/stores';
import { isErrorDetails, isFetchError, isRequiredError, isResponseError } from '$lib/typeGuards';
import { BuildRedirectURL, GetRedirectURL } from '$lib/utils/redirects';
import type { ApiErrorResponse } from '$types';
import { getReasonPhrase } from 'http-status-codes';

function createErrorToast(message: string, timeout = 10000) {
  if (!browser) return;
  toastStore.trigger({
    message,
    autohide: true,
    timeout,
    background: 'variant-filled-error',
  });
}

export async function handleFetchError(
  error: unknown,
  options?: {
    dontRedirect?: number[];
  }
): Promise<ApiErrorResponse | null> {
  if (isFetchError(error)) {
    createErrorToast('Network error');
    return null;
  }

  if (isRequiredError(error)) {
    createErrorToast(error.message);
    return {
      status: 400,
      apiCode: 'BadRequest',
      apiFields: {
        [error.field]: ['required'],
      },
    };
  }

  if (!isResponseError(error)) {
    createErrorToast('Unknown error');
    return null;
  }

  const { response } = error;
  const { status, url } = response;
  const details = await response
    .text()
    .then((text) => {
      const json = JSON.parse(text);
      return json && isErrorDetails(json) ? json : null;
    })
    .catch(() => null);

  if (!(options?.dontRedirect?.includes(status) ?? false)) {
    switch (status) {
      case 401:
        createErrorToast('Login missing or expired');
        SessionTokenStore.set(null);
        goto(BuildRedirectURL('/login', GetRedirectURL(url, '/')));
        return null;
      case 403:
        createErrorToast('You do not have permission to access this resource');
        goto('/');
        return null;
      case 503:
        goto('/503');
        return null;
      default:
        break;
    }
  }

  if (!details) {
    if (status === 500) {
      createErrorToast('Internal server error, please try again later');
    } else {
      createErrorToast(getReasonPhrase(status));
    }
    return null;
  }

  // Try to parse the error details.
  if (!isErrorDetails(details)) {
    createErrorToast('Unknown error');
    return null;
  }

  if (details.notification) {
    createErrorToast(details.notification.content);
  }

  return {
    status,
    apiCode: details.code,
    apiFields: details.fields,
    details,
  };
}
