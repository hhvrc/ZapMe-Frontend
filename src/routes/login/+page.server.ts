import { authenticationApi } from '$lib/fetchSingleton.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const body = await request.formData();
    const usernameOrEmail = body.get('usernameOrEmail');
    const password = body.get('password');

    // Validate field presence
    if (!usernameOrEmail || !password) {
      return fail(400, {
        usernameOrEmail,
        error: true,
        message: 'Missing required fields',
      });
    }

    // Sign in
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
        console.error(err);
        return { success: false };
      });

    if (!zmResponse.success) {
      return fail(500, {
        usernameOrEmail,
        error: true,
        message: 'Internal Server Error',
      });
    }

    return {
      usernameOrEmail,
      error: null,
    };
  },
};
