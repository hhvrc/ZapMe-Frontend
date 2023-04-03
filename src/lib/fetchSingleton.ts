import { AccountApi, AuthenticationApi, ConfigApi, HealthApi, UserApi, WebSocketApi, type ErrorDetails, type UserNotification, Configuration } from '$lib/api';

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

export type Response<T> = RespOk<T> | RespServerError | RespNetworkError;

export async function DoRequest<T>(fetchCall: Promise<T>): Promise<Response<T>> {
  try
  {
    const response = await fetchCall;

    // Successfull response, return it.
    return { code: 'ok', data: response };
  }
  catch (error: any)
  {
    /*
    export class ResponseError extends Error {
        override name: "ResponseError" = "ResponseError";
        constructor(public response: Response, msg?: string) {
            super(msg);
        }
    }

    export class FetchError extends Error {
        override name: "FetchError" = "FetchError";
        constructor(public cause: Error, msg?: string) {
            super(msg);
        }
    }

    export class RequiredError extends Error {
        override name: "RequiredError" = "RequiredError";
        constructor(public field: string, msg?: string) {
            super(msg);
        }
    }
    */
    switch (error.name) {
      case 'ResponseError':
        const response = error.response;
        const responseData = response.data;

    // If the error is not a axios error, then we don't know what to do with it, so just rethrow it.
    if (!isAxiosError(error)) {
      throw error;
    }

    // If there is no response data, then it's probably a network error.
    if (!error.response) {
      // Not a network error, screw it.
      if (!error.request) throw error;

      return { code: 'err_network' };
    }
    
    const response = error.response;
    const responseData = response.data;

    // If the response data is not an error details object, then we don't know what to do with it, so just rethrow it.
    if (!!responseData && !isErrorDetails(responseData)) {
      throw error;
    }

    // Finally, we have an error details object, so return it.
    return { code: 'err_server', status: response.status, details: responseData };
  }
}