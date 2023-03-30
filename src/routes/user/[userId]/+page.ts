import { UserApiFp } from '$lib/api';
import { DoRequest } from '$lib/axiosSingleton';

const userApi = UserApiFp();

export async function load({ params }) {
  const userId = params.userId ?? "test";
  const userRequestFunc = async () => {
    const request = await userApi.getUser(userId);
    return await DoRequest(request);
  }

  return {
    userId,
    userRequestFunc
  }
}