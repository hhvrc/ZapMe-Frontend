import type { UserDto } from '$lib/api';
import { ParseFetchError, userApi, type Response } from '$lib/fetchSingleton';

export async function load({ params }) {
  const userId = params.userId ?? 'test';

  async function userRequestFunc(): Promise<Response<UserDto>> {
    try {
      const response = await userApi.getUser(userId);
      return { code: 'ok', data: response };
    } catch (error) {
      const parsed = await ParseFetchError(error);
      return parsed;
    }
  }

  return {
    userId,
    userRequestFunc,
  };
}
