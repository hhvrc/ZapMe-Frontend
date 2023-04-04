import { AccountApi, AuthenticationApi, ConfigApi, HealthApi, UserApi, WebSocketApi, type ErrorDetails, type UserNotification, Configuration, FetchError, ResponseError, RequiredError } from '$lib/api';

const basePath = import.meta.env.VITE_BACKEND_URL as string;
const config = new Configuration({ basePath });

export const accountApi = new AccountApi(config);
export const authenticationApi = new AuthenticationApi(config);
export const configApi = new ConfigApi(config);
export const healthApi = new HealthApi(config);
export const userApi = new UserApi(config);
export const webSocketApi = new WebSocketApi(config);

export type RespOk<T> = {
  code: 'ok';
  data: T;
}
export interface RespServerError {
  code: 'err_server';
  status: number;
  details: ErrorDetails;
}
export type RespNetworkError = {
  code: 'err_network';
}

export type Response<T> = RespOk<T> | RespServerError | RespNetworkError;

function isResponseError(error: any): error is ResponseError {
  return (
    error.hasOwnProperty('name') &&
    error.hasOwnProperty('message') &&
    error.hasOwnProperty('stack') &&
    error.hasOwnProperty('response') &&
    error.name === 'ResponseError'
  );
}
function isFetchError(error: any): error is FetchError {
  return (
    error.hasOwnProperty('name') &&
    error.hasOwnProperty('message') &&
    error.hasOwnProperty('stack') &&
    error.hasOwnProperty('cause') &&
    error.name === 'FetchError'
  );
}
function isRequiredError(error: any): error is RequiredError {
  return (
    error.hasOwnProperty('name') &&
    error.hasOwnProperty('message') &&
    error.hasOwnProperty('stack') &&
    error.hasOwnProperty('field') &&
    error.name === 'RequiredError'
  );
}
function isUserNotification(data: any): data is UserNotification {
  return (
    data.hasOwnProperty('severity') &&
    data.hasOwnProperty('title') &&
    data.hasOwnProperty('message')
  );
}
function isErrorDetails(data: any): data is ErrorDetails {
  if (
    data.hasOwnProperty('title') &&
    data.hasOwnProperty('detail') &&
    data.hasOwnProperty('traceId') &&
    data.hasOwnProperty('suggestion') &&
    data.hasOwnProperty('fields') &&
    data.hasOwnProperty('notification')
    )
  {
    const notification = data.notification;

    if (notification) {
      return isUserNotification(notification);
    }

    return true;
  }

  return false;
}

export async function ParseFetchError(error: any): Promise<RespServerError | RespNetworkError> {
    if (isFetchError(error)) {
      return {
        code: 'err_network'
      };
    }

    if (isRequiredError(error)) {
      return {
        code: 'err_server',
        status: 400,
        details: {
          title: 'Bad Request',
          detail: error.message,
          traceId: '', fields: {
            [error.field]: [ 'invalid' ]
          }
        }
      };
    }

    if (!isResponseError(error)) {
      // Unknown error, screw it.
      throw error;
    }

    // Try to parse the error details.
    const details = await error.response.json();
    if (!details || !isErrorDetails(details)) {
      // Unknown response, screw it.
      throw error;
    }

    return {
      code: 'err_server',
      status: error.response.status,
      details: details
    };
}