/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request }) => {
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
    const cfResponse = await Turnstile.ValidateToken(body, request.headers);
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
  register: async ({ request }) => {
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
          turnstileResponse: 'bypass:' + TURNSTILE_BYPASS_TOKEN,
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
