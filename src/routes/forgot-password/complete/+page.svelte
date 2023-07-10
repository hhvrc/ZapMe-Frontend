<script lang="ts">
  import { focusTrap, toastStore } from '@skeletonlabs/skeleton';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import PasswordInput from '$components/PasswordInput.svelte';
  import { accountApi } from '$lib/fetchSingleton';
  import { handleFetchError } from '$lib/helpers';
  import { validatePassword, validatePasswordMatch } from '$lib/validators';

  const token = browser && $page.url.searchParams.get('token');
  if (browser && !token) {
    toastStore.trigger({
      message: 'Password reset link is invalid',
      autohide: true,
      timeout: 10_000,
      background: 'bg-red-500',
    });
    goto('/forgot-password');
  }

  let password = '';
  let passwordShown = false;
  $: passwordError = validatePassword(password);

  let passwordMatch = '';
  let passwordMatchShown = false;
  $: passwordMatchError = validatePasswordMatch(password, passwordMatch);

  let loading = false;
  $: disabled = !browser || !token || !passwordError.valid || !passwordMatchError.valid || loading;

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
      Reset Password
    </button>
  </form>
</div>