import { TURNSTILE_BYPASS_TOKEN } from '$env/static/private';
import { accountApi } from '$lib/fetchSingleton.js';
import { Turnstile } from '$lib/server/cloudflare/index.js';
import { TurnstileUserErrorMessage } from '$lib/server/cloudflare/turnstile.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const body = await request.formData();
    const email = body.get('email');

    // Validate field presence
    if (!email) {
      return fail(400, {
        email,
        error: true,
        message: 'Missing required fields',
      });
    }

    // Validate turnstile
    const cfResponse = await Turnstile.ValidateToken(body, request.headers);
    if (!cfResponse.success) {
      return fail(400, {
        email,
        error: true,
        message: TurnstileUserErrorMessage(cfResponse),
      });
    }

    // Initiate account recovery
    const zmResponse = await accountApi
      .accountRecoveryRequest({
        recoveryRequest: {
          email: email.toString(),
          turnstileResponse: 'bypass:' + TURNSTILE_BYPASS_TOKEN
        }
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
        email,
        error: true,
        message: 'Internal Server Error',
      });
    }

    return {
      success: true,
    };
  }
};
