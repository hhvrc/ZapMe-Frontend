<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { authenticationApi, ParseFetchError } from '$lib/fetchSingleton';
  import { AccountStore, SessionTokenStore } from '$lib/stores';
  import { GetRedirectURL } from '$lib/utils/redirects';
  import { validateUsername, validatePassword } from '$lib/validators';
  import type { Snapshot } from './$types';
  import { focusTrap } from '@skeletonlabs/skeleton';

  let formData = {
    usernameOrEmail: '',
    password: '',
    sessionName: 'session-' + Math.random().toString(36).substring(2, 10),
    rememberMe: false,
  };
  export const snapshot: Snapshot = {
    capture: () => formData,
    restore: (data) => {
      formData = data;
    },
  };

  async function handleSubmit() {
    try {
      const response = await authenticationApi.authSignIn({
        authSignIn: formData,
      });

      if (!response.session || !response.account) {
        throw new Error('Invalid response');
      }

      AccountStore.set(response.account);
      SessionTokenStore.set(response.session);

      goto(GetRedirectURL($page.url, '/home'));
    } catch (error) {
      const responseData = await ParseFetchError(error);
      if (responseData.code == 'err_network') {
        window.alert('Network error');
        return;
      }
      const response = responseData.details;
      if (!response) {
        if (error instanceof Error) {
          window.alert(error.message);
        } else {
          window.alert('An unknown error occurred.');
        }
        return;
      }

      if (response.notification) {
        window.alert(
          response.notification.title + ': ' + response.notification.message
        );
      }

      if (response.fields) {
        if (response.fields.username) {
          window.alert(response.fields.username);
        }
        if (response.fields.password) {
          window.alert(response.fields.password);
        }
      }
    }
  }

  const socials = [
    { name: 'Google', icon: '/icons/logo_google.svg', link: '/auth/google' },
    { name: 'Twitter', icon: '/icons/logo_twitter.svg', link: '/auth/twitter' },
  ];

  let formValid = false;
  let usernameError: string | null = null;
  let passwordError: string | null = null;
  $: {
    const { usernameOrEmail, password } = formData;

    const usernameValidation = validateUsername(usernameOrEmail);
    usernameError = usernameValidation.message;

    const passwordValidation = validatePassword(password);
    passwordError = passwordValidation.message;

    formValid = usernameValidation.valid && passwordValidation.valid;
  }

  let isFocused = true;
</script>

<svelte:head>
  <title>ZapMe - Login</title>
</svelte:head>

<form use:focusTrap={isFocused}>
  <label class="label">
    <span>Username Or Email</span>
    <input
      class="input"
      title="Username"
      type="text"
      placeholder="username"
      autocomplete="username"
    />
  </label>
  <label class="label">
    <span>Password</span>
    <input
      class="input"
      title="Password"
      type="password"
      placeholder="password"
      autocomplete="new-password"
    />
  </label>
  <button type="submit" class="btn variant-filled">
    <span>🚀</span>
    <span>Sign In</span>
  </button>
</form>
