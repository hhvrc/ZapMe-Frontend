<script lang="ts">
  import { page } from '$app/stores';
  import Form from '$components/Form.svelte';
  import FormButton from '$components/FormButton.svelte';
  import NamedInput from '$components/NamedInput.svelte';
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
  <Form on:submit={handleSubmit} title="Reset Password">
    <NamedInput
      type="password"
      autocomplete="current-password"
      displayname="Password"
      bind:value={password}
      error={passwordError}
    />
    <NamedInput
      type="password"
      autocomplete="new-password"
      displayname="Confirm Password"
      bind:value={confirmedPassword}
      error={confirmedPasswordError}
    />

    <FormButton disabled={!formValid}>Reset Password</FormButton>
  </Form>
{/if}

<style>
</style>
