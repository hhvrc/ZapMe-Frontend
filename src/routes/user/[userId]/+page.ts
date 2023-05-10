import { UserApi, type UserDto } from '$lib/api';
import { RuntimeApiConfiguration } from '$lib/fetchSingleton';
import { handleFetchError } from '$lib/helpers/errorDetailsHelpers.js';
import type { Response } from '$types';

const userApi = new UserApi(RuntimeApiConfiguration);

export async function load({ params }) {
  const userId = params.userId ?? 'test';

  async function userRequestFunc(): Promise<Response<UserDto>> {
    try {
      const response = await userApi.getUser(userId);
      return { error: false, data: response };
    } catch (error) {
      return (await handleFetchError(error)) ?? { error: true, status: 500, apiCode: 'unknown', apiFields: null };
    }
  }

  return {
    userId,
    userRequestFunc,
  };
}
