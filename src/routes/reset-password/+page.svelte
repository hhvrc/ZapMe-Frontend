<script lang="ts">
  import { goto } from '$app/navigation';
  import Form from '$components/Form.svelte';
  import FormButton from '$components/FormButton.svelte';
  import NamedInput from '$components/NamedInput.svelte';
  import Turnstile from '$components/Turnstile.svelte';
  import { accountApi, ParseFetchError } from '$lib/fetchSingleton';
  import { validateEmail } from '$lib/validators';

  let email = '';
  let turnstileResponse = '';

  async function handleSubmit() {
    try {
      await accountApi.accountRecoveryRequest({
        recoveryRequest: { email, turnstileResponse },
      });
      // TODO: Show a success message ("If an account with that email exists, we've sent you an email with a link to reset your password.")
      goto('/sign-in');
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
        if (response.fields.email) {
          window.alert(response.fields.email);
        }
      }
    }
  }

  $: validationResult = validateEmail(email);
</script>

<svelte:head>
  <title>ZapMe - Reset Password</title>
</svelte:head>
<Form on:submit={handleSubmit} title="Reset Password">
  <NamedInput
    type="text"
    icon="mail"
    displayname="Email"
    bind:value={email}
    error={validationResult.message}
  />
  <Turnstile action="reset-password" bind:response={turnstileResponse} />
  <FormButton
    disabled={!validationResult.valid}
    content="Request Password Reset"
  />
</Form>

<style>
</style>
