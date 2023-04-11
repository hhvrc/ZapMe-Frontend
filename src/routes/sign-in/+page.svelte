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

  let formData = {
    username: '',
    password: '',
    rememberMe: false,
  }
  export const snapshot: Snapshot = {
    capture: () => formData,
    restore: (data) => {
      formData = data;
    },
  };

  async function handleSubmit() {
    try {
      const response = await authenticationApi.authSignIn({authSignIn: formData});
      console.log(response);

      goto(GetRedirectURL($page.url, '/home'));
    }
    catch (error) {
      const responseData = await ParseFetchError(error);
      if (responseData.code == 'err_network') {
        window.alert('Network error');
        return;
      }
      let response = responseData.details;
      if (!response) {
        if (error instanceof Error) {
          window.alert(error.message);
        } else {
          window.alert('An unknown error occurred.');
        }
        return;
      }

      if (response.notification) {
        window.alert(response.notification.title + ': ' + response.notification.message);
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

  let socials = [
    { name: 'Google', icon: '/icons/logo_google.svg', link: '/auth/google' },
    { name: 'Twitter', icon: '/icons/logo_twitter.svg', link: '/auth/twitter' },
  ];

  let formValid = false;
  let usernameError: string | null = null;
  let passwordError: string | null = null;
  $: {
    let { username, password } = formData;

    let usernameValidation = validateUsername(username);
    usernameError = usernameValidation.message;

    let passwordValidation = validatePassword(password);
    passwordError = passwordValidation.message;

    formValid = usernameValidation.valid && passwordValidation.valid;
  }
</script>

<svelte:head>
  <title>ZapMe - Login</title>
</svelte:head>

<Form on:submit={handleSubmit} title='Login'>
  <NamedInput type="text" icon="badge" displayname="Username" bind:value={formData.username} error={usernameError} />
  <NamedInput type="password" displayname="Password" bind:value={formData.password} error={passwordError} />
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <NamedCheckBox displayname="Remember Me" bind:checked={formData.rememberMe} />
    <div style="flex: 1; text-align: right;"/>
    <a href="/reset-password">Forgot Password?</a>
  </div>
  
  <FormButton disabled={!formValid} content='Sign In'/>

  <div class="oauth-logins">
    {#each socials as {name, icon}}
      <button class="default-btn-text">
        <img src={icon} alt="{name} Icon"/>
        {name}
      </button>
    {/each}
  </div>
</Form>

<style>
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