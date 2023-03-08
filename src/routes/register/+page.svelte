<script lang="ts">
  import { goto } from '$app/navigation';
  import { registerAccount } from '$lib/api/account';
  import type { ErrorDetails } from '$lib/api/generated/api';
  import NamedInput from '$components/NamedInput.svelte';
  import ReCaptcha from '$components/ReCaptcha.svelte';
  import Form from '$components/Form.svelte';
  import FormButton from '$components/FormButton.svelte';

  let title = 'Register';
  let username = '';
  let usernameError: string | null = null;
  let email = '';
  let emailError: string | null = null;
  let password = '';
  let passwordError: string | null = null;
  let confirmedPassword = '';
  let confirmedPasswordError: string | null = null;
  let acceptedTosVersion = -1;
  let recaptchaResponse = '';

  async function handleSubmit() {
    const response = await registerAccount(username, password, email, acceptedTosVersion, recaptchaResponse);

    if (response.ok) {
      goto('/home');
      return;
    }

    if (!response.error) {
      window.alert('An unknown error occurred.');
      return;
    }

    const error = response.error as ErrorDetails;

    if (error.notification) {
      window.alert(error.notification.title + ': ' + error.notification.message);
    }

    if (error.fields) {
      for (const [key, value] of Object.entries(error.fields)) {
        switch (key) {
          case 'username':
            usernameError = value[0];
            break;
          case 'email':
            emailError = value[0];
            break;
          case 'password':
            passwordError = value[0];
            break;
          case 'confirmedPassword':
            confirmedPasswordError = value[0];
            break;
          default:
            break;
        }
      }
    }
  }
  function validateForm(username:string, password:string, email:string, confirmedPassword:string) {
      return username.length > 0 && password.length > 0 && email.length > 0 && password === confirmedPassword;
  }
</script>

<svelte:head>
    <title>ZapMe - {title}</title>
</svelte:head>

<Form on:submit={handleSubmit} title={title}>
  <NamedInput type="text" icon="badge" displayname="Username" bind:value={username} error={usernameError} />
  <NamedInput type="email" displayname="Email" bind:value={email} error={emailError} />
  <NamedInput type="password" displayname="Password" bind:value={password} error={passwordError} />
  <NamedInput type="password" displayname="Confirm Password" placeholder="Password" bind:value={confirmedPassword} error={confirmedPasswordError} />

  <ReCaptcha bind:response={recaptchaResponse} />

  <FormButton disabled={!validateForm(username, password, email, confirmedPassword)}>Register</FormButton>
</Form>