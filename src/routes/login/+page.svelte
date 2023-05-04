<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import PasswordInput from '$components/PasswordInput.svelte';
  import TextInput from '$components/TextInput.svelte';
  import { ParseFetchError, authenticationApi } from '$lib/fetchSingleton.js';
  import { AccountStore } from '$lib/stores/accountStore.js';
  import { SessionTokenStore } from '$lib/stores/sessionTokenStore.js';
  import { GetRedirectURL } from '$lib/utils/redirects.js';
  import { focusTrap, toastStore } from '@skeletonlabs/skeleton';
  import type { Snapshot } from './$types';
  import { OAuthProviderInfo } from '$lib/oauth';

  export const snapshot: Snapshot = {
    capture: () => username,
    restore: (data) => username = data,
  };

  let username = '';
  let password = '';
  let passwordShown = false;

  let loading = false;
  $: disabled = !username || !password || loading;

  export let form;

  $: if (browser && form?.error) {
    toastStore.trigger({
      message: form.message,
      autohide: true,
      timeout: 5000,
      background: 'variant-filled-error'
    });
  }

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
</script>

<svelte:head>
  <title>ZapMe - Login</title>
</svelte:head>

<!-- Login Form -->
<div class="card mx-auto my-8 w-1/2 max-w-xl p-4">
  <form class="flex flex-col space-y-4" on:submit|preventDefault={handleSubmit} use:focusTrap={true}>
    <!-- Title -->
    <h2>Login</h2>

    <!-- Username -->
    <TextInput
      name="usernameOrEmail"
      title="Username Or Email"
      placeholder="John Doe / john@example.com"
      autocomplete="on"
      bind:value={username}
    />

    <!-- Password -->
    <PasswordInput name="password" bind:value={password} bind:passwordShown />

    <!-- Submit -->
    <button
      type="submit"
      class="btn variant-filled w-1/2 self-center"
      {disabled}
    >
      <span class="hidden md:inline-block">🚀</span>
      <span>Login</span>
    </button>

    <a href="/register" class="text-center">
      Don't have an account? Register here.
    </a>

    <a href="/forgot-password" class="text-center"> Forgot your password? </a>

    <!-- 1fr-auto-1fr with centered text -->
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-gray-500">
      <hr> Or Login With <hr>
    </div>

    <div class="flex items-center space gap-2 justify-center flex-wrap">
      {#each Object.values(OAuthProviderInfo) as { name, icon, href }}
        <a class="btn variant-filled" {href}>
          <span class={'fa-brands ' + icon} />
          <span class="hidden md:inline">{name}</span>
        </a>
      {/each}
    </div>
  </form>
</div>
