<script lang="ts">
  import { page } from '$app/stores';
  import NamedInput from '$components/NamedInput.svelte';
  import NamedCheckBox from '$components/NamedCheckBox.svelte';
  import Form from '$components/Form.svelte';
  import FormButton from '$components/FormButton.svelte';

  const token = $page.url.searchParams.get('token');
  let title = 'Reset Password';
  let password = '';
  let passwordError : string | null = null;
  let confirmedPassword = '';
  let confirmedPasswordError : string | null = null;

  async function handleSubmit() {
  }
  function validateForm(password:string, confirmedPassword:string) {
    return password.length > 0 && confirmedPassword.length > 0 && password === confirmedPassword;
  }
</script>

<svelte:head>
    <title>ZapMe - Forgot Password</title>
</svelte:head>

{#if !token}

<h2>
  You have not been provided with a token.<br>
  Please check your email and try again.
</h2>

{:else}

<Form on:submit={handleSubmit} title={title}>
  <NamedInput type="password" displayname="Password" bind:value={password} error={passwordError} />
  <NamedInput type="password" displayname="Confirm Password" bind:value={confirmedPassword} error={confirmedPasswordError} />

  <FormButton disabled={!validateForm(password, confirmedPassword)}>Reset Password</FormButton>
</Form>

{/if}

<style>
</style>