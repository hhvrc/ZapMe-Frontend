<script lang="ts">
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
  import type { ActionData } from './$types';
  import { focusTrap } from '@skeletonlabs/skeleton';

  export let form: ActionData;

  let username = form?.username?.toString() ?? '';
  $: usernameError = validateUsername(username);
  $: usernameErrorIcon = ValidationResultIcon(usernameError);

  let email = form?.email?.toString() ?? '';
  $: emailError = validateEmail(email);
  $: emailErrorIcon = ValidationResultIcon(emailError);

  let password = '';
  $: passwordError = validatePassword(password);
  $: passwordErrorIcon = ValidationResultIcon(passwordError);
  let passwordHidden = true;

  let passwordMatch = '';
  $: passwordMatchError = validatePasswordMatch(password, passwordMatch);
  $: passwordMatchErrorIcon = ValidationResultIcon(passwordMatchError);
  let passwordMatchHidden = true;

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

  let isFocused = true;
</script>

<svelte:head>
  <title>ZapMe - Register</title>
</svelte:head>

<form method="POST" use:focusTrap={isFocused}>
  {#if !(form?.success ?? true)}
    <p class="text-black text-error-50">
      {JSON.stringify(form)}
    </p>
  {/if}

  <!-- Username -->
  <TextInput
    name="username"
    title="Username"
    placeholder="username"
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
    placeholder="password"
    autocomplete="new-password"
    bind:value={password}
    fieldIcon={passwordErrorIcon}
    fieldIconMessage={passwordError.message}
  />

  <!-- Confirm Password, name removed to prevent submission -->
  <PasswordInput
    title="Confirm Password"
    placeholder="password"
    autocomplete="new-password"
    bind:value={passwordMatch}
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
    <span>I agree to the <a href="/terms-of-service">Terms of Service</a></span>
  </label>

  <!-- Turnstile -->
  <Turnstile action="register" bind:response={turnstileToken} />

  <!-- Submit -->
  <button type="submit" class="btn variant-filled" {disabled}>
    <span>🚀</span>
    <span>Register</span>
  </button>
</form>
