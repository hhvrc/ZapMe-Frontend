import axios, { isAxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import type { ErrorDetails, UserNotification } from '$lib/api';

const basePath = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
  baseURL: basePath,
  timeout: 10000
});

export type AxiosPromise<T> = Promise<AxiosResponse<T>>;
export type AxiosFunction<T> = (axios?: AxiosInstance, basePath?: string) => AxiosPromise<T>;

export type RespOk<T> = {
  code: 'ok';
  data: T;
}
export interface RespServerError extends ErrorDetails {
  code: 'err_server';
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

export async function DoRequest<T>(axiosCall: AxiosFunction<T>): Promise<Response<T>> {
  try
  {
    const response = await axiosCall(instance, basePath);

    // Successfull response, return it.
    return { code: 'ok', data: response.data };
  }
  catch (error: any)
  {
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
    
    const responseData = error.response.data;

    // If the response data is not an error details object, then we don't know what to do with it, so just rethrow it.
    if (!isErrorDetails(responseData)) {
      throw error;
    }

    // Finally, we have an error details object, so return it.
    return { code: 'err_server', ...responseData };
  }
}