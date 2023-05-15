import { type ErrorDetails, FetchError, RequiredError, ResponseError, instanceOfErrorDetails } from "$lib/api";
import { isObject } from "./basicGuards";

export function isNamedError(error: unknown): error is { name: string, message: string, stack: string } {
  if (!isObject(error)) return false;

  return (
    Object.hasOwn(error, 'name') &&
    Object.hasOwn(error, 'message') &&
    Object.hasOwn(error, 'stack')
  );
}
export function isResponseError(error: unknown): error is ResponseError {
  if (!isNamedError(error)) return false;

  return error.name === 'ResponseError' && Object.hasOwn(error, 'response');
}
export function isFetchError(error: unknown): error is FetchError {
  if (!isNamedError(error)) return false;

  return error.name === 'FetchError' && Object.hasOwn(error, 'cause');
}
export function isRequiredError(error: unknown): error is RequiredError {
  if (!isNamedError(error)) return false;

  return error.name === 'RequiredError' && Object.hasOwn(error, 'field');
}
export function isErrorDetails(data: unknown): data is ErrorDetails {
  return isObject(data) && instanceOfErrorDetails(data);
}
