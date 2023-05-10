import { OAuthHandlers } from '$lib/server/oauth';
import { json } from '@sveltejs/kit';

export async function GET({ cookies, url, params }) {
  const handler = OAuthHandlers[params.OAuthProvider];
  if (!handler) {
    return json(
      {
        message: 'Unsupported OAuth provider',
        supported: Object.keys(OAuthHandlers),
      },
      { status: 400 }
    );
  }

  return await handler.callback(cookies, url);
}
