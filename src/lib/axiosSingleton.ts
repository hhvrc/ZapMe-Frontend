import axios, { isAxiosError, type AxiosInstance, type AxiosResponse, AxiosError } from 'axios';
import type { ErrorDetails } from '$lib/api';

const basePath = 'https://localhost:5001/api';
const instance = axios.create({
  baseURL: basePath,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type AxiosPromise<T> = Promise<AxiosResponse<T>>;
export type AxiosFunction<T> = (axios?: AxiosInstance, basePath?: string) => AxiosPromise<T>;

export type RespOk<T> = {
  code: 'ok';
  data: T;
}
export type RespErrInternalException = {
  code: 'InternalError';
  exception: any;
}
export type RespErrNetwork = {
  code: 'NetworkError';
}
export type RespErrCancelled = {
  code: 'CancelledError';
}
export type RespErrServer = {
  code: 'ServerError';
  data: any;
}

function isErrorDetails(data: any): data is AxiosError<ErrorDetails> {
  return (
    data &&
    data.hasOwnProperty('title') &&
    data.hasOwnProperty('detail') &&
    data.hasOwnProperty('traceId') &&
    data.hasOwnProperty('suggestion') &&
    data.hasOwnProperty('fields') &&
    data.hasOwnProperty('notification')
  );
}

export async function DoRequest<T>(axiosCall: AxiosFunction<T>): Promise<RespOk<T> | RespErrInternalException | RespErrNetwork | RespErrCancelled | RespErrServer> {
  try
  {
    const response = await axiosCall(instance, basePath);

    return { code: 'ok', data: response.data };
  }
  catch (error: any)
  {
    if (!isErrorDetails(error)) {
    {
      console.error('Unexpected error', error);
      return { code: 'InternalError', exception: { message: 'Unexpected error', exception: error } };
    }

    if (error.code === 'ERR_CANCELLED') return { code: 'CancelledError' };

    if (error.response) {
      const data = error.response.data;

      if (
        !data ||
        !data.hasOwnProperty('title') ||
        !data.hasOwnProperty('detail') ||
        !data.hasOwnProperty('traceId') ||
        !data.hasOwnProperty('suggestion') ||
        !data.hasOwnProperty('field') ||
        !data.hasOwnProperty('notification')
      ) {
        console.error('Unexpected error response', error);
        return { code: 'InternalError', exception: { message: 'Unexpected error response', exception: error } };
      }

      return { code: 'ServerError', data: data as ErrorDetails };
    } else if (error.request) {
      return { code: 'NetworkError' };
    }
    
    return { code: 'InternalError', exception: error };
  }
}