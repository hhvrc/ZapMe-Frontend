<script lang="ts">
  import { goto } from '$app/navigation';
  import NamedInput from '$components/NamedInput.svelte';
  import ReCaptcha from '$components/ReCaptcha.svelte';
  import Form from '$components/Form.svelte';
  import FormButton from '$components/FormButton.svelte';
  import type { Snapshot } from './$types';
  import { validateUsername, validateEmail, validatePassword } from '$lib/validators';
  import NamedCheckBox from '$components/NamedCheckBox.svelte';
  import { accountApi, ParseFetchError } from '$lib/fetchSingleton';
  
  let formData = {
    username: '',
    email: '',
    password: '',
    confirmedPassword: '',
    acceptedTosVersion: false
  }
  export const snapshot: Snapshot = {
    capture: () => formData,
    restore: (value) => formData = value,
  };

  let recaptchaResponse: string | null = null;
  let isSubmitting = false;

  async function handleSubmit() {
    try {
      isSubmitting = true;
      await accountApi.createAccount({create: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        acceptedTosVersion: formData.acceptedTosVersion ? 1 : 0,
        recaptchaResponse: recaptchaResponse ?? ''
      }});
      
      goto('/sign-in');
    }
    catch (error) {
      const responseData = await ParseFetchError(error);
      if (responseData.code == 'err_network') {
        window.alert('Network error');
        return;
      }
      let response = responseData.details;
      if (!response) {
        if (error instanceof Error) {
          window.alert(error.message);
        } else {
          window.alert('An unknown error occurred.');
        }
        return;
      }

      if (response.notification) {
        window.alert(response.notification.title + ': ' + response.notification.message);
      }

      if (response.fields) {
        usernameError = response.fields.username?.[0] ?? null;
        emailError = response.fields.email?.[0] ?? null;
        passwordError = response.fields.password?.[0] ?? null;
        confirmedPasswordError = response.fields.confirmedPassword?.[0] ?? null;
      }
    }
    finally {
      isSubmitting = false;
      recaptchaResponse = null;
    }
  }

  let formValid = false;
  let usernameError: string | null = null;
  let emailError: string | null = null;
  let passwordError: string | null = null;
  let confirmedPasswordError: string | null = null;
  $: {
    let { username, email, password, confirmedPassword } = formData;

    let usernameValidation = validateUsername(username);
    usernameError = usernameValidation.message;

    let emailValidation = validateEmail(email);
    emailError = emailValidation.message;

    let passwordValidation = validatePassword(password);
    passwordError = passwordValidation.message;

    let confirmedPasswordValid = password === confirmedPassword;
    confirmedPasswordError = confirmedPasswordValid ? null : 'Passwords do not match';

    formValid = usernameValidation.valid && emailValidation.valid && passwordValidation.valid && confirmedPasswordValid;
  }

  $: disabled = isSubmitting;
</script>

<svelte:head>
    <title>ZapMe - Register</title>
</svelte:head>

<Form on:submit={handleSubmit} title='Register'>
  <NamedInput type="text" icon="badge" displayname="Username" bind:value={formData.username} error={usernameError} {disabled} />
  <NamedInput type="email" displayname="Email" bind:value={formData.email} error={emailError} {disabled} />
  <NamedInput type="password" displayname="Password" bind:value={formData.password} error={passwordError} {disabled} />
  <NamedInput type="password" displayname="Confirm Password" placeholder="Password" bind:value={formData.confirmedPassword} error={confirmedPasswordError} {disabled} />
  <NamedCheckBox displayname="I Agree" bind:checked={formData.acceptedTosVersion} {disabled} />

  <ReCaptcha bind:response={recaptchaResponse} />

  <FormButton disabled={!formValid || disabled} content='Register'/>
</Form>