import { fail, json, redirect, type Cookies } from '@sveltejs/kit';

export async function handleGithubOAuthInitialize(
  cookies: Cookies,
  url: URL
): Promise<Response> {
  return redirect(302, '/');
}

export async function handleGithubOAuthCallback(
  cookies: Cookies,
  url: URL
): Promise<Response> {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return json({ error: 'Invalid code or state' }, { status: 400 });
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
      client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    return json({ error: 'Failed to fetch access token' }, { status: 400 });
  }

  const { access_token, refresh_token, expires_in, scope, token_type } =
    await response.json();

  // Set cookies
  cookies.set('access_token', access_token);

  // Redirect to home page
  return redirect(302, '/');
}
