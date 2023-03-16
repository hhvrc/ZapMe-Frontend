<script lang="ts">
  import { goto } from '$app/navigation';
  import { AuthenticationApiFactory } from '$lib/api';
  import NamedInput from '$components/NamedInput.svelte';
  import NamedCheckBox from '$components/NamedCheckBox.svelte';
  import Form from '$components/Form.svelte';
  import FormButton from '$components/FormButton.svelte';
  import type { Snapshot } from './$types';
  import { validateUsername, validatePassword } from '$lib/validators';

  const authenticationApi = AuthenticationApiFactory();

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

  let apiAuthError: string | null = null;
  function handleSubmit() {
    authenticationApi.authSignIn({
      username: formData.username,
      password: formData.password,
      rememberMe: formData.rememberMe,
    })
    .then(
      (furfilled) => {
        console.log(furfilled);
        goto('/dashboard');
      },
      (rejected) => {
        apiAuthError = rejected?.response?.data?.notification?.message ?? null;
      }
    )
    .finally(() => {
      formData.password = '';
    });
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