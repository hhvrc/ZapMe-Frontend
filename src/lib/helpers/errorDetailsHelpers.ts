import { goto } from '$app/navigation';
import {
  type ErrorDetails,
  type UserNotification,
  FetchError,
  ResponseError,
  RequiredError,
  instanceOfErrorDetails,
} from '$lib/api';
import { BuildRedirectURL, GetRedirectURL } from '$lib/utils/redirects';
import { getReasonPhrase } from 'http-status-codes';
import { createErrorToast } from './toastHelpers';
import type { RespServerError } from '$types';

function isObject(data: unknown): data is object {
  return typeof data === 'object' && data !== null;
}
function isNamedError(error: unknown): error is { name: string, message: string, stack: string } {
  if (!isObject(error)) return false;

  return (
    Object.hasOwn(error, 'name') &&
    Object.hasOwn(error, 'message') &&
    Object.hasOwn(error, 'stack')
  );
}
function isResponseError(error: unknown): error is ResponseError {
  if (!isNamedError(error)) return false;

  return error.name === 'ResponseError' && Object.hasOwn(error, 'response');
}
function isFetchError(error: unknown): error is FetchError {
  if (!isNamedError(error)) return false;

  return error.name === 'FetchError' && Object.hasOwn(error, 'cause');
}
function isRequiredError(error: unknown): error is RequiredError {
  if (!isNamedError(error)) return false;

  return error.name === 'RequiredError' && Object.hasOwn(error, 'field');
}
function isErrorDetails(data: unknown): data is ErrorDetails {
  return isObject(data) && instanceOfErrorDetails(data);
}

export async function handleFetchError(
  error: unknown,
  options?: {
    dontRedirect?: number[]
  }
): Promise<RespServerError | null> {
  if (isFetchError(error)) {
    createErrorToast('Network error');
    return null;
  }

  if (isRequiredError(error)) {
    createErrorToast(error.message);
    return {
      error: true,
      status: 400,
      apiCode: 'BadRequest',
      apiFields: {
        [error.field]: ['required'],
      }
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

  if (!(options?.dontRedirect?.includes(status) ?? false))
  {
    switch (status) {
      case 401:
        createErrorToast('Login missing or expired');
        goto(BuildRedirectURL('/login', GetRedirectURL(url, '/home')));
        return null;
      case 403:
        createErrorToast('You do not have permission to access this resource');
        goto('/home');
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

  if (details.notification)
  {
    createErrorToast(details.notification.content);
  }

  return {
    error: true,
    status,
    apiCode: details.code,
    apiFields: details.fields
  };
}
