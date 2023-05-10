export type RespOk<T> = {
  error: false;
  data: T;
};
export interface RespServerError {
  error: true;
  status: number;
  apiCode: string;
  apiFields?: { [key: string]: Array<string>; } | null;
}

export type Response<T> = RespOk<T> | RespServerError;
