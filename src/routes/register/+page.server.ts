import { accountApi } from '$lib/fetchSingleton';
import { Turnstile } from '$lib/server/cloudflare';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
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
        success: false,
        missingFields: true,
      });
    }

    // Validate turnstile
    const cfResponse = await Turnstile.ValidateToken(body, request.headers);
    if (!cfResponse.success) {
      return fail(400, {
        username,
        email,
        acceptedTerms,
        success: false,
        turnstileError: cfResponse.message,
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
          turnstileResponse:
            'bypass:' + process.env.VITE_TURNSTILE_BYPASS_TOKEN,
        },
      })
      .then((res) => {
        return { success: true, body: res };
      })
      .catch((err) => {
        return { success: false, body: err };
      });

    if (!zmResponse.success) {
      const err = zmResponse.body as Error;
      console.error(err);
      return fail(400, {
        username,
        email,
        acceptedTerms,
        success: false,
        error: zmResponse.body,
      });
    }

    return {
      success: true,
    };
  },
};