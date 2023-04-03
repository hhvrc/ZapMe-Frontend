import { DoRequest, userApi } from '$lib/fetchSingleton';

export async function load({ params }) {
  const userId = params.userId ?? "test";
  const request = userApi.getUser({ userId });

  return {
    userId,
    userRequestFunc: async () => DoRequest(request)
  }
}