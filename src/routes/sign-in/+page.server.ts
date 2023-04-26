import { Turnstile } from '$lib/cloudflare';
import { authenticationApi } from '$lib/fetchSingleton';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request }) => {
    const body = await request.formData();
    const usernameOrEmail = body.get('usernameOrEmail');
    const password = body.get('password');

    // Validate field presence
    if (!usernameOrEmail || !password) {
      return fail(400, {
        usernameOrEmail,
        success: false,
        missingFields: true,
      });
    }

    // Validate turnstile
    const cfResponse = await Turnstile.ValidateToken(
      body,
      request.headers,
      process.env.VITE_TURNSTILE_SECRET
    );
    if (!cfResponse.success) {
      return fail(400, {
        usernameOrEmail,
        success: false,
        turnstileError: cfResponse.message,
      });
    }

    // Create account
    const zmResponse = await authenticationApi
      .authSignIn({
        authSignIn: {
          usernameOrEmail: usernameOrEmail.toString(),
          password: password.toString(),
          sessionName: 'sveltekit',
          rememberMe: true,
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
        usernameOrEmail,
        success: false,
        error: zmResponse.body,
      });
    }

    return {
      success: true,
    };
  },
};
