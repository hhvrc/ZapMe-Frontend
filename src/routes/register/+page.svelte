<script lang="ts">
  import PasswordInput from '$components/PasswordInput.svelte';
  import TextInput from '$components/TextInput.svelte';
  import Turnstile from '$components/Turnstile.svelte';
  import { accountApi } from '$lib/fetchSingleton';
  import { ApiConfigStore } from '$lib/stores';
  import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateUsername,
  } from '$lib/validators';
  import type { Snapshot } from './$types';
  import { focusTrap } from '@skeletonlabs/skeleton';

  export const snapshot: Snapshot = {
    capture: () => {
      return {
        username,
        email,
        acceptedTerms,
      };
    },
    restore: (data) => {
      username = data.username;
      email = data.email;
      acceptedTerms = data.acceptedTerms;
    },
  };

  let username = '';
  let email = '';
  let password = '';
  let passwordShown = false;
  let passwordMatch = '';
  let passwordMatchShown = false;
  let acceptedTerms = false;
  let turnstileResponse = '';
  let submitting = false;

  $: acceptedPrivacyPolicyVersion = acceptedTerms ? $ApiConfigStore?.api.privacyVersion ?? 0 : 0;
  $: acceptedTermsOfServiceVersion = acceptedTerms ? $ApiConfigStore?.api.tosVersion ?? 0 : 0;

  async function handleSubmit() {
    submitting = true;
    try {
      await accountApi.createAccount({
        username,
        password,
        email,
        acceptedPrivacyPolicyVersion,
        acceptedTermsOfServiceVersion,
        turnstileResponse,
      });
    } catch (error) {
      alert(error);
    } finally {
      submitting = false;
    }
  }

  $: usernameError = validateUsername(username);
  $: emailError = validateEmail(email);
  $: passwordError = validatePassword(password);
  $: passwordMatchError = validatePasswordMatch(password, passwordMatch);
  $: acceptedTermsError = acceptedTerms
    ? { valid: true, message: null }
    : { valid: false, message: 'You must accept the terms.' };

  $: disabled = !(
    usernameError.valid &&
    emailError.valid &&
    passwordError.valid &&
    passwordMatchError.valid &&
    acceptedTermsError.valid &&
    turnstileResponse &&
    !submitting
  );
</script>

<svelte:head>
  <title>ZapMe - Register</title>
</svelte:head>

<!-- Register Form -->
<div class="card mx-auto my-8 w-1/2 max-w-xl p-4">
  <form
    class="flex flex-col space-y-4"
    on:submit|preventDefault={handleSubmit}
    use:focusTrap={true}
  >
    <!-- Title -->
    <h2>Register</h2>

    <!-- Username -->
    <TextInput
      title="Username"
      placeholder="John Doe"
      autocomplete="username"
      bind:value={username}
      validationResult={usernameError}
    />

    <!-- Email -->
    <TextInput
      title="Email"
      placeholder="john@example.com"
      autocomplete="email"
      bind:value={email}
      validationResult={emailError}
    />

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

    <!-- Terms of Service -->
    <label class="flex items-center space-x-2">
      <input
        class="checkbox"
        type="checkbox"
        title="Agree to terms of service"
        bind:checked={acceptedTerms}
      />
      <span>
        I agree to the <a href="/terms-of-service">Terms of Service</a>
      </span>
    </label>

    <!-- Turnstile -->
    <Turnstile action="register" bind:response={turnstileResponse} />

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
