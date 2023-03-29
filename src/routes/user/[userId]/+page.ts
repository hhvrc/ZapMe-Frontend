import { UserApiFp } from '$lib/api';
import { DoRequest } from '$lib/axiosSingleton';

const userApi = UserApiFp();

export async function load({ params }) {
  const request = await userApi.getUser(params.userId ?? "test");
  const response = await DoRequest(request);
  return { body: response };
}