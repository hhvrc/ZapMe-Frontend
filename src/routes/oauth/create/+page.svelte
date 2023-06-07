<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CountdownText from '$components/CountdownText.svelte';
  import PasswordInput from '$components/PasswordInput.svelte';
  import TextInput from '$components/TextInput.svelte';
  import { OAuthApi } from '$lib/api';
  import { RuntimeApiConfiguration } from '$lib/fetchSingleton';
  import { createErrorToast } from '$lib/helpers';
  import { handleFetchError } from '$lib/helpers/errorDetailsHelpers';
  import { AccountStore, ApiConfigStore, SessionTokenStore } from '$lib/stores';
  import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateUsername,
  } from '$lib/validators';
  import { focusTrap } from '@skeletonlabs/skeleton';

  const searchParams = $page.url.searchParams;
  const nameValue = searchParams.get('name');
  const emailValue = searchParams.get('email');
  const ticketValue = searchParams.get('ticket');
  const expiresAtValue = searchParams.get('expiresAt');
  const profilePictureUrlValue = searchParams.get('profilePictureUrl');

  if (browser && (!ticketValue || !expiresAtValue)) {
    createErrorToast('Invalid OAuth ticket.');
    goto('/login', { replaceState: true });
  }

  const expiresAtUtc = expiresAtValue ? Date.parse(expiresAtValue) : 0;

  let username = nameValue ?? '';
  let email = emailValue ?? '';
  let password = '';
  let passwordShown = false;
  let passwordMatch = '';
  let passwordMatchShown = false;
  let acceptedTerms = false;
  let submitting = false;
  
  $: acceptedPrivacyPolicyVersion = acceptedTerms
    ? $ApiConfigStore?.api.privacyVersion ?? 0
    : 0;
  $: acceptedTermsOfServiceVersion = acceptedTerms
    ? $ApiConfigStore?.api.tosVersion ?? 0
    : 0;

  const oauthApi = new OAuthApi(RuntimeApiConfiguration);

  async function handleSubmit() {
    if (!ticketValue) return;
    submitting = true;
    try {
      const response = await oauthApi.completeOAuthAccountCreation({
        oAuthTicket: ticketValue,
        acceptedPrivacyPolicyVersion,
        acceptedTermsOfServiceVersion,
        password
      });
      AccountStore.set({ account: response.account, lastFetch: Date.now() });
      SessionTokenStore.set(response.session);
      goto('/', { replaceState: true });
    } catch (error) {
      handleFetchError(error);
      goto('/login', { replaceState: true });
    } finally {
      submitting = false;
    }
  }
  async function handleExpired() {
    createErrorToast('OAuth ticket expired, please try again.');
    goto('/login', { replaceState: true });
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
    !submitting
  );
</script>

<svelte:head>
  <title>ZapMe - Complete OAuth Account Creation</title>
</svelte:head>

<div class="card mx-auto my-8 w-1/2 max-w-xl p-4">
  <form
    class="flex flex-col space-y-4"
    on:submit|preventDefault={handleSubmit}
    use:focusTrap={true}
  >
    <!-- Title -->
    <h2>Account Creation</h2>
  
    <p>We successfully authenticated with external provider, but we need a few more details to complete your account creation.</p>
    <p class="text-sm text-red-500">For security reasons, this request will expire in <CountdownText {expiresAtUtc} on:expired={handleExpired} /></p>

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

    <!-- Submit -->
    <button
      type="submit"
      class="btn variant-filled w-1/2 self-center"
      {disabled}
    >
      <span class="hidden md:inline-block">🚀</span>
      <span>Complete Registration</span>
    </button>
  </form>
</div>
