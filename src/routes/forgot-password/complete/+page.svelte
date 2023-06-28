<script lang="ts">
  import { focusTrap } from '@skeletonlabs/skeleton';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import PasswordInput from '$components/PasswordInput.svelte';
  import { accountApi } from '$lib/fetchSingleton';
  import { createErrorToast, handleFetchError } from '$lib/helpers';
  import { validatePassword, validatePasswordMatch } from '$lib/validators';

  const token = $page.url.searchParams.get('token');
  if (browser && !token) {
    createErrorToast(
      'You have not been provided with a token. Please check your email and try again.'
    );
    goto('/');
  }

  let password = '';
  let passwordShown = false;
  $: passwordError = validatePassword(password);

  let passwordMatch = '';
  let passwordMatchShown = false;
  $: passwordMatchError = validatePasswordMatch(password, passwordMatch);

  let loading = false;
  $: disabled = !passwordError.valid || !passwordMatchError.valid || loading;

  async function handleSubmit() {
    if (disabled || !token) return;

    try {
      await accountApi.completeAccountPasswordReset({
        newPassword: password,
        token,
      });
    } catch (error) {
      await handleFetchError(error, { dontRedirect: [401] });
    }
  }
</script>

<svelte:head>
  <title>ZapMe - Reset Password</title>
</svelte:head>

{#if !token}
  <h2>
    You have not been provided with a token.<br />
    Please check your email and try again.
  </h2>
{:else}
  <div class="card mx-auto my-8 w-1/2 max-w-xl p-4">
    <form
      class="flex flex-col space-y-4"
      on:submit|preventDefault={handleSubmit}
      use:focusTrap={true}
    >
      <!-- Title -->
      <h2>Reset Password</h2>

      <p>Please enter your new password below.</p>

      <!-- Password -->
      <PasswordInput
        title="Password"
        autocomplete="new-password"
        bind:password
        bind:passwordShown
        validationResult={passwordError}
      />
      <PasswordInput
        title="Confirm Password"
        autocomplete="new-password"
        bind:password={passwordMatch}
        bind:passwordShown={passwordMatchShown}
        validationResult={passwordMatchError}
      />

      <!-- Submit -->
      <button type="submit" class="btn variant-filled w-1/2 self-center" {disabled}>
        <span class="hidden md:inline-block">🚀</span>
        <span>Reset Password</span>
      </button>
    </form>
  </div>
{/if}
