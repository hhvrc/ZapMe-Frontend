import { goto } from '$app/navigation';
import {
  AccountApi,
  AuthenticationApi,
  ConfigApi,
  HealthApi,
  UserApi,
  WebSocketApi,
  type ErrorDetails,
  type UserNotification,
  Configuration,
  FetchError,
  ResponseError,
  RequiredError,
} from '$lib/api';
import { BuildRedirectURL, GetRedirectURL } from './utils/redirects';
import { getReasonPhrase } from 'http-status-codes';

const basePath = import.meta.env.VITE_BACKEND_URL as string;
const config = new Configuration({
  basePath,
  credentials: 'include',
});

export const accountApi = new AccountApi(config);
export const authenticationApi = new AuthenticationApi(config);
export const configApi = new ConfigApi(config);
export const healthApi = new HealthApi(config);
export const userApi = new UserApi(config);
export const webSocketApi = new WebSocketApi(config);

export type RespOk<T> = {
  code: 'ok';
  data: T;
};
export interface RespServerError {
  code: 'err_server';
  status: number;
  details: ErrorDetails;
}
export type RespNetworkError = {
  code: 'err_network';
};

export type Response<T> = RespOk<T> | RespServerError | RespNetworkError;

function isResponseError(error: any): error is ResponseError {
  return (
    Object.hasOwn(error, 'name') &&
    Object.hasOwn(error, 'message') &&
    Object.hasOwn(error, 'stack') &&
    Object.hasOwn(error, 'response') &&
    error.name === 'ResponseError'
  );
}
function isFetchError(error: any): error is FetchError {
  return (
    Object.hasOwn(error, 'name') &&
    Object.hasOwn(error, 'message') &&
    Object.hasOwn(error, 'stack') &&
    Object.hasOwn(error, 'cause') &&
    error.name === 'FetchError'
  );
}
function isRequiredError(error: any): error is RequiredError {
  return (
    Object.hasOwn(error, 'name') &&
    Object.hasOwn(error, 'message') &&
    Object.hasOwn(error, 'stack') &&
    Object.hasOwn(error, 'field') &&
    error.name === 'RequiredError'
  );
}
function isUserNotification(data: any): data is UserNotification {
  return (
    Object.hasOwn(data, 'severity') &&
    Object.hasOwn(data, 'title') &&
    Object.hasOwn(data, 'message')
  );
}
function isErrorDetails(data: any): data is ErrorDetails {
  if (
    Object.hasOwn(data, 'title') &&
    Object.hasOwn(data, 'detail') &&
    Object.hasOwn(data, 'traceId') &&
    Object.hasOwn(data, 'suggestion') &&
    Object.hasOwn(data, 'fields') &&
    Object.hasOwn(data, 'notification')
  ) {
    const notification = data.notification;

    if (notification) {
      return isUserNotification(notification);
    }

    return true;
  }

  return false;
}

function Panic(): RespNetworkError {
  goto('/503');
  return {
    code: 'err_network',
  };
}

export async function ParseFetchError(
  error: any
): Promise<RespServerError | RespNetworkError> {
  if (isFetchError(error)) {
    return Panic();
  }

  if (isRequiredError(error)) {
    return {
      code: 'err_server',
      status: 400,
      details: {
        title: 'Bad Request',
        detail: error.message,
        fields: {
          [error.field]: ['invalid'],
        },
      },
    };
  }

  if (!isResponseError(error)) {
    // Unknown error, screw it.
    throw error;
  }

  const { response } = error;
  const { status, url } = response;

  if (status === 503) {
    return Panic();
  }
  if (status === 401) {
    goto(BuildRedirectURL('/sign-out', GetRedirectURL(url, '/sign-in')));
  } else if (status === 403) {
    goto('/home');
  }

  const details = await response
    .text()
    .then((text) => {
      const json = JSON.parse(text);
      return json && isErrorDetails(json) ? json : null;
    })
    .catch(() => null);

  if (!details) {
    return {
      code: 'err_server',
      status,
      details: {
        title: 'Server Error',
        detail: getReasonPhrase(status),
        fields: {},
      },
    };
  }

  // Try to parse the error details.
  if (!isErrorDetails(details)) {
    // Unknown response, screw it.
    throw error;
  }

  return {
    code: 'err_server',
    status: error.response.status,
    details: details,
  };
}
