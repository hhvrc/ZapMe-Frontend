<script lang="ts">
  import type { Snapshot } from './$types';
  import { focusTrap, modalStore, toastStore } from '@skeletonlabs/skeleton';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CountdownText from '$components/CountdownText.svelte';
  import PasswordInput from '$components/PasswordInput.svelte';
  import TextInput from '$components/TextInput.svelte';
  import Turnstile from '$components/Turnstile.svelte';
  import type { ProviderDataDto } from '$lib/api';
  import { accountApi, singleSignOnApi } from '$lib/fetchSingleton';
  import { handleFetchError } from '$lib/helpers/errorDetailsHelpers';
  import { ApiConfigStore, SessionTokenStore } from '$lib/stores';
  import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateUsername,
  } from '$lib/validators';

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
  let ssoToken: string | null = null;
  let ssoData: ProviderDataDto | null = null;
  if (browser) {
    ssoToken = $page.url.searchParams.get('ssoToken');
    if (ssoToken) {
      singleSignOnApi
        .getSsoProviderdata(ssoToken)
        .then((response) => {
          ssoData = response;
          username = ssoData.userName;
          email = ssoData.email;
          toastStore.trigger({
            message: `Your ${ssoData.providerName} account is linked to a ZapMe account. Please complete the registration process.`,
            autohide: true,
            timeout: 15000,
            background: 'bg-primary-500',
          });
        })
        .catch((error) => {
          handleFetchError(error);
        });
    }
  }

  $: acceptedPrivacyPolicyVersion = acceptedTerms ? $ApiConfigStore?.privacyPolicyVersion ?? 0 : 0;
  $: acceptedTermsOfServiceVersion = acceptedTerms
    ? $ApiConfigStore?.termsOfServiceVersion ?? 0
    : 0;

  async function handleSubmit() {
    submitting = true;
    try {
      const result = await accountApi.createAccount({
        username,
        password,
        email,
        acceptedPrivacyPolicyVersion,
        acceptedTermsOfServiceVersion,
        turnstileResponse,
        ssoToken,
      });

      if (result.emailVerificationRequired) {
        modalStore.trigger({
          type: 'alert',
          title: 'Verify your email address',
          body: 'Almost done! Please check your email for a verification link.',
          response: () => {
            goto('/login');
          },
          buttonTextCancel: 'Got it',
        });
      } else {
        toastStore.trigger({
          message: 'Account created successfully.',
          autohide: true,
          timeout: 20_000,
          background: 'variant-filled-success',
        });
      }

      const session = result.session;
      if (session) {
        SessionTokenStore.set(session);
        goto('/');
      } else {
        goto('/login');
      }
    } catch (error) {
      const response = await handleFetchError(error);
      if (!response) return;

      const fields = response.apiFields;
      if (fields) {
        if (fields.username) {
          usernameError = { valid: false, message: fields.username[0] };
        }
        if (fields.password) {
          passwordError = { valid: false, message: fields.password[0] };
        }
      }
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

<!-- Register Form -->
<div class="responsive-card card p-8">
  <form
    class="flex flex-col space-y-4"
    on:submit|preventDefault={handleSubmit}
    use:focusTrap={true}
  >
    <!-- Title -->
    <h2>Register</h2>

    {#if ssoData}
      <p class="text-sm">
        We have received your information from {ssoData.providerName}.
      </p>
      <p class="text-sm">Please edit and fill out the rest of the form to complete your account.</p>
      <p class="text-sm text-red-500">
        This request will expire in <CountdownText expiresAtUtc={ssoData.expiresAtUtc} />
      </p>
    {/if}

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
    <button type="submit" class="btn variant-filled w-1/2 self-center" {disabled}>
      Register
    </button>
  </form>
</div>
