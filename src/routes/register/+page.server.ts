import { TURNSTILE_BYPASS_TOKEN } from '$env/static/private';
import { accountApi } from '$lib/fetchSingleton.js';
import { Turnstile } from '$lib/server/cloudflare';
import { TurnstileUserErrorMessage } from '$lib/server/cloudflare/turnstile.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const body = await request.formData();
    const username = body.get('username');
    const password = body.get('password');
    const email = body.get('email');
    const acceptedTerms = body.get('acceptedTerms');

    // Validate field presence
    if (!username || !email || !password || acceptedTerms !== 'on') {
      return fail(400, {
        username,
        email,
        acceptedTerms,
        error: true,
        message: 'Missing required fields',
      });
    }

    // Validate turnstile
    const cfResponse = await Turnstile.ValidateToken(body, request.headers);
    if (!cfResponse.success) {
      return fail(400, {
        username,
        email,
        acceptedTerms,
        error: true,
        message: TurnstileUserErrorMessage(cfResponse),
      });
    }

    // Create account
    const zmResponse = await accountApi
      .createAccount({
        createAccount: {
          username: username.toString(),
          password: password.toString(),
          email: email.toString(),
          acceptedTosVersion: 1,
          turnstileResponse: 'bypass:' + TURNSTILE_BYPASS_TOKEN,
        },
      })
      .then((res) => {
        return { success: true, body: res };
      })
      .catch((err) => {
        console.error(err);
        return { success: false };
      });

    if (!zmResponse.success) {
      return fail(500, {
        username,
        email,
        acceptedTerms,
        error: true,
        message: 'Internal Server Error',
      });
    }

    return {
      username,
      email,
      acceptedTerms,
      success: true,
    };
  },
};
