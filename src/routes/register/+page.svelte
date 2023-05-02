<script lang="ts">
  import { enhance } from '$app/forms';
  import PasswordInput from '$components/PasswordInput.svelte';
  import TextInput from '$components/TextInput.svelte';
  import Turnstile from '$components/Turnstile.svelte';
  import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateUsername,
  } from '$lib/validators';
  import { ValidationResultIcon } from '$types';
  import { focusTrap } from '@skeletonlabs/skeleton';

  export let form;

  let username = form?.username?.toString() ?? '';
  $: usernameError = validateUsername(username);
  $: usernameErrorIcon = ValidationResultIcon(usernameError);

  let email = form?.email?.toString() ?? '';
  $: emailError = validateEmail(email);
  $: emailErrorIcon = ValidationResultIcon(emailError);

  let password = '';
  $: passwordError = validatePassword(password);
  $: passwordErrorIcon = ValidationResultIcon(passwordError);
  let passwordShown = false;

  let passwordMatch = '';
  $: passwordMatchError = validatePasswordMatch(password, passwordMatch);
  $: passwordMatchErrorIcon = ValidationResultIcon(passwordMatchError);
  let passwordMatchShown = false;

  let acceptedTerms = form?.acceptedTerms?.toString() === 'on';
  $: acceptedTermsError = acceptedTerms
    ? { valid: true, message: null }
    : { valid: false, message: 'You must accept the terms.' };

  let turnstileToken = '';

  $: disabled = !(
    usernameError.valid &&
    emailError.valid &&
    passwordError.valid &&
    passwordMatchError.valid &&
    acceptedTermsError.valid &&
    !!turnstileToken
  );
</script>

<svelte:head>
  <title>ZapMe - Register</title>
</svelte:head>

<!-- Register Form -->
<div class="card mx-auto my-8 w-1/2 max-w-xl p-4">
  <form
    class="flex flex-col space-y-4"
    method="post"
    action="/register"
    use:focusTrap={true}
    use:enhance={() => {
      disabled = true;

      return async ({ update }) => {
        await update();
        disabled = false;
      };
    }}
  >
    <!-- Title -->
    <h2>Register</h2>

    <!-- Username -->
    <TextInput
      name="username"
      title="Username"
      placeholder="John Doe"
      autocomplete="username"
      bind:value={username}
      fieldIcon={usernameErrorIcon}
      fieldIconMessage={usernameError.message}
    />

    <!-- Email -->
    <TextInput
      name="email"
      title="Email"
      placeholder="john@example.com"
      autocomplete="email"
      bind:value={email}
      fieldIcon={emailErrorIcon}
      fieldIconMessage={emailError.message}
    />

    <!-- Password -->
    <PasswordInput
      name="password"
      title="Password"
      autocomplete="new-password"
      bind:value={password}
      bind:passwordShown
      fieldIcon={passwordErrorIcon}
      fieldIconMessage={passwordError.message}
    />

    <!-- Password -->
    <PasswordInput
      name="password"
      title="Confirm Password"
      autocomplete="new-password"
      bind:value={passwordMatch}
      bind:passwordShown={passwordMatchShown}
      fieldIcon={passwordMatchErrorIcon}
      fieldIconMessage={passwordMatchError.message}
    />

    <!-- Terms of Service -->
    <label class="flex items-center space-x-2">
      <input
        class="checkbox"
        type="checkbox"
        name="acceptedTerms"
        title="Agree to terms of service"
        bind:checked={acceptedTerms}
      />
      <span
        >I agree to the <a href="/terms-of-service">Terms of Service</a></span
      >
    </label>

    <!-- Turnstile -->
    <Turnstile action="register" bind:response={turnstileToken} />

    <!-- Submit -->
    <button
      type="submit"
      class="btn variant-filled w-1/2 self-center"
      {disabled}
    >
      <span class="hidden md:inline-block">🚀</span>
      <span>Register</span>
    </button>
  </form>
</div>
