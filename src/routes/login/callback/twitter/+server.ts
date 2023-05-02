import { fail, json, redirect } from '@sveltejs/kit';

// Callback for Twitter OAuth2, will contain the code and state
export async function GET({ cookies, url }) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return 400;
  }

  const response = await fetch('https://api.twitter.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_TWITTER_CLIENT_ID,
      client_secret: import.meta.env.VITE_TWITTER_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: import.meta.env.VITE_TWITTER_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    return fail();
  }

  const { access_token, refresh_token, expires_in, scope, token_type } =
    await response.json();

  // Set cookies
  cookies.set('access_token', access_token);

  // Redirect to home page
  return redirect(302, '/home');
}
