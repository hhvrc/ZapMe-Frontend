<script lang="ts">
  import { page } from '$app/stores';
  import { ParseFetchError, accountApi } from '$lib/fetchSingleton';
  import { validatePassword } from '$lib/validators';

  const token = $page.url.searchParams.get('token');
  let password = '';
  let confirmedPassword = '';

  async function handleSubmit() {
    if (!token) return;
    try {
      await accountApi.accountRecoveryConfirm({
        recoveryConfirm: {
          token: token,
          newPassword: password,
        },
      });
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
    }
  }

  let formValid = false;
  let passwordError: string | null = null;
  let confirmedPasswordError: string | null = null;
  $: {
    const passwordValidation = validatePassword(password);
    passwordError = passwordValidation.message;

    const confirmedPasswordValid = password === confirmedPassword;
    confirmedPasswordError = confirmedPasswordValid
      ? null
      : 'Passwords do not match';

    formValid = passwordValidation.valid && confirmedPasswordValid;
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
  <form>
    <h2>Reset Password</h2>
    <p>Please enter your new password below.</p>
    <label class="label">
      <span>Password</span>
      <input
        type="password"
        class="input"
        title="Password"
        placeholder="Password"
        autocomplete="new-password"
        bind:value={password}
      />
    </label>
    <label class="label">
      <span>Confirm Password</span>
      <input
        type="password"
        class="input"
        title="Confirm Password"
        placeholder="Confirm Password"
        autocomplete="new-password"
        bind:value={confirmedPassword}
      />
    </label>
    <button
      type="submit"
      class="btn variant-filled"
      disabled={!formValid}
      on:click|preventDefault={handleSubmit}
    >
      Reset Password
    </button>
  </form>
{/if}
