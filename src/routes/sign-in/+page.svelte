<script lang="ts">
  import { goto } from '$app/navigation';
  import NamedInput from '$components/NamedInput.svelte';
  import NamedCheckBox from '$components/NamedCheckBox.svelte';
  import Form from '$components/Form.svelte';
  import FormButton from '$components/FormButton.svelte';
  import type { Snapshot } from './$types';
  import { validateUsername, validatePassword } from '$lib/validators';
  import { authenticationApi, ParseFetchError } from '$lib/fetchSingleton';
  import { GetRedirectURL } from '$lib/utils/redirects';
  import { page } from '$app/stores';
  import { AccountStore, SessionTokenStore } from '$lib/stores';

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
</script>

<svelte:head>
  <title>ZapMe - Login</title>
</svelte:head>

<Form on:submit={handleSubmit} title="Login">
  <NamedInput
    type="text"
    autocomplete="username"
    icon="badge"
    displayname="Username Or Email"
    bind:value={formData.usernameOrEmail}
    error={usernameError}
  />
  <NamedInput
    type="password"
    autocomplete="current-password"
    displayname="Password"
    bind:value={formData.password}
    error={passwordError}
  />
  <div class="misc">
    <NamedCheckBox bind:checked={formData.rememberMe}>Remember me</NamedCheckBox
    >
    <a href="/reset-password">Forgot Password?</a>
  </div>

  <FormButton disabled={!formValid} content="Sign In" />

  <div class="oauth-logins">
    {#each socials as { name, icon }}
      <button class="default-btn-text">
        <img src={icon} alt="{name} Icon" />
        {name}
      </button>
    {/each}
  </div>
</Form>

<style>
  .misc {
    width: 100%;
  }
  .misc * {
    display: inline-block;
  }
  .misc a {
    float: right;
    font-size: 16px;
    white-space: nowrap;
  }
  .oauth-logins {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;
  }
  .oauth-logins button {
    padding: 5px 10px 10px 5px;
    text-align: center;
  }
  img {
    height: 25px;
  }
</style>
