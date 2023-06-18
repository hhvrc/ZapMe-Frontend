<script lang="ts">
  import type { Snapshot } from './$types';
  import { focusTrap } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import PasswordInput from '$components/PasswordInput.svelte';
  import ResponsiveCard from '$components/ResponsiveCard.svelte';
  import TextInput from '$components/TextInput.svelte';
  import { authenticationApi } from '$lib/fetchSingleton';
  import { handleFetchError } from '$lib/helpers/errorDetailsHelpers';
  import { OAuthProviderInfo } from '$lib/oauth';
  import { SessionTokenStore } from '$lib/stores';
  import { GetRedirectURL } from '$lib/utils/redirects';

  export const snapshot: Snapshot = {
    capture: () => usernameOrEmail,
    restore: (data) => (usernameOrEmail = data),
  };

  let usernameOrEmail = '';
  let password = '';
  let passwordShown = false;
  let rememberMe = false;

  let loading = false;
  $: disabled = !usernameOrEmail || !password || loading;

  async function handleSubmit() {
    if (disabled) return;

    try {
      loading = true;
      const response = await authenticationApi.authSignIn({
        usernameOrEmail,
        password,
        rememberMe,
      });
      SessionTokenStore.set(response);
      goto(GetRedirectURL($page.url, '/'));
    } catch (error) {
      await handleFetchError(error, { dontRedirect: [401] });
    } finally {
      loading = false;
    }
  }
</script>

<!-- Login Form -->
<ResponsiveCard>
  <form
    class="flex flex-col space-y-4"
    on:submit|preventDefault={handleSubmit}
    use:focusTrap={true}
  >
    <!-- Title -->
    <h2>Login</h2>

    <!-- Username -->
    <TextInput
      title="Username Or Email"
      placeholder="John Doe / john@example.com"
      autocomplete="on"
      bind:value={usernameOrEmail}
    />

    <!-- Password -->
    <PasswordInput
      autocomplete="current-password"
      bind:password
      bind:passwordShown
    />

    <!-- Remember me -->
    <label class="flex items-center space-x-2">
      <input
        class="checkbox"
        type="checkbox"
        title="Remember Me"
        bind:checked={rememberMe}
      />
      <span>Remember Me</span>
    </label>

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
      <hr />
      Or Login With
      <hr />
    </div>

    <div class="space flex flex-wrap items-center justify-center gap-2">
      {#each Object.values(OAuthProviderInfo) as { name, icon, href }}
        <a class="btn variant-filled" {href}>
          <span class={'fa-brands ' + icon} />
          <span class="hidden md:inline">{name}</span>
        </a>
      {/each}
    </div>
  </form>
</ResponsiveCard>
