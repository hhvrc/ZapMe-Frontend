<script lang="ts">
  import { goto } from '$app/navigation';
  import { AccountApiFactory } from '$lib/api';
  import NamedInput from '$components/NamedInput.svelte';
  import Form from '$components/Form.svelte';
  import FormButton from '$components/FormButton.svelte';
  import ReCaptcha from '$components/ReCaptcha.svelte';
  import { validateEmail } from '$lib/validators';

  const accountApi = AccountApiFactory();

  let email = '';
  let recaptcha_response = '';

  async function handleSubmit() {
    accountApi.accountRecoveryRequest({
      email: email,
      recaptcha_response: recaptcha_response,
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      goto('/sign-in');
    });
  }

  $: validationResult = validateEmail(email);
</script>

<svelte:head>
  <title>ZapMe - Reset Password</title>
</svelte:head>
<Form on:submit={handleSubmit} title='Reset Password'>
  <NamedInput type="text" icon="mail" displayname="Email" bind:value={email} error={validationResult.message} />
  <ReCaptcha bind:response={recaptcha_response} />
  <FormButton disabled={!validationResult.valid} content='Request Password Reset'/>
</Form>

<style>
</style>